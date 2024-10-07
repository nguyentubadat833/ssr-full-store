<script setup>

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

const route = useRoute()

console.log(route.meta)

</script>

<template>
  <div>
    about
  </div>
</template>

<style scoped>

</style>