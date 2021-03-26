# ts-library-starter

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 简介

用于构建 TypeScript 库的零配置脚手架（起步项目）。  
支持多语言的友好引导程序，帮助您完成 git 和从开发、测试到发布的完整流程配置。

![CN_1](https://calimanco.github.io/ts-library-starter/Screenshot/CN_1.png)

---

[English Version](https://github.com/calimanco/ts-library-starter/blob/main/README_EN.md)

## 需求

- Git CLI 的版本是 2.7.1 或更高；
- 部分工具要求 Node.js 的版本是 10.18 或更高;
- NPM CLI 版本保持最新。

## 使用

```bash
# Clone to the folder where you want to start the library.
git clone https://github.com/calimanco/ts-library-starter.git YOURFOLDERNAME
# Enter the folder.
cd YOURFOLDERNAME
# Run npm install and follow the interactive guide to answer questions. That's all!
npm install
```

```javascript
// Use the generated library.
import library from 'your-library-name'
// Or if your es6 module only export default.
const library = require('your-library-name')
// Or writing <script src="dist/YOURLIBRARYNAME.umd.js"></script> in html then you will find yourLibraryName variable in the global.
```

## 特性

- 引导程序支持多语言，现有中文和英文，更多语言可以轻松添加。
- 零配置，引导程序会自动完成 git、库相关信息和各种工具的配置。
- 使用 Prettier 和 ESLint 保证代码质量。
- 使用 Jest 进行单元测试，并输出覆盖率报告，发布到 Coveralls。
- 使用 RollupJS 进行编译和打包。
- 使用 TypeDoc 生成文档，并部署到 gh-pages。
- 使用 lint-staged 和 commitizen 语义化提交。
- 使用 semantic-release 规范化发布。
- 支持 Travis 自动化集成（构建、测试、发布）。

## NPM 命令

- `npm run lint`  对 src 和 test 目录进行静态代码检查。
- `npm run lint:md`  对目录下的所有 Markdown 文件进行静态代码检查。
- `npm run build`  先移除 dist 目录，再进行编译和打包, 并生成文档。
- `npm start`/`npm run start`  在"watch"模式下运行`npm run build`。
- `npm test`/`npm run test`  运行测试套件，并生成单测覆盖率报告。
- `npm run test:watch`  在 [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch) 下运行测试套件。
- `npm run test:prod`  先运行`npm run lint`，再进行测试，并生成单测覆盖率报告（无缓存）。
- `npm run deploy-docs`  将文档部署到 gh-pages，建议仅集成环境里使用，详细见 [自动集成](#travis)。
- `npm run report-coverage`  将单测覆盖率报告提交到 coveralls，建议仅集成环境里使用，详细见 [自动集成](#travis)。
- `npm run commit`  先对 git 暂存区的改动文件进行静态代码检查，再进行语义化提交。
- `npm run semantic-release`  将 git 的主分支进行发布，建议仅集成环境里使用，详细见 [自动集成](#travis)。
- `npm run compiled`  进行 TypeScript 的编译并输出结果（非打包）。

## 引导程序（命令行）

当运行完 `npm install` 后，将会启动 init 目录下的引导脚本。
它会提出多个问题，帮助您完成库的配置。

### 流程

- 配置库的 package.json、rollup.config.js、.travis.yml 等；
- 修改并改名 src 和 test 下的文件；
- 生成新的 README 文件；
- 初始化 git，并完成首次提交（仅提交 `.gitignore` 文件）；
- 清理初始化相关的文件。

![CN_2](https://calimanco.github.io/ts-library-starter/Screenshot/CN_2.png)
![CN_3](https://calimanco.github.io/ts-library-starter/Screenshot/CN_3.png)

### 默认值

- `libraryName`：库名，来自对库所在文件夹名的"kebabCase"转换，比如"MyProgram"会被转换为"my-program"。
- `author`：作者，来自运行 `git config user.name` 的输出。
- `email`：邮箱，来自运行`git config user.email` 的输出。
- `branch`：主分支名，Github 的建议叫 main。

### 增加语言支持

引导程序会先读取 init/lang 目录下语言包。  
语言包是 json 格式的文件，新赠 json 文件的内容只要保持 key 不变，就可以被正确的读取。  
如果您对本项目感兴趣，欢迎您提供更多本地化翻译。

### 错误处理

引导程序一般不会因为某个文件报错而终止，而是会将所有流程运行完，再报告出错的文件及原因。  
可根据提示信息，对报错文件进行手动的修复。

![CN_4](https://calimanco.github.io/ts-library-starter/Screenshot/CN_4.png)

## 打包（Rollup）

采用 Rollup 作为打包的程序，已经配置了常用的插件。默认会在 dist 目录下生成下列文件：

- yourLibraryName.umd.js：兼容 amd、cjs 和 iife，未压缩，有 sourcemap。
- yourLibraryName.umd.min.js：兼容 amd、cjs 和 iife，已压缩，无 sourcemap。
- yourLibraryName.es6.js：ES 模块文件，未压缩，有 sourcemap。

## 自动集成（Travis）

### 前提条件

你需要拥有下下列账号，并授权您的项目 git 仓库。

- [NPM](https://www.npmjs.com/)
- [Travis CI](https://travis-ci.com/)
- [Coveralls](https://coveralls.io/)

### 脚本已配置的功能

.travis.yml 文件所配置的功能。其中测试和构建是必须执行项，其余均要满足某些条件才会执行。

- 测试和构建，`npm run test:prod && npm run build`；
- 提交单测覆盖率报告，`npm run report-coverage`；
- 如果是主分支，部署文档，`npm run deploy-docs`；
- 如果是主分支，自动发布到 NPM，`npm run semantic-release`。

### 环境变量

需要如下几个环境变量，请将他们写入集成环境中。  
如果你想要在本地运行相关命令，也是需要的。

- NPM_TOKEN：通过 NPM 获取，用于 `npm run semantic-release`。
- COVERALLS_REPO_TOKEN：通过 Coveralls 获取，用于 `npm run report-coverage`。
- GH_TOKEN：通过 Github 获取，用于 `npm run deploy-docs`。

### 启动

引导程序已经配置好 .travis.yml，只需要有提交代码到 Github 就会自动被 Travis 拉取并运行。  
也可以手动在 Travis 里手动触发。

### 文档部署

自动生成的文档会部署到 Github 仓库的 gh-pages 分支，并且开启了 GitHub Pages 的功能，整个分支将成为一个静态网页。  
默认不会公开，可通过`https://<yourGithubName>.github.io/{yourLibraryName}` 访问。

### 发布

当满足一定条件时，会进行如下发布操作：

- 自动发布到 NPM；
- 创建版本 Tag；
- 创建 Github release，自动填写 Changelog，并且上传 yourLibraryName.umd.js 和 yourLibraryName.umd.min.js 作为 Assets。

### 注意事项

- 请确保 package.json 里的 repository.url 有写入您的项目仓库地址。
- 请确保包名在 NPM 上未被使用，可以使用 `npm view YOURFOLDERNAME` 命令进行检查。

## 说明

### 自动发布的条件

自动发布是需要满足一定条件的，依据提交时的提交信息进行判断，具体判断参考 [semantic-release](https://github.com/semantic-release/semantic-release) 。  
建议使用 `npm run commit` 进行语义化提交，它能引导您自动生成符合规范的提交信息。

### 代码规范

采用了 JavaScript Standard Style 规范，对于 Typescript 文件使用了 eslint-config-standard-with-typescript 扩展规范。  
关闭了所有不必要的或可能与 Prettier 冲突的规则。

- [JavaScript Standard Style](https://standardjs.com/)
- [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)

### 跳过引导程序的交互

以下两种情况，引导程序将不会进行提问，全部使用默认进行配置。

- 当 `process.env.CI` 会有值时，这种情况一般出现在被某些脚手架工具调用去情况。
- 使用 `npm install -y` 进行安装。

## 许可证

MIT
