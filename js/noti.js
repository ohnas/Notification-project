const notiSupport = document.getElementById("noti-support");
const notiSupportSpan = notiSupport.querySelector("span");
const notiPermission = document.getElementById("noti-permission");
const notiPermissionBtn = notiPermission.querySelector("button");
const notiPermissionSpan = notiPermission.querySelector("span");
const notiSend = document.getElementById("noti-send");
const notiSendBtn = notiSend.querySelector("button"); 
const notiTime = document.getElementById("noti-time");
const notiTimeInput = notiTime.querySelector("input");
const notiTimeBtn = notiTime.querySelector("button");

function saveTime(newTime) {
    localStorage.setItem("settime", newTime);
}

function isNotiSupport() {
    if(window.Notification) {
        notiSupportSpan.innerText = "현재 브라우저는 알림기능을 지원하는 브라우저입니다.";
    } else {
        notiSupportSpan.innerText = "현재 브라우저는 알림기능을 지원하지 않는 브라우저입니다. 다른 브라우저를 사용해주세요.";
    }
}

function isNotiPermission() {
    if(Notification.permission === "granted") {
        notiPermissionSpan.innerText = "현재 브라우저는 알림기능을 허용한 상태입니다.";
    } else {
        // clssList 사용해서 css 요소 컨트롤
        notiPermissionBtn.classList.remove("permisson-button");
        notiPermissionSpan.innerText = "현재 브라우저는 알림기능을 거부한 상태입니다. 왼쪽버튼을 눌러서 알림기능을 허용해주세요";
    }
}

function onNotiPermission() {
    Notification.requestPermission(function (permission){
        if (permission === "granted") {
            notiPermissionSpan.innerText = "현재 브라우저는 알림기능을 허용한 상태입니다.";
            notiPermissionBtn.classList.add("permisson-button");
        } else {
            notiPermissionSpan.innerText = "현재 브라우저는 알림기능을 거부한 상태입니다. 왼쪽버튼을 눌러서 알림기능을 허용해주세요";
        }
    })
}

function onNotiSend() {
    if(Notification.permission === "granted"){
        // localstorage에서 꺼내오는 것들은 let 으로 생성하여 변경가능 할 수 있도록
        let obj = localStorage.getItem("todos");
        const items = JSON.parse(obj);
        const item = items[Math.floor(Math.random()*items.length)];
        const text = item.text;
        notification = new Notification("동기부여 합시다", {body: `${text}`, icon:'icon-128.png'})
    }
}

function onNotiTime(event) {
    event.preventDefault();
    const newTime = notiTimeInput.value;
    notiTimeInput.value = "";
    saveTime(newTime);
}

window.addEventListener("load", isNotiPermission);
window.addEventListener("load", isNotiSupport);

notiPermissionBtn.addEventListener("click", onNotiPermission);
notiTime.addEventListener("submit", onNotiTime);

//setInterval(onNotiSend, parseInt(localStorage.getItem("settime"))*1000);