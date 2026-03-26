---
name: Bun
description: Use when building, running, testing, or bundling JavaScript/TypeScript applications. Reach for Bun when you need to execute code, manage dependencies, run tests, or bundle projects — it's a complete replacement for Node.js, npm, and build tools.
metadata:
    mintlify-proj: bun
    version: "1.0"
---

# Bun Skill

## Product Summary

Bun is an all-in-one JavaScript/TypeScript runtime and toolkit written in Zig. It ships as a single binary and includes a runtime (drop-in Node.js replacement), package manager, test runner, and bundler. Use `bun run` to execute files, `bun install` to manage dependencies, `bun test` to run tests, and `bun build` to bundle code. The primary documentation is at https://bun.com/docs.

**Key files and commands:**
- `bunfig.toml` — Configuration file (optional, zero-config by default)
- `bun run <file>` — Execute JavaScript/TypeScript files with native transpilation
- `bun install` — Install dependencies (25x faster than npm)
- `bun test` — Run Jest-compatible tests
- `bun build` — Bundle for browsers, servers, or executables
- `package.json` — Standard Node.js project file (fully compatible)

## When to Use

Reach for this skill when:

- **Running code**: Executing `.ts`, `.tsx`, `.js`, `.jsx` files directly without compilation steps
- **Starting servers**: Building HTTP servers with `Bun.serve()` or frameworks like Express, Elysia, Hono
- **Managing packages**: Installing, adding, removing, or auditing npm dependencies
- **Testing**: Writing and running Jest-compatible tests with TypeScript support
- **Bundling**: Creating optimized bundles for browsers, Node.js, or standalone executables
- **Migrating from Node.js**: Dropping Bun into existing Node.js projects with minimal changes
- **Full-stack development**: Building server and client code in a single project with HTML imports
- **Development workflows**: Using watch mode, hot reloading, or REPL for interactive development

## Quick Reference

### Essential Commands

| Task | Command |
|------|---------|
| Run a file | `bun run index.ts` or `bun index.ts` |
| Run a script | `bun run dev` (from package.json) |
| Install dependencies | `bun install` |
| Add a package | `bun add react` or `bun add -d typescript` |
| Remove a package | `bun remove react` |
| Run tests | `bun test` |
| Watch mode | `bun --watch run index.ts` or `bun test --watch` |
| Build a bundle | `bun build ./index.ts --outdir ./dist` |
| Create a project | `bun init my-app` |

### File Type Support (No Configuration Needed)

| Extension | Behavior |
|-----------|----------|
| `.ts`, `.tsx` | TypeScript + JSX, transpiled on-the-fly |
| `.js`, `.jsx` | JavaScript + JSX, transpiled on-the-fly |
| `.json`, `.toml`, `.yaml` | Parsed and inlined at build time or runtime |
| `.html` | Full-stack bundling with asset processing |
| `.css` | Bundled and optimized |

### Configuration Locations

- **Local**: `./bunfig.toml` (project root)
- **Global**: `$HOME/.bunfig.toml` or `$XDG_CONFIG_HOME/.bunfig.toml`
- **Merging**: Local overrides global; CLI flags override both

### Common bunfig.toml Sections

```toml
[install]
linker = "hoisted"  # or "isolated" for pnpm-like behavior
optional = true
dev = true
production = false

[test]
root = "."
coverage = false
timeout = 5000

[run]
shell = "system"  # or "bun" on Windows
bun = true        # auto-alias node to bun

[define]
"process.env.DEBUG" = "'true'"
```

## Decision Guidance

### When to Use X vs Y

| Scenario | Use | Why |
|----------|-----|-----|
| **Linker strategy** | `hoisted` | Traditional npm behavior, existing projects |
| | `isolated` | New workspaces, strict dependency isolation |
| **Package manager** | `bun install` | 25x faster, same API as npm |
| | `npm install` | Only if Bun not available |
| **Test runner** | `bun test` | Jest-compatible, TypeScript native, fast |
| | `jest` | Only if Bun incompatible |
| **Bundler** | `bun build` | Native, fast, handles full-stack apps |
| | `esbuild` | Only if Bun not available |
| **Runtime** | `bun run` | 4x faster startup than Node.js |
| | `node` | Only if Bun not available |
| **Server** | `Bun.serve()` | Native, high-performance, built-in routing |
| | Express/Hono | When you need framework features |

