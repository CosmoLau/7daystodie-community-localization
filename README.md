# 七日杀社区中文翻译日志生成器

## 项目准备

克隆此仓库

```bash
git clone https://github.com/CosmoLau/7daystodie-community-localization.git
```

安装 Bun 依赖（_注意_：此项目为 Bun 项目，需要先[安装 Bun 环境](https://bun.sh/docs/installation)）

```bash
bun install
```

## 游戏文件

游戏中的本地化翻译文件需要放在 `public/gamefile/Localization.txt` 位置，每次更新此文件时，需要同步修改 `public/gamefile/version.txt` 中的版本号。

## 社区翻译文件

社区翻译生成的文件需要放在 `public/community/Localization.txt` 位置。

## 生成修改日志

完成以上步骤后，执行生成脚本：

```bash
bun run ./generator.ts
```

完成后，生成的日志会在根目录下的 `output.txt` 中。
