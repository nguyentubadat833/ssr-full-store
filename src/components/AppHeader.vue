<script setup lang="ts">

</script>

<template>
  <nav class="container mx-auto px-4">
    <div class="flex h-full items-center justify-between navbar-grid py-4">
      <div style="grid-area: logo">
        LOGO
      </div>
      <div style="grid-area: primary-menu">
        Primary Menu
      </div>
      <div style="grid-area: secondary-menu">
        Secondary Menu
      </div>
      <div style="grid-area: search">
        Search
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas: 'primary-menu logo secondary-menu' 'search search search';
  gap: 20px;
}

@media (min-width: 768px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: 'logo search secondary-menu' 'primary-menu primary-menu primary-menu';
    gap: 20px;
  }
}

@media (min-width: 1280px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    grid-template-areas: 'logo primary-menu search secondary-menu';
  }
}

</style>