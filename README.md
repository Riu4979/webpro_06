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
1. ターミナルで```webpuro_06```まで移動
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
1. ```node app5.js```を起動する
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

start["開始"]
end1["終了"]
if1{"cpuがグーを出したか"}
if2{"cpuがチョキを出したか"}
if3{"cpuがパーを出したか"}
if4{"ユーザーがグーを出したか"}
if5{"ユーザーがチョキを出したか"}
if6{"ユーザーがパーを出したか"}
win["勝ち"]
lose["負け"]
draw["引き分け"]
error["エラー"]

start --> if1
if1 -->|yes|if4
if1 -->|no|if2
if4 -->|yes|draw
if4 -->|no|if5
if5 -->|yes|lose
if5 -->|no|if6
if6 -->|yes|win
if6 -->|no|error
if2 -->|yes|if4
if2 -->|no|if3
if4 -->|yes|win
if4 -->|no|if5
if5 -->|yes|draw
if5 -->|no|if6
if6 -->|yes|lose
if6 -->|no|error
if3 -->|yes|if4
if4 -->|yes|lose
if4 -->|no|if5
if5 -->|yes|win
if5 -->|no|if6
if6 -->|yes|draw
if6 -->|no|error
win --> end1
lose --> end1
draw --> end1
error --> end1
```
### あっち向いてホイについて
1. ```node app5.js```を起動する
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
if4{"ユーザーが左を出したか"}
if5{"cpuが上を出したか"}
if6{"cpuが下を出したか"}
if7{"cpuが右を出したか"}
if8{"cpuが左を出したか"}
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
if2 -->|yes|if5
if2 -->|no|if3
if5 -->|yes|lose
if5 -->|no|if6
if6 -->|yes|win
if6 -->|no|if7
if7 -->|yes|lose
if7 -->|no|if8
if8 -->|yes|lose
if8 -->|no|error
if3 -->|yes|if5
if3 -->|no|if4
if5 -->|yes|lose
if5 -->|no|if6
if6 -->|yes|lose
if6 -->|no|if7
if7 -->|yes|win
if7 -->|no|if8
if8 -->|yes|lose
if8 -->|no|error
if4 -->|yes|if5
if5 -->|yes|lose
if5 -->|no|if6
if6 -->|yes|lose
if6 -->|no|if7
if7 -->|yes|lose
if7 -->|no|if8
if8 -->|yes|win
if8 -->|no|error
win --> end1
lose --> end1
error --> end1
```
### 数字が被らないようにするゲームについて


## Gitで管理する方法