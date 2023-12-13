<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const negativeBox = ref(null)
const negativeBox2 = ref(null)
const elementMargin = ref('')
const elementMargin2 = ref('')

function updateMargin() {
  if (negativeBox.value) {
    const style = window.getComputedStyle(negativeBox.value)
    const style2 = window.getComputedStyle(negativeBox2.value)
    elementMargin.value = style.marginLeft
    elementMargin2.value = style2.marginLeft
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
  <div class="flex flex-col min-h-100">
    <div class="bg-gray-800 h-50 w-50 mx-auto">
      <div ref="negativeBox" class="h-30 w-30 f-ml-50--25 bg-green-100/10 rounded relative">
        <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {{ elementMargin }}
        </span>
      </div>

      <div class="bg-gray-800 h-50 w-50 mt-30 mx-auto">
        <div ref="negativeBox2" class="h-30 w-30 f-ml--50-25 bg-green-100/10 rounded relative">
          <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {{ elementMargin2 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
