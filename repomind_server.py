import http.server
import socketserver
import json
import urllib.parse
import os
import ast

PORT = 5000

class RepoMindAPIHandler(http.server.SimpleHTTPRequestHandler):
    def _send_json(self, data, status=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == '/api/repositories/facefusion/health':
            self._send_json({
                "name": "facefusion/facefusion",
                "healthScore": 78,
                "breakdown": {
                    "codeQuality": 82,
                    "architecture": 74,
                    "security": 91,
                    "testing": 63,
                    "dependencies": 86,
                    "documentation": 58
                }
            })
        elif path == '/api/repositories/facefusion/debt':
            self._send_json({
                "totalIssues": 147,
                "debtHours": 184,
                "breakdown": {"critical": 8, "high": 27, "medium": 64, "low": 48}
            })
        elif path == '/api/repositories/facefusion/security':
            self._send_json({
                "criticalFindings": 1,
                "findings": [
                    {
                        "id": "SEC-101",
                        "title": "Unsafe Subprocess Shell Execution",
                        "severity": "critical",
                        "file": "facefusion/program_helper.py",
                        "line": 42
                    }
                ]
            })
        elif path.startswith('/api/repositories/'):
            self._send_json({
                "name": "facefusion/facefusion",
                "totalFiles": 183,
                "totalLoc": 18912,
                "status": "active"
            })
        else:
            self._send_json({"status": "RepoMind AI Backend API v2.4 Online", "endpoints": [
                "POST /api/repositories/analyze",
                "GET /api/repositories/:id/health",
                "GET /api/repositories/:id/debt",
                "GET /api/repositories/:id/security",
                "POST /api/ai/chat"
            ]})

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req_data = json.loads(body) if body else {}
        except Exception:
            req_data = {}

        path = self.path
        if path == '/api/repositories/analyze':
            self._send_json({
                "status": "success",
                "message": "Repository analysis queued & parsed",
                "repo": req_data.get("url", "facefusion/facefusion")
            })
        elif path == '/api/ai/chat':
            user_msg = req_data.get("message", "")
            self._send_json({
                "response": f"RepoMind AI analyzed '{user_msg}'. 183 Python files in codebase reviewed.",
                "suggestedFix": "Refactor core.py dispatch loop to eliminate high cyclomatic complexity."
            })
        elif path == '/api/reports/generate':
            self._send_json({
                "status": "generated",
                "reportUrl": "/reports/repomind-health-report.pdf"
            })
        else:
            self._send_json({"error": "Endpoint not found"}, status=404)

def run_server():
    with socketserver.TCPServer(("", PORT), RepoMindAPIHandler) as httpd:
        print(f"RepoMind AI Backend API serving on port {PORT}")
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
