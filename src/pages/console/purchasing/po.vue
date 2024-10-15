<script setup>

definePageMeta({
  pageName: 'Purchase Order Management',
  hidden: true
})

const {findByCode, data, save, del} = usePurchaseOrder
const {data: supplierFetch, findByCode: findSupplierByCode} = useSupplier
const {data: purchaseOrderData, refresh: refreshData} = await useLazyAsyncData('purchase-order-data', () => data())
const {data: supplierData} = await useLazyAsyncData('supplier-data', () => supplierFetch(), {
  transform: (input) => {
    let result = []
    if (Array.isArray(input)) {
      input.forEach(el => {
        result.push({
          id: el.id,
          code: el.code,
          name: el.info.name
        })
      })
    }
    return result
  }
})

const isLoading = ref(false)
const purchaseOrderCurrent = reactive({
  code: '',
  supplierCode: '',
  supplierName: '',
  createdBy: ''
})

function clearState() {
  purchaseOrderCurrent.code = ''
  purchaseOrderCurrent.supplierCode = ''
  purchaseOrderCurrent.createdBy = ''
}

async function deletePurchaseOrder() {
  isLoading.value = true
  await del({
    code: purchaseOrderCurrent.code,
    callback: () => {
      refreshData()
      clearState()
    }
  })
      .finally(() => {
        isLoading.value = false
      })
}

async function mapSupplierData(supplierCode) {
  const data = await findSupplierByCode(supplierCode)
  if (data) {
    purchaseOrderCurrent.supplierName = data?.info?.name
  }
}

async function mapPurchaseOrderInfo(object) {
  let data
  if (isString(object)) {
    data = await findByCode(object)
  } else {
    if (isObject(object)) {
      data = object
    }
  }
  if (data) {
    purchaseOrderCurrent.code = data?.code
    purchaseOrderCurrent.supplierCode = data?.supplierCode
    purchaseOrderCurrent.createdBy = data?.createdBy

    mapSupplierData(purchaseOrderCurrent.supplierCode)
  }
}

async function savePurchaseOrder() {
  isLoading.value = true
  const purchaseOrderCode = await save(purchaseOrderCurrent).finally(() => {
    isLoading.value = false
  })
  if (purchaseOrderCode) {
    await mapPurchaseOrderInfo(purchaseOrderCode)
    await refreshData()
  }
}

const columns = [{
  key: 'code',
  label: 'Code'
}, {
  key: 'supplierCode',
  label: 'Supplier Code',
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

function selectSupplier(data) {
  purchaseOrderCurrent.supplierCode = data[0].code
  purchaseOrderCurrent.supplierName = data[0].name
}

</script>

<template>
  <div>
    <TableAndDetail @clear="clearState" @del="deletePurchaseOrder" @save="savePurchaseOrder">
      <template #detail>
        <UForm :state="purchaseOrderCurrent" class="max-w-96 space-y-5">
          <UFormGroup label="Code" name="code">
            <UInput disabled v-model="purchaseOrderCurrent.code"/>
          </UFormGroup>
          <UFormGroup label="Supplier" name="supplierCode">
            <div class="space-y-2">
              <div class="flex gap-2">
                <UInput disabled v-model="purchaseOrderCurrent.supplierCode" class="w-full"/>
                <SearchData @selected="selectSupplier" :data="supplierData"
                            :columns="[{key: 'code', label: 'Code'}, {key: 'name', label: 'Name'}]"
                            title="Select Customer"/>
              </div>
              <UInput disabled v-model="purchaseOrderCurrent.supplierName"/>
            </div>
          </UFormGroup>
          <UFormGroup label="Created by" name="createdBy">
            <UInput disabled v-model="purchaseOrderCurrent.createdBy"/>
          </UFormGroup>
        </UForm>
      </template>
      <UTable :columns="columns" :rows="purchaseOrderData || []" @select="mapPurchaseOrderInfo" class="mt-10 max-h-96">
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