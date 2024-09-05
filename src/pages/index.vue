<script setup>
const object = {
  name: 'datnguyen',
  email: 'datnguyen@gmail.com',
  phone: '0965904833'
}
const cropObject = useOmit(object, ['phone'])

</script>

<template>
<div>
  index
</div>
</template>

<style scoped>

</style>