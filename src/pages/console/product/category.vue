<script setup lang="ts">


import {ABDataComponent} from "~/utils/defineComponents/ABDataComponent";

definePageMeta({
  pageName: 'Category Management',
  hidden: true
})


const {findByCode, data, save, del} = useCategory
const {data: categoryData, refresh: refreshData} = await useLazyAsyncData('category-data', () => data())
const categoryCurrent = reactive({
  name: '',
  alias: '',
  code: '',
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
  key: 'alias',
  label: 'Alias'
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

class CategoryComponent extends ABDataComponent {
  clearState() {
    categoryCurrent.name = ''
    categoryCurrent.alias = ''
    categoryCurrent.code = ''
    categoryCurrent.createdBy = ''
  }

  async mapState(object: any) {
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
      categoryCurrent.code = data?.code
      categoryCurrent.name = data?.name
      categoryCurrent.alias = data?.alias
      categoryCurrent.createdBy = data?.createdBy
    }
  }

  async deleteData() {
    this.isLoading.value = true
    await del({
      code: categoryCurrent.code,
      callback: () => {
        refreshData()
        this.clearState()
      }
    })
        .finally(() => {
          this.isLoading.value = false
        })
  }

  async saveData() {
    if (categoryCurrent.name) {
      this.isLoading.value = true
      const categoryCode = await save(categoryCurrent).finally(() => {
        this.isLoading.value = false
      })
      if (categoryCode) {
        await this.mapState(categoryCode)
        await refreshData()
      }
    }
  }

  createData(): void {
    this.clearState()
    this.isOpenModal.value = true
  }
}

const categoryComponent = new CategoryComponent()
</script>

<template>
  <div>
    <MainConsole :data-component="categoryComponent">
      <UTable :columns="columns" :rows="categoryData || []" @select="categoryComponent.mapState($event)" class="max-h-96">
        <template #createdAt-data="{row}">
          <NuxtTime v-if="row?.createdAt" :datetime="row.createdAt" year="numeric" month="long" day="numeric"
                    locale="en"/>
        </template>
      </UTable>
      <template #modalBody>
        <UForm :state="categoryCurrent" class="space-y-5">
          <UFormGroup label="Name" name="name">
            <UInput v-model="categoryCurrent.name"/>
          </UFormGroup>
          <UFormGroup label="Alias" name="alias">
            <UInput disabled v-model="categoryCurrent.alias"/>
          </UFormGroup>
          <UFormGroup label="Code" name="code">
            <UInput disabled v-model="categoryCurrent.code"/>
          </UFormGroup>
          <UFormGroup label="Created by" name="createdBy">
            <UInput disabled v-model="categoryCurrent.createdBy"/>
          </UFormGroup>
        </UForm>
      </template>
    </MainConsole>
  </div>
</template>

<style scoped>

</style>