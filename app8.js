"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const id = bbs.length + 1;  // IDを付与
  console.log([name, message]);
  // 本来はここでDBMSに保存する
  bbs.push({ id: id, name: name, message: message });
  res.json({ number: bbs.length });
});

// 返信を作成
app.post("/reply", (req, res) => {
  const { name, message, parentId } = req.body;
  // 親投稿を検索
  const parentPost = bbs.find(post => post.id === Number(parentId));
  // 親投稿が見つからなかった場合の処理
  if (!parentPost) {
    return res.status(404).json({ error: "Parent post not found" });
  }
  // 親投稿が返信プロパティを持っていない場合、空の配列で初期化
  if (!parentPost.replies) {
    parentPost.replies = [];
  }
  // 新しい返信の作成
  const replyId = parentPost.replies.length + 1;  // 返信IDを生成
  const reply = { id: replyId, name, message };
  // 親投稿に返信を追加
  parentPost.replies.push(reply);
  // 返信が追加された親投稿を返す
  res.json({ success: true, post: parentPost });
});

// 投稿削除 (POSTメソッドに変更)
app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  bbs = bbs.filter(post => post.id !== id);
  res.json({ number: bbs.length });
});

// 投稿更新
app.post("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, message } = req.body;
  const postIndex = bbs.findIndex(post => post.id === id);
  if (postIndex !== -1) {
    bbs[postIndex] = { id, name, message, replies: bbs[postIndex].replies };
    res.json({ success: true, post: bbs[postIndex] });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// 投稿取得
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  res.json({ messages: bbs.slice(start) });
});


app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));