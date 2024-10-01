<script setup>
definePageMeta({
  title: 'Payment',
  // type: 'secondary'
  middleware: [
    function (to, from) {
      if (!to.params?.code){
        return abortNavigation('Page not found')
      }
    },
  ],
})



</script>

<template>
<div>
  payment
</div>
</template>

<style scoped>

</style>