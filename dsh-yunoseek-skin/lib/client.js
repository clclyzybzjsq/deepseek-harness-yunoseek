Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("react/jsx-runtime");
//#region src/client/theme.ts
/** Source identity of the token layer (the façade pins it for inspection). */
const THEME_LAYER_SOURCE = "dsh-yunoseek-skin";
const PINK_STATIC = {
	"--dsw-static-deepseek-50": {
		light: "#FFF0F5",
		dark: "#2A1A22"
	},
	"--dsw-static-deepseek-100": {
		light: "#FFE3F0",
		dark: "#33202A"
	},
	"--dsw-static-deepseek-200": {
		light: "#FFC9E6",
		dark: "#3D2532"
	},
	"--dsw-static-deepseek-300": {
		light: "#FFAAD9",
		dark: "#4A2E3C"
	},
	"--dsw-static-deepseek-400": {
		light: "#FF6FA8",
		dark: "#FF8AB3"
	},
	"--dsw-static-deepseek-450": {
		light: "#F74FA0",
		dark: "#FF7FA8"
	},
	"--dsw-static-deepseek-500": {
		light: "#E91E8C",
		dark: "#FF6B9D"
	},
	"--dsw-static-deepseek-600": {
		light: "#D4187E",
		dark: "#FF85AF"
	},
	"--dsw-static-deepseek-700-delete": {
		light: "#B0126C",
		dark: "#C8658F"
	},
	"--dsw-static-deepseek-800": {
		light: "#8C0F54",
		dark: "#9A5874"
	},
	"--dsw-static-deepseek-900": {
		light: "#5C0836",
		dark: "#6E3D55"
	}
};
const PINK_ALIASES = {
	"--dsw-alias-brand-primary": {
		light: "#E91E8C",
		dark: "#FF6B9D"
	},
	"--dsw-alias-brand-primary-invert": {
		light: "#FFFFFF",
		dark: "#FFFFFF"
	},
	"--dsw-alias-brand-primary-new-colorprimary-new-color": {
		light: "#E91E8C",
		dark: "#FF6B9D"
	},
	"--dsw-alias-brand-text": {
		light: "#E91E8C",
		dark: "#FF9DBB"
	},
	"--dsw-alias-button-primary-fill": {
		light: "#E91E8C",
		dark: "#FF6B9D"
	},
	"--dsw-alias-button-primary-hover": {
		light: "#D4187E",
		dark: "#FF85AF"
	},
	"--dsw-alias-button-primary-dimmed": {
		light: "#FFE3F0",
		dark: "#3D2532"
	},
	"--dsw-alias-button-info-fill": {
		light: "#E91E8C",
		dark: "#FF6B9D"
	},
	"--dsw-alias-button-info-hover": {
		light: "#D4187E",
		dark: "#FF85AF"
	},
	"--dsw-alias-button-floating-fill": {
		light: "#FFFFFF",
		dark: "#1F1F1F"
	},
	"--dsw-alias-button-floating-hover": {
		light: "#F5F5F7",
		dark: "#2A2A2A"
	},
	"--dsw-alias-button-elevated-fill": {
		light: "#FFFFFF",
		dark: "#1F1F1F"
	},
	"--dsw-alias-button-contrast-fill": {
		light: "#4A4A4A",
		dark: "#E4E4E7"
	},
	"--dsw-alias-label-primary": {
		light: "#1A1A1A",
		dark: "#E4E4E7"
	},
	"--dsw-alias-label-secondary": {
		light: "#555555",
		dark: "#9E9E9E"
	},
	"--dsw-alias-label-tertiary": {
		light: "#888888",
		dark: "#6D6D6D"
	},
	"--dsw-alias-label-caption": {
		light: "#888888",
		dark: "#6D6D6D"
	},
	"--dsw-alias-label-dimmed": {
		light: "#C0C0C2",
		dark: "#4A4A4A"
	},
	"--dsw-alias-label-primary-bluish": {
		light: "#1A1A1A",
		dark: "#E4E4E7"
	},
	"--dsw-alias-label-primary-dimmed": {
		light: "#262626",
		dark: "#B4B4B6"
	},
	"--dsw-alias-label-primary-foreground": {
		light: "#FFFFFF",
		dark: "#FFFFFF"
	},
	"--dsw-alias-label-primary-inverted": {
		light: "#FFFFFF",
		dark: "#FFFFFF"
	},
	"--dsw-alias-bg-base": {
		light: "#FFFFFF",
		dark: "#0D0D0D"
	},
	"--dsw-alias-bg-layer-1": {
		light: "#FFFFFF",
		dark: "#141414"
	},
	"--dsw-alias-bg-layer-2": {
		light: "#F5F5F7",
		dark: "#1A1A1A"
	},
	"--dsw-alias-bg-layer-3": {
		light: "#F5F5F7",
		dark: "#222222"
	},
	"--dsw-alias-bg-overlay": {
		light: "#FFFFFF",
		dark: "#2A2A2A"
	},
	"--dsw-alias-bg-module-platform": {
		light: "#F5F5F7",
		dark: "#1A1A1A"
	},
	"--dsw-alias-bg-multi-select": {
		light: "#F8F6F7",
		dark: "#141414"
	},
	"--dsw-alias-bg-skeleton": {
		light: "rgba(233, 30, 140, 0.06)",
		dark: "rgba(255, 107, 157, 0.08)"
	},
	"--dsw-alias-bg-mask-drop": {
		light: "rgba(255, 255, 255, 0.7)",
		dark: "rgba(45, 45, 54, 0.7)"
	},
	"--dsw-alias-border-l1": {
		light: "rgba(233, 30, 140, 0.08)",
		dark: "rgba(255, 107, 157, 0.16)"
	},
	"--dsw-alias-border-l2": {
		light: "rgba(233, 30, 140, 0.14)",
		dark: "rgba(255, 107, 157, 0.22)"
	},
	"--dsw-alias-border-l2-darkmode-thin": {
		light: "rgba(233, 30, 140, 0.14)",
		dark: "rgba(255, 107, 157, 0.22)"
	},
	"--dsw-alias-border-l3": {
		light: "rgba(233, 30, 140, 0.18)",
		dark: "rgba(255, 107, 157, 0.28)"
	},
	"--dsw-alias-border-l4": {
		light: "rgba(233, 30, 140, 0.24)",
		dark: "rgba(255, 107, 157, 0.34)"
	},
	"--dsw-alias-border-inverted": {
		light: "rgba(0, 0, 0, 0)",
		dark: "rgba(255, 107, 157, 0.18)"
	},
	"--dsw-alias-border-inverted2": {
		light: "rgba(0, 0, 0, 0)",
		dark: "rgba(255, 107, 157, 0.22)"
	},
	"--dsw-alias-interactive-bg-hover": {
		light: "rgba(233, 30, 140, 0.06)",
		dark: "rgba(255, 107, 157, 0.10)"
	},
	"--dsw-alias-interactive-bg-active": {
		light: "rgba(233, 30, 140, 0.12)",
		dark: "rgba(255, 107, 157, 0.18)"
	},
	"--dsw-alias-interactive-bg-hover-accent": {
		light: "rgba(233, 30, 140, 0.16)",
		dark: "rgba(255, 107, 157, 0.24)"
	},
	"--dsw-alias-interactive-bg-hover-solid": {
		light: "#F5F5F7",
		dark: "#2A2A2A"
	},
	"--dsw-alias-markdown-inline-code": {
		light: "#FFF0F5",
		dark: "#33202A"
	},
	"--dsw-alias-markdown-code-block": {
		light: "#F5F5F7",
		dark: "#1A1A1A"
	},
	"--dsw-alias-markdown-code-block-banner": {
		light: "#F1F0F3",
		dark: "#141414"
	},
	"--dsw-alias-markdown-code-segment-selected": {
		light: "#FFFFFF",
		dark: "#2A1A22"
	},
	"--dsw-alias-markdown-code-segment-unselected": {
		light: "#F5F5F7",
		dark: "#1A1A1A"
	},
	"--dsw-alias-markdown-citation": {
		light: "#FFE3F0",
		dark: "#33202A"
	},
	"--dsw-alias-markdown-tag": {
		light: "#FFE3F0",
		dark: "#3D2532"
	},
	"--dsw-alias-markdown-placeholder": {
		light: "#F8F6F7",
		dark: "#141414"
	},
	"--dsw-alias-state-business-primary": {
		light: "#E91E8C",
		dark: "#FF6B9D"
	},
	"--dsw-alias-state-business-tertiary": {
		light: "#FFE3F0",
		dark: "#3D2532"
	},
	"--dsw-specific-bubble": {
		light: "#F5F5F7",
		dark: "#1A1A1A"
	},
	"--dsw-specific-bubble-highlight": {
		light: "#FFE3F0",
		dark: "#3D2532"
	},
	"--dsw-specific-input-major": {
		light: "#FFFFFF",
		dark: "#0D0D0D"
	},
	"--dsw-specific-login-input": {
		light: "#F8F6F7",
		dark: "#1A1A1A"
	},
	"--dsw-specific-selector": {
		light: "#F5F5F7",
		dark: "#2A2A2A"
	},
	"--dsw-specific-sidebar-fill": {
		light: "#F5F5F7",
		dark: "#1A1A1A"
	},
	"--dsw-specific-sidebar-nav-item-active-accent": {
		light: "#FFC9E6",
		dark: "#4A2E3C"
	},
	"--dsw-specific-sidebar-nav-item-active": {
		light: "#FFE3F0",
		dark: "#3D2532"
	},
	"--dsw-specific-sidebar-nav-item-hover": {
		light: "#F8E8F0",
		dark: "#2A1A22"
	},
	"--dsw-specific-tip": {
		light: "#FFF5F9",
		dark: "#2A1A22"
	},
	"--dsw-specific-menu": {
		light: "#FFFFFF",
		dark: "#2A2A2A"
	}
};
/**
* The complete override layer, keyed like the runtime's ThemeTokenOverrides.
* Registration order is irrelevant (per-token composition); the tables are
* split only to keep the static-scale remap distinct from the alias skin.
*/
const YUNOSEEK_THEME_LAYER = {
	...PINK_STATIC,
	...PINK_ALIASES
};
//#endregion
//#region src/client/artwork.ts
/** Assistant chat avatar (assistant-avatar.jpg copy), JPEG data URL. */
const ASSISTANT_AVATAR_DATA_URL = "data:image/jpeg;base64,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";
//#endregion
//#region src/client/styles.ts
const PLUGIN_ID = "dsh-yunoseek-skin";
/** Mounted sheet identity, mirrored by the tsdown CSS injector naming. */
const SHEET_NAME = `${PLUGIN_ID}/yunoseek.css`;
/**
* Build the art-direction sheet text. The avatar rule interpolates the
* data URL (the plugin interface ships no static assets).
* @returns the complete stylesheet text.
*/
function yunoseekStylesheet() {
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
`;
}
/**
* Mount the sheet for exactly the owning plugin lifetime.
* @param ctx - owning plugin context.
*/
function installYunoseekStyles(ctx) {
	if (typeof document === "undefined") return;
	const css = yunoseekStylesheet();
	ctx.effect(() => {
		const tag = document.createElement("style");
		tag.dataset.plugin = PLUGIN_ID;
		tag.dataset.pluginCss = SHEET_NAME;
		tag.textContent = css;
		document.head.appendChild(tag);
		return () => {
			tag.remove();
		};
	}, "dsh-yunoseek-skin: art-direction stylesheet");
}
//#endregion
//#region src/client/index.ts
/** Required services: the UI slot registry and the theme runtime. */
const inject = ["slots", "theme"];
/**
* Client plugin body: install the sheets, stack the pink token layer, and
* fill the brand seats as one declaration-aware registration set.
* @param ctx - client root context.
*/
function apply(ctx) {
	installYunoseekStyles(ctx);
	ctx.effect(() => ctx.theme.overrideTokens(THEME_LAYER_SOURCE, YUNOSEEK_THEME_LAYER), "dsh-yunoseek-skin: pink token layer");
}
//#endregion
exports.apply = apply;
exports.inject = inject;

//# sourceMappingURL=client.js.map