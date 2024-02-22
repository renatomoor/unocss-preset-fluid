<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const item = ref(null)
const elementValue = ref('')

function updateValue() {
  if (item.value) {
    const style = window.getComputedStyle(item.value)
    elementValue.value = style.width
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
  <div class="relative my-4">
    <div ref="item" class="f-w-100-200 f-h-100-200 bg-gray-800 rounded relative">
      <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {{ elementValue }}
      </span>
    </div>
  </div>
</template>
