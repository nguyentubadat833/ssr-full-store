<script setup>
import {object, string} from 'yup'

definePageMeta({
  pageName: 'Sign In',
  layout: 'auth',
  auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

const {signIn, getProviders} = useAuth()
const providers = await getProviders()
console.log(providers)

const loginFormSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required')
})
const loginFormState = reactive({
  email: '',
  password: ''
})

async function onLogin() {
  await signIn("credentials", {
    redirect: false,
    username: loginFormState.email,
    password: loginFormState.password
  })
}


</script>

<template>
  <div>
    <UForm :state="loginFormState" :schema="loginFormSchema" class="space-y-6" @submit="onLogin">
      <UFormGroup label="Email" name="email">
        <UInput v-model="loginFormState.email" type="email" placeholder="Your email"/>
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="loginFormState.password" type="password" placeholder="Your password"/>
      </UFormGroup>
      <div class="text-right space-y-7">
        <span class="text-gray-600 italic cursor-pointer hover:underline hover:text-orange-400 text-sm">Forgot password ?</span>
        <UButton type="submit" label="Continue" block/>
      </div>
    </UForm>
    <UDivider label="OR" class="my-6"/>
    <div class="space-y-6">
      <UButton label="Continue with Google" color="white" icon="logos:google-icon" block @click="signIn('google')"/>
      <UButton label="Sign Up" color="white" block @click="navigateTo('/auth/signUp')"/>
    </div>
  </div>
</template>