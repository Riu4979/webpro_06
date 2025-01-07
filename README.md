# webpro_06

## このプログラムについて

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんの表示設定
```javascript
console.log( 'Hello' );
```

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
lose["負け"]

start --> if
if -->|yes|win
win --> end1
if -->|no|lose
lose --> end1
```

## 使用方法
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

##　課題内容

## 起動方法
1. ターミナルで```webpro_06```まで移動
2. ターミナルで```node app5.js```と入力，実行する
3. ```telnet localhost 8080```とにゅうりょくする
4. ```GET /(表示するファイル名) HTTP/1.1``
改行，さらに```Host: localhost```と入力し，2回改行する．

## 機能

### hello1について
1. ターミナルで```node app5.js```と入力する
2. ブラウザで```localhost:8080/public/show.html```にアクセスする
3. web上に挨拶が表示される

### hello2について
hello1と表示内容は同じ
hello2では，hello1のときに定義していた変数message1，message2を直接greetに入れている

### Iconについて
1. ターミナルで```node app5.js```を起動する
2. ブラウザで```localhost:8080/public/icon.html```にアクセスする
3. アイコンが表示される

### おみくじについて
1. ターミナルで```node app5.js```を起動する
2. ブラウザで```localhost:8080/public/luck.html```にアクセスする
3. ランダムで運勢が表示される

### じゃんけんについて
1. ターミナルで```node app5.js```を起動する
2. ブラウザで```localhost:8080/public/janken.html```にアクセスする
3. グー，チョキ，パーそれぞれの入力に対応してランダムにcpuの手が判定される
4. ユーザーの手とcpuの手から勝敗が判定される
5. 勝敗に応じて，判定，勝利数，試合数が表示される

ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんの表示設定

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"cpuがパーを出したか"}
if2{"プレイヤーがグーを出したか"}
if3{"プレイヤーがチョキを出したか"}
if4{"プレイヤーがパーを出したか"}
if5{"cpuがグーを出したか"}
judgement["cpuがチョキを出す"]
if6{"プレイヤーがチョキを出したか"}
if7{"プレイヤーがパーを出したか"}
if8{"プレイヤーがグーを出したか"}
if9{"プレイヤーがパーを出したか"}
if10{"プレイヤーがグーを出したか"}
if11{"プレイヤーがチョキを出したか"}
win["勝ち"]
lose["負け"]
draw["引き分け"]
error["エラー"]

start --> if
if --> |yes| if2
if --> |no| if5
if2 --> |yes| lose
if2 --> |no| if3
if3 --> |yes| win
if3 --> |no| if4
if4 --> |yes| draw
if4 --> |no| error
if5 --> |yes| if6
if5 --> |no| judgement
if6 --> |yes| lose
if6 --> |no| if7
if7 --> |yes| win
if7 --> |no| if8
if8 --> |yes| draw
if8 --> |no| error
judgement --> if9
if9 --> |yes| lose
if9 --> |no| if10
if10 --> |yes| win
if10 --> |no| if11
if11 --> |yes| draw
if11 --> |no| error
win --> end1
lose --> end1
draw --> end1
error --> end1
```
### あっち向いてホイについて
1. ターミナルで```node app5.js```を起動する
2. ブラウザで```localhost:8080/public/hoi.html```にアクセスする
3. 上，下，右，左から一つを選択する
4. cpuがランダムで方向を選択して，ユーザーが選んだ方向と同じか判定する
5. 同じなら勝ち，違えば負けとして，判定，勝利数，試合数を表示する

ファイル名 | 説明
-|-
app5.js | プログラム本体
public/hoi.html | あっち向いてホイの開始画面
views/hoi.ejs | あっち向いてホイの表示設定

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"ユーザーが上を出したか"}
if2{"ユーザーが下を出したか"}
if3{"ユーザーが右を出したか"}
judgement["ユーザーが左を出したか"]
if5{"cpuが上を出したか"}
if6{"cpuが下を出したか"}
if7{"cpuが右を出したか"}
if8{"cpuが左を出したか"}
if9{"cpuが上を出したか"}
if10{"cpuが下を出したか"}
if11{"cpuが右を出したか"}
if12{"cpuが左を出したか"}
if13{"cpuが上を出したか"}
if14{"cpuが下を出したか"}
if15{"cpuが右を出したか"}
if16{"cpuが左を出したか"}
if17{"cpuが上を出したか"}
if18{"cpuが下を出したか"}
if19{"cpuが右を出したか"}
if20{"cpuが左を出したか"}
win["勝ち"]
lose["負け"]
error["エラー"]

start --> if1
if1 -->|yes|if5
if1 -->|no|if2
if5 -->|yes|win
if5 -->|no|if6
if6 -->|yes|lose
if6 -->|no|if7
if7 -->|yes|lose
if7 -->|no|if8
if8 -->|yes|lose
if8 -->|no|error
if2 -->|yes|if9
if2 -->|no|if3
if9 -->|yes|lose
if9 -->|no|if10
if10 -->|yes|win
if10 -->|no|if11
if11 -->|yes|lose
if11 -->|no|if12
if12 -->|yes|lose
if12 -->|no|error
if3 -->|yes|if13
if3 -->|no|judgement
if13 -->|yes|lose
if13 -->|no|if14
if14 -->|yes|lose
if14 -->|no|if15
if15 -->|yes|win
if15 -->|no|if16
if16 -->|yes|lose
if16 -->|no|error
judgement -->|yes|if17
if17 -->|yes|lose
if17 -->|no|if18
if18 -->|yes|lose
if18 -->|no|if19
if19 -->|yes|lose
if19 -->|no|if20
if20 -->|yes|win
if20 -->|no|error
win --> end1
lose --> end1
error --> end1
```
### 数字が被らないようにするゲームについて
1. ターミナルで```node.app5.js```を起動する
2. ブラウザで```localhost:8080/public/suuji.html```にアクセスする
4. 1~6の数字を入力，実行する
5. cpuの数字がランダムで判定され，ユーザーと同じ場合負け，違う場合勝ちとする．
6. ユーザーの数字，cpuの数字，判定，勝利数，試合数を表示する

