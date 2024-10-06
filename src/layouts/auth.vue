<script setup>

const route = useRoute()
const router = useRouter()
const authCardStyleConfig = {
  base: 'h-full overflow-hidden p-3',
  ring: 'ring-0 md:ring-1 ring-gray-200 dark:ring-gray-800',
  shadow: 'md:shadow shadow-none',
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="md:w-96 w-full">
      <UCard :ui="authCardStyleConfig">
        <div class="flex flex-col items-center gap-5 mb-10">
          <span class="text-4xl font-bold text-center">{{ route?.meta?.pageName }}</span>
          <span @click="navigateTo('/')" class="text-sm text-gray-500 hover:underline cursor-pointer">Back To Home</span>
        </div>
        <NuxtPage/>
      </UCard>
    </div>
  </div>
</template>

<style scoped>

</style>