"""
analyze_repo.py - Static Analysis & Dependency Analysis Engine for RepoMind AI
Author: Static Analysis Lead (Member 2)
Description:
    Performs Python AST parsing, cyclomatic complexity computation,
    maintainability index calculation, import detection, dependency mapping,
    and circular dependency detection for repositories.
"""

import os
import sys
import ast
import re
import math
import json
import argparse
from typing import Dict, List, Any, Optional, Set, Tuple


class ComplexityVisitor(ast.NodeVisitor):
    """
    Computes McCabe Cyclomatic Complexity for functions, methods, and modules.
    Base complexity starts at 1, incrementing at each decision branch.
    """
    def __init__(self):
        self.complexity = 1

    def visit_If(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_IfExp(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_For(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_AsyncFor(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_While(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_ExceptHandler(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_With(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_AsyncWith(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_Assert(self, node):
        self.complexity += 1
        self.generic_visit(node)

    def visit_BoolOp(self, node):
        # Each condition after the first in an and/or expression adds a branch
        self.complexity += max(0, len(node.values) - 1)
        self.generic_visit(node)

    def visit_ListComp(self, node):
        self.complexity += len(node.generators)
        self.generic_visit(node)

    def visit_SetComp(self, node):
        self.complexity += len(node.generators)
        self.generic_visit(node)

    def visit_DictComp(self, node):
        self.complexity += len(node.generators)
        self.generic_visit(node)

    def visit_GeneratorExp(self, node):
        self.complexity += len(node.generators)
        self.generic_visit(node)

    # Support Python 3.10+ Pattern Matching if available
    def visit_Match(self, node):
        self.generic_visit(node)

    def visit_match_case(self, node):
        self.complexity += 1
        self.generic_visit(node)


class HalsteadVisitor(ast.NodeVisitor):
    """
    Computes Halstead metrics (operators and operands) to evaluate Halstead Volume.
    """
    def __init__(self):
        self.operators = []
        self.operands = []

    def visit_Name(self, node):
        self.operands.append(node.id)
        self.generic_visit(node)

    def visit_Constant(self, node):
        self.operands.append(repr(node.value))
        self.generic_visit(node)

    def visit_Attribute(self, node):
        self.operands.append(node.attr)
        self.generic_visit(node)

    def generic_visit(self, node):
        # AST node class name acts as an operator for syntax structures
        node_name = node.__class__.__name__
        if node_name in {
            'Add', 'Sub', 'Mult', 'Div', 'FloorDiv', 'Mod', 'Pow', 'LShift', 'RShift',
            'BitOr', 'BitXor', 'BitAnd', 'MatMult', 'Invert', 'Not', 'UAdd', 'USub',
            'Eq', 'NotEq', 'Lt', 'LtE', 'Gt', 'GtE', 'Is', 'IsNot', 'In', 'NotIn',
            'And', 'Or', 'If', 'For', 'While', 'Return', 'Yield', 'YieldFrom', 'Raise',
            'Try', 'With', 'FunctionDef', 'AsyncFunctionDef', 'ClassDef', 'Assign',
            'AugAssign', 'Call', 'Import', 'ImportFrom', 'Assert', 'Delete'
        }:
            self.operators.append(node_name)
        super().generic_visit(node)

    def get_volume(self) -> float:
        n1 = len(set(self.operators))  # unique operators
        n2 = len(set(self.operands))   # unique operands
        N1 = len(self.operators)       # total operators
        N2 = len(self.operands)        # total operands

        vocabulary = n1 + n2
        length = N1 + N2

        if vocabulary <= 1 or length == 0:
            return 1.0
        return float(length * math.log2(vocabulary))


class PythonASTFileAnalyzer:
    """
    Analyzes an individual Python file using the `ast` module.
    Extracts LOC, SLOC, functions, classes, complexity, maintainability index,
    imports, code smells, and function-level breakdowns.
    """
    def __init__(self, file_path: str, repo_root: str = ""):
        self.file_path = file_path
        self.repo_root = repo_root
        self.rel_path = os.path.relpath(file_path, repo_root).replace('\\', '/') if repo_root else os.path.basename(file_path)

    def analyze(self) -> Dict[str, Any]:
        # Handle missing file
        if not os.path.exists(self.file_path):
            return self._build_error_result("File not found")

        # Read content safely
        try:
            with open(self.file_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except Exception as e:
            return self._build_error_result(f"Unable to read file: {str(e)}")

        lines = content.splitlines()
        loc = len(lines)

        # Handle empty file safely
        if loc == 0 or content.strip() == "":
            return {
                "file": self.rel_path,
                "name": os.path.basename(self.file_path),
                "loc": 0,
                "sloc": 0,
                "functions": 0,
                "classes": 0,
                "avgComplexity": 1.0,
                "maintainabilityIndex": 100,
                "smellsCount": 0,
                "hasBareExcepts": False,
                "missingDocstrings": 0,
                "functionDetails": [],
                "classDetails": [],
                "imports": [],
                "internalDependencies": [],
                "externalDependencies": [],
                "diagnostics": [],
                "error": None
            }

        # Calculate SLOC (Source Lines of Code excluding comments and blanks)
        sloc = self._calculate_sloc(lines)

        # Attempt AST Parse
        try:
            tree = ast.parse(content, filename=self.file_path)
        except SyntaxError as e:
            return {
                "file": self.rel_path,
                "name": os.path.basename(self.file_path),
                "loc": loc,
                "sloc": sloc,
                "functions": 0,
                "classes": 0,
                "avgComplexity": 1.0,
                "maintainabilityIndex": 40,
                "smellsCount": 1,
                "hasBareExcepts": False,
                "missingDocstrings": 0,
                "functionDetails": [],
                "classDetails": [],
                "imports": [],
                "internalDependencies": [],
                "externalDependencies": [],
                "diagnostics": [f"SyntaxError at line {e.lineno}: {e.msg}"],
                "error": f"SyntaxError: {e.msg}"
            }
        except Exception as e:
            return self._build_error_result(f"AST parse error: {str(e)}", loc, sloc)

        # Extract Functions, Classes, and Metrics
        functions_info = []
        classes_info = []
        imports = []
        has_bare_excepts = False
        missing_docstrings = 0
        diagnostics = []

        # Analyze Functions
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                fn_name = node.name
                fn_start = node.lineno
                fn_end = getattr(node, 'end_lineno', fn_start)
                fn_loc = max(1, fn_end - fn_start + 1)
                has_doc = ast.get_docstring(node) is not None
                if not has_doc:
                    missing_docstrings += 1

                # Calculate per-function complexity
                fn_visitor = ComplexityVisitor()
                # Visit children of the function (not nested functions to avoid double counting)
                for child in node.body:
                    fn_visitor.visit(child)
                fn_complexity = fn_visitor.complexity

                if fn_complexity >= 10:
                    diagnostics.append(f"High cyclomatic complexity ({fn_complexity}) in function '{fn_name}' (line {fn_start})")
                elif fn_loc > 60:
                    diagnostics.append(f"Long function '{fn_name}' ({fn_loc} lines) at line {fn_start}")

                arg_count = len(node.args.args)
                functions_info.append({
                    "name": fn_name,
                    "complexity": fn_complexity,
                    "line": fn_start,
                    "endLine": fn_end,
                    "loc": fn_loc,
                    "argCount": arg_count,
                    "hasDocstring": has_doc,
                    "isAsync": isinstance(node, ast.AsyncFunctionDef)
                })

            elif isinstance(node, ast.ClassDef):
                cls_name = node.name
                cls_start = node.lineno
                cls_end = getattr(node, 'end_lineno', cls_start)
                cls_loc = max(1, cls_end - cls_start + 1)
                has_doc = ast.get_docstring(node) is not None
                if not has_doc:
                    missing_docstrings += 1

                method_names = [
                    m.name for m in node.body
                    if isinstance(m, (ast.FunctionDef, ast.AsyncFunctionDef))
                ]
                classes_info.append({
                    "name": cls_name,
                    "line": cls_start,
                    "endLine": cls_end,
                    "loc": cls_loc,
                    "methodsCount": len(method_names),
                    "methodNames": method_names,
                    "hasDocstring": has_doc
                })

            elif isinstance(node, ast.ExceptHandler):
                if node.type is None:
                    has_bare_excepts = True
                    diagnostics.append(f"Bare 'except:' handler at line {node.lineno} catches all exceptions indiscriminately")

            elif isinstance(node, ast.Import):
                for alias in node.names:
                    imports.append({
                        "module": alias.name,
                        "alias": alias.asname,
                        "line": node.lineno,
                        "isFrom": False,
                        "level": 0
                    })

            elif isinstance(node, ast.ImportFrom):
                module_name = node.module or ""
                for alias in node.names:
                    imports.append({
                        "module": module_name,
                        "name": alias.name,
                        "alias": alias.asname,
                        "line": node.lineno,
                        "isFrom": True,
                        "level": node.level or 0
                    })

        # Calculate File Complexity
        if functions_info:
            total_fn_complexity = sum(f["complexity"] for f in functions_info)
            avg_complexity = round(total_fn_complexity / len(functions_info), 2)
        else:
            module_visitor = ComplexityVisitor()
            module_visitor.visit(tree)
            avg_complexity = round(float(module_visitor.complexity), 2)

        # Calculate Halstead Volume & Maintainability Index (SEI / Radon standard)
        halstead = HalsteadVisitor()
        halstead.visit(tree)
        volume = halstead.get_volume()

        if sloc <= 0:
            mi = 100
        else:
            # SEI / Microsoft standard: use average cyclomatic complexity per function (V(g))
            raw_mi = 171.0 - 5.2 * math.log(max(1.0, volume)) - 0.23 * avg_complexity - 16.2 * math.log(sloc)
            # Scale to 0-100 range with a minimum positive floor for valid parsed code
            normalized_mi = max(10.0, min(100.0, raw_mi * 100.0 / 171.0))
            mi = int(round(normalized_mi))

        smells_count = len(diagnostics) + (1 if has_bare_excepts else 0)

        # Unique import strings
        import_strings = []
        for imp in imports:
            mod = imp["module"]
            if imp.get("level", 0) > 0:
                mod = ("." * imp["level"]) + mod
            if mod and mod not in import_strings:
                import_strings.append(mod)

        return {
            "file": self.rel_path,
            "name": os.path.basename(self.file_path),
            "loc": loc,
            "sloc": sloc,
            "functions": len(functions_info),
            "classes": len(classes_info),
            "avgComplexity": avg_complexity,
            "maintainabilityIndex": mi,
            "smellsCount": smells_count,
            "hasBareExcepts": has_bare_excepts,
            "missingDocstrings": missing_docstrings,
            "functionDetails": functions_info,
            "classDetails": classes_info,
            "imports": import_strings,
            "rawImports": imports,
            "internalDependencies": [],
            "externalDependencies": [],
            "diagnostics": diagnostics,
            "error": None
        }

    def _calculate_sloc(self, lines: List[str]) -> int:
        sloc = 0
        in_multiline_string = False
        for line in lines:
            trimmed = line.strip()
            if not trimmed:
                continue
            if trimmed.startswith('#'):
                continue
            # Multi-line comment/docstring tracking
            if '"""' in trimmed or "'''" in trimmed:
                quotes_count = trimmed.count('"""') + trimmed.count("'''")
                if quotes_count % 2 != 0:
                    in_multiline_string = not in_multiline_string
                sloc += 1
                continue
            if in_multiline_string:
                continue
            sloc += 1
        return sloc

    def _build_error_result(self, error_msg: str, loc: int = 0, sloc: int = 0) -> Dict[str, Any]:
        return {
            "file": self.rel_path,
            "name": os.path.basename(self.file_path),
            "loc": loc,
            "sloc": sloc,
            "functions": 0,
            "classes": 0,
            "avgComplexity": 1.0,
            "maintainabilityIndex": 50,
            "smellsCount": 1,
            "hasBareExcepts": False,
            "missingDocstrings": 0,
            "functionDetails": [],
            "classDetails": [],
            "imports": [],
            "internalDependencies": [],
            "externalDependencies": [],
            "diagnostics": [error_msg],
            "error": error_msg
        }


class GenericSourceAnalyzer:
    """
    Provides robust line, function, class, and import extraction for non-Python
    source files (JavaScript, TypeScript, JSX, TSX, CSS, JSON) to ensure complete
    full-stack repository coverage.
    """
    def __init__(self, file_path: str, repo_root: str = ""):
        self.file_path = file_path
        self.repo_root = repo_root
        self.rel_path = os.path.relpath(file_path, repo_root).replace('\\', '/') if repo_root else os.path.basename(file_path)

    def analyze(self) -> Dict[str, Any]:
        if not os.path.exists(self.file_path):
            return {"file": self.rel_path, "name": os.path.basename(self.file_path), "loc": 0, "sloc": 0, "error": "File not found"}

        try:
            with open(self.file_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
        except Exception as e:
            return {"file": self.rel_path, "name": os.path.basename(self.file_path), "loc": 0, "sloc": 0, "error": str(e)}

        lines = content.splitlines()
        loc = len(lines)
        sloc = sum(1 for line in lines if line.strip() and not line.strip().startswith('//') and not line.strip().startswith('/*'))

        # Function detection for JS/TS
        functions = []
        fn_pattern = re.compile(r'(?:function\s+([A-Za-z0-9_$]+)|(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|(?:export\s+(?:default\s+)?)?(?:async\s+)?function\s*([A-Za-z0-9_$]+))')
        for idx, line in enumerate(lines, 1):
            match = fn_pattern.search(line)
            if match:
                name = match.group(1) or match.group(2) or match.group(3)
                if name:
                    functions.append({"name": name, "line": idx, "complexity": 2})

        # Class detection for JS/TS
        classes = []
        cls_pattern = re.compile(r'class\s+([A-Za-z0-9_$]+)')
        for idx, line in enumerate(lines, 1):
            match = cls_pattern.search(line)
            if match:
                name = match.group(1)
                classes.append({"name": name, "line": idx, "methodsCount": 1})

        # Imports detection (ES import and CommonJS require)
        imports = []
        raw_imports = []
        import_pattern = re.compile(r'''(?:import\s+.*?from\s+['"]([^'"]+)['"]|require\s*\(\s*['"]([^'"]+)['"]\s*\))''')
        for idx, line in enumerate(lines, 1):
            for match in import_pattern.finditer(line):
                mod = match.group(1) or match.group(2)
                if mod and mod not in imports:
                    imports.append(mod)
                    raw_imports.append({"module": mod, "line": idx, "isFrom": True, "level": 0})

        avg_complexity = 2.5 if functions else 1.0
        # Estimate maintainability index for non-Python source
        if sloc > 0:
            mi = max(40, min(95, int(100 - (sloc / 20) - (len(functions) * 1.5))))
        else:
            mi = 100

        return {
            "file": self.rel_path,
            "name": os.path.basename(self.file_path),
            "loc": loc,
            "sloc": sloc,
            "functions": len(functions),
            "classes": len(classes),
            "avgComplexity": round(avg_complexity, 2),
            "maintainabilityIndex": mi,
            "smellsCount": 0,
            "hasBareExcepts": False,
            "missingDocstrings": 0,
            "functionDetails": functions,
            "classDetails": classes,
            "imports": imports,
            "rawImports": raw_imports,
            "internalDependencies": [],
            "externalDependencies": [],
            "diagnostics": [],
            "error": None
        }


class RepositoryAnalyzer:
    """
    Coordinates static code analysis across an entire repository:
    - Scans supported file types (.py, .js, .jsx, .ts, .tsx)
    - Computes per-file and repository-wide code quality metrics
    - Maps dependencies between modules
    - Detects circular dependencies and isolated files
    - Generates dynamic graph data suitable for DependencyGraphView
    """
    SUPPORTED_EXTENSIONS = {'.py', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'}
    IGNORE_DIRS = {
        'node_modules', '.git', '.venv', 'venv', '__pycache__',
        'dist', 'build', '.idea', '.vscode', '.gemini', 'coverage'
    }

    def __init__(self, repo_path: str = "."):
        self.repo_path = os.path.abspath(repo_path)
        self.files_data: List[Dict[str, Any]] = []
        self.file_map: Dict[str, Dict[str, Any]] = {}
        self.dependency_graph: Dict[str, Any] = {"nodes": [], "edges": [], "cycles": []}

    def analyze_all(self) -> Dict[str, Any]:
        """Runs complete static analysis and dependency extraction."""
        source_files = self._collect_source_files()

        # Step 1: Analyze each source file safely
        for file_path in source_files:
            _, ext = os.path.splitext(file_path)
            try:
                if ext == '.py':
                    analyzer = PythonASTFileAnalyzer(file_path, self.repo_path)
                    res = analyzer.analyze()
                else:
                    analyzer = GenericSourceAnalyzer(file_path, self.repo_path)
                    res = analyzer.analyze()
                self.files_data.append(res)
                self.file_map[res["file"]] = res
            except Exception as e:
                # One bad file must never crash whole analysis
                rel_path = os.path.relpath(file_path, self.repo_path).replace('\\', '/')
                err_res = {
                    "file": rel_path,
                    "name": os.path.basename(file_path),
                    "loc": 0,
                    "sloc": 0,
                    "functions": 0,
                    "classes": 0,
                    "avgComplexity": 1.0,
                    "maintainabilityIndex": 50,
                    "smellsCount": 1,
                    "hasBareExcepts": False,
                    "missingDocstrings": 0,
                    "functionDetails": [],
                    "classDetails": [],
                    "imports": [],
                    "internalDependencies": [],
                    "externalDependencies": [],
                    "diagnostics": [f"Analysis error: {str(e)}"],
                    "error": str(e)
                }
                self.files_data.append(err_res)
                self.file_map[rel_path] = err_res

        # Step 2: Resolve internal and external dependencies
        self._resolve_dependencies()

        # Step 3: Build dependency graph and detect circular dependencies
        self._build_dependency_graph()

        # Step 4: Calculate repo-level summary
        summary = self._calculate_summary()

        return {
            "summary": summary,
            "files": self.files_data,
            "dependencyGraph": self.dependency_graph
        }

    def _collect_source_files(self) -> List[str]:
        source_files = []
        if os.path.isfile(self.repo_path):
            return [self.repo_path]

        for root, dirs, files in os.walk(self.repo_path):
            dirs[:] = [d for d in dirs if d not in self.IGNORE_DIRS]
            for file in files:
                _, ext = os.path.splitext(file)
                if ext.lower() in self.SUPPORTED_EXTENSIONS:
                    source_files.append(os.path.join(root, file))

        return sorted(source_files)

    def _resolve_dependencies(self):
        """
        Maps imported module names to actual repository files.
        Distinguishes between internal module imports and external packages.
        """
        all_rel_paths = set(self.file_map.keys())

        # Build module name lookup tables for Python and JS/TS
        # E.g. "repomind_server" -> "repomind_server.py"
        # "server.models.Repository" -> "server/models/Repository.js"
        module_to_file: Dict[str, str] = {}
        for rel in all_rel_paths:
            base, ext = os.path.splitext(rel)
            dot_path = base.replace('/', '.')
            module_to_file[dot_path] = rel
            module_to_file[os.path.basename(base)] = rel
            module_to_file[base] = rel
            module_to_file[rel] = rel

        for file_info in self.files_data:
            current_file = file_info["file"]
            current_dir = os.path.dirname(current_file)
            raw_imports = file_info.get("rawImports", [])

            internal_deps = set()
            external_deps = set()

            for imp in raw_imports:
                mod_str = imp.get("module", "")
                level = imp.get("level", 0)

                resolved_target = None

                # 1. Handle relative imports (e.g. from .models import ... or require('./config/db'))
                if level > 0 or mod_str.startswith('.'):
                    # Resolve relative to current directory
                    if mod_str.startswith('.'):
                        target_candidate = os.path.normpath(os.path.join(current_dir, mod_str)).replace('\\', '/')
                    else:
                        # Python level
                        up_dir = current_dir
                        for _ in range(level - 1):
                            up_dir = os.path.dirname(up_dir)
                        target_candidate = os.path.normpath(os.path.join(up_dir, mod_str)).replace('\\', '/')

                    # Test extensions
                    for candidate in [target_candidate] + [f"{target_candidate}{ext}" for ext in self.SUPPORTED_EXTENSIONS] + [f"{target_candidate}/index{ext}" for ext in self.SUPPORTED_EXTENSIONS]:
                        if candidate in all_rel_paths:
                            resolved_target = candidate
                            break

                # 2. Handle absolute module imports in repo
                if not resolved_target and mod_str:
                    clean_mod = mod_str.strip()
                    if clean_mod in module_to_file:
                        resolved_target = module_to_file[clean_mod]
                    else:
                        # Try dot to slash
                        slash_path = clean_mod.replace('.', '/')
                        for candidate in [slash_path] + [f"{slash_path}{ext}" for ext in self.SUPPORTED_EXTENSIONS] + [f"{slash_path}/index{ext}" for ext in self.SUPPORTED_EXTENSIONS]:
                            if candidate in all_rel_paths:
                                resolved_target = candidate
                                break

                # Categorize
                if resolved_target and resolved_target != current_file:
                    internal_deps.add(resolved_target)
                elif mod_str:
                    pkg_name = mod_str.split('/')[0].split('.')[0]
                    if pkg_name:
                        external_deps.add(pkg_name)

            file_info["internalDependencies"] = sorted(list(internal_deps))
            file_info["externalDependencies"] = sorted(list(external_deps))

        # Add dependents (inbound references: what imports this file)
        for file_info in self.files_data:
            file_info["dependents"] = []
        for file_info in self.files_data:
            src = file_info["file"]
            for target in file_info["internalDependencies"]:
                if target in self.file_map and src not in self.file_map[target]["dependents"]:
                    self.file_map[target]["dependents"].append(src)

    def _build_dependency_graph(self):
        """
        Builds graph nodes and edges. Runs cycle detection for circular dependencies.
        """
        nodes = []
        edges = []
        adj: Dict[str, List[str]] = {}

        for file_info in self.files_data:
            f = file_info["file"]
            internal = file_info.get("internalDependencies", [])
            dependents = file_info.get("dependents", [])
            in_degree = len(dependents)
            out_degree = len(internal)
            is_isolated = (in_degree == 0 and out_degree == 0)

            nodes.append({
                "id": f,
                "name": file_info.get("name", os.path.basename(f)),
                "file": f,
                "loc": file_info.get("loc", 0),
                "sloc": file_info.get("sloc", 0),
                "functions": file_info.get("functions", 0),
                "classes": file_info.get("classes", 0),
                "avgComplexity": file_info.get("avgComplexity", 1.0),
                "maintainabilityIndex": file_info.get("maintainabilityIndex", 100),
                "inDegree": in_degree,
                "outDegree": out_degree,
                "isIsolated": is_isolated
            })
            adj[f] = list(internal)

        # Detect circular dependency cycles
        cycles = self._find_cycles(adj)
        circular_pairs = set()
        for cycle in cycles:
            for i in range(len(cycle)):
                u = cycle[i]
                v = cycle[(i + 1) % len(cycle)]
                circular_pairs.add((u, v))

        # Create Edges
        edge_set = set()
        for src, targets in adj.items():
            for tgt in targets:
                if (src, tgt) not in edge_set:
                    edge_set.add((src, tgt))
                    is_circ = (src, tgt) in circular_pairs or (tgt, src) in circular_pairs
                    edges.append({
                        "source": src,
                        "target": tgt,
                        "isCircular": is_circ
                    })

        self.dependency_graph = {
            "nodes": nodes,
            "edges": edges,
            "cycles": cycles
        }

    def _find_cycles(self, adj: Dict[str, List[str]]) -> List[List[str]]:
        """
        Finds directed cycles in the internal dependency graph using DFS.
        """
        cycles = []
        visited = set()
        rec_stack = []

        def dfs(node: str):
            visited.add(node)
            rec_stack.append(node)

            for neighbor in adj.get(node, []):
                if neighbor not in visited:
                    dfs(neighbor)
                elif neighbor in rec_stack:
                    # Cycle detected: extract sub-cycle from neighbor to end of stack
                    idx = rec_stack.index(neighbor)
                    cycle_path = rec_stack[idx:]
                    # Avoid duplicate permutations
                    canonical = self._canonical_cycle(cycle_path)
                    if canonical not in cycles:
                        cycles.append(canonical)

            rec_stack.pop()

        for n in adj:
            if n not in visited:
                dfs(n)

        return cycles

    def _canonical_cycle(self, cycle: List[str]) -> List[str]:
        if not cycle:
            return []
        min_idx = cycle.index(min(cycle))
        return cycle[min_idx:] + cycle[:min_idx]

    def _calculate_summary(self) -> Dict[str, Any]:
        total_files = len(self.files_data)
        total_loc = sum(f.get("loc", 0) for f in self.files_data)
        total_sloc = sum(f.get("sloc", 0) for f in self.files_data)
        total_functions = sum(f.get("functions", 0) for f in self.files_data)
        total_classes = sum(f.get("classes", 0) for f in self.files_data)
        total_smells = sum(f.get("smellsCount", 0) for f in self.files_data)

        if total_files > 0:
            avg_mi = round(sum(f.get("maintainabilityIndex", 100) for f in self.files_data) / total_files, 1)
            avg_complexity = round(sum(f.get("avgComplexity", 1.0) for f in self.files_data) / total_files, 2)
        else:
            avg_mi = 100.0
            avg_complexity = 1.0

        circular_count = len(self.dependency_graph.get("cycles", []))
        isolated_count = sum(1 for n in self.dependency_graph.get("nodes", []) if n.get("isIsolated", False))

        return {
            "repoPath": self.repo_path,
            "totalFiles": total_files,
            "totalLoc": total_loc,
            "totalSloc": total_sloc,
            "totalFunctions": total_functions,
            "totalClasses": total_classes,
            "avgComplexity": avg_complexity,
            "avgMaintainabilityIndex": avg_mi,
            "totalCodeSmells": total_smells,
            "circularDependenciesCount": circular_count,
            "isolatedFilesCount": isolated_count
        }


def analyze_repository(repo_path: str = ".") -> Dict[str, Any]:
    """Top-level helper function to analyze a repository path."""
    analyzer = RepositoryAnalyzer(repo_path)
    return analyzer.analyze_all()


def analyze_file(file_path: str, repo_root: str = "") -> Dict[str, Any]:
    """Top-level helper function to analyze a single file."""
    _, ext = os.path.splitext(file_path)
    if ext == '.py':
        analyzer = PythonASTFileAnalyzer(file_path, repo_root)
    else:
        analyzer = GenericSourceAnalyzer(file_path, repo_root)
    return analyzer.analyze()


def main():
    parser = argparse.ArgumentParser(description="RepoMind AI Static & Dependency Analysis Engine")
    parser.add_argument("path", nargs="?", default=".", help="Repository root path to analyze")
    parser.add_argument("--json", action="store_true", help="Output formatted JSON to stdout")
    parser.add_argument("--output", "-o", help="Save analysis results to a target JSON file")
    args = parser.parse_args()

    if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except Exception:
            pass

    results = analyze_repository(args.path)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
        print(f"[OK] Analysis successfully saved to {args.output}")
    elif args.json:
        print(json.dumps(results, indent=2))
    else:
        summary = results["summary"]
        print("=" * 60)
        print("[RepoMind AI] Static & Dependency Analysis Summary")
        print("=" * 60)
        print(f"Repository Path        : {summary['repoPath']}")
        print(f"Files Analyzed         : {summary['totalFiles']}")
        print(f"Lines of Code (LOC)    : {summary['totalLoc']} (SLOC: {summary['totalSloc']})")
        print(f"Functions / Classes    : {summary['totalFunctions']} functions / {summary['totalClasses']} classes")
        print(f"Avg Complexity         : {summary['avgComplexity']}")
        print(f"Avg Maintainability    : {summary['avgMaintainabilityIndex']} / 100")
        print(f"Code Smells Detected   : {summary['totalCodeSmells']}")
        print(f"Circular Dependencies  : {summary['circularDependenciesCount']}")
        print(f"Isolated Modules       : {summary['isolatedFilesCount']}")
        print("=" * 60)


if __name__ == "__main__":
    main()
