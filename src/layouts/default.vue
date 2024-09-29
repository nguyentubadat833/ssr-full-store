<script setup>

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader/>
    <div class="flex-1 container mx-auto px-5">
      <slot/>
    </div>
    <AppFooter/>
  </div>
</template>

<style scoped>

</style>