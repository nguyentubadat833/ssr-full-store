<script setup>
import {object, string} from 'yup'

const toast = useToast()
const {locale} = useI18n()
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


const loginFormSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required')
})
const loginFormState = reactive({
  email: '',
  password: ''
})

const labelTranslate = {
  backToHome: {
    vi: 'Trở về trang chủ',
    en: 'Back To Home'
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
  continueGoogle: {
    vi: 'Đăng nhập với Google',
    en: 'Continue with Google'
  },
  signUp: {
    vi: 'Đăng ký',
    en: 'Sign Up'
  }
}

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
      <UFormGroup :label="labelTranslate.email[`${locale}`]" name="email">
        <UInput v-model="loginFormState.email" type="email"/>
      </UFormGroup>
      <UFormGroup :label="labelTranslate.password[`${locale}`]" name="password">
        <UInput v-model="loginFormState.password" type="password"/>
      </UFormGroup>
      <div class="text-right space-y-7">
        <span class="text-gray-600 italic cursor-pointer hover:underline hover:text-orange-400 text-sm">{{labelTranslate.forgotPassword[`${locale}`]}} ?</span>
        <UButton :loading="isLoading" type="submit" :label="labelTranslate.continue[`${locale}`]"  block/>
      </div>
    </UForm>
    <UDivider :label="labelTranslate.or[`${locale}`]"  class="my-6"/>
    <div class="space-y-6">
      <UButton :label="labelTranslate.continueGoogle[`${locale}`]"  color="white" icon="logos:google-icon" block @click="signIn('google')"/>
      <UButton :label="labelTranslate.signUp[`${locale}`]"  color="white" block @click="navigateTo('/auth/signUp')"/>
    </div>
  </div>
</template>