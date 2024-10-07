<script setup>
import {object, string} from 'yup'

const route = useRoute()
const toast = useToast()
const {t} = useI18n()
const {signIn, getProviders} = useAuth()
const {getToastObject} = useNotification
const providers = await getProviders()
const isLoading = ref(false)

definePageMeta({
  title: {
    vi: 'Đăng nhập',
    en: 'Sign In'
  },
  auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

useHead({
  title: getPageTitle(route)
})

const loginFormSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required')
})
const loginFormState = reactive({
  email: '',
  password: ''
})

async function onLogin() {
  isLoading.value = true
  const result = await signIn("credentials", {
    redirect: false,
    email: loginFormState.email,
    password: loginFormState.password
  }).finally(() => {
    isLoading.value = false
  })
  if (!result.error) {
    await navigateTo('/')
  } else {
    toast.add(getToastObject({
      type: 'error',
      description: result.error === 'CredentialsSignin' ? 'Tên người dùng hoặc mật khẩu không đúng' : 'Lỗi đăng nhập'
    }))
  }

}

</script>

<template>
  <div>
    <UForm :state="loginFormState" :schema="loginFormSchema" class="space-y-6" @submit="onLogin">
      <UFormGroup :label="t('email')" name="email">
        <UInput v-model="loginFormState.email" type="email"/>
      </UFormGroup>
      <UFormGroup :label="t('password')" name="password">
        <UInput v-model="loginFormState.password" type="password"/>
      </UFormGroup>
      <div class="text-right space-y-7">
        <span
            class="text-gray-600 italic cursor-pointer hover:underline hover:text-orange-400 text-sm">{{ t('forgotPassword') }} ?</span>
        <UButton :loading="isLoading" type="submit" :label="t('continue')" block/>
      </div>
    </UForm>
    <UDivider :label="t('or')" class="my-6"/>
    <div class="space-y-6">
      <UButton :label="t('continueWithGoogle')" color="white" icon="logos:google-icon" block @click="signIn('google')"/>
      <UButton :label="t('signUp')" color="white" block @click="navigateTo('/auth/signUp')"/>
    </div>
  </div>
</template>