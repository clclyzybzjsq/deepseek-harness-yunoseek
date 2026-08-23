/**
 * Yunoseek pink skin as one `ThemeRuntime.overrideTokens` layer: every entry
 * carries both palette modes (repeat the value when scheme-invariant) so the
 * skin stays legible whichever base palette is active. Values follow the
 * yunoseek chat UI's light palette (white surfaces, `#E91E8C` primary,
 * `#FF6B9D` gradient end) and its dark palette (`#0D0D0D` surfaces,
 * `#FF6B9D` primary), like its `prefers-color-scheme` blocks.
 *
 * The alias layer restyles every DSH surface through the semantic tokens;
 * the `--dsw-static-deepseek-*` scale is remapped to pink hues because a few
 * brand components (the chat turn-status shimmer, sidebar rails) read the
 * static scale directly and would otherwise stay blue.
 */

/** One token's per-scheme values (the runtime's ThemeTokenModes shape). */
interface TokenModes {
  /** Value while the light base palette is active. */
  readonly light: string
  /** Value while the dark base palette is active. */
  readonly dark: string
}

/** Token name → per-scheme pair; structurally ThemeTokenOverrides. */
export type YunoseekTokenLayer = Record<string, TokenModes>

/** Source identity of the token layer (the façade pins it for inspection). */
export const THEME_LAYER_SOURCE = 'dsh-yunoseek-skin'

const PINK_STATIC: Record<string, TokenModes> = {
  '--dsw-static-deepseek-50': { light: '#FFF0F5', dark: '#2A1A22' },
  '--dsw-static-deepseek-100': { light: '#FFE3F0', dark: '#33202A' },
  '--dsw-static-deepseek-200': { light: '#FFC9E6', dark: '#3D2532' },
  '--dsw-static-deepseek-300': { light: '#FFAAD9', dark: '#4A2E3C' },
  '--dsw-static-deepseek-400': { light: '#FF6FA8', dark: '#FF8AB3' },
  '--dsw-static-deepseek-450': { light: '#F74FA0', dark: '#FF7FA8' },
  '--dsw-static-deepseek-500': { light: '#E91E8C', dark: '#FF6B9D' },
  '--dsw-static-deepseek-600': { light: '#D4187E', dark: '#FF85AF' },
  '--dsw-static-deepseek-700-delete': { light: '#B0126C', dark: '#C8658F' },
  '--dsw-static-deepseek-800': { light: '#8C0F54', dark: '#9A5874' },
  '--dsw-static-deepseek-900': { light: '#5C0836', dark: '#6E3D55' },
}

