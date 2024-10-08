<script setup>
const route = useRoute()
definePageMeta({
  title: {
    vi: 'Giỏ hàng',
    en: 'Cart'
  },
})
defineI18nRoute({
  paths: {
    vi: '/gio-hang',
    en: '/shopping/cart'
  }
})

useHead({
  title: getPageTitle(route)
})

</script>

<template>
  <div>
    cart
  </div>
</template>

<style scoped>

</style>