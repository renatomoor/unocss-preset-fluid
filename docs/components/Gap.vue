<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const item = ref(null)
const elementValue = ref('')

function updateValue() {
  if (item.value) {
    const style = window.getComputedStyle(item.value)
    elementValue.value = style.gap
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
    <div ref="item" class="grid grid-cols-3 text-center f-gap-32-64 bg-gray-800 rounded">
      <div class="bg-green-500/20">
        Item 1
      </div>
      <div class="bg-green-500/20">
        Item 2
      </div>
      <div class="bg-green-500/20">
        Item 3
      </div>
    </div>
    <div class="p-2 bg-green-100/20 w-fit rounded absolute -bottom-10 right-0">
      {{ elementValue }}
    </div>
  </div>
</template>
