<script setup>
import MainConsole from "~~/base/components/MainConsole.vue";

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
        label: 'Category Management',
        to: '/console/product/category'
      }, {
        label: 'Product Management',
        to: '/console/product/product'
      }]
    ]
  }, {
    label: 'Warehouse',
    icon: 'mdi:warehouse',
    children: [
      [{
        label: 'Warehouse Management',
        to: '/console/warehouse/warehouse'
      }]
    ]
  }, {
    label: 'Purchasing',
    icon: 'mdi:account-group-outline',
    children: [
      [{
        label: 'PO Management',
        to: '/console/purchasing/po'
      }, {
        label: 'Supplier Management',
        to: '/console/purchasing/supplier'
      }]
    ]
  }, {
    label: 'Sales',
    icon: 'mdi:script-text-outline',
    children: [
      [{
        label: 'Order Management',
        to: '/console/sales/order'
      }, {
        label: 'Customer Management',
        to: '/console/sales/customer'
      },]
    ]
  }, {
    label: 'Report',
    icon: 'mdi:file-table-box-multiple-outline',
    children: [
      [{
        label: 'Inventory Report',
        to: '/console/report/inventory'
      }, {
        label: 'Purchase Order Report',
        to: '/console/report/po'
      }, {
        label: 'Sales Report',
        to: '/console/report/sales'
      }]
    ]
  }, {
    label: 'System',
    icon: 'mdi:slack',
    children: [
      [{
        label: 'User Management',
        to: '/console/system/user'
      }, {
        label: 'Settings',
        to: '/console/system/setting'
      },]
    ]
  }]
])

const title = computed(() => {
  const pageName = route?.meta?.pageName
  if (pageName) {
    return `CONSOLE - ${pageName}`
  } else {
    return 'CONSOLE'
  }
})

</script>

<template>
  <div class="px-2">
    <div class="flex lg:flex-row flex-row md:flex-col items-center justify-between gap-2 border-b p-3">
      <span class="text-lg lg:text-xl xl:text-2xl font-bold">{{ title }}</span>
      <div>
        <UHorizontalNavigation :links="consoleLinks" class="md:block hidden">
          <template #default="{ link }">
            <UDropdown :items="link.children" :popper="{ placement: 'bottom-start' }">
              <span class="group-hover:text-primary relative">{{ link.label }}</span>
            </UDropdown>
          </template>
        </UHorizontalNavigation>
        <UDropdown :items="consoleLinks" :popper="{ placement: 'bottom-start' }" class="md:hidden">
          <UButton icon="heroicons:bars-3-solid"/>
        </UDropdown>
      </div>
    </div>
    <slot/>
  </div>
</template>

<style scoped>

</style>