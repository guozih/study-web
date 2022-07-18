import { track, activeEffect, trigger } from '../effect'
//缓存
const reactiveMap = new WeakMap();
//枚举标识
const enum ReactiveFlags {
    IS_REACTIVE = '__is_reactive'
}

function reactive(target: any) {
    //只有代理过的对象才能走进这个区间
    if (target[ReactiveFlags.IS_REACTIVE]) {
        return target
    }
    const existing = reactiveMap.has(target)
    if (existing) {
        return reactiveMap.get(target)
    }
    const _proxy = new Proxy(target, {
        get(target, key, receiver) {
            if (key === ReactiveFlags.IS_REACTIVE) {
                return true
            }
            // debugger;
            //让当前的 key 和 effect 建立关联关系
            track(target, key);
            return Reflect.get(target, key, receiver)
        },
        set(target, key, val, receiver) {
            //数据变化后要根据属性找到对应的列表，依次执行
            const oldValue = target[key];
            if (oldValue !== val) {
                const result = Reflect.set(target, key, val, receiver)
                trigger(target, key, val);
                return result
            }
            return true;
        }
    })
    reactiveMap.set(target, _proxy)
    return _proxy
}


export {
    reactive
}


// const obj = {a:1,b:2,
//     get getA(){
//         return this.a+1
//     }
// }
// var _proxy = new Proxy(obj,{
//     get(a,b,c){
//         return Reflect.get(a,b,c)
//     },
//     set(a,b,c,d){
//        return Reflect.set(a,b,c,d)
//         // return true;
//     }
// })
// console.log(obj.a)
// console.log(_proxy.getA)
// _proxy.c = 3;
// console.log(_proxy)