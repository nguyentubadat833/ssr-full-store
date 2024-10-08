<template>
  <div>
    <NuxtLayout :name="layoutName">
      <NuxtPage/>
    </NuxtLayout>
    <ClientOnly>
      <UNotifications />
    </ClientOnly>
  </div>
</template>
<script setup>
const {locale, defaultLocale} = useI18n()
const route = useRoute()
const router = useRouter()
const layoutName = computed(() => {
  if (route.fullPath.startsWith('/console')){
    return 'console'
  }
  // if (route.fullPath.startsWith('/auth')){
  //   return 'auth'
  // }
})

watchEffect(() => {
  console.log(locale.value)
})

useHead({
  // titleTemplate: route.meta.title[`${locale.value}`]
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.page-leave-active {
  transition: all 0.6s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>