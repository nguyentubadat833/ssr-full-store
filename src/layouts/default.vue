<script setup>

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="shadow top-0 z-50 sticky backdrop-blur bg-background/75">
      <AppHeader/>
    </div>
    <div class="flex-1 container mx-auto px-5 py-10">
      <slot/>
    </div>
    <AppFooter/>
  </div>
</template>

<style scoped>

</style>