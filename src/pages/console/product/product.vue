<script setup lang="ts">
import type {IDataComponent} from "~/utils/IComponents/IDataComponent";

definePageMeta({
  pageName: 'Product Management',
  hidden: true
})

const {findByCode, data, save, del} = useProduct
const {data: productData, refresh: refreshData} = await useLazyAsyncData('product-data', () => data())
const {data: categoryData} = await useLazyAsyncData('category-data', () => useCategory.data(), {
  transform: (input: any) => {
    let result = []
    result.push({})
    if (Array.isArray(input)) {
      input.forEach(el => {
        result.push({
          name: el.name,
          code: el.code
        })
      })
    }
    return result
  }
})

const productCurrent = reactive({
  name: '',
  categoryCode: '',
  originalPrice: 0,
  salePercent: 0,
  alias: '',
  code: '',
  createdBy: '',
})


const columns = [{
  key: 'code',
  label: 'Code'
}, {
  key: 'categoryCode',
  label: 'Category Code'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'originalPrice',
  label: 'Original Price'
}, {
  key: 'salePercent',
  label: 'Sale Percent'
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

class ProductComponent implements IDataComponent {
  isOpenModal = ref<boolean>()
  isLoading = ref<boolean>()

  clearState(): void {
    productCurrent.name = ''
    productCurrent.categoryCode = ''
    productCurrent.originalPrice = 0
    productCurrent.salePercent = 0
    productCurrent.alias = ''
    productCurrent.code = ''
    productCurrent.createdBy = ''
  }

  createData(): void {
    this.clearState()
    this.isOpenModal.value = true
  }

  async deleteData(): Promise<void> {
    this.isLoading.value = true
    await del({
      code: productCurrent.code,
      callback: () => {
        refreshData()
        this.clearState()
      }
    })
        .finally(() => {
          this.isLoading.value = false
        })
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
      productCurrent.code = data?.code
      productCurrent.categoryCode = data?.categoryCode
      productCurrent.originalPrice = data?.originalPrice
      productCurrent.salePercent = data?.salePercent
      productCurrent.name = data?.name
      productCurrent.alias = data?.alias
      productCurrent.createdBy = data?.createdBy
    }
  }

  async saveData(): Promise<void> {
    if (productCurrent.name) {
      this.isLoading.value = true
      const productCode = await save(productCurrent).finally(() => {
        this.isLoading.value = false
      })
      if (productCode) {
        await this.mapState(productCode)
        await refreshData()
      }
    }
  }
}

const dataComponent = new ProductComponent()

</script>

<template>
  <div>
    <MainConsole :data-component="dataComponent">
      <UTable :columns="columns" :rows="productData || []" @select="dataComponent.mapState($event)" class="mt-10 max-h-96">
        <template #createdAt-data="{row}">
          <NuxtTime v-if="row?.createdAt" :datetime="row.createdAt" year="numeric" month="long" day="numeric"
                    locale="en"/>
        </template>
      </UTable>
      <template #modalBody>
        <UForm :state="productCurrent" class="space-y-5">
          <UFormGroup label="Name" name="name">
            <UInput v-model="productCurrent.name"/>
          </UFormGroup>
          <UFormGroup label="Category" name="category">
            <USelect v-model="productCurrent.categoryCode" :options="categoryData" option-attribute="name"
                     value-attribute="code"/>
          </UFormGroup>
          <UFormGroup label="Code" name="code">
            <UInput disabled v-model="productCurrent.code"/>
          </UFormGroup>
          <UFormGroup label="Original Price" name="originalPrice">
            <UInput v-model="productCurrent.originalPrice" type="number"/>
          </UFormGroup>
          <UFormGroup label="Sale Percent" name="salePercent">
            <UInput v-model="productCurrent.salePercent" type="number"/>
          </UFormGroup>
          <UFormGroup label="Alias" name="alias">
            <UInput disabled v-model="productCurrent.alias"/>
          </UFormGroup>
          <UFormGroup label="Created by" name="createdBy">
            <UInput disabled v-model="productCurrent.createdBy"/>
          </UFormGroup>
        </UForm>
      </template>
    </MainConsole>
  </div>
</template>

<style scoped>

</style>