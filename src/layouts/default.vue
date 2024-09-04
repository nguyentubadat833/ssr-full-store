<script setup lang="ts">

import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
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