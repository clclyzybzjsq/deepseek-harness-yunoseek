/**
 * Yunoseek art-direction sheet installer. Token values already restyle every
 * surface; this sheet carries the two rules only an actual stylesheet can
 * express: the pink Hero glow (the glow fill is a literal in ui-conversation's
 * HeroGlow SVG) and the assistant avatar (injected into the chat flow rows via
 * their stable `data-chat-flow-kind` attribute — the CSS Modules class names
 * of the host rows are hashed and not addressable cross-package).
 */
import type { Context } from '@deepseek-ai/cordis'
import { ASSISTANT_AVATAR_DATA_URL } from './artwork.ts'

const PLUGIN_ID = 'dsh-yunoseek-skin'

/** Mounted sheet identity, mirrored by the tsdown CSS injector naming. */
const SHEET_NAME = `${PLUGIN_ID}/yunoseek.css`

/**
 * Build the art-direction sheet text. The avatar rule interpolates the
 * data URL (the plugin interface ships no static assets).
 * @returns the complete stylesheet text.
 */
export function yunoseekStylesheet(): string {
  return `
[data-phase="hero"] svg ellipse {
  fill: #FF6FA8;
}
body[data-ds-dark-theme] [data-phase="hero"] svg ellipse {
  fill: #FF8AB3;
}
[data-chat-flow-kind="assistant-step"] {
  position: relative;
  padding-left: 46px;
}
[data-chat-flow-kind="assistant-step"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: url("${ASSISTANT_AVATAR_DATA_URL}") center / cover no-repeat;
  box-shadow: 0 2px 10px rgba(233, 30, 140, 0.25);
}
`
}

/**
 * Mount the sheet for exactly the owning plugin lifetime.
 * @param ctx - owning plugin context.
 */
export function installYunoseekStyles(ctx: Context): void {
  if (typeof document === 'undefined') return
  const css = yunoseekStylesheet()
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = PLUGIN_ID
    tag.dataset.pluginCss = SHEET_NAME
    tag.textContent = css
    document.head.appendChild(tag)
    return () => { tag.remove() }
  }, 'dsh-yunoseek-skin: art-direction stylesheet')
}