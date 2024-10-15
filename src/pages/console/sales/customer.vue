<script setup>

definePageMeta({
  pageName: 'Customer Management',
  hidden: true
})

const {findByCode, data, save, del} = useCustomer
const {data: customerData, refresh: refreshData} = await useLazyAsyncData('customer-data', () => data())

const isLoading = ref(false)
const customerCurrent = reactive({
  code: '',
  info: {
    name: '',
    tin: '',
    phone: '',
    address: '',
  },
  createdBy: ''
})

function clearState() {
  customerCurrent.code = ''
  customerCurrent.info.name = ''
  customerCurrent.info.tin = ''
  customerCurrent.info.phone = ''
  customerCurrent.info.address = ''
  customerCurrent.createdBy = ''
}

async function deleteCustomer() {
  isLoading.value = true
  await del({
    code: customerCurrent.code,
    callback: () => {
      refreshData()
      clearState()
    }
  })
      .finally(() => {
        isLoading.value = false
      })
}

async function mapCustomerInfo(object) {
  let data
  if (isString(object)) {
    data = await findByCode(object)
  } else {
    if (isObject(object)) {
      data = object
    }
  }
  if (data) {
    customerCurrent.code = data?.code
    customerCurrent.info.name = data?.info?.name
    customerCurrent.info.tin = data?.info?.tin
    customerCurrent.info.phone = data?.info?.phone
    customerCurrent.info.address = data?.info?.address
    customerCurrent.createdBy = data?.createdBy
  }
}

async function saveCustomer() {
  if (customerCurrent.info.name) {
    isLoading.value = true
    const supplierCode = await save(customerCurrent).finally(() => {
      isLoading.value = false
    })
    if (supplierCode) {
      await mapCustomerInfo(supplierCode)
      await refreshData()
    }
  }
}

const columns = [{
  key: 'code',
  label: 'Code'
}, {
  key: 'info.name',
  label: 'Name',
  sortable: true
}, {
  key: 'info.tin',
  label: 'Tax Identification Number'
}, {
  key: 'info.phone',
  label: 'Phone'
}, {
  key: 'info.address',
  label: 'Address'
}, {
  key: 'createdBy',
  label: 'Create by'
}, {
  key: 'createdAt',
  label: 'Create at',
  sortable: true
}]

const sort = ref({
  column: 'createdAt',
  direction: 'desc'
})


</script>

<template>
  <div>
    <TableAndDetail @clear="clearState" @del="deleteCustomer" @save="saveCustomer">
      <template #detail>
        <UForm :state="customerCurrent" class="max-w-96 space-y-5">
          <UFormGroup label="Name" name="name">
            <UInput v-model="customerCurrent.info.name"/>
          </UFormGroup>
          <UFormGroup label="Code" name="code">
            <UInput disabled v-model="customerCurrent.code"/>
          </UFormGroup>
          <UFormGroup label="Tax Identification Number" name="tin">
            <UInput v-model="customerCurrent.info.tin"/>
          </UFormGroup>
          <UFormGroup label="Phone" name="phone">
            <UInput v-model="customerCurrent.info.phone"/>
          </UFormGroup>
          <UFormGroup label="Address" name="address">
            <UInput v-model="customerCurrent.info.address"/>
          </UFormGroup>
          <UFormGroup label="Created by" name="createdBy">
            <UInput disabled v-model="customerCurrent.createdBy"/>
          </UFormGroup>
        </UForm>
      </template>
      <UTable :columns="columns" :rows="customerData || []" @select="mapCustomerInfo" class="mt-10 max-h-96">
        <template #createdAt-data="{row}">
          <NuxtTime v-if="row?.createdAt" :datetime="row.createdAt" year="numeric" month="long" day="numeric"
                    locale="en"/>
        </template>
      </UTable>
    </TableAndDetail>
  </div>
</template>

<style scoped>

</style>