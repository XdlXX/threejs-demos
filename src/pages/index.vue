<script setup lang="ts">
const demoList = [
  {
    name: 'DEMO 1',
    path: '/demos/demo1',
    desc: '简单WebGL DEMO简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL简单WebGL',
  },
  {
    name: 'DEMO 2',
    path: '/demos/demo2',
    desc: '简单WebGL ',
  },
]
</script>

<template>
  <div>
    <h1 mb5 mt5 text-3xl>
      学习 <b>WebGL</b> & <b>Three.js</b> 的 Demos
    </h1>

    <ul list-none max-w-3xl text-left style="width: 90%;margin: 0 auto;">
      <li v-for="item in demoList" :key="item.path" flex justify-between items-center mb-3 mt-3>
        <h6 inline-block m-r-10>
          {{ item.desc }}
        </h6>
        <RouterLink :to="item.path" c-gray hover:c-cyan flex-shrink-0>
          #{{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
