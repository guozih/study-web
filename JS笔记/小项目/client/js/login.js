//DOM加载完执行的函数
//账号 15835290103
//密码 1234567890
$(function () {
  let $userName = $(".userName"),
    $userPass = $(".userPass"),
    $submit = $(".submit");

  $submit.click(async function () {
    let userNameText = $userName.val().trim(),
      userPassText = $userPass.val().trim();
    //表单校验(非空校验)
    if (userNameText.length === 0) {
      alert("账号不能为空");
      return;
    }
    if (userPassText.length === 0) {
      alert("密码不能为空");
      return;
    }
    userPassText = md5(userPassText);

    let result = await axios.post("/user/login", {
      account: userNameText,
      password: userPassText,
    });
    if (parseInt(result.code) === 0) {
      alert("登录成功", {
        handled: (_) => (window.location.href = "index.html"),
      });
      return;
    }
    alert("账号和密码不匹配，请重新输入");
    $userName.val("");
    $userPass.val("");
  });
});