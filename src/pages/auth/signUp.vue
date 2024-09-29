<script setup>
definePageMeta({
  pageName: 'Sign Up',
  layout: 'auth',
  auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: '/'}
})

const registerFormState = reactive({
  name: '',
  email: '',
  password: ''
})

function onRegister() {

}

</script>

<template>
  <div>
    <UForm :state="registerFormState" class="space-y-7" @submit="onRegister">
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