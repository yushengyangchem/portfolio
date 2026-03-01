#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT_DIR/content/portfolio"

render_file() {
  local src="$1"
  local out="$2"
  local base
  base="$(dirname "$src")"

  : >"$out"
  while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" =~ ^[[:space:]]*\<\!\-\-[[:space:]]*@include[[:space:]]+([^[:space:]]+)[[:space:]]*\-\-\>[[:space:]]*$ ]]; then
      local inc="${BASH_REMATCH[1]}"
      local inc_path="$base/$inc"
      if [[ ! -f "$inc_path" ]]; then
        echo "Missing include: $inc_path" >&2
        exit 1
      fi
      cat "$inc_path" >>"$out"
      printf '\n' >>"$out"
    else
      printf '%s\n' "$line" >>"$out"
    fi
  done <"$src"
}

render_file "$SRC_DIR/portfolio-zh.src.html" "$ROOT_DIR/portfolio-zh.html"
render_file "$SRC_DIR/portfolio-en.src.html" "$ROOT_DIR/portfolio-en.html"

echo "Generated portfolio-zh.html and portfolio-en.html"
