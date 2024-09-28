<script setup>

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader/>
    <div class="flex-1">
      <slot/>
    </div>
    <AppFooter/>
  </div>
</template>

<style scoped>

</style>