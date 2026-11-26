# 谢兆明 · 创意总监

个人作品集站点。三场战役：开心麻花《疯狂理发店》、兴业银行「兴动全球」、短剧《暗渡》。

中文为主。导航始终可见：作品 / 关于 / 联系。页面是静态的，方便之后部署。

## 本地运行

需要 Node.js 22 或更新版本。

```bash
npm install
npm run dev
```

开发服务器默认在 `http://localhost:4321`。

构建与预览：

```bash
npm run build
npm run preview
```

构建结果在 `dist/`。把它交给任何静态托管即可。

## 上线前

`astro.config.mjs` 里的 `site` 目前是占位来源 `https://bayexie.github.io`。换成正式域名后再构建，这样规范链接、Open Graph 和站点地图才会指向正确地址。`public/robots.txt` 里的 Sitemap 地址也要一起改。

## 页面

| 路径 | 内容 |
| --- | --- |
| `/` | 名字、身份，以及进入三场战役的路径 |
| `/work/` | 作品索引 |
| `/work/crazy-barbershop/` | 开心麻花《疯狂理发店》 |
| `/work/xingdong-global/` | 兴业银行「兴动全球」 |
| `/work/andu/` | 短剧《暗渡》 |
| `/about/` | 职业路径 |
| `/contact/` | 工作邀约 |

## 联系方式

站点不公布电话、邮箱或即时通讯账号。联系页上的文字只在访客自己的浏览器里生成，不发送、不保存。

## 字体与图片

正文字体与标题字体已按页面用字子集化，放在 `public/fonts/`。Noto Serif SC、Noto Sans SC、Instrument Serif、Outfit 均为 SIL Open Font License，许可证见 `public/fonts/OFL.txt`。

图片源文件经过压缩后放在 `src/assets/images/`。构建时由 Astro 输出 AVIF、WebP 和回退格式，并带上 `srcset`。首屏以下的图片懒加载。

若要按源文件重新子集化字体并生成分享图：

```bash
npm run fonts
```

## 动作与无障碍

动效只做轻微的出现，并且服从 `prefers-reduced-motion`。内容不依赖动画才能看到。导航不用汉堡菜单，也不在滚动时藏起来。
