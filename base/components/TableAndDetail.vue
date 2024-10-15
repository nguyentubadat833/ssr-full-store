<script setup>

const emit = defineEmits(['clear', 'del', 'save'])

function clear() {
  emit('clear')
}

function del() {
  emit('del')
}

function save() {
  emit('save')
}
</script>

<template>
  <div>
    <div class="space-y-6">
      <slot name="detail"/>
      <div v-if="$slots.detail" class="flex justify-center gap-5">
        <UButton icon="heroicons:x-circle-20-solid" label="Clear" @click="clear"/>
        <UButton icon="heroicons:trash-16-solid" label="Delete" @click="del"/>
        <UButton icon="heroicons:inbox-arrow-down-16-solid" label="Save" @click="save"/>
      </div>
    </div>
    <div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>