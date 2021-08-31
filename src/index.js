import "./styles.css";
// 未完了のTODOを格納する配列を用意
let incompleteTodo = [];
// let incompleteTodoStorage = ["TODOです1", "TODOです2", "TODOです３"];
// let incompleteTodoStorage = [];
// localStorage.setItem("incompletedata", JSON.stringify(incompleteTodoStorage));
// console.log(typeof incompleteTodo); // object
// 完了したTODOを格納する配列を用意
// let completeTodo = [];
// let completeTodoStorage = ["TODOでした１", "TODOでした２"];
let completeTodoStorage = [];
// localStorage.setItem("completedata", JSON.stringify(completeTodoStorage));

const renderTodo = () => {
  //　 存在するDOMの初期化
  // incompleteTodoを初期化する
  const incompleteNode = document.getElementById("incomplete-list");
  while (incompleteNode.firstChild) {
    incompleteNode.removeChild(incompleteNode.firstChild);
  }
  //completeTodoを初期化する
  const completeNode = document.getElementById("complete-list");
  while (completeNode.firstChild) {
    completeNode.removeChild(completeNode.firstChild);
  }
  // 未完了のリストをローカルストレージから取り出して１つずつ表示する処理
  const showincompleteTodo = JSON.parse(localStorage.getItem("incompletedata"));
  // 表示されたリストにdata-indexを与えたい　　document.getElementsByclassname("list-row").;
  showincompleteTodo.forEach((task, index) => {
    showincompletetask(task, index);
  });
  // 完了リストをローカルストレージから取り出して１つずつ表示する処理
  const showcompleteTodo = JSON.parse(localStorage.getItem("completedata"));
  showcompleteTodo.forEach((task, index) => {
    showcompletetask(task, index);
  });
};

const showincompletetask = (task, index) => {
  const div = document.createElement("div");
  div.className = "list-row";
  const listItem = document.createElement("li");
  div.dataset.index = index;
  listItem.innerText = task;
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () =>
    completeButtonFunc(completeButton.parentNode)
  );
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () =>
    deleteButtonFunc(deleteButton.parentNode)
  );

  //　追加する場所を指定して必要な要素を追加する
  div.appendChild(listItem);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  document.getElementById("incomplete-list").appendChild(div);
};

const showcompletetask = (task, index) => {
  const div = document.createElement("div");
  div.className = "list-row";
  div.dataset.index = index;
  const listItem = document.createElement("li");
  listItem.innerText = task;
  const backButton = document.createElement("button");
  backButton.innerText = "戻す";
  backButton.addEventListener("click", () =>
    backButtonFunc(backButton.parentNode)
  );
  div.appendChild(listItem);
  div.appendChild(backButton);
  document.getElementById("complete-list").appendChild(div);
};

// 再読込が走ったらrenderTodoが流れる関数を指定
document.addEventListener("DOMContentLoaded", renderTodo());

// 常に初期化されてしまうので一旦コメントアウト
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

// TODOを追加する関数を作成
const onClickAdd = () => {
  const InputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  // let incompleteTodoStorage = [];
  // localStorage.setItem("incompletedata", JSON.stringify(incompleteTodoStorage));
  // let completeTodoStorage = [];
  // localStorage.setItem("completedata", JSON.stringify(completeTodoStorage));
  const newincompleteTodo = JSON.parse(localStorage.getItem("incompletedata"));
  newincompleteTodo.push(InputText);
  localStorage.setItem("incompletedata", JSON.stringify(newincompleteTodo));
  renderTodo();
};

// ボタンの関数はできるだけストレージの操作のみにとどめたい
// ストレージの中身を操作して、操作後ストレージへ保存したら都度renderTodo()dで読み込むようにする
// 完了ボタンを押したときの関数を記載する
const completeButtonFunc = (target) => {
  const deleteindex = Number(target.dataset.index); // cannnot read property dataset of undefined
  const showincompleteTodo = JSON.parse(localStorage.getItem("incompletedata"));
  const addtoCompleteList = showincompleteTodo[deleteindex];
  const showcompleteTodo = JSON.parse(localStorage.getItem("completedata"));
  showcompleteTodo.push(addtoCompleteList);
  localStorage.setItem("completedata", JSON.stringify(showcompleteTodo));
  showincompleteTodo.splice(deleteindex, 1);
  localStorage.setItem("incompletedata", JSON.stringify(showincompleteTodo));
  renderTodo(); // これがないとTodoが移動しないが重複した値が表示される
};

// 削除ボタンを押したときの関数を記載する
const deleteButtonFunc = (target) => {
  // alert("削除ボタンテスト");
  const deleteindex = Number(target.dataset.index); // cannnot read property dataset of undefined
  const showincompleteTodo = JSON.parse(localStorage.getItem("incompletedata"));
  showincompleteTodo.splice(deleteindex, 1);
  localStorage.setItem("incompletedata", JSON.stringify(showincompleteTodo));
  renderTodo();
};

// 戻すボタンを押したときの関数を記載
const backButtonFunc = (target) => {
  const deleteindex = Number(target.dataset.index); // cannnot read property dataset of undefined
  const showcompleteTodo = JSON.parse(localStorage.getItem("completedata"));
  const addtoIncompleteList = showcompleteTodo[deleteindex];
  const showincompleteTodo = JSON.parse(localStorage.getItem("incompletedata"));
  showincompleteTodo.push(addtoIncompleteList);
  localStorage.setItem("incompletedata", JSON.stringify(showincompleteTodo));
  showcompleteTodo.splice(deleteindex, 1);
  localStorage.setItem("completedata", JSON.stringify(showcompleteTodo));
  renderTodo();
};

// 残課題
// ボタンを押した時に重複した値が表示されることについて
// 新しいTodoを追加しようとすると一時的に追加されるが、再読み込み処理がはしり、初期化されてしまう
// HTMLの要素を記載し直すこと
