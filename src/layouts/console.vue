<script setup>
const route = useRoute()

</script>

<template>
  <div class="px-2 py-5">
    <span class="text-3xl font-bold">{{ useToUpper(route?.meta?.pageName) }}</span>
    <div class="p-3 mt-5">
      <slot/>
    </div>

  </div>
</template>

<style scoped>

</style>