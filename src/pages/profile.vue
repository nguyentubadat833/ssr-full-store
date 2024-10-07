<script setup>

const {handleFileInput, files} = useFileStorage()
const {data: userData} = useAuth()
const route = useRoute()
definePageMeta({
  title: {
    vi: 'Hồ sơ cá nhân',
    en: 'Profile'
  },
  requireAuth: true
  // type: 'secondary'
})

defineI18nRoute({
  paths: {
    vi: '/ho-so',
    en: '/profile'
  }
})

useHead({
  title: getPageTitle(route)
})

const infoFormState = reactive({
  name: userData?.value?.user?.name || '',
  email: userData?.value?.user?.email || '',
  newPassword: '',
  retypeNewPassword: '',
  passwordCurrent: ''
})

const avatarDropdownItems = [
  [
    {
      label: 'Upload',
      icon: 'ic:sharp-cloud-upload',
      click: () => {
        const uploadEl = document.getElementById('upload-el')
        uploadEl.click()
      }
    }
  ]
]

async function upload() {
  if (Array.isArray(files.value) && files.value.length > 0) {
    await useApiConfig({
      endpoint: '/api/file/upload',
      method: 'POST',
      body: {
        files: files.value
      },
    })
    files.value.length = 0
  }
}

</script>

<template>
  <div>
    <UCard class="mx-auto py-10" :ui="{base: 'max-w-[40rem]'}">
      <div class="flex flex-col items-center gap-3">
        <UDropdown :items="avatarDropdownItems" :popper="{ placement: 'bottom-start' }">
          <UAvatar
              :src="userData?.user?.image"
              alt="Avatar" size="3xl"
          />
        </UDropdown>
        <div class="flex items-center gap-3" v-if="Array.isArray(files) && files.length > 0">
          <p class="truncate max-w-40">{{ files[0]?.name }}</p>
          <UButton @click="upload" label="Submit"/>
        </div>

        <UForm :state="infoFormState" class="space-y-6 w-full sm:px-10 mt-10">
          <UFormGroup label="Name" name="name">
            <UInput v-model="infoFormState.name"/>
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput v-model="infoFormState.email"/>
          </UFormGroup>
          <UFormGroup label="Password" class="">
            <UInput type="password" v-model="infoFormState.newPassword" placeholder="Enter new password" class="mb-3"/>
            <UInput v-if="infoFormState.newPassword" type="password" v-model="infoFormState.retypeNewPassword"
                    placeholder="Retype new password" class="mb-3"/>
            <UInput v-if="infoFormState.newPassword && infoFormState.newPassword === infoFormState.retypeNewPassword"
                    type="password" v-model="infoFormState.passwordCurrent" placeholder="Enter password current"/>
          </UFormGroup>
          <div>
            <UButton type="submit" block class="mt-10">
              Submit
            </UButton>
          </div>
        </UForm>

      </div>
    </UCard>

    <input id="upload-el" type="file" @input="handleFileInput" class="hidden"/>
  </div>
</template>

<style scoped>

</style>