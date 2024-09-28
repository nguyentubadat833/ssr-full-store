<script setup lang="ts">
// Remember to disable the middleware protection from your page!
definePageMeta({
  pageName: 'Sign In',
  layout: 'auth',
  auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

const {signIn, getProviders} = useAuth()
// const providers = await getProviders()

const loginFormState = reactive({
  email: '',
  password: ''
})

function onLogin() {

}


</script>

<template>
  <div>
    <UForm :state="loginFormState" class="space-y-6" @submit="onLogin">
      <UFormGroup label="Email" name="email" >
        <UInput v-model="loginFormState.email" placeholder="Your email"/>
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="loginFormState.password" type="password" placeholder="Your password"/>
      </UFormGroup>
      <div class="text-right space-y-7">
        <span class="text-gray-600 italic cursor-pointer hover:underline hover:text-orange-400 text-sm">Forgot password ?</span>
        <UButton type="submit" label="Continue" block/>
      </div>
    </UForm>
    <UDivider label="OR" class="my-5"/>
    <div class="space-y-6">
      <UButton label="Sign Up" color="white" block @click="navigateTo('/auth/signUp')"/>
      <UButton label="Continue with Google" color="white" icon="logos:google-icon" block @click="signIn('google')"/>
    </div>
  </div>
</template>