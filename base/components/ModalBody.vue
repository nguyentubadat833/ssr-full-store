<script setup>
const emit = defineEmits(['clear', 'save', 'del', 'close'])

</script>

<template>
  <div class="p-4 space-y-6">
    <slot/>
    <div class="flex justify-between items-center gap-4">
      <div class="flex justify-start ">
        <UIcon name="ic:sharp-close" size="20" class="cursor-pointer hover:bg-gray-500" @click="emit('close')"/>
      </div>
      <div class="flex justify-end gap-4">
        <UTooltip text="Clear">
          <UButton icon="ic:sharp-cleaning-services" @click="emit('clear')"/>
        </UTooltip>
        <UTooltip text="Delete">
          <UButton icon="ic:outline-delete-outline" @click="emit('del')"/>
        </UTooltip>
        <UTooltip text="Save">
          <UButton icon="ic:outline-save" @click="emit('save')"/>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>