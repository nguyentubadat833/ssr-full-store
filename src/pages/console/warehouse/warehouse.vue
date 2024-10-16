<script setup lang="ts">

import {ABDataComponent} from "~/utils/defineComponents/ABDataComponent";

definePageMeta({
  pageName: 'Warehouse Management',
  hidden: true
})

const {findByCode, data, save, del} = useWarehouse
const {data: warehouseData, refresh: refreshData} = await useLazyAsyncData('warehouse-data', () => data())

const warehouseCurrent = reactive({
  name: '',
  code: '',
  location: '',
  maxCapacity: 0,
  // stock: [],
  createdBy: '',
})

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

class DataComponent extends ABDataComponent {
  clearState(): void {
    warehouseCurrent.name = ''
    warehouseCurrent.code = ''
    warehouseCurrent.location = ''
    warehouseCurrent.maxCapacity = 0
    // warehouseCurrent.stock = []
    warehouseCurrent.createdBy = ''
  }

  createData(): void {
    this.clearState()
    this.isOpenModal.value = true
  }

  async deleteData(object: any): Promise<void> {
    this.isOpenModal.value = true
    let data: any
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

  async mapState(object: any): Promise<void> {
    this.isOpenModal.value = true
    let data: any
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

  async saveData(): Promise<void> {
    if (warehouseCurrent.name) {
      this.isLoading.value = true
      const warehouseCode = await save(warehouseCurrent).finally(() => {
        this.isLoading.value = false
      })
      if (warehouseCode) {
        await this.mapState(warehouseCode)
        await refreshData()
      }
    }
  }
}

const dataComponent = new DataComponent()

</script>

<template>
  <div>
    <MainConsole :data-component="dataComponent">
      <UTable :columns="columns" :rows="warehouseData || []" @select="dataComponent.mapState($event)"
              class="mt-10 max-h-96">
        <template #createdAt-data="{row}">
          <NuxtTime v-if="row?.createdAt" :datetime="row.createdAt" year="numeric" month="long" day="numeric"
                    locale="en"/>
        </template>
      </UTable>
      <template #modalBody>
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
      </template>
    </MainConsole>
  </div>
</template>

<style scoped>

</style>