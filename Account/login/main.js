var logInBtn = document.querySelector(".LoginButt");
logInBtn.addEventListener("click", logIncheck, false);

function signUpcheck(){
    consolo.log(alert('AA')); //確認有監聽成功，得到 alert 視窗，內容為 AA。
}

var emailStr = document.querySelector(".emailf").value;
var passwordStr = document.querySelector(".passwordf").value;
var account = {}; //輸入的資料，填入空物件
account.emailf = emailStr; //填入的 email
account.passwordf = passwordStr; //填入的密碼