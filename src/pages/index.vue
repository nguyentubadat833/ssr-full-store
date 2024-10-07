<script setup>
const route = useRoute()
definePageMeta({
  title: {
    vi: 'Trang chủ',
    en: 'Home'
  },
  navOrder: 1,
  // type: 'primary'
})
useHead({
  title: getPageTitle(route)
})


</script>

<template>
<div>
  index
</div>
</template>

<style scoped>

</style>