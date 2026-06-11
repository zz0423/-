# IP Toolkit - Railway 部署指南

## 方式一：从 GitHub 导入（推荐）

1. 先把这个文件夹推到你的 GitHub 仓库
2. 打开 https://railway.app ，用 GitHub 登录
3. 点 **New Project** → **Deploy from GitHub repo** → 选择 `zz0423/-` 仓库
4. 进入项目设置 → **Variables**，添加环境变量：

| 变量名 | 值 |
|--------|-----|
| LIBLIB_ACCESS_KEY | 5bTWJQl8gm_QejE3pyy3vQ |
| LIBLIB_SECRET_KEY | yqpkVXmdVfIhjvARdFMqTBffaztSvp0X |
| OPENAI_API_KEY | （你的 OpenAI Key） |
| OPENAI_BASE_URL | https://api.openai.com/v1 |
| LIBLIB_TEMPLATE_UUID | e10adc3949ba59abbe56e057f20f883e |
| PORT | 4173 |

5. Railway 会自动检测 Node.js 并运行 `npm start`
6. 部署完成后会得到一个 `xxx.up.railway.app` 地址

## 方式二：Railway CLI

```bash
npm i -g @railway/cli
railway login
railway init
railway add
railway up
```

## 注意事项

- Railway 免费额度 $5/月，个人使用足够
- 没有 Vercel 的 10 秒超时限制，图像生成可以正常完成
- 修改代码后 push 到 GitHub，Railway 会自动重新部署
