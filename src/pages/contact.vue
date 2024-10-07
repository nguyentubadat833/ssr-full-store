<script setup>
const route = useRoute()
definePageMeta({
  title: {
    vi: 'Liên hệ',
    en: 'Contact'
  },
  navOrder: 1,
  type: 'secondary'
})
defineI18nRoute({
  paths: {
    vi: '/lien-he',
    en: '/contact-us'
  }
})

useHead({
  title: getPageTitle(route)
})
</script>

<template>
  <div>
    contact
  </div>
</template>

<style scoped>

</style>