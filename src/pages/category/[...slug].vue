<script setup>
definePageMeta({
  title: 'Category',
  navOrder: 2,
  // type: 'primary'
})

const route = useRoute()
watchEffect(() => {
  console.log(route.fullPath)
})
</script>

<template>
  <div>
    category
  </div>
</template>

<style scoped>

</style>