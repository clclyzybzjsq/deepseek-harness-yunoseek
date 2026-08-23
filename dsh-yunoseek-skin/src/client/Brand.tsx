/**
 * Yunoseek brand occupants for the sidebar and conversation Hero slots: the
 * rounded logo artwork and the gradient "Yunoseek" wordmark. Pure
 * presentation — the host supplies geometry through the owner props.
 *
 * Styles are inline (no CSS Modules): the standalone build has no stylesheet
 * pipeline, and the handful of classes here are trivial.
 */
import type { CSSProperties } from 'react'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {
  SidebarBrandMarkOwnerProps,
  SidebarBrandNameOwnerProps,
} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { LOGO_ICON_DATA_URL, WELCOME_LOGO_DATA_URL } from './artwork.ts'

/** Rounded sidebar mark geometry. */
const MARK_STYLE: CSSProperties = { borderRadius: 8, display: 'block' }

/** Gradient wordmark: the pink fills the text via background-clip. */
const NAME_STYLE: CSSProperties = {
  background: 'linear-gradient(90deg, #E91E8C, #FF6B9D)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  fontWeight: 700,
  letterSpacing: '0.02em',
}

/** Rounded Hero artwork with the pink glow. */
const HERO_STYLE: CSSProperties = {
  borderRadius: 12,
  boxShadow: '0 8px 30px rgba(233, 30, 140, 0.25)',
  display: 'block',
}

/**
 * Render the sidebar brand mark (expanded brand row and collapsed rail) at
 * the size the shell requests.
 * @param props - Host-supplied mark size.
 * @returns the rounded logo image.
 */
export function YunoseekSidebarMark({ size }: SidebarBrandMarkOwnerProps) {
  return (
    <img
      style={MARK_STYLE}
      src={LOGO_ICON_DATA_URL}
      width={size}
      height={size}
      alt=""
      draggable={false}
    />
  )
}

/**
 * Render the gradient "Yunoseek" wordmark beside the mark.
 * @param _props - Empty owner share (the occupant owns its content).
 * @returns the wordmark element.
 */
export function YunoseekSidebarName(_props: SidebarBrandNameOwnerProps) {
  return <span style={NAME_STYLE}>Yunoseek</span>
}

/**
 * Render the conversation Hero brand mark (welcome artwork) with the host's
 * headline-placement class.
 * @param props - Host-supplied size and headline-positioning class.
 * @returns the rounded hero logo image.
 */
export function YunoseekHeroMark({ size, className }: HeroBrandMarkOwnerProps) {
  return (
    <img
      className={className}
      style={HERO_STYLE}
      src={WELCOME_LOGO_DATA_URL}
      width={size}
      height={size}
      alt=""
      draggable={false}
    />
  )
}