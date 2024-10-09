<script setup>
const route = useRoute()
const links = ref([{
  label: 'Console',
  link: '/console',
}, {
  label: 'Category',
  link: '/console/category/management'

}, {
  label: 'Product',
  link: '/console/product/management'
}])

links.value.forEach(el => {
  el.active = computed(() => generateResultActive(el.link))
  el.click = () => navigateTo(el.link)
})

function generateResultActive(link) {
  return route.fullPath === link;
}

</script>

<template>
  <div class="px-2 py-5">
    <!--    <span class="text-3xl font-bold">{{ useToUpper(route?.meta?.pageName) }}</span>-->
    <div>
      <div>
        <span>{{}}</span>
      </div>
      <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800"/>
    </div>
    <div class="p-3 mt-5">
      <slot/>
    </div>

  </div>
</template>

<style scoped>

</style>