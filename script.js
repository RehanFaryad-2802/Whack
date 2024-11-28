let Target = document.querySelectorAll(".target");
let Target_place;
// let scoreProgress = [];
// localStorage.setItem(
//   `${localStorage.getItem("currentName")}_progress`,
//   scoreProgress
// );
let score = 0;
let insertPos = (e) => {
  let Place = Math.floor(Math.random() * 25);
  if (Target[Place].textContent == "") {
    switch (e) {
      case 1:
        Target[Place].innerHTML = "<span class='angle'>😇</span>";
        Target[Place].querySelector(".angle").addEventListener("click", () => {
          score++;
        });
        break;
      case 2:
        Target[Place].innerHTML = "<span class='monster'>😈</span>";
        Target[Place].querySelector(".monster").addEventListener(
          "click",
          () => {
            score--;
          }
        );
        break;
      case 3:
        Target[Place].innerHTML = "<span class='angle'>😎</span>";
        Target[Place].querySelector(".angle").addEventListener("click", () => {
          score++;
        });
        break;
      case 4:
        Target[Place].innerHTML = "<span class='angle'>😀</span>";
        Target[Place].querySelector(".angle").addEventListener("click", () => {
          score++;
        });
        break;

      default:
        Target[Place].innerHTML = "<span class='monster'>😡</span>";
        Target[Place].querySelector(".monster").addEventListener(
          "click",
          () => {
            score--;
          }
        );
        break;
    }
    score = score < 0 ? 0 : score;
    document.querySelector(".score span").textContent = score;
  } else {
    insertPos();
  }
};
let inserTarget = () => {
  let randomNum = Math.random() * 100;
  if (randomNum >= 0 && randomNum <= 20) {
    insertPos(1);
  } else if (randomNum >= 21 && randomNum <= 40) {
    insertPos(2);
  } else if (randomNum >= 41 && randomNum <= 60) {
    insertPos(3);
  } else if (randomNum >= 61 && randomNum <= 80) {
    insertPos(4);
  } else {
    insertPos(false);
  }
};

let wait = async (e) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 1000);
  });
};
let remove = async (e) => {
  await wait();
  Target.forEach((e) => {
    e.innerHTML = "";
  });
};
let intervels;
let starterEnder = (e) => {
  if (e.target.value == 1) {
    e.target.textContent = "Start";
    Target.forEach((e) => {
      e.removeAttribute("disabled");
    });
    e.target.textContent = "End";
    e.target.value = 2;
    intervels = setInterval(() => {
      inserTarget();
      remove();
    }, 2000);
    timer();
  } else {
    clearInterval(intervels);
    clearInterval(timerTime);
    e.target.textContent = "Start";
    e.target.value = 1;
    Target.forEach((e) => {
      e.setAttribute("disabled", "true");
      score = 0;
    });
  }
};
let UserDefine = 10;
let timerTime,timeInSec,timerT;
try {
  if(localStorage.getItem('userTimer')){
    document.querySelector("#timeDura").addEventListener("change", (e) => {
      UserDefine = e.target.value;
      localStorage.setItem('userTimer',UserDefine)
    });
  }else{
    localStorage.setItem('userTimer',10)
  }
} catch (e) {
}
document.querySelector(".start").addEventListener("click", starterEnder);
let timer = (e) => {
  timeInSec = localStorage.getItem('userTimer');
  timerT = localStorage.getItem('userTimer');
  timerTime = setInterval(() => {
    let min = Math.floor(timeInSec / 60);
    let sec = timeInSec % 60;
    timeInSec--;
    document.querySelector(".timer").innerHTML = `${min} : ${sec}`;
    if (timeInSec < 0) {
      clearInterval(timerTime);
      clearInterval(intervels);
      document.querySelector(".start").textContent = "Start";
      document.querySelector(".start").value = 1;
      score = score < 0 ? 0 : score;
      document.querySelector(".score span").textContent = score;
      Target.forEach((e) => {
        e.setAttribute("disabled", "true");
      });
      let preScore =
        localStorage.getItem(
          `${localStorage.getItem("currentName")}_progress`
        ) || [];

      if (preScore) {
        try {
          preScore = preScore ? JSON.parse(preScore) : [];
        } catch (error) {
          
          preScore = [];
        }
      } else {
        preScore = [];
      }

      let progress = [score, timerT, localStorage.getItem("currentName")];
      preScore.push(progress);

      localStorage.setItem(
        `${localStorage.getItem("currentName")}_progress`,
        JSON.stringify(preScore)
      );
      score = 0;
    }
  }, 1000);
};

let current_user = "",
  current_pass = "";
let userId = [["admin", "1234"]];
window.addEventListener("load", () => {
  history.pushState(null, null, window.location.href);
});
document.querySelector(".logBTN").addEventListener("click", (e) => {
  history.replaceState(null, null, window.location.href);
  let GetuserName = document.querySelector("input[name=userName]").value;
  let GetuserPass = document.querySelector("input[name=passward]").value;
  let comming = [GetuserName, GetuserPass];
  let storedUserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  if((localStorage.getItem('UserInfo'))){
    if (
      storedUserInfo.some(
        (user) => user[0] === comming[0] && user[1] != comming[1]
      )
    ) {
      alert("Wrong Pass");
    }
    else if (
      storedUserInfo.some(
        (user) => user[0] === comming[0] && user[1] === comming[1]
      )
    ) {
      localStorage.setItem("currentName", comming[0]);
      localStorage.setItem("currentPass", comming[1]);
      window.location.href = "Game.html";
    } else {
      alert("User Does not exists. Try to sign up");
    }
  }else{
    alert("User Does not exists. Try to sign up");
  }
});

document.querySelector(".SignBTN").addEventListener("click", (e) => {
  let newName = document.querySelector(".newName").value;
  let newPass = document.querySelector(".newPass").value;
  let storedUserInfo = JSON.parse(localStorage.getItem("UserInfo")) || [];
  if (newName != "" && newPass != "") {
    let comming = [newName, newName];
    if (
      storedUserInfo.some(
        (user) => user[0] === comming[0] || user[1] === comming[1]
      )
    ) {
      alert("User Name Exists");
    } else {
      storedUserInfo.push([newName, newPass]);
      localStorage.setItem("UserInfo", JSON.stringify(storedUserInfo));
      localStorage.setItem("currentName", newName);
      localStorage.setItem("currentPass", newPass);
      window.location.href = "Game.html";
    }
  } else {
    alert("Enter complete Info");
  }
});
try {
  document.querySelector(".userNameHere h1").innerHTML =
    localStorage.getItem("currentName");
  document.querySelector(".UserPassward h2").innerHTML =
    localStorage.getItem("currentPass");
} catch {
}

let historical = (e) => {
  let preRecords = localStorage.getItem(
    `${localStorage.getItem("currentName")}_progress`
  );
  if (preRecords) {
    preRecords = JSON.parse(preRecords);
    for (let i = preRecords.length - 1; i > -1; i--) {
      const element = preRecords[i];
      let tag = `<div class="History f">
                      <p class="no">${i + 1}.</p>
                      <p class="Progresse">${element[2]}</p>
                      <p class="scoreMade">${element[0]}</p>
                      <p class="Timer">${element[1]}</p>
                  </div>`;
      try {
        document.querySelector(".history").innerHTML += tag;
      } catch (error) {}
    }
  } else {
    try {
      document.querySelector(".history").innerHTML +=
        '<p class="Clean">No History available.</p>';
    } catch (error) {}
  }
};
historical();
