const notiSupport = document.getElementById("noti-support");
const notiSupportSpan = notiSupport.querySelector("span");
const notiPermission = document.getElementById("noti-permission");
const notiPermissionBtn = notiPermission.querySelector("button");
const notiPermissionSpan = notiPermission.querySelector("span");
const notiSend = document.getElementById("noti-send");
const notiSendBtn = notiSend.querySelector("button"); 

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
        notiPermissionSpan.innerText = "현재 브라우저는 알림기능을 거부한 상태입니다. 왼쪽버튼을 눌러서 알림기능을 허용해주세요";
        function onNotiPermission() {
            Notification.requestPermission();
        }
        notiPermissionBtn.addEventListener("click", onNotiPermission);
    }
}

// function onNotiSend() {
//     if(Notification.permission === "granted"){
//         notification = new Notification("hello", {body: "hello world"})
//     }
// }

window.addEventListener("load", isNotiPermission);

notiSupport.addEventListener("click", isNotiSupport);
// notiSendBtn.addEventListener("click", onNotiSend);


notification = new Notification("hello", {body:"hellow world", icon:'icon-128.png'});
console.log(notification);
console.log(Notification.permission);
