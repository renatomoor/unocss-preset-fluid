<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const item = ref(null)
const elementValue = ref('')

function updateValue() {
  if (item.value) {
    const style = window.getComputedStyle(item.value)
    elementValue.value = style.fontSize
  }
}

onMounted(() => {
  updateValue()
  window.addEventListener('resize', updateValue)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateValue)
})
</script>

<template>
  <div class="relative">
    <span ref="item" class="f-text-32-64 leading-[120%] text-indigo-8 font-mono">
      This is an example of a text with a font size scaling from 32px to 64px.
    </span>
    <div class="p-2 bg-green-100/20 w-fit rounded absolute -bottom-10 right-0">
      {{ elementValue }}
    </div>
  </div>
</template>
