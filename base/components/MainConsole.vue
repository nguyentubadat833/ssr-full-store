<script setup>
const emit = defineEmits(['print', 'create'])

</script>

<template>
  <div class="space-y-6">
    <div class="py-2 border-b flex justify-end gap-4">
      <UTooltip text="Print">
        <UButton icon="ic:outline-local-printshop" color="white" @click="emit('print')"/>
      </UTooltip>
      <UTooltip text="Create">
        <UButton icon="ic:baseline-plus" color="white" @click="emit('create')"/>
      </UTooltip>
    </div>
    <slot/>
  </div>
</template>

<style scoped>

</style>