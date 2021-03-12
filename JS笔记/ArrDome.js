//================================================== 把就有相同id的整合到一个数组里面 ==================================================
  var arr = [
    { id: 1, code: 11, size: 10, name: "m" },
    { id: 1, code: 2, size: 7, name: "m" },
    { id: 2, code: 3, size: 3, name: "k" },
    { id: 2, code: 4, size: 5, name: "k" },
    { id: 4, code: 5, size: 3, name: "z" },
    { id: 4, code: 9, size: 1, name: "z" },
    { id: 1, code: 6, size: 7, name: "m" },
    { id: 3, code: 7, size: 10, name: "a" },
    { id: 3, code: 8, size: 60, name: "a" },
  ];
  /* 
    has()返回一个布尔值
    get()返回它对应的键值
    set()返回一个修改后的 Map 实例，因此可以链式调用
    values()返回一个由 所有键值组成的类数组，可以迭代。
  */
    /*  
      var newArr = [...arr.reduce(
        (preVal,item)=>
      preVal.has(item.id)?(preVal.get(item.id).push(item),preVal):preVal.set(item.id,[item]),new Map()).values()];
    */
  var newArr = Object.values(
    arr.reduce(
      (preVal, item) =>
        preVal[item.id]
          ? (preVal[item.id].push(item), preVal)
          : ((preVal[item.id] = [item]), preVal),
      {}
    )
  );
  console.log(newArr);
  /* 
    然后把newArr在转化为一维数组
  */
  //==================== 方式一 ====================
    //apply会把接收到的参数用。。。运算符结构了传入到concat方法的形参中
      console.log([].concat.apply([], newArr));
  //==================== 方式二 ====================
    //console.log(newArr.reduce((preVal,item)=>[...preVal,...item],[]))

//================================================== 对比两个数组，比较里面的某个属性，是否去掉 ==================================================
  /*
    some()	依次判断有数组中的元素，有一个满足回调函数中的规则，就返回true，否则返回false
    every()	依次判断有数组中的元素，全部满足回调函数中的规则，就返回true，否则返回false
  */
  // 去除arr2中有arr1相同的元素
    var arr1 = [
      { id: 1, code: 11, size: 10, name: "m" },
      { id: 2, code: 3, size: 3, name: "k" },
    ];
    var arr2 = [
      { id: 1, code: 2, size: 7, name: "m" },
      { id: 2, code: 4, size: 5, name: "k" },
      { id: 4, code: 5, size: 3, name: "z" },
    ];
    console.log(arr2.filter((item) => arr1.every((item1) => item.id != item1.id)));
    //console.log(arr2.filter(item=>!arr1.some(item1=>item.id==item1.id)));
//================================================== 两个数组，判断一个值在另一个钟，就把这个值添加到那个数组里面 ==================================================
  var arr1 = [
    { id: 1, sonarr: ["1", "2", "3"] },
    { id: 2, sonarr: ["1", "3"] },
    { id: 3, sonarr: ["1", "2", "3", "4"] },
  ];
  var arr2 = [
    { id: 1, title: "管理员a" },
    { id: 2, title: "管理员b" },
    { id: 3, title: "管理员c" },
  ];
  var newArr = arr1.map(({ id, sonarr }) => ({
    id,
    sonarr,
    title: arr2.reduce(
      (preVal, { id, title }) =>
        sonarr.includes(String(id)) ? [...preVal, title] : preVal,
      []
    ),
  }));
  console.log(newArr);
