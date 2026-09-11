#!/usr/bin/env python3
"""Prepare package-only changes in an ephemeral review runner, never production.

The original lockfile is retained in the artifact and Git. The runner's npm
is upgraded separately from application packages after npm 10.9.8 produced
an internal edgesOut error. No --force or --legacy-peer-deps is used.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'dependency-review'
REPORT.mkdir(exist_ok=True)
manifest = ROOT / 'package.json'
lock = ROOT / 'package-lock.json'
before = json.loads(manifest.read_text())
expected = json.loads(json.dumps(before))
expected['dependencies']['next'] = '16.3.4'
expected['devDependencies']['eslint-config-next'] = '16.3.4'
expected['devDependencies']['vitest'] = '4.1.11'
(REPORT / 'package-before.json').write_text(json.dumps(before, indent=2) + '\n')
(REPORT / 'package-lock-before.json').write_bytes(lock.read_bytes())
manifest.write_text(json.dumps(expected, indent=2) + '\n')


def run(args: list[str], filename: str) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(args, cwd=ROOT, text=True, stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT, check=False)
    (REPORT / filename).write_text(result.stdout)
    print(result.stdout, flush=True)
    if result.returncode:
        for path in re.findall(r'(/home/runner/\.npm/_logs/[^\s]+\.log)', result.stdout):
            source = Path(path)
            if source.is_file():
                (REPORT / (filename + '.debug.txt')).write_bytes(source.read_bytes())
    return result


# This affects only this disposable CI worker, not the website or user machine.
result = run(['npm', 'install', '--global', 'npm@11', '--ignore-scripts'], 'npm-upgrade.log')
if result.returncode:
    raise SystemExit(result.returncode)
run(['npm', '--version'], 'npm-version.txt').check_returncode()
command = ['npm', 'install', '--package-lock-only', '--ignore-scripts']
result = run(command, 'resolve.log')
if result.returncode and "reading 'edgesOut'" in result.stdout:
    print('Retrying with a fresh lockfile only in this disposable runner; original archived.', flush=True)
    lock.unlink(missing_ok=True)
    result = run(command, 'resolve-fresh-lock.log')
if result.returncode:
    raise SystemExit(result.returncode)

result = run(['npm', 'audit', 'fix', '--package-lock-only', '--ignore-scripts'], 'audit-fix.log')
# Remaining advisories produce exit 1. The separate audit gate requires a
# valid report with zero advisories before any package changes can be saved.
if result.returncode not in (0, 1):
    raise SystemExit(result.returncode)
assert json.loads(manifest.read_text()) == expected, 'Unexpected package.json change'
changed = set(subprocess.check_output(['git', 'diff', '--name-only'], cwd=ROOT, text=True).splitlines())
assert changed <= {'package.json', 'package-lock.json'}, changed
subprocess.run(['git', 'diff', '--check'], cwd=ROOT, check=True)
print('Only the approved direct versions and resolved dependency lock changed.')
