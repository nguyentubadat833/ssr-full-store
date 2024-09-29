<script setup>

// const {isDarkColorMode} = storeToRefs(useAppStore())
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
// watchEffect(() => {
//   isDarkColorMode.value = isDark.value
// })
</script>

<template>
  <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      variant="ghost"
      color="secondary"
      aria-label="Theme"
      @click="isDark = !isDark"
  />
</template>

<style scoped>

</style>