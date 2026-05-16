---
theme: ./
title: 細かすぎて刺さる人が少なそうな Slidev のプチテクニック
info: |
author: dayflower
defaults:
  layout: center
layout: cover
class: bg-blue-950 text-white
---

# 細かすぎて刺さる人が少なそうな Slidev のプチテクニック

[@dayflower](https://github.com/dayflower)

https://github.com/dayflower/article-slidev-tips

---

プレゼンつくるときはだいたい [Slidev](https://sli.dev/) を使っているが、
利用しているうえでたまってきたノウハウを書こうかと思った。
(生成 AI に聞いてもちゃんと答えられなかったところも多いので)

---

ということでテクニックというよりは、自分好みの [Slidev](https://sli.dev/) の使い方です。

---
layout: section
---

## スライドとテーマを同居させる

---

自分がつくるスライドのテーマが決まりきっているのであれば、[ガイドに従って](https://sli.dev/guide/write-theme)テーマを作成したほうがいいかもしれないが、個人的にはスライドごとに見た目を変えたりしているし、テーマ化してしまうとテーマの調整がめんどくさくなってしまう。なので、スライドとテーマを同居させている。

---

といっても Slidev ではもともと[スライド内に Layout を置いたり](https://sli.dev/guide/write-layout)[スタイルを置いたり](https://sli.dev/custom/directory-structure#style) できるので、それを "テーマの同居" と呼んでいるだけ。

---

[スライドプロジェクトのディレクトリ構造](https://sli.dev/custom/directory-structure) は、基本的にカスタムスライドテーマと同じなので、特別なことはほぼなにもしなくていいのだが、 Headmatter (ドキュメント内最初の Frontmatter) の `theme` を指定しないと、 Slidev の [default theme](https://github.com/slidevjs/themes/tree/main/packages/theme-default) が適用されてしまう。

---

適用を止めるためには Headmatter に

```yaml
theme: ./
```

と書けばいい。

(これはカスタムテーマ作成時に[テーマを Preview する方法](https://sli.dev/guide/write-theme#previewing) を応用している)

---
layout: section
---

## 同居テーマにどのファイルをおけばいいか

---

先ほど述べたように、[スライドプロジェクトのディレクトリ構造](https://sli.dev/custom/directory-structure) と (カスタム) テーマのディレクトリ構造はほぼ同一なので、このディレクトリ構造に従ったファイルを置けばいい (というか、ものによっては scaffold がすでに設置してたりする)。

が、実質必要になってくるのは [layouts](https://sli.dev/guide/write-layout) と [styles](https://sli.dev/custom/directory-structure#style) あたりでしょう。

---
layout: section
---

### styles を整備する

---

プロジェクトディレクトリに `style.css` をおいておくと読み込んではくれるが、同居テーマとしてはやはり `styles/` ディレクトリをつくっておいていくほうが応用が効く。

デフォルトテーマを剥がしてあるので、各種スタイルを自分で書く必要があるが、もともとあるテーマの `styles/` ディレクトリを参考にすればよい。

---

ミニマムに始めるには、[default theme](https://github.com/slidevjs/themes/tree/main/packages/theme-default) の [`styles/`](https://github.com/slidevjs/themes/tree/main/packages/theme-default/styles) をまるっとコピペすればいい。が、そもそも scaffold で生成されたプロジェクトでは default theme が `node_modules/` にあるので、 import 等を活用すると `styles/index.ts` は以下のようになる。

```ts
import "@slidev/client/styles/layouts-base.css";
import "@slidev/theme-default/styles/prism.css";
import "./layouts.css";
```

Slidev のコアで定義されているスタイルを利用しつつ default theme の Prism (シンタックスハイライト) 用スタイルも読み込んでいる。あとは [default thmeme の `layouts.css`](https://github.com/slidevjs/themes/blob/main/packages/theme-default/styles/layouts.css) だけ手元にもってくればいい。

---
layout: section
---

### layouts を整備する

---

`layouts/` ディレクトリになにもなくても Slidev のコアで定義された layouts を継承するので、カスタムレイアウトを作りたいとかでもない限り、基本設置する必要はない。

---

逆にいうとデフォルトっぽいレイアウト、どんな構造かなと確認する場合は [default theme の `layouts/`](https://github.com/slidevjs/themes/tree/main/packages/theme-default/layouts) だけ見るのは不十分で、[コア側の `layouts/`](https://github.com/slidevjs/slidev/tree/main/packages/client/layouts) も見る必要がある。

といっても、 layout の見た目を規定するのって layouts ファイルというよりどちらかというとおもに上記の `styles/` (の `layouts.css`) なんですけどね……

---

もちろん定義済の layout だけではなく、カスタム layout も設置できる。
個人的には `bigemoji` layout を定義したりしている。

---

#### layouts で background prop を使う

ドキュメントを読んでいると、スライド背景に画像等を貼るのに `background` frontmatter property がある、ように感じるが、これは Slidev がネイティブに共通にサポートしているというより、レイアウトファイルのほうでそれをハンドリングしているだけである。

---

実は default theme で `background` 指定ができるのは `cover` layout (デフォルトで1番最初のスライドで利用される) だけである (default theme 側でそういう実装をしている)。

(ほかに theme scaffold で生成した場合は `intro` layout も対象になるが、なぜか default theme では `intro` layout も `background` property をサポートしていない)

---

違う layout でも `background` 指定をしたい場合、自分で layout ファイルを書く必要があるが、 [default theme の `cover` layout](https://github.com/slidevjs/themes/blob/main/packages/theme-default/layouts/cover.vue) を参考にすればいい。すればいいのだが、これはテーマに同梱された [`layoutHelper.ts`](https://github.com/slidevjs/themes/blob/main/packages/theme-default/layoutHelper.ts) で定義されている `handleBackground()` を使っている。

同居テーマでもこれを定義してもいいのだが、実は Slidev core にも含まれているので、わざわざ `handleBackground()` をコピーしてもってくる必要はない。

---

たとえば `fact` layout で `background` property をサポートする例はこちら:

```vue
<script setup lang="ts">
import { handleBackground } from "@slidev/client/layoutHelper.ts";
import { computed } from "vue";

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background, true));
</script>

<template>
  <div class="slidev-layout fact" :style="style">
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
```

---
layout: section
---

## Headmatter の設定を一部切り離す

---

たとえば `slides.md` の frontmatter に

```yaml
---
fonts:
  sans:
    - Roboto
    - Noto Color Emoji
```

と書くと、 Roboto font, Noto Color Emoji font が利用される。

---

が、せっかくテーマを同居させているので、できればスライド本体には書きたくないですよね。

---

こういう Headmatter での設定 ([Slides deck の設定](https://sli.dev/custom/#headmatter) のデフォルト) は、 `package.json` に書くことができる。
(これは[カスタムテーマでのデフォルト設定機能](https://sli.dev/guide/write-theme#capability)を応用するもの。同居テーマでも効くのだ。)

```json
{
  "slidev": {
    "defaults": {
      "fonts": {
        "sans": [
          "Roboto",
          "Noto Color Emoji"
        ]
      }
    }
  }
}
```

---

と、思っていたが、一部の設定 (`defaults.layout`, `drawing.*`) は効かなさそうだ。
([コード的にも](https://github.com/slidevjs/slidev/blob/c035c863e76a0903899a635d335850a7fcb41f7e/packages/parser/src/config.ts#L73-L99))

---

すべての Headmatter の設定を `package.json` に寄せるのもどうかと思うので、フォントなど完全に見た目っぽいものだけ追い出す方がいい気はする。

---
layout: section
---

## 利用されるフォントのウェイトを変える

---

[UnoCSS の設定](https://sli.dev/custom/config-unocss) で変更できる。

---

`uno.config.ts` ファイルを (プロジェクトルート) に設置し、たとえば以下のように記述する。

```ts
import { defineConfig } from "unocss";

export default defineConfig({
  theme: {
    fontWeight: {
      normal: "100",
      bold: "800",
    },
  },
});
```

---

あくまで UnoCSS 的に `font-normal` の場合 weight が 100 になり、 `font-bold` の場合に 800 になるだけなので、別途 CSS 側でそれらが使われるようにする必要がある。

---

```css
.slidev-layout {
  @apply font-normal;

  strong, b, th, dt {
    @apply font-bold;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-extrabold;
  }
}
```

ただ、結局 CSS 側で指定する必要があるので、これは結局スタイル側で `.slidev-layout { @apply font-100; }` ってやるのと同じですね。

まあセマンティックなほうが好きであれば。

---

`uno.config.ts` ファイルはこれだけではなく、 shortcut (複数のスタイルをまとめた class token) を定義するのにも便利である。 くわしくは [Configure UnoCSS | Slidev](https://sli.dev/custom/config-unocss) を参照してほしい。

---
layout: section
---

## Headmatter や Frontmatter の設定を詳しく知る

---

[Customizations | Slidev](https://sli.dev/custom/) で一通り解説されているのだが、それぞれどのような値が指定できるのか (単一の string なのか配列なのか) についてはドキュメントだけ見てもよくわからない。

そのような時は、 [packages/types/src/frontmatter.ts](https://github.com/slidevjs/slidev/blob/c035c863e76a0903899a635d335850a7fcb41f7e/packages/types/src/frontmatter.ts) をみるとわかる。
(自分も fonts に複数指定できることはこれで知った)

---

以上
