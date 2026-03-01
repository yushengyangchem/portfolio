# Portfolio bilingual maintenance

Source files are maintained under `content/portfolio/` and generated to:

- `portfolio-zh.html`
- `portfolio-en.html`

## Source structure

- `content/portfolio/portfolio-zh.src.html`: Chinese source page
- `content/portfolio/portfolio-en.src.html`: English source page
- `content/portfolio/shared/papers-list.html`: shared publications list (used by both pages)
- `content/portfolio/zh/patents-list.html`: Chinese patents list

## Include syntax

Inside `*.src.html`, use:

`<!-- @include relative/path.html -->`

The path is resolved relative to `content/portfolio/`.

## Build

```bash
./scripts/build-portfolios.sh
```

This regenerates both portfolio pages from source files.
