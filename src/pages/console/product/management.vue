<script setup>

definePageMeta({
  // pageName: 'Product Management',
  hidden: true
})

const {findByCode, data, save, del} = useProduct
const {data: productData, refresh: refreshData} = await useAsyncData('product-data', () => data())
const {data: categoryData} = await useAsyncData('category-data', () => useCategory.data(), {
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
    <UForm :state="productCurrent" class="max-w-96 space-y-5">
      <UFormGroup label="Name" name="name">
        <UInput v-model="productCurrent.name"/>
      </UFormGroup>
      <UFormGroup label="Category" name="category">
        <USelect v-model="productCurrent.categoryCode" :options="categoryData" option-attribute="name"
                 value-attribute="code"/>
      </UFormGroup>
      <UFormGroup label="Alias" name="alias">
        <UInput disabled v-model="productCurrent.alias"/>
      </UFormGroup>
      <UFormGroup label="Code" name="code">
        <UInput disabled v-model="productCurrent.code"/>
      </UFormGroup>
      <UFormGroup label="Created by" name="createdBy">
        <UInput disabled v-model="productCurrent.createdBy"/>
      </UFormGroup>
      <div class="flex justify-between pt-3">
        <UButton label="Clear" @click="clearState" color="white"/>
        <UButton :loading="isLoading" label="Delete" @click="deleteProduct" color="red"/>
        <UButton :loading="isLoading" label="Save" @click="saveProduct"/>
      </div>
    </UForm>
    <UTable :columns="columns" :rows="productData || []" @select="mapProductInfo" class="mt-10 max-h-96">
      <template #createdAt-data="{row}">
        <NuxtTime :datetime="row.createdAt" year="numeric" month="long" day="numeric" locale="en"/>
      </template>
    </UTable>
  </div>
</template>

<style scoped>

</style>