#!/usr/bin/env python3
"""Prepare package-only changes in an ephemeral review runner, never production.

The original lockfile is preserved in the artifact and Git. A resolver retry
may regenerate the lockfile only for npm's observed edgesOut internal error.
No --force or --legacy-peer-deps is used. CI must validate the resulting lock.
"""
from __future__ import annotations

import json
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
    return result


command = ['npm', 'install', '--package-lock-only', '--ignore-scripts']
result = run(command, 'resolve.log')
if result.returncode and "reading 'edgesOut'" in result.stdout:
    print('Retrying npm with a fresh lockfile in this disposable runner; original archived.')
    lock.unlink(missing_ok=True)
    result = run(command, 'resolve-fresh-lock.log')
if result.returncode:
    raise SystemExit(result.returncode)

result = run(['npm', 'audit', 'fix', '--package-lock-only', '--ignore-scripts'],
             'audit-fix.log')
# npm audit fix can return 1 for remaining advisories. The separate audit gate
# must see a valid report with zero advisories; this is not an ignored finding.
if result.returncode not in (0, 1):
    raise SystemExit(result.returncode)
after = json.loads(manifest.read_text())
assert after == expected, 'Unexpected package.json change; stop for review'
changed = set(subprocess.check_output(['git', 'diff', '--name-only'],
                                    cwd=ROOT, text=True).splitlines())
assert changed <= {'package.json', 'package-lock.json'}, changed
subprocess.run(['git', 'diff', '--check'], cwd=ROOT, check=True)
print('Only the three approved direct versions and resolved dependency lock changed.')
