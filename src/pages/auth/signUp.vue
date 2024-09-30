<script setup>
import {object, string} from "yup";

const toast = useToast()

definePageMeta({
  pageName: 'Sign Up',
  layout: 'auth',
  auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
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
    await useApiConfig({
      endpoint: '/api/auth/register',
      method: 'POST',
      body: registerFormState,
      toastSuccessObjectCustom: {
        description: registerFormState.email
      }
    })
}

</script>

<template>
  <div>
    <UForm :state="registerFormState" :schema="registerFormSchema" class="space-y-7" @submit="onRegister">
      <UFormGroup label="Name" name="name" >
        <UInput v-model="registerFormState.name" placeholder="Your name"/>
      </UFormGroup>
      <UFormGroup label="Email" name="email" >
        <UInput v-model="registerFormState.email" placeholder="Your email"/>
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="registerFormState.password" type="password" placeholder="Your password"/>
      </UFormGroup>
      <UButton type="submit" label="Submit" block/>
    </UForm>
    <UDivider label="OR" class="my-6"/>
    <div class="space-y-6">
      <UButton label="Sign In" color="white" block @click="navigateTo('/auth/signIn')"/>
    </div>
  </div>
</template>

<style scoped>

</style>