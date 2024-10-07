<script setup>
const route = useRoute()

definePageMeta({
  title: {
    vi: 'Về chúng tôi',
    en: 'About Us'
  },
  navOrder: 2,
  type: 'secondary',
})
defineI18nRoute({
  paths: {
    vi: '/ve-chung-toi',
    en: '/about-us'
  }
})

useHead({
    title: getPageTitle(route)
})

</script>

<template>
  <div>
    about
  </div>
</template>

<style scoped>

</style>