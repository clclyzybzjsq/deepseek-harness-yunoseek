/**
 * Self-contained build for the dsh-yunoseek-skin bundle.
 *
 * Follows docs/user/develop/basic/publish.md "Installing from GitHub: the
 * build-script catch": the `prepare` script must build the published entry
 * points from source without any dev-only context — no project references, no
 * type checking, no monorepo checkout. Two artifacts:
 *
 *   lib/index.js   — ESM node half; the profile Loader resolves the package
 *                    `main` for the row.
 *   lib/client.js  — CJS browser half the web modules node serves. React stays
 *                    a bare import (the web shell seeds it through the module
 *                    table); every other runtime dependency inlines.
 *
 * All `@deepseek-ai/*` imports in this package are type-only and erased before
 * resolution, so no module-table request needs declaring here.
 *
 * Build profile: DSH_CLIENT_BUILD_PROFILE defaults to "official", matching the
 * shipped product build — the skin then skips the single-occupant brand slots
 * (ui-brand-official owns them in official compositions) and only the token
 * layer, avatar sheet, and Hero glow apply. For a composition without a brand
 * occupant (self-built/dev web, or one where the built-in brand row is
 * disabled), build with `DSH_CLIENT_BUILD_PROFILE=dev` to also fill the
 * sidebar and Hero brand seats with the yunoseek artwork.
 */
const BUILD_PROFILE = process.env.DSH_CLIENT_BUILD_PROFILE ?? 'official'

/** Plugin id the client bundle must register under (the loader's entry id). */
const PLUGIN_ID = 'dsh-yunoseek-skin'

/** Specifiers the web host provides through its module table (shell-seeded React). */
const hostProvided = (specifier) =>
  specifier === 'react' || specifier === 'react/jsx-runtime' || specifier === 'react/jsx-dev-runtime'

/** @type {import('tsdown').UserConfig[]} */
export default [
  {
    name: 'dsh-yunoseek-skin',
    entry: { index: 'src/index.ts' },
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2024',
    // type: "module" package — keep the familiar lib/index.js name.
    fixedExtension: false,
    dts: false,
    clean: false,
  },
  {
    name: 'dsh-yunoseek-skin/client',
    entry: { client: 'src/client/index.ts' },
    outDir: 'lib',
    format: ['cjs'],
    platform: 'browser',
    target: 'es2024',
    dts: false,
    clean: false,
    sourcemap: true,
    deps: {
      neverBundle: hostProvided,
      alwaysBundle: (specifier) => !hostProvided(specifier),
    },
    define: {
      'process.env.DSH_CLIENT_BUILD_PROFILE': JSON.stringify(BUILD_PROFILE),
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    outputOptions: {
      entryFileNames: 'client.js',
      // Client-modules bundle contract (mirrors packages/client/tsdown.client.ts):
      // executing the script must only REGISTER the factory via
      // window.__ModuleLoader__.load({ id, factory }); the module body — with
      // every require() against the injected module-table require — runs later,
      // at factory materialization. Without this wrapper the top-level body
      // would execute at script load (a bare require() the browser cannot
      // answer) and the loader rejects the bundle as unregistered.
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  },
]