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

const categoryData = await useApiConfig({
  endpoint: '/api/category/select',
  params: {
    selectType: 'selectMany'
  }
})

async function mapCategoryInfo(object) {
  console.log(object)
  let data
  if (isString(object)) {
    data = await useApiConfig({
      endpoint: '/api/category/select',
      params: {
        selectType: 'selectByCode',
        categoryCode: object
      }
    })
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

async function createCategory() {
  isLoading.value = true
  const categoryCode = await useApiConfig({
    endpoint: '/api/category/create',
    method: 'POST',
    body: categoryCurrent
  }).finally(() => {
    isLoading.value = false
  })
  if (categoryCode) {
    await mapCategoryInfo(categoryCode)
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
    <UTable :columns="columns" :rows="categoryData || []" @select="mapCategoryInfo" class="mt-10 max-h-96">
      <template #createdAt-data="{row}">
        <NuxtTime :datetime="row.createdAt" year="numeric" month="long" day="numeric" locale="en"/>
      </template>
    </UTable>
  </div>
</template>

<style scoped>

</style>