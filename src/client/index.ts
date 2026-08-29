/**
 * Yunoseek pink-skin plugin, browser half: one always-on token override layer
 * (both palettes, per yunoseek's light/dark practice), the art-direction
 * sheet, and the yunoseek brand occupants (sidebar mark/name, hero mark).
 * Reuses the DSH slot system and `--dsw-*` theme layer — no host component
 * is modified.
 *
 * Brand seats are filled only in non-`official` builds. Official compositions
 * already contain ui-brand-official, which owns the same single-occupant
 * slots; the tsdown config pins the build profile (see tsdown.config.mjs —
 * default "official", set DSH_CLIENT_BUILD_PROFILE=dev to enable the marks).
 *
 * v0.3.0 (dsh v0.1.2-alpha.1): the client-runtime package is gone; `slots`
 * comes from the ui-renderer Context merge, so the renderer/ui-slots type
 * imports below are required for `ctx.slots` to type-check.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Type-only: pulls the ui-theme Context merge (`ctx.theme`), the ui-renderer
// `slots` merge, and the sidebar/conversation SlotMap merges behind the brand
// slot declarations.
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { THEME_LAYER_SOURCE, YUNOSEEK_THEME_LAYER } from './theme.ts'
import { installYunoseekStyles } from './styles.ts'
import { installStatusLabelOverride } from './statusLabel.ts'
import { YunoseekHeroMark, YunoseekSidebarMark, YunoseekSidebarName } from './Brand.tsx'

/** Required services: the UI slot registry and the theme runtime. */
export const inject = ['slots', 'theme']

/**
 * Client plugin body: install the sheets, stack the pink token layer, and
 * fill the brand seats as one declaration-aware registration set.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  installYunoseekStyles(ctx)
  ctx.effect(
    () => ctx.theme.overrideTokens(THEME_LAYER_SOURCE, YUNOSEEK_THEME_LAYER),
    'dsh-yunoseek-skin: pink token layer',
  )
  ctx.effect(
    () => installStatusLabelOverride(),
    'dsh-yunoseek-skin: status label override',
  )
  if (process.env.DSH_CLIENT_BUILD_PROFILE === 'official') return
  ctx.slots.inject('sidebar.brand.mark', () =>
    ctx.slots.inject('sidebar.brand.name', () =>
      ctx.slots.inject('conversation.hero.brand.mark', function* () {
        yield ctx.slots.register({ name: 'sidebar.brand.mark' }, YunoseekSidebarMark)
        yield ctx.slots.register({ name: 'sidebar.brand.name' }, YunoseekSidebarName)
        yield ctx.slots.register({ name: 'conversation.hero.brand.mark' }, YunoseekHeroMark)
      })))
}