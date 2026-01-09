# Reactの実例で覚えるCLS

---

## CLSとは

web.devの解説がわかりやすいです
読みましょう
https://web.dev/articles/cls?hl=ja

CLSスコアは0.1を超えたらアウト！

---

## 動かしてみる

こちらにアクセス
https://onfi.github.io/react-cls/build/client/1/

ソース
https://github.com/onfi/react-cls/blob/main/app/routes/1.tsx

Divが3つあり、真ん中のDivがsetTimeoutで1秒後に表示する

---

## 計ってみる

Chromeのデベロッパーツールで簡単に測れます

Performanceタブを開くだけ
![devtools](img/devtools-performance.png)

ReactやVueで開発するときは、常に開きましょう

---

## スコアの計算

画面の半分覆ってた下段エリアが0.5 * 真ん中エリアが画面の0.3分ズラした

0.5 * 0.3 = **CLSスコアは0.15**

画面の広いエリアが、いったん表示してからズレるのがダメ！

---

## 計ってみる2

web.devのPageSpeed Insights
https://pagespeed.web.dev/

SEO的な観点でかなり信頼できる計測してくれます

ただし開発環境では計れません
ChromeのデベロッパーツールLighthouseタブのAnalyze page loadを代替的に使えます

---

## いろんなパターンを見てみる

ズレる時間を変えてみる

## 0.001秒でズラす

人間の目には軽いちらつきにしか見えませんが、アウト

https://onfi.github.io/react-cls/build/client/2/
https://github.com/onfi/react-cls/blob/main/app/routes/2.tsx


## 10秒でズラす

全然アウトですが、Lighthouseではノーカンです


https://onfi.github.io/react-cls/build/client/3/
https://github.com/onfi/react-cls/blob/main/app/routes/3.tsx