const PINK_ALIASES: Record<string, TokenModes> = {
  '--dsw-alias-brand-primary': { light: '#E91E8C', dark: '#FF6B9D' },
  '--dsw-alias-brand-primary-invert': { light: '#FFFFFF', dark: '#FFFFFF' },
  '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#E91E8C', dark: '#FF6B9D' },
  '--dsw-alias-brand-text': { light: '#E91E8C', dark: '#FF9DBB' },

  '--dsw-alias-button-primary-fill': { light: '#E91E8C', dark: '#FF6B9D' },
  '--dsw-alias-button-primary-hover': { light: '#D4187E', dark: '#FF85AF' },
  '--dsw-alias-button-primary-dimmed': { light: '#FFE3F0', dark: '#3D2532' },
  '--dsw-alias-button-info-fill': { light: '#E91E8C', dark: '#FF6B9D' },
  '--dsw-alias-button-info-hover': { light: '#D4187E', dark: '#FF85AF' },
  '--dsw-alias-button-floating-fill': { light: '#FFFFFF', dark: '#1F1F1F' },
  '--dsw-alias-button-floating-hover': { light: '#F5F5F7', dark: '#2A2A2A' },
  '--dsw-alias-button-elevated-fill': { light: '#FFFFFF', dark: '#1F1F1F' },
  '--dsw-alias-button-contrast-fill': { light: '#4A4A4A', dark: '#E4E4E7' },

  '--dsw-alias-label-primary': { light: '#1A1A1A', dark: '#E4E4E7' },
  '--dsw-alias-label-secondary': { light: '#555555', dark: '#9E9E9E' },
  '--dsw-alias-label-tertiary': { light: '#888888', dark: '#6D6D6D' },
  '--dsw-alias-label-caption': { light: '#888888', dark: '#6D6D6D' },
  '--dsw-alias-label-dimmed': { light: '#C0C0C2', dark: '#4A4A4A' },
  '--dsw-alias-label-primary-bluish': { light: '#1A1A1A', dark: '#E4E4E7' },
  '--dsw-alias-label-primary-dimmed': { light: '#262626', dark: '#B4B4B6' },
  '--dsw-alias-label-primary-foreground': { light: '#FFFFFF', dark: '#FFFFFF' },
  '--dsw-alias-label-primary-inverted': { light: '#FFFFFF', dark: '#FFFFFF' },

  '--dsw-alias-bg-base': { light: '#FFFFFF', dark: '#0D0D0D' },
  '--dsw-alias-bg-layer-1': { light: '#FFFFFF', dark: '#141414' },
  '--dsw-alias-bg-layer-2': { light: '#F5F5F7', dark: '#1A1A1A' },
  '--dsw-alias-bg-layer-3': { light: '#F5F5F7', dark: '#222222' },
  '--dsw-alias-bg-overlay': { light: '#FFFFFF', dark: '#2A2A2A' },
  '--dsw-alias-bg-module-platform': { light: '#F5F5F7', dark: '#1A1A1A' },
  '--dsw-alias-bg-multi-select': { light: '#F8F6F7', dark: '#141414' },
  '--dsw-alias-bg-skeleton': { light: 'rgba(233, 30, 140, 0.06)', dark: 'rgba(255, 107, 157, 0.08)' },
  '--dsw-alias-bg-mask-drop': { light: 'rgba(255, 255, 255, 0.7)', dark: 'rgba(45, 45, 54, 0.7)' },

  '--dsw-alias-border-l1': { light: 'rgba(233, 30, 140, 0.08)', dark: 'rgba(255, 107, 157, 0.16)' },
  '--dsw-alias-border-l2': { light: 'rgba(233, 30, 140, 0.14)', dark: 'rgba(255, 107, 157, 0.22)' },
  '--dsw-alias-border-l2-darkmode-thin': { light: 'rgba(233, 30, 140, 0.14)', dark: 'rgba(255, 107, 157, 0.22)' },
  '--dsw-alias-border-l3': { light: 'rgba(233, 30, 140, 0.18)', dark: 'rgba(255, 107, 157, 0.28)' },
  '--dsw-alias-border-l4': { light: 'rgba(233, 30, 140, 0.24)', dark: 'rgba(255, 107, 157, 0.34)' },
  '--dsw-alias-border-inverted': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(255, 107, 157, 0.18)' },
  '--dsw-alias-border-inverted2': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(255, 107, 157, 0.22)' },

  '--dsw-alias-interactive-bg-hover': { light: 'rgba(233, 30, 140, 0.06)', dark: 'rgba(255, 107, 157, 0.10)' },
  '--dsw-alias-interactive-bg-active': { light: 'rgba(233, 30, 140, 0.12)', dark: 'rgba(255, 107, 157, 0.18)' },
  '--dsw-alias-interactive-bg-hover-accent': { light: 'rgba(233, 30, 140, 0.16)', dark: 'rgba(255, 107, 157, 0.24)' },
  '--dsw-alias-interactive-bg-hover-solid': { light: '#F5F5F7', dark: '#2A2A2A' },

  '--dsw-alias-markdown-inline-code': { light: '#FFF0F5', dark: '#33202A' },
  '--dsw-alias-markdown-code-block': { light: '#F5F5F7', dark: '#1A1A1A' },
  '--dsw-alias-markdown-code-block-banner': { light: '#F1F0F3', dark: '#141414' },
  '--dsw-alias-markdown-code-segment-selected': { light: '#FFFFFF', dark: '#2A1A22' },
  '--dsw-alias-markdown-code-segment-unselected': { light: '#F5F5F7', dark: '#1A1A1A' },
  '--dsw-alias-markdown-citation': { light: '#FFE3F0', dark: '#33202A' },
  '--dsw-alias-markdown-tag': { light: '#FFE3F0', dark: '#3D2532' },
  '--dsw-alias-markdown-placeholder': { light: '#F8F6F7', dark: '#141414' },

  '--dsw-alias-state-business-primary': { light: '#E91E8C', dark: '#FF6B9D' },
  '--dsw-alias-state-business-tertiary': { light: '#FFE3F0', dark: '#3D2532' },

  '--dsw-specific-bubble': { light: '#F5F5F7', dark: '#1A1A1A' },
  '--dsw-specific-bubble-highlight': { light: '#FFE3F0', dark: '#3D2532' },
  '--dsw-specific-input-major': { light: '#FFFFFF', dark: '#0D0D0D' },
  '--dsw-specific-login-input': { light: '#F8F6F7', dark: '#1A1A1A' },
  '--dsw-specific-selector': { light: '#F5F5F7', dark: '#2A2A2A' },
  '--dsw-specific-sidebar-fill': { light: '#F5F5F7', dark: '#1A1A1A' },
  '--dsw-specific-sidebar-nav-item-active-accent': { light: '#FFC9E6', dark: '#4A2E3C' },
  '--dsw-specific-sidebar-nav-item-active': { light: '#FFE3F0', dark: '#3D2532' },
  '--dsw-specific-sidebar-nav-item-hover': { light: '#F8E8F0', dark: '#2A1A22' },
  '--dsw-specific-tip': { light: '#FFF5F9', dark: '#2A1A22' },
  '--dsw-specific-menu': { light: '#FFFFFF', dark: '#2A2A2A' },
}

/**
 * The complete override layer, keyed like the runtime's ThemeTokenOverrides.
 * Registration order is irrelevant (per-token composition); the tables are
 * split only to keep the static-scale remap distinct from the alias skin.
 */
export const YUNOSEEK_THEME_LAYER: YunoseekTokenLayer = {
  ...PINK_STATIC,
  ...PINK_ALIASES,
}
