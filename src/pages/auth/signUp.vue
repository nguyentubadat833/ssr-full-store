<script setup>
import {object, string} from "yup";

const isLoading = ref(false)
const route = useRoute()
const {locale, t} = useI18n()
definePageMeta({
  title: {
    vi: 'Đăng ký',
    en: 'Sign Up'
  },
  auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

useHead({
  title: getPageTitle(route)
})

const registerFormSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required')
})

const registerFormState = reactive({
  name: '',
  email: '',
  password: ''
})

async function onRegister() {
  isLoading.value = true
  await useApiConfig({
    endpoint: '/api/auth/register',
    method: 'POST',
    body: registerFormState,
    toastSuccessObjectCustom: {
      description: registerFormState.email
    },
    callbackMethodOnSuccess: () => {
      setTimeout(() => {
        navigateTo('/auth/signIn')
      }, 2000)
    }
  }).finally(() => {
    isLoading.value = false
  })
}

</script>

<template>
  <div>
    <UForm :state="registerFormState" :schema="registerFormSchema" class="space-y-7" @submit="onRegister">
      <UFormGroup :label="t('name')" name="name">
        <UInput v-model="registerFormState.name"/>
      </UFormGroup>
      <UFormGroup :label="t('email')" name="email">
        <UInput v-model="registerFormState.email"/>
      </UFormGroup>

      <UFormGroup :label="t('password')" name="password">
        <UInput v-model="registerFormState.password" type="password"/>
      </UFormGroup>
      <UButton :loading="isLoading" type="submit" :label="t('submit')" block/>
    </UForm>
    <UDivider :label="t('or')" class="my-6"/>
    <div class="space-y-6">
      <UButton :label="t('signIn')" color="white" block @click="navigateTo('/auth/signIn')"/>
    </div>
  </div>
</template>

<style scoped>

</style>