<script setup>

definePageMeta({
  pageName: 'Warehouse Management',
  hidden: true
})

const {findByCode, data, save, del} = useWarehouse
const {data: warehouseData, refresh: refreshData} = await useLazyAsyncData('warehouse-data', () => data())

const isOpenModal = ref(false)
const isLoading = ref(false)
const warehouseCurrent = reactive({
  name: '',
  code: '',
  location: '',
  maxCapacity: 0,
  // stock: [],
  createdBy: '',
})

function clearState() {
  warehouseCurrent.name = ''
  warehouseCurrent.code = ''
  warehouseCurrent.location = ''
  warehouseCurrent.maxCapacity = 0
  // warehouseCurrent.stock = []
  warehouseCurrent.createdBy = ''
}

async function deleteWarehouse() {
  isLoading.value = true
  await del({
    code: warehouseCurrent.code,
    callback: () => {
      refreshData()
      clearState()
    }
  })
      .finally(() => {
        isLoading.value = false
      })
}

async function mapWarehouseInfo(object) {
  isOpenModal.value = true
  let data
  if (isString(object)) {
    data = await findByCode(object)
  } else {
    if (isObject(object)) {
      data = object
    }
  }
  if (data) {
    warehouseCurrent.code = data?.code
    warehouseCurrent.name = data?.name
    warehouseCurrent.location = data?.location
    warehouseCurrent.maxCapacity = data?.maxCapacity
    // warehouseCurrent.stock = data?.stock
    warehouseCurrent.createdBy = data?.createdBy
  }
}

async function saveWarehouse() {
  if (warehouseCurrent.name) {
    isLoading.value = true
    const warehouseCode = await save(warehouseCurrent).finally(() => {
      isLoading.value = false
    })
    if (warehouseCode) {
      await mapWarehouseInfo(warehouseCode)
      await refreshData()
    }
  }
}

const columns = [{
  key: 'code',
  label: 'Code'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'location',
  label: 'Location'
}, {
  key: 'maxCapacity',
  label: 'Max capacity'
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
    <MainConsole @create="() => {clearState(); isOpenModal = true}">
      <UTable :columns="columns" :rows="warehouseData || []" @select="mapWarehouseInfo" class="mt-10 max-h-96">
        <template #createdAt-data="{row}">
          <NuxtTime v-if="row?.createdAt" :datetime="row.createdAt" year="numeric" month="long" day="numeric"
                    locale="en"/>
        </template>
      </UTable>
    </MainConsole>
    <ClientOnly>
      <UModal v-model="isOpenModal" :overlay="false">
        <ModalBody @clear="clearState" >
          <UForm :state="warehouseCurrent" class="space-y-5">
            <UFormGroup label="Name" name="name">
              <UInput v-model="warehouseCurrent.name"/>
            </UFormGroup>
            <UFormGroup label="Code" name="code">
              <UInput disabled v-model="warehouseCurrent.code"/>
            </UFormGroup>
            <UFormGroup label="Location" name="location">
              <UInput v-model="warehouseCurrent.location"/>
            </UFormGroup>
            <UFormGroup label="Max Capacity" name="maxCapacity">
              <UInput v-model="warehouseCurrent.maxCapacity"/>
            </UFormGroup>
            <UFormGroup label="Created by" name="createdBy">
              <UInput disabled v-model="warehouseCurrent.createdBy"/>
            </UFormGroup>
          </UForm>
        </ModalBody>
      </UModal>
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>