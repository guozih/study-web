<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { reactive, effect } from './myVue'
const obj = { name: '小明', age: 24 }
const obj1 = reactive(obj)
obj1.age = 25
effect(() => {
  console.log(`${obj1.name}今年${obj1.age}岁了`)
})
setTimeout(() => {
  obj1.age++;
}, 1000)
</script>

<template>
  <!-- <HelloWorld msg="xx" /> -->
  <div>{{ obj1.name }}今年{{ obj1.age }}岁了</div> 
  <button @click="obj1.age++">年龄增加</button>
</template>

<style>
</style>
