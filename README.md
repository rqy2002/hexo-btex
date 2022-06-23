# hexo-btex

hexo-btex 是一个基于 [btex](https://github.com/rqy1458814497/btex/tree/hexo-btex)
的 [hexo](https://hexo.io) 渲染器，负责将 tex 源码转化为静态网页并在 Hexo 博客上展示。

## 使用方法

### 准备工作

下载 [btex](https://github.com/rqy1458814497/btex/tree/hexo-btex) 包及本包，
将本包路径加入 Hexo 项目 `package.json` 的 `dependencies` 中，并移除 `hexo-generator-index`，形如
```json
...
  "dependencies": {
    "hexo": "^6.2.0",
    "hexo-renderer-btex": "file:PATH/TO/hexo-btex",
    ...
  }
...
```
并修改本包 `package.json` 的 `dependencies` 中 `btex` 的路径。
（目前还很不完善，暂时不考虑发布到 npm。）

此外，您需要在主题的配置文件（不是博客主目录下的配置文件！）
`_config.yml` 中指定 `prop_color`, `defn_color`, `rmk_color` 三种颜色，如
```yaml
prop_color: '#fffafb'
defn_color: '#f0fbfe'
rmk_color: '#fcfff7'
```
也可在主目录的配置文件中指定：
```yaml
theme_config:
  prop_color: '#fffafb'
  defn_color: '#f0fbfe'
  rmk_color: '#fcfff7'
```

### 编写文章

因 `hexo` 的 `posts` 类型文章似乎仅支持 `markdown` 文件生成（硬编码在 `hexo` 主软件包里？），
使用 `tex` 编写的博客文章**不能**放在 `source/_posts` 文件夹内，
而应当放置于 `source/xxx` 内，其中 `xxx` 是任意**不以下划线开头的**文件夹。
若文章需要导言，可将导言存储为相同文件夹下的 `_preamble.tex` 文件。
存储在 `xxx/yyy.tex` 的文件将会生成为 `/xxx/yyy/index.html`。

`tex` 文件开头仍然可以有 Front-matter。其会被 `hexo` 识别并处理，不用担心被 `btex` 渲染。

可以使用 `% MORE` （必须写在行首）截断文章，使其前面的部分成为文章摘要展示在博客首页。

需注意的是源码中连续的两个 `{{` 可能会被 `hexo` 识别为 swig tag 的开始，应避免。

## TODOs
- [ ] 添加颜色默认值（本人选的配色太难看了，不敢指定为默认值）。
- [ ] 增加插入图片功能。