ファイル名 | 説明
-|-
app5.js | プログラム本体
public/suuji.html | 数字を一致させないゲームの開始画面
views/suuji.ejs | 数字を一致させないゲームの表示設定


```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"ユーザーが1を出したか"}
if2{"ユーザーが2を出したか"}
if3{"ユーザーが3を出したか"}
if4{"ユーザーが4を出したか"}
if5{"ユーザーが5を出したか"}
fi6{"ユーザーが6を出したか"}
if7{"cpuの数字と一致したか"}
win["勝ち"]
lose["負け"]
error["エラー"]

start --> if1
if1 -->|yes|if7
if1 -->|no|if2
if2 -->|yes|if7
if2 -->|no|if3
if3 -->|yes|if7
if3 -->|no|if4
if4 -->|yes|if7
if4 -->|no|if5
if5 -->|yes|if7
if5 -->|no|if6
if6 -->|yes|if7
if6 -->|no|error
if7 -->|yes|lose
if7 -->|no|win
win -->end1
lose -->end1
error -->end1
```

## Gitで管理する方法
1. 適切なディレクトリに移動する
2. ターミナルで```git add .```と入力する
3. コメントを```git commit -am '入力するコメント'```でコメントの部分に入力する
4. ```git push```で更新する

### 掲示板の編集機能について
1. ターミナルで```node.app8.js```を起動する
2. ブラウザでlocalhost:8080/public/bbs.htmlにアクセスする
3. 名前，メッセージを入力し，投稿をチェックする
4. 編集を押し，入力し直す
5. 投稿した内容が変更される

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"クライアントが編集ボタンを押す"}
if2{"id，名前，メッセージを読み取る"}
if3{"編集中の投稿のidを作成する"}
if4{"内容を変更し，送信を押す"}
if5{"編集元の投稿がある"}
if6{"投稿に表示される"}
error["エラー"]

start --> if1
if1 -->|yes|if2
if1 --> if3
if2 --> if4
if3 --> if4
if4 --> if5
if5 -->|yes|if6
if6 --> end1
if6 -->|no|error
```

### 掲示板の削除機能について
1. ターミナルで```node.app8.js```を起動する
2. ブラウザでlocalhost:8080/public/bbs.htmlにアクセスする
3. 名前，メッセージを入力し，投稿をチェックする
4. 削除を押すと内容が消去される

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"削除ボタンを押す"}
if2{"その投稿のidを読み取る"}
if3{"idの削除を実行する"}
if4{"投稿から内容が消去される"}

start --> if1
if1 --> if2
if2 --> if3
if3 --> if4
if4 --> end1
```
### 掲示板の返信機能について
1. ターミナルで```node.app8.js```を起動する
2. ブラウザでlocalhost:8080/public/bbs.htmlにアクセスする
3. 名前，メッセージを入力し，投稿をチェックする
4. 返信を押し，名前，メッセージを入力して送信する
5. 元のメッセージの下に内容が表示される

```mermaid
flowchart TD;

start["開始"]
end1["終了"]
if1{"返信ボタンを押す"}
if2{"元投稿によるidを作成する"}
if3{"名前，メッセージを入力，送信する"}
if4{"返信元の投稿がある"}
if5{"返信を表示する"}
error["エラー"]

start --> if1
if1 --> if2
if2 --> if3
if3 -- if4
if4 -->|yes|if5
if4 -->|no|error
if5 --> end1
```