<script setup>

const logs = ref([])

const eventSource = new EventSource('/see-log')
eventSource.onmessage = (event) => {
  const newLogs = JSON.parse(event.data)
  if (Array.isArray(newLogs)){
    newLogs.forEach(el => {
      el.message = JSON.parse(el.message)
      el.message.data = JSON.stringify(el.message.data)
    })
  }
  console.log(newLogs)
  logs.value = useConcat(logs.value, newLogs)
}

</script>

<template>
  <div>
    <div v-for="log in logs" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <span>{{ `- Type: ${log?.message?.type}` }}</span>
        <span>{{ `- Data: ${log?.message?.data}`}}</span>
      </div>
      <UDivider/>
    </div>
  </div>
</template>

<style scoped>

</style>