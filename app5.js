const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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
  let c;
  if(cpu === "グー"){
    if(hand === "チョキ") c = 0;
    else if(hand === "グー") c = 1;
    else if(hand === "パー") c = 2;
    else c = 3
  }else if(cpu ==="チョキ"){
    if(hand === "パー") c = 0;
    else if(hand === "チョキ") c = 1;
    else if(hand === "グー") c = 2;
    else c = 3
  }else if(cpu === "パー"){
    if(hand === "グー") c = 0;
    else if(hand === "パー") c = 1;
    else if(hand === "チョキ") c = 2;
    else c = 3
  };

  // 今はダミーで人間の勝ちにしておく
  let judgement;
  if(c === 2){
    judgement = "勝ち";
    win += 1;
    total += 1;
  }else if(c ===1){
    judgement = "あいこ";
    total += 1;
  }else if(c ===0){
    judgement = "負け";
    total += 1;
  }else{
    judgement = "エラー"
  }
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/hoi", (req, res) => {
  let direction = req.query.direction;
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  console.log({ direction, win, total });

  const directions = ["右", "左", "上", "下"];
  const cpuDirection = directions[Math.floor(Math.random() * directions.length)];

  let judgement = '';
  if (direction === cpuDirection) {
      judgement = "勝ち";
      win += 1;
      total += 1;
  } else {
      judgement = "負け";
      total += 1;
  }

  res.render("hoi", {
      your: direction,
      cpu: cpuDirection,
      judgement: judgement,
      win: win,
      total: total
  });
  res.render( 'hoi', display );
});


app.get("/suuji", (req, res) => {
  // ユーザーからの入力を取得
  let number = req.query.number;
  let win2 = Number(req.query.win2);  // 勝ち数
  let total = Number(req.query.total); // 試合数
  console.log({ number, win2, total });

  // コンピュータがランダムに出す数字を生成
  const num = Math.floor(Math.random() * 6 + 1);  // 1〜6のランダムな数字
  let cpu = num.toString();  // 数字を文字列に変換

  // 勝敗の判定
  let judgement;
  if (cpu === number) {
    judgement = "負け";
    total += 1;
  } else {
    judgement = "勝ち";
    win2 += 1;
    total += 1;
  }

  // 結果を表示するためのオブジェクトを作成
  const display = {
    your: number,   // ユーザーが出した数字
    cpu: cpu,       // コンピュータが出した数字
    judgement: judgement, // 勝敗
    win2: win2,     // 勝ち数
    total: total    // 試合数
  };

  // suuji.ejs をレンダリング
  res.render('suuji', display);
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));