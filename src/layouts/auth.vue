<script setup>

const route = useRoute()
const authCardStyleConfig = {
  base: 'h-full overflow-hidden p-3',
  ring: 'ring-0 md:ring-1 ring-gray-200 dark:ring-gray-800',
  shadow: 'md:shadow shadow-none',
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="md:w-96 w-full h-3/4">
      <UCard :ui="authCardStyleConfig">
        <div class="flex justify-center mb-16 mt-5">
          <span class="text-4xl font-bold text-center">{{route?.meta?.pageName}}</span>
        </div>
        <NuxtPage/>

      </UCard>
    </div>
  </div>
</template>

<style scoped>

</style>