let timer = null;
const MAX = 3;
let count = 0;
const APPLICATION_KEY = "35ac10a8e9ce45f87353462dacf13487497c8079c82f6ea06a89f954b5e02a07";
const CLIENT_KEY = "2018df36be71c687bafd571d91875cf0ac38460b376c4782b80c7f384bf38efe";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";
let TestClass = ncmb.DataStore(DBName);

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}


function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for (let i=0; i<size*size; i++) {
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num" + i);
    s.addEventListener("click", function() {

      if (this.textContent == q[qNum][1]) {
        correct.play();
        count++;
        while (cells.firstChild) {
          cells.removeChild(cells.firstChild);
        }
        if (MAX == count) {
          clearTimeout(timer);
          alert("Game clear!");
          save();
          load();
        } else {
          gameStart();
        }
      } else {
        wrong.play();
      }
    });
/*
    // データの保存
    function save() {
      let test = new TestClass();
      let key = "message";
      // let value = "Hello, NCMB!";
      const text = document.getElementById('message');
      let value = text.value;
      test.set(key, parseInt(value));
      test.save()
        .then(function() {
          console.log("成功");
        })
        .catch(function(err) {
          console.log("エラー発生：" + err);
        });
    }

    // データの読み込み
    function load() {
      TestClass
      .order("message")
      .fetchAll()
      .then(function(results) {
        for (let i=0; i<results.length; i++) {
          console.log(results[i].message);
        }
      })
      .catch(function(err) {
        console.log("エラー発生：" + err);
      });
    }*/

    cells.appendChild(s);
    if (i % size == size - 1) {
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }

  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}


function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime()) / 1000); //経過時間
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}

function save() {
  let test = new TestClass();
  let key = "message";
  // let value = "Hello, NCMB!";
  const text = document.getElementById('message');
  let value = timer;
  test.set(key, parseInt(value));
  test.save()
    .then(function() {
      console.log("成功");
    })
    .catch(function(err) {
      console.log("エラー発生：" + err);
    });
}

// データの読み込み
function load() {
  TestClass
  .order("message")
  .fetchAll()
  .then(function(results) {
    for (let i=0; i<results.length; i++) {
      console.log(results[i].message);
      if(timer<results[0].message){
        alert("High score!"+timer);
      }
    }
  })
  .catch(function(err) {
    console.log("エラー発生：" + err);
  });
}
