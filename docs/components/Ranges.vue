<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const item = ref(null)
const elementValue = ref('')

function updateValue() {
  if (item.value) {
    const style = window.getComputedStyle(item.value)
    elementValue.value = style.padding
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
  <div class="relative my-4 pb-2">
    <div ref="item" class="f-p-lg f-text-16-25 bg-gray-800 rounded">
      Padding example with a small range.
    </div>
    <div class="p-2 bg-green-100/20 w-fit rounded absolute -bottom-10 right-0">
      {{ elementValue }}
    </div>
  </div>
</template>
