<template>
  <nav :class="NavStyle">
    <RouterLink
      v-for="btn in NavButtons"
      :class="[NavBtnStyle, { [NavActiveBtnStyle]: $route.path === btn.pathStr }]"
      :to="btn.pathStr"
      :key="`${btn.label}-btn`"
      class=""
      >{{ btn.label.toUpperCase() }}</RouterLink
    >
  </nav>
  <main class="m-4">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const NavButtons = ref([
  {
    pathStr: '/',
    label: 'home',
  },
  {
    pathStr: '/bmwt',
    label: 'bmwt',
  },
  {
    pathStr: '/wcn',
    label: 'wcn',
  },
])

const NavStyle = ref(`
  flex
  justify-evenly
  font-bold
  bg-slate-100
  text-center
  items-center
  h-16
  shadow-md
  text-slate-500
`)

const NavBtnStyle = ref(`
  cursor-pointer
  hover:bg-slate-50
  w-full
  p-5
  transition-colors
  delay-50
  duration-300
  ease-in-out
`)

const NavActiveBtnStyle = ref(`
  bg-slate-500
  text-white
  text-shadow-2xs
  shadow-inner
  hover:bg-slate-500
  hover:cursor-default
`)
</script>
