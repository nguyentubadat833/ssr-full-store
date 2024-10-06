<script setup>

definePageMeta({
  pageName: 'Category Management'
})

const isLoading = ref(false)
const categoryCurrent = reactive({
  name: '',
  alias: '',
  code: '',
  createdBy: '',
})

// const headers = useRequestHeaders(['cookie'])
// await useFetch('/api/category/select', {
//   headers: headers
// })

await useApiConfig({
  endpoint: '/api/category/select'
})

async function mapCategoryInfo(categoryCode) {
  if (isString(categoryCode)) {
    const data = await useApiConfig({
      endpoint: '/api/category/select',
      params: {
        selectType: 'selectByCode',
        categoryCode: categoryCode
      }
    })
    if (data){
      categoryCurrent.code = data?.code
      categoryCurrent.name = data?.name
      categoryCurrent.alias = data?.alias
      categoryCurrent.createdBy = data?.createdBy
    }
  }
}

async function createCategory() {
  isLoading.value = true
  const categoryCode = await useApiConfig({
    endpoint: '/api/category/create',
    method: 'POST',
    body: categoryCurrent
  }).finally(() => {
    isLoading.value = false
  })
  if (categoryCode){
    await mapCategoryInfo(categoryCode)
  }
}

</script>

<template>
  <div>
    <UForm :state="categoryCurrent" class="w-96 space-y-5">
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
      <UFormGroup class="pt-3">
        <UButton :loading="isLoading" label="Save" @click="createCategory" block/>
      </UFormGroup>
    </UForm>
  </div>
</template>

<style scoped>

</style>