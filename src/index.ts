/**
 * Node half of the dsh-yunoseek-skin bundle.
 *
 * The browser half (./client) restyles the Web GUI; this half contributes the
 * plugin's single model-facing feature: the yunoseek identity prompt,
 * registered as the first system-prompt section (order -200, ahead of the
 * harness identity at -100) so every assembled system prompt starts with the
 * Yunoseek persona. The host's `@deepseek-ai/dsh-system-prompt` registry
 * supplies the section slot through the injected `systemPrompt` service;
 * nothing is imported at runtime (all `@deepseek-ai/*` references are
 * type-only and erased before resolution), so the built module stays
 * dependency-free for the profile Loader.
 */
import type { Context } from '@deepseek-ai/cordis'
import { YUNOSEEK_SYSTEM_PROMPT } from './prompt.ts'

/** Cordis plugin name; the profile row references it by its package name. */
export const name = 'dsh-yunoseek-skin'

/** Section order: render before the harness identity (`-100`). */
export const YUNOSEEK_SECTION_ORDER = -200

/** Section name in the prompt registry's global layer (unique per layer). */
export const YUNOSEEK_SECTION = 'yunoseek:identity'

/** Plugin config from the profile row's `config` value. */
export interface Config {
  /** Set false to keep the skin without injecting the identity prompt. */
  enabled?: boolean
  /** Custom prompt text; defaults to the embedded yunoseek system prompt. */
  prompt?: string
}

/**
 * Register the yunoseek identity section once the prompt registry is ready.
 * The section registers on the injected child fiber, so it disposes with the
 * plugin context on reload.
 * @param ctx - the profile row's context.
 * @param config - validation-free row config; both keys default.
 */
export function apply(ctx: Context, config: Config = {}): void {
  if (config.enabled === false) return
  ctx.inject(['systemPrompt'], (promptCtx) => {
    promptCtx.systemPrompt.section({
      name: YUNOSEEK_SECTION,
      order: YUNOSEEK_SECTION_ORDER,
      text: config.prompt ?? YUNOSEEK_SYSTEM_PROMPT,
    })
  })
}