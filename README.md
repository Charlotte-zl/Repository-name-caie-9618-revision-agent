# CAIE 9618 Revision Agent

面向中文学习者的本地学习 MVP，使用 Next.js 16 静态导出。

## 当前功能

- 22 个可学习主题，提供教材全部 20 章的核心小节入口；不是完整考纲覆盖。
- 双语概念、英文答题表达、教材出处、30 道快速测验、22 道原创简答练习。
- 保留处理器、二进制、逻辑门及线性查找交互演示；新增主题使用逐概念交互讲解。
- 搜索中文/英文主题与术语，按 AS / A Level 筛选。
- 选择题即时判定；答错加入待复习，重做答对后移除。
- 简答草稿自动保存、对照评分点自评、保存分数和未完成评分点。
- `/progress` 汇总阅读状态、作答情况、错题及自评。
- 同浏览器 localStorage 保存、多标签页同步；存储不可用时显示提示并退回当前会话记录。

## 教材与范围

参考用户提供的 `9618 CS Textbook 2020.pdf`。书内版权页为 David Watson & Helen Williams，Hodder Education，2019，ISBN 9781510457591。每个主题记录章节、小节、起始印刷页与 PDF 页（印刷页 + 16）。

内容为教材核心概念的改写；题目、参考答案及评分点为本站编写，不是 Cambridge 官方真题或评分标准。未嵌入或发布教材 PDF。详细范围与后续内容见 [MVP-STATUS.md](MVP-STATUS.md)。

## 运行

```sh
npm install
npm run dev
```

打开 http://localhost:3000 。

```sh
npm run lint
npm run build
```

静态产物在 `out/`。无需 API key 或数据库；目前没有 AI 自动批改、账户登录或跨设备同步。

## 浏览器验收

`scripts/smoke-test.mjs` 启动临时本地静态服务器，使用 Playwright 与已安装的 Edge 无头浏览器测试构建结果，不会修改个人浏览器资料。

```sh
npm run build
npm run test:smoke
```

测试环境需要可导入的 `playwright` 包；如使用 Codex 自带包，将 `PLAYWRIGHT_MODULE` 设为该包目录。`BROWSER_CHANNEL` 可指定 `chrome`，默认 `msedge`。测试截图保存在被忽略的 `tmp/qa/`。

## 主要文件

- `data/caie9618.json`：课程、出处、测验与练习数据。
- `app/revision/[topicId]/page.tsx`：共享主题页与静态路由。
- `lib/progress.ts`：版本化本地学习记录与异常降级。
- `components/PracticeSection.tsx`：草稿与逐点自评。
- `components/QuizCard.tsx`：测验与错题修正。
- `app/progress/page.tsx`：学习记录与错题列表。
