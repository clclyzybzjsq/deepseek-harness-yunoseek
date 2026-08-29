# dsh-yunoseek-skin

Yunoseek pink skin for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web GUI. It restyles the DSH browser UI with the pink art direction of the yunoseek chat UI (`#E91E8C` / `#FF6B9D` gradients, pink tints) while reusing every DSH layout and component unchanged, through the standard client-plugin interfaces:

- **Pink token layer** â€?a theme `overrideTokens` layer over the `--dsw-*` semantic tokens and the `--dsw-static-deepseek-*` scale, every token carrying explicit light and dark values from yunoseek's two palettes. The skin is always on and follows the user's light/dark/system preference; no settings change needed.
- **Art direction sheet** â€?the pink Hero glow recolor per palette, and the **assistant avatar** painted into every chat assistant row via its stable `data-chat-flow-kind` attribute (the host's CSS Modules class names are hashed and not addressable cross-package).
- **Brand marks** (non-`official` builds only) â€?the yunoseek logo in the sidebar brand row, the gradient "Yunoseek" wordmark, and the welcome artwork in the conversation Hero seat. Official DeepSeek Harness compositions already own those single-occupant slots with the built-in brand, so the skin yields them by default (see "Build profile" below).
- **Yunoseek identity prompt** â€?the node half registers the yunoseek system prompt (`assets/system-prompt.js`) as the first system-prompt section, so every assembled system prompt starts with the Yunoseek persona.

In short: pink everywhere, yunoseek artwork, the Yunoseek identity, no host component modified, no yunoseek business features (player, minigames, mode pills, modals).

## Yunoseek identity prompt

Beyond the visuals, the plugin injects the yunoseek identity prompt into the model. Its node half registers a `systemPrompt` section named `yunoseek:identity` with order `-200`, which renders **before** the harness identity (`-100`) and the deployment persona (`0`) â€?the very first text the model reads for every turn. The default text is the yunoseek system prompt from `assets/system-prompt.js`, embedded at build time.

The injection is on by default and applies globally to every agent in the profile (the section lives in the prompt registry's global layer). To disable it or replace the text, override the row from your profile patch (`$DSH_HOME/profiles/web/cordis.patch.yml`) â€?a later layer that replaces the row's `config` value:

```yaml
- id: yunoseek-skin
  config:
    enabled: false        # skin only, no prompt injection
```

```yaml
- id: yunoseek-skin
  config:
    prompt: |
      # My own identity
      ...                   # custom prompt text
```

Config is read at boot, so restart `dsh web` after changing it. The section text is static: it carries no `{{variable}}` references â€?a custom prompt containing `{{â€¦}}` fails prompt assembly on purpose (fail loud keeps a malformed prompt out of the model request).

## Install

Requirements: a dsh installation (the `dsh` CLI) and a web profile â€?the default GUI profile is named `web`.

### From GitHub

```sh
dsh plugin --profile web add github:<owner>/dsh-yunoseek-skin
```

A git install fetches sources, not built artifacts, so pnpm runs the package's `prepare` script to build `lib/`. pnpm â‰?10 refuses to run a git dependency's `prepare` until explicitly allowed â€?the first `add` fails and dsh prints the exact package key; copy it into the profile's `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  dsh-yunoseek-skin: true
```

then re-run the `add`. (That allowance is permission to execute the package's code at install time; only allow packages whose source you trust, and pin a commit: `github:<owner>/dsh-yunoseek-skin#<sha>`.) Then (re)start your `dsh web` once so the new roster row composes; later code changes to the skin hot-reload through the web HMR chain.

### From npm or a tarball

Prebuilt options need no build allowance:

```sh
dsh plugin --profile web add dsh-yunoseek-skin        # npm, lib/ built at publish time
dsh plugin --profile web add ./dsh-yunoseek-skin-0.3.0.tgz   # pnpm pack
```

### Uninstall

```sh
dsh plugin --profile web remove dsh-yunoseek-skin
```

## Build profile and the brand seats

The tsdown config pins `DSH_CLIENT_BUILD_PROFILE` (default `official`). In an `official` build the skin applies the token layer, avatar sheet, and Hero glow **only** â€?official web compositions contain the built-in deepseek brand, which owns the `sidebar.brand.mark` / `sidebar.brand.name` / `conversation.hero.brand.mark` seats and must not collide. To show the yunoseek marks instead (e.g. a dev/self-built web, or after disabling the built-in brand row), build with:

```sh
DSH_CLIENT_BUILD_PROFILE=dev pnpm install   # rebuilds lib/ with brand marks on
```

and, when your composition still carries the built-in brand row, disable it in the profile patch (`$DSH_HOME/profiles/web/cordis.patch.yml`):

```yaml
- id: ui-brand-official
  disabled: true
```

## Build

```sh
pnpm install    # installs tsdown and runs prepare, emitting lib/
```

The `prepare` script is self-contained (docs/user/develop/basic/publish.md): it builds from `src/` with a dedicated tsdown config â€?no monorepo context, no project references, no typechecking. Outputs: `lib/index.js` (ESM node half) and `lib/client.js` (CJS browser half).

## Distribution

This is a standard dsh bundle: `package.json` declares `dsh.bundle` (patch `cordis.patch.yml`, which inserts the `yunoseek-skin` row) and `dsh.client` (`platform: "web"`, informational `inject` edges). To publish: create a repository under your GitHub account, push this directory, and users install with `dsh plugin --profile web add github:<owner>/dsh-yunoseek-skin`; or `npm publish` with `lib/` built, or ship `pnpm pack` tarballs.

## Known limitations

- The identity prompt is global and forward-most: a later layer that registers a `complete: true` system-prompt section replaces the whole prompt for an agent, and the injected text disappears there (the registry's documented complete-section behavior).
- Custom prompt text must not contain `{{â€¦}}` â€?prompt variables render strictly and an unknown reference fails assembly.
- The assistant avatar is painted into chat rows by selector: `[data-chat-flow-kind="assistant-step"]::before` with a fixed 34px geometry. If ui-conversation changes that attribute or row geometry, the rule (in `src/client/styles.ts`) needs a revisit.
- The sidebar and Hero marks are skipped in `official` builds by design (single-occupant brand slots); see above for the dev-profile path.
- The Hero glow rule targets `[data-phase="hero"] svg ellipse`; a future Hero redesign may move the glow out of an SVG ellipse.

## License

MIT