const notiSupport = document.getElementById("noti-support");
const notiSupporth1 = notiSupport.querySelector("h1");
const notiPermission = document.getElementById("noti-permission");
const notiPermissionBtn = notiPermission.querySelector("button");
const notiPermissionh3 = notiPermission.querySelector("h3");
const notiTime = document.getElementById("noti-time");
const notiTimeSpan = notiTime.querySelector("span");
const notiTimeSelect = notiTime.querySelector("select");
const notiTimeBtn = notiTime.querySelector("button");
const notiToggle = document.getElementById("noti-toggle");
const notiOn = document.getElementById("noti-on");
const notiOff = document.getElementById("noti-off");
const notiStateSpan = document.getElementById("noti-state");
const todoForm = document.getElementById("todo-form");

let interval

function saveTime(newTime) {
    localStorage.setItem("settime", newTime);
    notiTimeSpan.innerText = `현재 설정되어 있는 알림주기는 ${localStorage.getItem("settime")} 입니다`
}

function isNotiSupport() {
    if(window.Notification) {
        notiSupporth1.innerText = "현재 브라우저는 알림기능을 지원하는 브라우저입니다.";
        isNotiPermission();
    } else {
        notiSupporth1.innerText = "현재 브라우저는 알림기능을 지원하지 않는 브라우저입니다. 다른 브라우저를 사용해주세요.";
    }
}

function isNotiPermission() {
    if(Notification.permission === "granted") {
        notiPermissionh3.innerText = "현재 브라우저는 알림기능을 허용한 상태입니다.";
        notiPermissionBtn.classList.remove("hidden");
        paintNotiTime();
        offNotiSend();
    } else {
        // clssList 사용해서 css 요소 컨트롤
        notiPermissionBtn.classList.remove("hidden");
        notiPermissionh3.innerText = "현재 브라우저는 알림기능을 거부한 상태입니다. 아래버튼을 눌러서 알림기능을 허용해주세요";
    }
}

function onNotiPermission() {
    Notification.requestPermission(function (permission){
        if (permission === "granted") {
            notiPermissionh3.innerText = "현재 브라우저는 알림기능을 허용한 상태입니다.";
            notiPermissionBtn.classList.add("hidden");
            paintNotiTime();
            offNotiSend();
        } else {
            notiPermissionh3.innerText = "현재 브라우저는 알림기능을 거부한 상태입니다. 왼쪽버튼을 눌러서 알림기능을 허용해주세요";
        }
    })
}

function paintNotiTime() {
    if(localStorage.getItem("settime") === null) {
        notiTimeSpan.innerText = "알림주기를 선택해주세요"
    } else {
        notiTimeSpan.innerText = `현재 설정되어 있는 알림주기는 ${localStorage.getItem("settime")} 입니다`
    }
}

function setNotiTime(event) {
    event.preventDefault();
    const newTime = notiTimeSelect.value;
    saveTime(newTime);
    paintNotiTime();
    notiTimeSelect.selectedIndex = 0;
}

function createNoti() {
    if(Notification.permission === "granted"){
        // localstorage에서 꺼내오는 것들은 let 으로 생성하여 변경가능 할 수 있도록
        let obj = localStorage.getItem("todos");
        const items = JSON.parse(obj);
        const item = items[Math.floor(Math.random()*items.length)];
        const text = item.text;
        notification = new Notification("동기부여 합시다", {body: `${text}`, icon:'icon-128.png'})
    }
}

function onNotiSend() {
    if(Notification.permission === "granted" && localStorage.getItem("todos") !== null) {
        interval = setInterval(createNoti, parseInt(localStorage.getItem("settime").replace('0분',''))*600000);
        notiStateSpan.innerText = "현재 알림 상태는 ON 입니다";
    } else if(localStorage.getItem("todos") === null) {
        notiStateSpan.innerText = "알림을 보낼 목록이 존재하지 않습니다. 먼저 목록을 만들어주세요.";
    } else {
        notiStateSpan.innerText = "알림기능이 거부되어 있습니다. 먼저 알림 허용을 해주세요";
    }
}

function offNotiSend() {
    clearInterval(interval);
    notiStateSpan.innerText = "현재 알림 상태는 OFF 입니다"
}

isNotiSupport();

notiPermissionBtn.addEventListener("click", onNotiPermission);
notiTime.addEventListener("submit", setNotiTime);
notiOn.addEventListener("click", onNotiSend);
notiOff.addEventListener("click", offNotiSend);