## Workflow

### 1. Initialize a Project

```bash
bun init my-app
cd my-app
```

This creates `package.json`, `tsconfig.json`, `bunfig.toml`, and a starter `index.ts`.

### 2. Install Dependencies

```bash
bun install
bun add react
bun add -d @types/react
```

Bun reads `package.json`, resolves dependencies, and creates `bun.lock` (text-based lockfile).

### 3. Write and Run Code

Create `index.ts`:
```typescript
const server = Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Hello!"),
  },
});
console.log(`Listening on ${server.url}`);
```

Run it:
```bash
bun run index.ts
# or
bun index.ts
```

### 4. Add Scripts to package.json

```json
{
  "scripts": {
    "dev": "bun --watch run index.ts",
    "build": "bun build ./index.ts --outdir ./dist",
    "test": "bun test"
  }
}
```

Run with:
```bash
bun run dev
bun run build
bun run test
```

### 5. Write Tests

Create `math.test.ts`:
```typescript
import { test, expect } from "bun:test";

test("2 + 2 = 4", () => {
  expect(2 + 2).toBe(4);
});
```

Run tests:
```bash
bun test
bun test --watch
bun test --coverage
```

### 6. Bundle for Production

```bash
bun build ./index.ts --outdir ./dist --minify
```

For executables:
```bash
bun build ./cli.ts --outfile ./mycli --compile
./mycli
```

### 7. Verify Before Shipping

- Run tests: `bun test`
- Check types: `bun run tsc --noEmit` (if using TypeScript)
- Build: `bun build ./index.ts --outdir ./dist`
- Test the build: `node ./dist/index.js`

## Common Gotchas

- **Node.js compatibility is not 100%**: Check [runtime/nodejs-compat](/runtime/nodejs-compat) for unsupported APIs. Most popular packages work fine.
- **Lifecycle scripts are disabled by default**: Add packages to `trustedDependencies` in `package.json` to allow postinstall scripts.
- **Auto-install can mask missing dependencies**: Disable with `[install] auto = "disable"` in `bunfig.toml` to catch missing packages early.
- **Bun flags go after `bun`, not after the script**: Use `bun --watch run dev`, not `bun run dev --watch`.
- **Test files must match patterns**: Only `*.test.ts`, `*_test.ts`, `*.spec.ts`, `*_spec.ts` are discovered automatically.
- **Lockfile format changed**: Bun v1.2+ uses text-based `bun.lock` instead of binary `bun.lockb`. Upgrade with `bun install --save-text-lockfile`.
- **Isolated installs can break some packages**: If you hit phantom dependency issues, switch to `linker = "hoisted"` in `bunfig.toml`.
- **Environment variables in bunfig.toml**: Use `$VAR_NAME` syntax; Bun loads `.env`, `.env.local`, `.env.[NODE_ENV]` automatically.
- **Bundler is not a type checker**: Use `tsc --noEmit` separately for type checking; `bun build` only transpiles.
- **HTML imports only work with `bun build --target=bun` or `bun --hot`**: They don't work with `bun run` directly.

## Verification Checklist

Before submitting work with Bun:

- [ ] Code runs without errors: `bun run index.ts`
- [ ] All tests pass: `bun test`
- [ ] No TypeScript errors (if applicable): `bun run tsc --noEmit`
- [ ] Dependencies are installed: `bun install` completes without errors
- [ ] Lockfile is committed: `bun.lock` is in version control
- [ ] Build succeeds: `bun build ./index.ts --outdir ./dist` completes
- [ ] No deprecated patterns used (check for Node.js-only APIs)
- [ ] bunfig.toml is valid TOML (if present)
- [ ] package.json scripts are correct and tested
- [ ] Watch mode works for development: `bun --watch run dev`

## Resources

- **Comprehensive navigation**: https://bun.com/docs/llms.txt — Full page-by-page listing for agent navigation
- **Runtime API**: https://bun.com/docs/runtime — File I/O, HTTP, networking, workers, environment variables
- **Package Manager**: https://bun.com/docs/pm/cli/install — Install, add, remove, workspaces, registries
- **Bundler**: https://bun.com/docs/bundler — Build, splitting, plugins, executables, optimization
- **Test Runner**: https://bun.com/docs/test — Writing tests, mocks, snapshots, coverage, watch mode

---

> For additional documentation and navigation, see: https://bun.com/docs/llms.txt