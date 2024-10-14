<script setup>
const route = useRoute()

const consoleLinks = ref([
  [{
    label: 'Console',
    icon: 'mdi:view-dashboard',
    to: '/console',
  }, {
    label: 'Product',
    icon: 'mdi:palette-swatch-variant',
    children: [
      [{
        label: 'Category',
        to: '/console/product/category'
      }, {
        label: 'Product',
        to: '/console/product/product'
      }]
    ]
  }, {
    label: 'Warehouse',
    icon: 'mdi:warehouse',
  }, {
    label: 'Supply Chain',
    icon: 'mdi:account-group-outline'
  }, {
    label: 'Order',
    icon: 'mdi:script-text-outline'
  }, {
    label: 'Report',
    icon: 'mdi:file-table-box-multiple-outline'
  }, {
    label: 'System',
    icon: 'mdi:slack'
  }]
])

const title = computed(() => {
  const pageName = route?.meta?.pageName
  if (pageName){
    return `console - ${pageName}`
  }else {
    return 'console'
  }
})

</script>

<template>
  <div class="px-2 py-5 space-y-7">
    <div class="flex items-center justify-between">
      <span class="text-3xl font-bold">{{ useToUpper(title) }}</span>
      <div>
        <UHorizontalNavigation :links="consoleLinks">
          <template #default="{ link }">
            <UDropdown :items="link.children" :popper="{ placement: 'bottom-start' }">
              <span class="group-hover:text-primary relative">{{ link.label }}</span>
            </UDropdown>
          </template>
        </UHorizontalNavigation>
      </div>
    </div>
    <div class="p-3">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>