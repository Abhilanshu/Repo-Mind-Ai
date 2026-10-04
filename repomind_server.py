import http.server
import socketserver
import json
import urllib.parse
import urllib.request
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

        if path == '/api/repositories/health':
            self._send_json({
                "name": "Abhilanshu/Repo-Mind-Ai",
                "healthScore": 89,
                "breakdown": {
                    "codeQuality": 92,
                    "architecture": 88,
                    "security": 94,
                    "testing": 78,
                    "dependencies": 90,
                    "documentation": 85
                }
            })
        elif path == '/api/repositories/debt':
            self._send_json({
                "totalIssues": 18,
                "debtHours": 24,
                "breakdown": {"critical": 1, "high": 3, "medium": 8, "low": 6}
            })
        elif path.startswith('/api/repositories/'):
            self._send_json({
                "name": "Abhilanshu/Repo-Mind-Ai",
                "totalFiles": 48,
                "totalLoc": 6420,
                "status": "active"
            })
        else:
            self._send_json({
                "status": "RepoMind AI Backend API v2.5 Online",
                "endpoints": [
                    "POST /api/repositories/analyze",
                    "GET /api/repositories/health",
                    "GET /api/repositories/debt",
                    "POST /api/ai/chat",
                    "POST /api/whatsapp/send"
                ]
            })

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
                "message": "Repository analysis queued & parsed cleanly",
                "repo": req_data.get("url", "Abhilanshu/Repo-Mind-Ai")
            })
        elif path == '/api/whatsapp/send':
            phone = req_data.get("phone", "").strip()
            msg = req_data.get("message", "RepoMind AI Alert")
            api_key = req_data.get("apiKey", "").strip()

            clean_phone = "".join([c for c in phone if c.isdigit() or c == '+'])
            if not clean_phone.startswith('+') and len(clean_phone) == 10:
                clean_phone = '+91' + clean_phone # default to country code if missing

            delivered_via = "simulated"
            api_response_msg = "WhatsApp notification dispatched"

            # If user provided CallMeBot API key, fire actual HTTP call to CallMeBot
            if api_key and clean_phone:
                try:
                    url_encoded_text = urllib.parse.quote(msg)
                    target_url = f"https://api.callmebot.com/whatsapp.php?phone={clean_phone}&text={url_encoded_text}&apikey={api_key}"
                    req = urllib.request.Request(target_url, headers={'User-Agent': 'RepoMind-AI-Notifier/1.0'})
                    with urllib.request.urlopen(req, timeout=5) as response:
                        res_body = response.read().decode('utf-8')
                        delivered_via = "callmebot_api"
                        api_response_msg = f"Delivered to mobile via CallMeBot API: {res_body[:100]}"
                except Exception as err:
                    delivered_via = "error_fallback"
                    api_response_msg = f"CallMeBot call error: {str(err)}. Opening direct WhatsApp chat."

            self._send_json({
                "status": "success",
                "phone": clean_phone,
                "deliveredVia": delivered_via,
                "message": api_response_msg,
                "waUrl": f"https://api.whatsapp.com/send?phone={clean_phone.replace('+', '')}&text={urllib.parse.quote(msg)}"
            })
        elif path == '/api/ai/chat':
            user_msg = req_data.get("message", "")
            self._send_json({
                "response": f"RepoMind AI analyzed '{user_msg}'. Codebase parsed cleanly.",
                "suggestedFix": "Refactor core module loop to eliminate high cyclomatic complexity."
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
        print(f"RepoMind AI Backend API v2.5 serving on port {PORT}")
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
