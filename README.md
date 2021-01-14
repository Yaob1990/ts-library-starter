# ts-library-starter

## 简介

用于构建 TypeScript 库的零配置脚手架。  
支持多语言的友好命令行引导，帮助您完成 git 和从开发、测试到发布的完整流程配置。

---

[English Version](https://github.com/calimanco/ts-library-starter/blob/main/README_EN.md)

## 需求

- Git CLI 的版本是 2.7.1 或更高；
- 部分工具要求 Node.js 的版本是 10.18 或更高;
- Npm CLI 版本保持最新。

## 使用

```bash
# Clone to the folder where you want to start the library.
git clone https://github.com/calimanco/ts-library-starter.git YOURFOLDERNAME
# Enter the folder
cd YOURFOLDERNAME
# Run npm install and follow the interactive guide to answer questions. That's all!
npm install
```

## 特性

- 零配置，支持多语言的友好命令行引导，自动完成 git、库相关信息和各种工具的配置。
- 使用 Prettier 和 ESLint 保证代码质量。
- 使用 Jest 进行单元测试，并输出覆盖率报告，发布到 Coveralls。
- 使用 RollupJS 进行编译和打包。
- 使用 TypeDoc 生成文档，并部署到 gh-pages。
- 使用 lint-staged 和 commitizen 语义化提交。
- 使用 semantic-release 规范化发布。
- 支持 Travis 自动化集成（构建、测试、发布）。

## NPM 命令

- `npm run lint`：对 src 和 test 目录进行静态代码检查。
- `npm run build`：先移除 dist 目录，再进行编译和打包, 并生成文档。
- `npm start`/`npm run start`：在"watch"模式下运行`npm run build`。
- `npm test`/`npm run test`： 运行测试套件，并生成单测覆盖率报告。
- `npm run test:watch`：在 [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch) 下运行测试套件。
- `npm run test:prod`：先运行`npm run lint`，再进行测试，并生成单测覆盖率报告（无缓存）。
- `npm run deploy-docs`：将文档部署到 gh-pages，建议只在 Travis 里使用，详细见下。
- `npm run report-coverage`：将单测覆盖率报告提交到 coveralls，建议只在 Travis 里使用，详细见下。
- `npm run commit`：先对 git 暂存区的改动文件进行静态代码检查，再进行语义化提交。
- `npm run semantic-release`：将 git 的主分支进行发布，建议只在 Travis 里使用，详细见下。
- `npm run compiled`：进行 TypeScript 的编译并输出结果。

## 命令行引导

当运行完 `npm install` 后，将会启动 init 目录下的引导脚本，帮助您完成库的配置。

### 作用

- 配置库的 package.json、rollup.config.js、.travis.yml 和 LICENSE；
- 修改并改名 src 和 test 下的文件；
- 生成新的 README 文件；
- 配置 git；
- 清理初始化相关的文件。

### 默认值

- libraryName：库名，来自对库所在文件夹名的短横线隔开式转换，比如"MyProgram"会被转换为"my-program"。
- author：作者，来自运行 `git config user.name` 的输出。
- email：邮箱，来自运行`git config user.email` 的输出。
- branch：主分支名，Github 的建议叫 main。

### 增加命令行引导的语言支持

引导脚本会先读取 init/lang 目录下语言包。语言包是 json 格式的文件，要增加语言支持只需要添加新的 json 文件即可。  
新 json 文件的内容只要保持 key 不变，就可以被正确的读取。

## 自动集成（Travis）

### 前提条件

你需要拥有下下列账号，并授权您的项目 git 仓库。

- [NPM](https://www.npmjs.com/)
- [Travis CI](https://travis-ci.com/)
- [Coveralls](https://coveralls.io/)

### .travis.yml 的功能

- 测试和构建，`npm run test:prod && npm run build`；
- 提交单测覆盖率报告，`npm run report-coverage`；
- 如果是主分支，部署文档，`npm run deploy-docs`；
- 如果是主分支，自动发布到 NPM，`npm run semantic-release`。

### 环境变量

需要准备以下三个环境变量，会在自动集成中用到，请将他们写入 Travis 的运行环境。  
如果你想要在本地运行相关命令，也是需要的。  

- NPM_TOKEN：通过 NPM 获取
- COVERALLS_REPO_TOKEN：通过 Coveralls 获取
- GH_TOKEN：通过 Github 获取

### 启动

引导程序已经配置好 .travis.yml，只需要有提交代码到 Github 就会自动被 Travis 拉取并运行。

注意：请确保 package.json 里的 repository.url 有正确的值。


## 说明

### 自动发布

自动发布是需要满足一定条件的，依据提交时的提交信息进行判断，具体判断参考 [semantic-release](https://github.com/semantic-release/semantic-release )  
建议使用`npm run commit`进行语义化提交，它能引导您自动生成符合规范的提交信息。

### 代码规范

采用了如下规范，并且排除了冲突的"@typescript-eslint/no-extra-semi"规则。

- [@typescript-eslint/recommended](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [prettier/recommended](https://github.com/prettier/eslint-plugin-prettier)

## 许可证

MIT
