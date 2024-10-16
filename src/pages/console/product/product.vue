<script setup lang="ts">


definePageMeta({
  pageName: 'Product Management',
  hidden: true
})

const {findByCode, data, save, del} = useProduct
const {data: productData, refresh: refreshData} = await useLazyAsyncData('product-data', () => data())
const {data: categoryData} = await useLazyAsyncData('category-data', () => useCategory.data(), {
  transform: (input) => {
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

const isOpenModal = ref(false)
const isLoading = ref(false)
const productCurrent = reactive({
  name: '',
  categoryCode: '',
  alias: '',
  code: '',
  createdBy: '',
})

function clearState() {
  productCurrent.name = ''
  productCurrent.categoryCode = ''
  productCurrent.originalPrice = 0
  productCurrent.salePercent = 0
  productCurrent.alias = ''
  productCurrent.code = ''
  productCurrent.createdBy = ''
}

async function deleteProduct() {
  isLoading.value = true
  await del({
    code: productCurrent.code,
    callback: () => {
      refreshData()
      clearState()
    }
  })
      .finally(() => {
        isLoading.value = false
      })
}

async function mapProductInfo(object) {
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
    productCurrent.code = data?.code
    productCurrent.categoryCode = data?.categoryCode
    productCurrent.originalPrice = data?.originalPrice
    productCurrent.salePercent = data?.salePercent
    productCurrent.name = data?.name
    productCurrent.alias = data?.alias
    productCurrent.createdBy = data?.createdBy
  }
}

async function saveProduct() {
  if (productCurrent.name) {
    isLoading.value = true
    const productCode = await save(productCurrent).finally(() => {
      isLoading.value = false
    })
    if (productCode) {
      await mapProductInfo(productCode)
      await refreshData()
    }
  }
}

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

watchEffect(() => {
  console.log(categoryData.value)
})



</script>

<template>
  <div>
    <MainConsole @create="() => {clearState(); isOpenModal = true}">
      <UTable :columns="columns" :rows="productData || []" @select="mapProductInfo" class="mt-10 max-h-96">
        <template #createdAt-data="{row}">
          <NuxtTime v-if="row?.createdAt" :datetime="row.createdAt" year="numeric" month="long" day="numeric"
                    locale="en"/>
        </template>
      </UTable>
    </MainConsole>
    <ClientOnly>
      <UModal v-model="isOpenModal" :overlay="false">
        <ModalBody @clear="clearState" @del="deleteProduct" @save="saveProduct" @close="() => isOpenModal = false">
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
        </ModalBody>
      </UModal>
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>