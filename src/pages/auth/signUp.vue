<script setup>
import {object, string} from "yup";

const isLoading = ref(false)
const route = useRoute()
const {locale} = useI18n()
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

const labelTranslate = {
  name: {
    vi: 'Họ và tên',
    en: 'Name'
  },
  email: {
    vi: 'Địa chỉ email',
    en: 'Email'
  },
  password: {
    vi: 'Mật khẩu',
    en: 'Password'
  },
  forgotPassword: {
    vi: 'Quên mật khẩu',
    en: 'Forgot Password'
  },
  continue: {
    vi: 'Tiếp tục',
    en: 'Continue'
  },
  or: {
    vi: 'Lựa chọn khác',
    en: 'OR'
  },
  submit: {
    vi: 'Đăng ký',
    en: 'Submit'
  },
  signIn: {
    vi: 'Đăng nhập',
    en: 'Sign In'
  }
}

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
      <UFormGroup :label="labelTranslate.name[`${locale}`]" name="name">
        <UInput v-model="registerFormState.name" placeholder="Your name"/>
      </UFormGroup>
      <UFormGroup :label="labelTranslate.email[`${locale}`]" name="email">
        <UInput v-model="registerFormState.email" placeholder="Your email"/>
      </UFormGroup>

      <UFormGroup :label="labelTranslate.password[`${locale}`]" name="password">
        <UInput v-model="registerFormState.password" type="password" placeholder="Your password"/>
      </UFormGroup>
      <UButton :loading="isLoading" type="submit" :label="labelTranslate.submit[`${locale}`]" block/>
    </UForm>
    <UDivider :label="labelTranslate.or[`${locale}`]" class="my-6"/>
    <div class="space-y-6">
      <UButton :label="labelTranslate.signIn[`${locale}`]" color="white" block @click="navigateTo('/auth/signIn')"/>
    </div>
  </div>
</template>

<style scoped>

</style>