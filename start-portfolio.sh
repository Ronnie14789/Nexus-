#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"

command -v node >/dev/null 2>&1 || {
  echo "Node.js 20 LTS or newer is required."
  exit 1
}

npm config set registry https://registry.npmjs.org/
[ -d node_modules ] || npm install --registry=https://registry.npmjs.org/
[ -d frontend/node_modules ] || npm install --prefix frontend --registry=https://registry.npmjs.org/
[ -d backend/node_modules ] || npm install --prefix backend --registry=https://registry.npmjs.org/

npm run build
(node scripts/open-browser.mjs >/dev/null 2>&1 &)
npm run start:full
