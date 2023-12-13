<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const box = ref(null)
const elementMargin = ref('')

function updateMargin() {
  if (box.value) {
    const style = window.getComputedStyle(box.value)
    elementMargin.value = style.marginLeft
  }
}

onMounted(() => {
  updateMargin()
  window.addEventListener('resize', updateMargin)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMargin)
})
</script>

<template>
  <div class="flex flex-col min-h-50">
    <div class="bg-gray-800 h-50 w-50 mx-auto">
      <div ref="box" class="h-30 w-30 f-ml--50--25 bg-green-100/10 rounded relative">
        <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {{ elementMargin }}
        </span>
      </div>
    </div>
  </div>
</template>
