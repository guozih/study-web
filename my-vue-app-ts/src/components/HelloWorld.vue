<script setup lang="ts">
import { ref, defineProps, effect, reactive, toRef, toRefs } from 'vue'
// import XXX from './xxx.vue'
import Hello from '../htmlComponents/HelloWold'
const obj = { age: 12 };
const a = reactive(obj)
const c = reactive(a)
const b = toRefs(a)
const count = ref(0)
// const state = toRefs({
//   foo: 1,
//   bar: 2
// })
// state.bar.value++;
const state = toRef(reactive({
  foo: 1,
  bar: 2
}), 'bar')
state.value++;

defineProps<{ msg: string }>()
effect(() => {
  // console.log(a.age);
})
</script>

<template>

  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <button type="button" @click="a.age++">count is: {{ a.age }}</button>
  <Hello/>
</template>

<style scoped>
</style>
