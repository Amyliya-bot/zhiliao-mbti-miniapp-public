# 知聊 MBTI 对话测试小程序

一个基于微信小程序 + 云函数 + AI 对话分析的性格测试产品原型。项目把传统问卷式 MBTI 测试改造成多场景自然聊天体验：用户通过露营、职场、旅行、社交等话题与 AI 对话，系统再根据对话内容生成 MBTI 倾向、维度分数、完整报告和分享卡片。

> 这是公开展示用的脱敏版本，不包含真实 appid、CloudBase 环境 ID、API Key、私有配置或用户数据。

## 项目亮点

- **AI 对话式测评**：用多轮自然对话替代一次性问卷，降低测试疲劳感。
- **场景化人格线索采集**：围绕 E/I、S/N、T/F、J/P 等维度设计露营邀约、职场困境、道德选择、旅行冒险等话题。
- **云函数服务端调用 AI**：前端不暴露模型密钥，云函数统一处理模型调用、内容安全、频率限制和每日次数限制。
- **结果报告与分享链路**：生成 MBTI 类型、维度比例、人格印象、成长建议，并支持分享图生成。
- **审核合规意识**：包含隐私政策页面、敏感输入拦截、内容安全检查、基础限流与服务端鉴权。

## 技术栈

- 微信小程序原生开发：WXML / WXSS / JavaScript
- 微信云开发 / Tencent CloudBase
- Node.js 云函数
- Hunyuan API 调用
- Canvas 分享图生成

## 目录结构

```text
.
├── miniprogram/              # 小程序前端页面、数据与工具函数
├── cloudfunctions/           # chatAI 与 analyzeMBTI 云函数
├── docs/                     # 产品文档、题库、报告预览
├── prototype/                # 早期 HTML 原型
├── pages-preview/            # 页面预览与静态报告示例
├── cloudbaserc.json          # 已脱敏的云开发配置示例
├── project.config.json       # 已脱敏的小程序工程配置
└── .env.example              # 云函数运行所需环境变量示例
```

## 本地运行

1. 使用微信开发者工具导入本项目。
2. 将 `project.config.json` 和 `miniprogram/project.config.json` 中的 `appid` 替换为自己的小程序 appid，或保留 `touristappid` 做本地预览。
3. 将 `cloudbaserc.json` 和 `miniprogram/app.js` 中的 `your-cloudbase-env-id` 替换为自己的 CloudBase 环境 ID。
4. 在云函数运行环境中配置：

```bash
HUNYUAN_ENV_ID=your-cloudbase-env-id
HUNYUAN_API_KEY=your-hunyuan-api-key
```

5. 分别进入 `cloudfunctions/chatAI` 与 `cloudfunctions/analyzeMBTI` 安装依赖，并在微信开发者工具中上传部署云函数。

## 和 AI 先锋未来人才大赛的关联

这个项目能证明团队具备“设计 + AI 产品原型 + 工程落地”的复合能力：

- 能把抽象 AI 能力转化成用户可理解、可互动的产品体验。
- 能设计场景脚本、结果报告、分享链路和用户转化路径。
- 能用 AI 编程工具辅助完成真实小程序页面、云函数和交互逻辑。
- 能考虑公开展示、合规、隐私、密钥隔离和安全边界。

因此它适合作为报名表“团队补充材料/链接格式”的作品案例，用来支撑我们参加 AI 内容工厂、品牌智能体、AI 营销增长类命题。

## 当前状态

- 小程序核心页面与云函数逻辑已完成。
- 本仓库为公开作品集版本，已完成基础脱敏。
- 若用于正式部署，需要配置自己的小程序 appid、CloudBase 环境 ID 和 Hunyuan API Key。
