let activeEffect: any = null; //当前执行的 effect
type fn = () => any
class ReactiveEffect {
    public active = true;
    public parent: any = null;
    public fn;
    public deps = []; //effect中用了哪些属性，后续清理的时候要使用
    constructor(fn: fn) {
        this.fn = fn
    }
    run() {
        if (!this.active) {
            return this.fn();
        } else {
            try {
                this.parent = activeEffect;
                //做依赖收集
                activeEffect = this;
                return this.fn();
            } finally {
                //取消当前正在运行的effect
                activeEffect = this.parent;
                this.parent = null;
            }
        }

    }
}

function effect(fn: fn) {
    const _effect = new ReactiveEffect(fn);
    //第一步进来先让函数执行
    //调用 run 的时候让函数重新执行
    _effect.run()
}

// 外层用一个map { object:{ name:[effect,effect] } }
const targetMap = new WeakMap();
function track(target: any, key: any) {
    if(activeEffect){
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, depsMap = new Map())
        }
        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, deps = new Set())
        }
        let shoudTrack = !deps.has(activeEffect);
        if (shoudTrack) {
            //让属性记录关联了哪些effect
            deps.add(activeEffect);
            //让effect记录关联了哪些属性
            activeEffect.deps.push(activeEffect)
        }
    }
}

function trigger(target: any, key: any, val: any) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        return; //属性没用依赖任何的effect
    }
    const effects = depsMap.get(key)
    if (effects) {
        effects.forEach((effect: any) => {
            //避免死循环，避免effect里修改了属性再次调用effect
            if(effect !== activeEffect){
                effect.run(); //找到对应的effect执行
            }
        });
    }
}
export {
    activeEffect,
    track,
    effect,
    trigger
}