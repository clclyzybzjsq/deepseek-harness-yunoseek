# dsh-yunoseek-skin

适用�?[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI �?Yunoseek 粉色皮肤。它�?DSH 浏览器界面的美术风格换成 yunoseek 聊天 UI 的粉色系（`#E91E8C` / `#FF6B9D` 渐变、粉色色调），同时完全复�?DSH 现有布局与组件，走标准客户端插件接口�?
- **粉色 Token �?* �?一�?theme `overrideTokens` 覆盖层，作用�?`--dsw-*` 语义 token �?`--dsw-static-deepseek-*` 静态标尺；每个 token 都带 yunoseek 两套明暗取值。皮肤常驻且跟随用户的明�?跟随系统偏好，无需任何设置�?- **美术风格�?* �?按明暗配色分别重着色的粉色 Hero 光晕，以及通过聊天行稳定属�?`data-chat-flow-kind` 注入�?*助手头像**（宿主行�?CSS Modules 类名经过哈希、跨包不可寻址）�?- **品牌标记**（仅�?`official` 构建）�?侧栏品牌行的 yunoseek logo、渐�?"Yunoseek" 字标、对�?Hero 位的欢迎大图。官�?DeepSeek Harness 组合已用内置品牌占住这些单占位插槽，皮肤默认让位（见下文"构建 profile 与品牌插�?）�?- **Yunoseek 身份提示�?* �?节点半部�?yunoseek 系统提示词（`assets/system-prompt.js`）注册为第一条系统提示词 section，使每次组装的系统提示词都以 Yunoseek 人设开头�?
一句话：全局粉色 + yunoseek 图片 + Yunoseek 人设，不动任何宿主组件，不含 yunoseek 业务功能（播放器、小游戏、模式胶囊、弹窗等）�?
## Yunoseek 身份提示�?
除了视觉之外，插件还会把 yunoseek 身份提示词注入给模型。其节点半部�?`systemPrompt` 注册表注册名�?`yunoseek:identity` �?section，order �?`-200`，渲染在**最�?*——位�?harness 身份（`-100`）与部署人设（`0`）之前，即模型每轮读到的第一段文本。默认文本来�?yunoseek �?`assets/system-prompt.js`，构建时内嵌进包内�?
注入默认开启，且对 profile 内所�?agent 全局生效（section 位于提示词注册表的全局层）。要关闭或替换文本，请在你自�?profile 的补丁（`$DSH_HOME/profiles/web/cordis.patch.yml`）中覆盖该行——它是更后一层，会整体替换该行的 `config` 值：

```yaml
- id: yunoseek-skin
  config:
    enabled: false        # 只留皮肤，不注入提示�?```

```yaml
- id: yunoseek-skin
  config:
    prompt: |
      # My own identity
      ...                   # 自定义提示词文本
```

配置在启动时读取，改后需重启 `dsh web`。section 文本是静态的：不�?`{{variable}}` 引用——自定义提示词若�?`{{…}}` 会令提示词组装失败（fail loud，杜绝带病提示词进入模型请求）�?
## 安装

前提：已安装 dsh（`dsh` CLI），且有 web profile——默�?GUI profile 名为 `web`�?
### �?GitHub 安装

```sh
dsh plugin --profile web add github:<owner>/dsh-yunoseek-skin
```

git 安装拉取的是源码而非构建产物，因�?pnpm 会运行包�?`prepare` 脚本构建 `lib/`。pnpm �?10 在显式允许之前拒绝运�?git 依赖�?`prepare`——第一�?`add` 会失败，dsh 会打印出确切的包键；把它复制进该 profile �?`pnpm-workspace.yaml`�?
```yaml
allowBuilds:
  dsh-yunoseek-skin: true
```

然后重新执行 `add`。（这项授权等于允许该包代码在安装时于你的机器上执行；只对源码可信的包授权，并锁�?commit：`github:<owner>/dsh-yunoseek-skin#<sha>`。）之后（重新）启动一次你�?`dsh web`，让�?roster 行进入组合；此后改皮肤代码可�?web HMR 链路热更新�?
### �?npm �?tarball 安装

免构建授权的方式�?
```sh
dsh plugin --profile web add dsh-yunoseek-skin        # npm（lib/ 已随发布构建�?dsh plugin --profile web add ./dsh-yunoseek-skin-0.3.0.tgz   # pnpm pack
```

### 卸载

```sh
dsh plugin --profile web remove dsh-yunoseek-skin
```

## 构建 profile 与品牌插�?
tsdown 配置固定 `DSH_CLIENT_BUILD_PROFILE`（默�?`official`）。`official` 构建下皮肤只应用 token 层、头像表�?Hero 光晕——官�?web 组合内含内置 deepseek 品牌，它占住�?`sidebar.brand.mark` / `sidebar.brand.name` / `conversation.hero.brand.mark` 三个单占位插槽，不应冲突。若想改�?yunoseek 标记（例如自构建 web，或已禁用内置品牌行），请用�?
```sh
DSH_CLIENT_BUILD_PROFILE=dev pnpm install   # 重建 lib/，品牌标记开�?```

当组合里仍有内置品牌行时，在 profile 补丁（`$DSH_HOME/profiles/web/cordis.patch.yml`）里禁用它：

```yaml
- id: ui-brand-official
  disabled: true
```

## 构建

```sh
pnpm install    # 安装 tsdown 并运�?prepare，产�?lib/
```

`prepare` 脚本是自包含的（docs/user/develop/basic/publish.md）：用一份专�?tsdown 配置直接�?`src/` 构建——不依赖 monorepo 上下文、没有项目引用、不做类型检查。产物：`lib/index.js`（ESM 节点半部）与 `lib/client.js`（CJS 浏览器半部）�?
## 分发

这是一个标准的 dsh bundle：`package.json` 声明�?`dsh.bundle`（patch `cordis.patch.yml`，插�?`yunoseek-skin` 行）�?`dsh.client`（`platform: "web"`、信息�?`inject` 边）。发布方式：在你�?GitHub 账号下建仓库，推送本目录，用户即�?`dsh plugin --profile web add github:<owner>/dsh-yunoseek-skin` 安装；或构建�?`lib/` �?`npm publish`，或交付 `pnpm pack` 生成�?tarball�?
## 已知限制

- 身份提示词是全局且最前的：若更后一层注册了 `complete: true` 的系统提示词 section，该 agent 的整条提示词会被替换，注入的文本在那里消失（注册表文档化�?complete-section 行为）�?- 自定义提示词不能�?`{{…}}`——提示词变量按严格规则插值，未知引用会令组装失败�?- 助手头像按选择器画进聊天行：`[data-chat-flow-kind="assistant-step"]::before`，固�?34px 几何。若 ui-conversation 改变该属性或行几何，需要复�?`src/client/styles.ts` 里的规则�?- 侧栏 / Hero 标记�?`official` 构建下按设计跳过（单占位品牌插槽）；开启方法见上文�?- Hero 光晕规则针对 `[data-phase="hero"] svg ellipse`；未来的 Hero 改版可能不再�?SVG 椭圆承载光晕�?
## License

MIT