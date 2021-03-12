let userListModule = (function () {
  let $deleteAll = $(".deleteAll"),
    $selectBox = $(".selectBox"),
    $searchInp = $(".searchInp"),
    $tableBox = $(".tableBox"),
    $tbody = $tableBox.find("tbody");
  //获取部门列表信息，把获取的信息绑定到 $selectBox 中
  let queryDepartmentList = async function () {
    //验证本都缓存是否超过一小时
    let result = _checkStore('departmentList',60*60*1000);
    if(result === false){
      result = await axios.get("/department/list");
      if (parseInt(result.code) === 0){
        result = result.data;
        //存储到本地做临时缓存
        _store('departmentList',result);
      }
    }
    let str = ``;
    result.forEach((item) => {
      str += `<option value="${item.id}">${item.name}</option>`;
    });
    $selectBox.append(str);
  };
  //获取员工列表信息
  let queryuserList = async function (){
    let departmentId = $selectBox.val(),
        search  = $searchInp.val().trim();
    let result = await axios.get('/user/list',{
      params:{departmentId,search}
    })
    if(parseInt(result.code) === 0){
      let str = ``;
      _each(result.data,item=>{
        let {id,name,sex,email,phone,department,job,desc} = item;
        str+=`<tr>
          <td class="w3"><input type="checkbox"></td>
          <td class="w10">${name}</td>
          <td class="w5">${parseInt(sex) ===0?'男':'女'}</td>
          <td class="w10">${department}</td>
          <td class="w10">${job}</td>
          <td class="w15">${email}</td>
          <td class="w15">${phone}</td>
          <td class="w20">${desc}</td>
          <td class="w12">
            <a href="javascript:;">编辑</a>
            <a href="javascript:;">删除</a>
            <a href="javascript:;">重置密码</a>
          </td>
        </tr>`;
      })
      $tbody.html(str);return;
    }
    //没有获取到数据
    $tbody.html('');
  }
  //筛选处理
  let handleFilter = function(){
    $selectBox.on('change',queryuserList);
    $searchInp.on('keydown',ev=>{
      if(ev.keyCode === 13){
        queryuserList()
      }
    });
  }
  return {
    init() {
      queryDepartmentList();
      queryuserList();
      handleFilter();
    },
  };
})();
userListModule.init();

