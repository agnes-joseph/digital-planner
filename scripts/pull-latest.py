import subprocess
import os

os.chdir('/vercel/share/v0-project')
result = subprocess.run(['git', 'pull', 'origin', 'main'], capture_output=True, text=True)
print("[v0] Git pull output:")
print(result.stdout)
if result.stderr:
    print("[v0] Git pull errors:")
    print(result.stderr)
print(f"[v0] Return code: {result.returncode}")
