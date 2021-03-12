/* 
  Promise是用来管理异步编程的，它本身不是异步的；new Promise的时候会立即把executor函数执行；
  （只不过我们一般会在executor函数中处理一个异步操作）（它是一种设计模式，为了更好的解决异步请求中的回调地狱）
*/
  //==================== 第一个参数是一个执行函数（executor），必传，不传报错 ====================
    var p1 = new Promise();   /*  这句话报错  */
    //案例一
      var p1 = new Promise(_=>{
        console.log(1);
      })
      console.log(2); /*  先输出1，然后再输出2.（Promise是用来管理异步编程的，它本身不是异		步的；new Promise的时候会立即把executor函数执行） */
    //案例二
      var p1 = new Promise(_=>{                         
        setTimeout(_=>{
        console.log(1);
        },1000)
        console.log(2)
      })
      console.log(3); /* 先输出2，然后再输出3，然后再输出1 */
  
  //=================== executor 函数里有两个参数，第一个是成功执行函数，第二个是失败执行函数 ====================
    /* 
      Promise的三个状态：
        pending   初始状态
        fulfilled	代表操作成功（resolved）
        rejected	代表操作失败（rejected）
      一个value值
        Promise 的 value值，用来记录成功的结果，或者失败的原因([[PromiseValue]])
      如果new Promise时，既没有执行  resolve/reject ,又没有抛出异常，那么状态值依然是 pending
    */
      //案例一
      var p1 = new Promise(( resolve,reject )=>{
        setTimeout( _=>{
        //一般在异步操作结束后，执行resolve/reject函数，执行这两个函数中的一个，都可以修改Promise的状态和值
          resolve('ok');  /*  此时p1的值为ok，状态值为fulfilled  */	
          reject('no')	/* 一旦状态改变，再执行resolve/reject就没有用了，当然这句话也不会被执行 */
        },1000);
      })
      /* 
        执行顺序：1。第一步初始化Promise时，状态值就会变为pending，value值为undefined
                  2。执行resolve函数，此时会把p1的状态码修改为fulfilled，并且p1的 value 值为这个函数 实参表达式 的结果
                  （意思就是 resolve/reject 里面只能放表达式）（这个函数调用时，实参只能是表达式，语句会报错），reject函数也是一样。
                  3。一旦状态改变（执行resolve/reject其中一个），再执行resolve/reject就没有用了（就是从一个pending变为一个fulfilled/rejected即可）。
      */
  
  //=================== Promise执行的顺序，以及哪部分是异步的 ====================
    //案例一
      var p1 = new Promise(( resolve,reject )=>{
        setTimeout(_=>{
          if( Math.random() < 0.5 ){
            reject('NO');
            return;
          }
          resolve('OK');
        },1000)
      })
      // then:设置成功或者失败后处理的结果（两个参数都是函数，第一个是成功后做的处理的，第二个是失败后处理的）
      p1.then(result=>{
        console.log(result);		//如果随机数大于0.5，就输出OK
      },reason=>{
        console.log(reason);	//如果随机数小于0.5，就输出NO
      })
      /* 
        解析：1。new Promise时执行executor函数，由于是异步，继续往下执行。
              2。先把p1的then方法绑定要执行的方法（先是绑定但不会执行）
              3。等到定时器1秒以后执行里面的代码，随机数的大小来判断执行resolve / reject，来修改p1的状态值。
              4。根据 executor 函数返回的 状态值。再来决定执行 then 绑定的第一个方法，还是第二个方法，方法的参数就是p1的value值（resolve / reject返回的value值）。
      */
    //案例二
      var p1 = new Promise(( resolve,reject )=>{
        console.log(1);
        resolve(100);
        console.log(2);
      })
      p1.then(result=>{
        console.log(result);		
      },reason=>{
        console.log(reason);	
      })
      console.log(3);
      /* 
        输出结果：1,2,3,100;  
        总结：Promise 不是异步，then 方法也不是异步，但是executor函数里的 参数函数 是异步的（而且是微任务操作），因此很多人Promise是异步的。
      */
  
  //===================  then链以及catch ====================
    /* 
      then 和 catch都会返回一个 Promise 实例。
      其实then里面有两个参数，第一个是成功执行的函数，第二个是失败执行的函数。
      人们普遍在 then 里只写一个成功的参数，会把失败的参数写到 catch 里，当 new Promise 返回失败时，如果写了 then 方法，
      会调用 then 里面的失败函数，由于没写失败的参数，会 顺延 到下一个 then 里面，由于 catch 里的一个参数就相当于 then 的失败的参数，因此会调用 catch 里的第一个参数。
      
      Promise状态值的改变(then中)：
        1。不论是成功的方法执行，还是失败的方法执行（then中的两个方法），凡是执行抛出异常，则会把实例的状态改为 失败，这个值就是报错的信息。
        2。方法中如果返回一个新的 Promise 实例，返回这个实例的结果是成功还是失败，也决定了当前实例是成功还是失败。
        3。剩下的情况都是让实例变为 成功 状态
    */
      new Promise( (resolve,reject )=>{
        resolve(100);
      }) /*  这样写没啥意义，就是创建一个状态为成功的，值为100的实例对象，这样写可以被这种写法代替。 */
      Promise.resolve(100);
     
      new Promise( (resolve,reject)=>{
        resolve(100);
      }).then(result=>{
        console.log('成功'+result);
        return 200;
      },reason=>{
        console.log('失败'+reason);
        return 300;
      }).then(result=>{
        console.log('成功'+result);
      },reason=>{
        console.log('失败'+reason);
      });  /* 成功100，成功200 */
        /* 
          总结：1。每次执行完，都会返回新的 Promise 实例，正是因为这个新的Promise，因此才能形成 then 链。
                2。执行 then 方法的第一个函数，还是第二个函数，取决于executor要执行的函数。再或者 executor 函数执行发生的错误，这会执行 then的第二个函数。
                3。上一个 then 执行的结果，决定了下一个 then 中哪一个方法的执行。
                4。上一个then中返回的结果会传递到下一个 then 中，没有返回结果就是 undefined 
        */

  //====================  Promise.all 与 Promise.race ====================
    /* 
      Promise.all(arr)：返回的结果是一个 Promise实例。arr是一个数组，要求arr数组中的每一项
                        都是一个 Promise 实例，Promise.all 是等待数组中每一项的实例，状态都为
                        成功才会让 all实例 状态为成功，value是一个集合（数组），存储着arr中每一项实例的
                        返回结果；但凡 arr 中有一个实例的状态为失败，all实例 的状态也是失败的，value
                        值为这个集合中那个失败实例的value值。
      Promise.all() 返回结果也是promise实例，状态成功或者失败，取决于 arr 数组中的每一项的状态值
    */  
    /* 
      Promise.race(arr)：和 all 不同的地方，race是赛跑，也就是 arr 中不管那一项先处理完，处理完的
                        结果作为 race实例 的结果
      比如：arr 数组里面有10个实例，第5个先执行完回来，那么这个实例的状态值决定了 race 的状态值
     */
        var p1 = Promise.resolve(1);
        var p2 = new Promise(resolve=>{
          setTimeout(_=>{ resolve(2); },1000);
        })
        var p3 = Promise.reject(3);

        Promise.all([p1,p2,p3]).then(result=>{
          console.log(`成功：${result}`);
        }).catch(reason=>{
          console.log(`失败：${reason}`);
        })  /* 输出 失败：3。只要有一项失败就是失败的状态 */

        Promise.all([p2,p1]).then(result=>{
          /* 返回的结果是按照arr中编写实例的顺序组合在一起的 */
          //2,1
          console.log(`成功：${result}`);
        }).catch(reason=>{
          console.log(`失败：${reason}`);
        })  
  
  //==================== ES7中Promise操作语法糖 ====================
    /* 
        async 是让一个普通函数返回的结果变为 状态值为 resolved(成功)，value 为 return返回结果的Promise实例；
    */
      (async _=> 1)(); /* 箭头函数，status 值为resolved，value 值为 1的Promise实例 */
      async function fn(){} fn(); /* 普通函数，status 值为resolved，value 值为 undefined（函数返回undefined）的Promise实例 */
      (async _=>{
        setTimeout(_=>1,1000);
      })();  /* status 值为resolved，value 值为 undefined，因为函数的返回值依然是 undefined   */
      (async _=>setTimeout(_=>100,1000))(); /* status 值为resolved，value 值为 1（定时器的次数），因为函数的返回值是 定时器的返回值  */

    /* 
      async 最主要的作用是配合 await 使用的，因为一旦在函数中使用 await ，那么当前函数必须用 async 修饰；
    */
      var p1 = Promise.resolve(100);
      var p2 = new Promise(resolve=>{
        setTimeout(_=>{ resolve(2); },1000);
      })
      var p3 = Promise.reject(3);

      async function fn(){
        console.log(1);
        // await 会等待当前Promise的返回结果，只有返回的状态是 resolved(成功)，才会把返回结果赋值给 result; 
        // await 不是同步的，是异步的（属于微任务）：当代码执行到此行（先把此行执行），构建一个异步的微任务（等待Promise返回结果，并且 await 下面的代码也都放到任务队列中）
        // 如果 await 管理的是一个 Promise ,那么成功时会把 Promise实例的值 赋值给 前边的变量
        let result = await p1;
        console.log(result);
      }
      fn()
      console.log(2);     /* 输出值为 1,2,100 */
      /* 
        执行流程：1。调用函数执行，输出 1，继续往下执行
                  2。执行 let result = await p1; 时，把它下面的所有代码都放到 任务队列中的微任务中，继续执行函数外的代码
                  3。输出2，当整个同步执行完了，再去执行 await
      */

      async function fn(){
        //如果 Promise(p3) 是失败状态，则 await 不会接收其返回结果，await 下面的代码也不会继续执行（await只能处理 Promise 为成功状态）
        let reason = await p3;
        // 可以写成这样：await (async _=>1)()，await 后面必须是个表达式
        console.log(reason);
      }
      fn(); /* 不会输出 */