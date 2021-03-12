$(async () => {
  //3.基于发布订阅管控获取基本信息后逐一做的事情
  let $plan = $.Callbacks();
  //向事件池中添加事件，baseInfo 是下面 fire方法执行时，给传过来的参数
  $plan.add((baseInfo) => {
    //展示头部登录用户的信息
    let $baseBox = $(".baseBox"),
      $baseBoxSpan = $baseBox.find("span");
    $singout = $baseBox.find("a");
    //展示当前用户名
    $baseBoxSpan.html(`您好：${baseInfo.name}`);
    //退出登录
    $singout.click(() => {
      let handled = async (type) => {
        //点击的不是确定按钮
        if (type !== "CONFIRM") return;
        let result = await axios.get("/user/signout");
        if (parseInt(result.code) !== 0) {
          alert("退出登录失败，请稍后重试");
          return;
        }
        //清除本地存储的基本信息和权限信息
        localStorage.removeItem("baseInfo");
        alert("退出登录成功，即将返回到登录页面", {
          handled: () => {
            window.location.href = "login.html";
          },
        });
      };
      alert("您确定要退出登录吗？", {
        confirm: true,
        handled,
      });
      // alert('您确定要退出登录吗？',{
      //   confirm:true,
      //   handled:async type=>{
      //     //点击的是确定按钮
      //     if(type === 'CONFIRM'){
      //       let result = await axios.get("/user/signout");
      //       if(parseInt(result.code)!== 0){
      //         alert('退出登录失败，请稍后重试');
      //         return;
      //       }
      //       alert('退出登录成功，即将返回到登录页面',{
      //         handled:()=>{
      //           window.location.href = 'login.html';
      //         }
      //       })
      //     }
      //   }
      // });
    });
  });

  $plan.add((baseInfo) => {
    let $navBox = $(".navBox"),
      $menuBox = $(".menuBox"),
      $iframeBox = $(".iframeBox");
    //构建渲染视图的数据
    let renderData = {
      //头部导航选中哪一个
      active: 1,
      //权限字段信息
      power: baseInfo.power,
      //左侧menu数组
      menu: [
        {
          title: "员工管理",
          icon: "icon-yuangong",
          children: [
            {
              name: "员工列表",
              href: "page/userlist.html",
            },
            {
              name: "新增员工",
              href: "page/useradd.html",
            },
          ],
        },
        {
          title: "部门管理",
          icon: "icon-guanliyuan",
          children: [
            {
              name: "部门列表",
              href: "page/departmentlist.html",
            },
            {
              name: "新增部门",
              href: "page/departmentadd.html",
            },
          ],
        },
        {
          title: "职务管理",
          icon: "icon-zhiwuguanli",
          children: [
            {
              name: "职务列表",
              href: "page/joblist.html",
            },
            {
              name: "新增职务",
              href: "page/jobadd.html",
            },
          ],
        },
        {
          title: "客户管理",
          icon: "icon-kehuguanli",
          children: [
            {
              name: "我的客户",
              href: "page/customerlist.html",
            },
            {
              name: "全部客户",
              href: "page/customerlist.html?lx=all",
            },
            {
              name: "新增客户",
              href: "page/customeradd.html",
            },
          ],
        },
      ],
    };
    //根据数据渲染视图
    function render() {
      let { active, power, menu } = renderData;
      //控制显示隐藏(只要把数据改变成我们想要的，渲染的时候是按照数据来渲染的 数据驱动视图渲染)
      // active === 0 ? menu.pop() : (menu = [menu.pop()]); //这样不行，menu改变，renderData.menu也会改变
      //真实项目根据有一个标识筛选出他的子标题，我这里用到 title来筛选
      menu = menu.filter(({ title }) =>
        active === 0
          ? /^(员工管理|部门管理|职务管理)$/.test(title)
          : /^客户管理$/.test(title)
      );
      //根据权限控制筛选
      power = power.split("|");
      !power.includes("userhandle") &&
        (menu = menu.filter((item) => item.title !== "员工管理"));
      !power.includes("departhandle") &&
        (menu = menu.filter((item) => item.title !== "部门管理"));
      !power.includes("jobhandle") &&
        (menu = menu.filter((item) => item.title !== "职务管理"));
      !power.includes("departcustomer") &&
        !power.includes("allcustomer") &&
        (menu = menu.map(
          (item) =>
            item.title === "客户管理" &&
            ((item.children = item.children.filter(
              (cur) => cur.name !== "全部客户"
            )),
            item)
        ));
      //头部导航渲染
      let navHTML = `
          <a href="javascript:;" class="${
            active === 0 ? "active" : ""
          }">组织结构</a>
          <a href="javascript:;" class="${
            active === 1 ? "active" : ""
          }">客户管理</a>`;
      $navBox.html(navHTML);
      //左侧导航渲染
      let menuHTML = `${menu
        .map(({ title, icon, children }) => {
          return `<div class="itemBox">
          <h3>
            <i class="iconfont ${icon}"></i>
            ${title}
          </h3>
          <nav class="item">
            ${children
              .map(({ name, href }) => {
                return `<a href="${href}" target="iframeBox">${name}</a>`;
              })
              .join("")}
          </nav>
        </div>`;
        })
        .join("")}`;
      $menuBox.html(menuHTML);
      //iframe的默认值
      $iframeBox.attr(
        "src",
        active === 0 ? "page/userlist.html" : "page/customerlist.html"
      );
    }
    //第一次进来渲染视图
    render();
    //事件委托
    $navBox.click((ev) => {
      let target = ev.target,
        text = target.innerHTML;
      if (target.tagName === "A") {
        //点击的时候也做权限校验
        if (
          text === "组织结构" &&
          !/(userhandle|departhandle|jobhandle)/.test(baseInfo.power)
        ) {
          alert("您当前没有操作权限，请联系管理员");
          return;
        }
        renderData.active = text === "组织结构" ? 0 : 1;
      }
      //数据更改完数据渲染
      render();
    });
  });

  //1.校验是否登录
  let result = await axios.get("/user/login").catch(() => {
    alert("服务器错误，请稍后重试", {
      handled: (_) => (window.location.href = "login.html"),
    });
  });
  if (parseInt(result.code) !== 0) {
    //当前用户未登录
    alert("您当前还未登录，请先登录", {
      handled: (_) => (window.location.href = "login.html"),
    });
    return;
  }
  //2.获取用户的基本信息 和 权限信息
  //优化：第一次从服务器获取数据，获取回来后，把数据存储到本地（localStorage），设定一个过期时间
  //      可以设定 1min（1分钟） 内，只有本地有数据，则不再向服务器发送，减少单元内的服务器并发压力
  //      存储到客户端本地的信息不是很安全，尤其是权限信息，所以我们最好加密处理（更主要的服务器最好做二次的权限校验）
  //获取本地存储的用户信息
  let baseInfo = localStorage.getItem("baseInfo");
  if (baseInfo) {
    baseInfo = JSON.parse(baseInfo);
    let { time, data } = baseInfo;
    if (new Date().getTime() - time < 60 * 1000) {
      //存储的数据没有过期
      $plan.fire(data);
      return;
    }
  }
  let requestArr = [],
    results;
  requestArr.push(
    //2.获取当前用户的基本信息
    axios
      .get("/user/info")
      .then((result) => {
        if (parseInt(result.code) === 0) {
          return result.data;
        }
        //从这个可以写 提示，下面 Promise.all 下面也不会执行，catch也是如此
        // 比如说 alert('请求用户基本信息失败')
        return Promise.reject();
      })
      .catch((reason) => Promise.reject("服务器错误"))
  );
  requestArr.push(
    //3.获取当前用户的权限信息
    axios.get("/user/power").then(({ code, power }) => {
      if (parseInt(code) === 0) {
        return power;
      }
      //从这个可以写 提示，下面 Promise.all 下面也不会执行，catch也是如此
      return Promise.reject();
    })
  );
  results = await Promise.all(requestArr);
  //把所有的信息合到一个对象里面，赋值给results
  results[0]["power"] = results[1];
  results = results[0];
  //存储到本地的信息都是字符串
  localStorage.setItem(
    "baseInfo",
    JSON.stringify({
      time: new Date().getTime(),
      data: results,
    })
  );
  //通知计划表中的方法执行
  $plan.fire(results);
});
/* 
  AJAX串行：上一个请求完成，才能继续执行下一个请求（上一个请求的结果会对下一个请求有影响）
    Promise.then() 可以解决 AJAX 串行
  AJAX并行：多个请求是同时发送的，每一个请求成功后做的事情互不影响
    正常发送多个异步请求
    需要请求都成功统一处理事情，基于 Promise.all 即可解决（http通常可以同时发6-7个http请求）
*/

/* 
  项目中的权限校验表现形式：
    1、不论是否有权限，都给用户展示出啦，当用户操作的时候，根据是否有权限来做相关的提示
    2、展示或者渲染的时候，就根据权限进行校验，把没有权限的内容隐藏掉（不渲染）
       最好不要做样式上的隐藏，因为这样别人可以在控制台把它渲染显示出来，没有权限我们最好都不要渲染
  实现方案：
    1、客户端需要展示的内容由服务器渲染（服务器端权限校验）
    2、客户端从服务器获取到权限字段信息，自己来进行渲染（客户端自己渲染做权限校验总归不是绝对安全
       所以即使客户端做完，也需要服务器继续做权限的二次校验）
*/
