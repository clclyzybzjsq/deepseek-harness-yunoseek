# dsh-yunoseek-skin

适用于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI 的 Yunoseek 粉色皮肤。它把 DSH 浏览器界面的美术风格换成 yunoseek 聊天 UI 的粉色系（`#E91E8C` / `#FF6B9D` 渐变、粉色色调），同时完全复用 DSH 现有布局与组件，走标准客户端插件接口：

- **粉色 Token 层** — 一个 theme `overrideTokens` 覆盖层，作用于 `--dsw-*` 语义 token 与 `--dsw-static-deepseek-*` 静态标尺；每个 token 都带 yunoseek 两套明暗取值。皮肤常驻且跟随用户的明暗/跟随系统偏好，无需任何设置。
- **美术风格表** — 按明暗配色分别重着色的粉色 Hero 光晕，以及通过聊天行稳定属性 `data-chat-flow-kind` 注入的**助手头像**（宿主行的 CSS Modules 类名经过哈希、跨包不可寻址）。
- **品牌标记**（仅非 `official` 构建）— 侧栏品牌行的 yunoseek logo、渐变 "Yunoseek" 字标、对话 Hero 位的欢迎大图。官方 DeepSeek Harness 组合已用内置品牌占住这些单占位插槽，皮肤默认让位（见下文"构建 profile 与品牌插槽"）。
- **Yunoseek 身份提示词** — 节点半部把 yunoseek 系统提示词（`assets/system-prompt.js`）注册为第一条系统提示词 section，使每次组装的系统提示词都以 Yunoseek 人设开头。

一句话：全局粉色 + yunoseek 图片 + Yunoseek 人设，不动任何宿主组件，不含 yunoseek 业务功能（播放器、小游戏、模式胶囊、弹窗等）。

## Yunoseek 身份提示词

除了视觉之外，插件还会把 yunoseek 身份提示词注入给模型。其节点半部在 `systemPrompt` 注册表注册名为 `yunoseek:identity` 的 section，order 为 `-200`，渲染在**最前**——位于 harness 身份（`-100`）与部署人设（`0`）之前，即模型每轮读到的第一段文本。默认文本来自 yunoseek 的 `assets/system-prompt.js`，构建时内嵌进包内。

注入默认开启，且对 profile 内所有 agent 全局生效（section 位于提示词注册表的全局层）。要关闭或替换文本，请在你自己 profile 的补丁（`$DSH_HOME/profiles/web/cordis.patch.yml`）中覆盖该行——它是更后一层，会整体替换该行的 `config` 值：

```yaml
- update:
    - id: yunoseek-skin
      config:
        enabled: false        # 只留皮肤，不注入提示词
```

```yaml
- update:
    - id: yunoseek-skin
      config:
        prompt: |
          # My own identity
          ...                   # 自定义提示词文本
```

配置在启动时读取，改后需重启 `dsh web`。section 文本是静态的：不含 `{{variable}}` 引用——自定义提示词若含 `{{…}}` 会令提示词组装失败（fail loud，杜绝带病提示词进入模型请求）。

## 安装

前提：已安装 dsh（`dsh` CLI），且有 web profile——默认 GUI profile 名为 `web`。

### 从 GitHub 安装

```sh
dsh plugin --profile web add github:<owner>/dsh-yunoseek-skin
```

git 安装拉取的是源码而非构建产物，因此 pnpm 会运行包的 `prepare` 脚本构建 `lib/`。pnpm ≥ 10 在显式允许之前拒绝运行 git 依赖的 `prepare`——第一次 `add` 会失败，dsh 会打印出确切的包键；把它复制进该 profile 的 `pnpm-workspace.yaml`：

```yaml
allowBuilds:
  dsh-yunoseek-skin: true
```

然后重新执行 `add`。（这项授权等于允许该包代码在安装时于你的机器上执行；只对源码可信的包授权，并锁定 commit：`github:<owner>/dsh-yunoseek-skin#<sha>`。）之后（重新）启动一次你的 `dsh web`，让新 roster 行进入组合；此后改皮肤代码可经 web HMR 链路热更新。

### 从 npm 或 tarball 安装

免构建授权的方式：

```sh
dsh plugin --profile web add dsh-yunoseek-skin        # npm（lib/ 已随发布构建）
dsh plugin --profile web add ./dsh-yunoseek-skin-0.2.0.tgz   # pnpm pack
```

### 卸载

```sh
dsh plugin --profile web remove dsh-yunoseek-skin
```

## 构建 profile 与品牌插槽

tsdown 配置固定 `DSH_CLIENT_BUILD_PROFILE`（默认 `official`）。`official` 构建下皮肤只应用 token 层、头像表与 Hero 光晕——官方 web 组合内含内置 deepseek 品牌，它占住了 `sidebar.brand.mark` / `sidebar.brand.name` / `conversation.hero.brand.mark` 三个单占位插槽，不应冲突。若想改显 yunoseek 标记（例如自构建 web，或已禁用内置品牌行），请用：

```sh
DSH_CLIENT_BUILD_PROFILE=dev pnpm install   # 重建 lib/，品牌标记开启
```

当组合里仍有内置品牌行时，在 profile 补丁（`$DSH_HOME/profiles/web/cordis.patch.yml`）里禁用它：

```yaml
- update:
    - id: ui-brand-official
      disabled: true
```

## 构建

```sh
pnpm install    # 安装 tsdown 并运行 prepare，产出 lib/
```

`prepare` 脚本是自包含的（docs/user/develop/basic/publish.md）：用一份专用 tsdown 配置直接从 `src/` 构建——不依赖 monorepo 上下文、没有项目引用、不做类型检查。产物：`lib/index.js`（ESM 节点半部）与 `lib/client.js`（CJS 浏览器半部）。

## 分发

这是一个标准的 dsh bundle：`package.json` 声明了 `dsh.bundle`（patch `cordis.patch.yml`，插入 `yunoseek-skin` 行）与 `dsh.client`（`platform: "web"`、信息性 `inject` 边）。发布方式：在你的 GitHub 账号下建仓库，推送本目录，用户即可 `dsh plugin --profile web add github:<owner>/dsh-yunoseek-skin` 安装；或构建好 `lib/` 后 `npm publish`，或交付 `pnpm pack` 生成的 tarball。

## 已知限制

- 身份提示词是全局且最前的：若更后一层注册了 `complete: true` 的系统提示词 section，该 agent 的整条提示词会被替换，注入的文本在那里消失（注册表文档化的 complete-section 行为）。
- 自定义提示词不能含 `{{…}}`——提示词变量按严格规则插值，未知引用会令组装失败。
- 助手头像按选择器画进聊天行：`[data-chat-flow-kind="assistant-step"]::before`，固定 34px 几何。若 ui-conversation 改变该属性或行几何，需要复查 `src/client/styles.ts` 里的规则。
- 侧栏 / Hero 标记在 `official` 构建下按设计跳过（单占位品牌插槽）；开启方法见上文。
- Hero 光晕规则针对 `[data-phase="hero"] svg ellipse`；未来的 Hero 改版可能不再用 SVG 椭圆承载光晕。

## License

MIT