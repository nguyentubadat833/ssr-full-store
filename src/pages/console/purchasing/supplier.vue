<script setup>

definePageMeta({
  pageName: 'Supplier Management',
  hidden: true
})

const {findByCode, data, save, del} = useSupplier
const {data: supplierData, refresh: refreshData} = await useLazyAsyncData('supplier-data', () => data())

const isLoading = ref(false)
const supplierCurrent = reactive({
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
  supplierCurrent.code = ''
  supplierCurrent.info.name = ''
  supplierCurrent.info.tin = ''
  supplierCurrent.info.phone = ''
  supplierCurrent.info.address = ''
  supplierCurrent.createdBy = ''
}

async function deleteSupplier() {
  isLoading.value = true
  await del({
    code: supplierCurrent.code,
    callback: () => {
      refreshData()
      clearState()
    }
  })
      .finally(() => {
        isLoading.value = false
      })
}

async function mapSupplierInfo(object) {
  let data
  if (isString(object)) {
    data = await findByCode(object)
  } else {
    if (isObject(object)) {
      data = object
    }
  }
  if (data) {
    supplierCurrent.code = data?.code
    supplierCurrent.info.name = data?.info?.name
    supplierCurrent.info.tin = data?.info?.tin
    supplierCurrent.info.phone = data?.info?.phone
    supplierCurrent.info.address = data?.info?.address
    supplierCurrent.createdBy = data?.createdBy
  }
}

async function saveSupplier() {
  if (supplierCurrent.info.name) {
    isLoading.value = true
    const supplierCode = await save(supplierCurrent).finally(() => {
      isLoading.value = false
    })
    if (supplierCode) {
      await mapSupplierInfo(supplierCode)
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
    <TableAndDetail @clear="clearState" @del="deleteSupplier" @save="saveSupplier">
      <template #detail>
        <UForm :state="supplierCurrent" class="max-w-96 space-y-5">
          <UFormGroup label="Name" name="name">
            <UInput v-model="supplierCurrent.info.name"/>
          </UFormGroup>
          <UFormGroup label="Code" name="code">
            <UInput disabled v-model="supplierCurrent.code"/>
          </UFormGroup>
          <UFormGroup label="Tax Identification Number" name="tin">
            <UInput v-model="supplierCurrent.info.tin"/>
          </UFormGroup>
          <UFormGroup label="Phone" name="phone">
            <UInput v-model="supplierCurrent.info.phone"/>
          </UFormGroup>
          <UFormGroup label="Address" name="address">
            <UInput v-model="supplierCurrent.info.address"/>
          </UFormGroup>
          <UFormGroup label="Created by" name="createdBy">
            <UInput disabled v-model="supplierCurrent.createdBy"/>
          </UFormGroup>
        </UForm>
      </template>
      <UTable :columns="columns" :rows="supplierData || []" @select="mapSupplierInfo" class="mt-10 max-h-96">
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