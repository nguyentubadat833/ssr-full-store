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
    return `console - ${pageName}`
  } else {
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