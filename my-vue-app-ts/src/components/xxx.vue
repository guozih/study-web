<template>
    <div id="xxx">{{ count }}</div>

</template>

<script lang="ts">
import { createApp } from 'vue'
const vm = createApp({
    data() {
        return { count: 4 }
    }
}).mount('#xxx')
console.log(vm)   
</script>