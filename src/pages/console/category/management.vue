<script setup>

definePageMeta({
  pageName: 'Category Management',
  hidden: true
})

const {findByCode, data, create, del} = useCategory
const {data: categoryData, refresh: refreshData} = await useAsyncData('category-data', () => data())

const isLoading = ref(false)
const categoryCurrent = reactive({
  name: '',
  alias: '',
  code: '',
  createdBy: '',
})

function clearState() {
  categoryCurrent.name = ''
  categoryCurrent.alias = ''
  categoryCurrent.code = ''
  categoryCurrent.createdBy = ''
}

async function deleteCategory() {
  isLoading.value = true
  await del({
    code: categoryCurrent.code,
    callback: () => {
      refreshData()
      clearState()
    }
  })
      .finally(() => {
        isLoading.value = false
      })
}

async function mapCategoryInfo(object) {
  let data
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

async function createCategory() {
  if (categoryCurrent.name) {
    isLoading.value = true
    const categoryCode = await create(categoryCurrent).finally(() => {
      isLoading.value = false
    })
    if (categoryCode) {
      await mapCategoryInfo(categoryCode)
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
    <UForm :state="categoryCurrent" class="max-w-96 space-y-5">
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
      <div class="flex justify-between pt-3">
        <UButton label="Clear" @click="clearState" color="white"/>
        <UButton :loading="isLoading" label="Delete" @click="deleteCategory" color="red"/>
        <UButton :loading="isLoading" label="Save" @click="createCategory"/>
      </div>
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