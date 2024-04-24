<script setup lang="ts">
const online = useOnline()
const rooms = ['Leads', 'Chats', 'Secured', 'General']
const state = reactive({
  username: '',
  room: rooms[0],
})
async function onSubmit() {
  navigateTo(`/chat?username=${state.username}&room=${state.room}`)
}
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <q-form :state="state" class="space-y-6">
      <q-input v-model="state.username" label="Username" name="username" />
      <q-select v-model="state.room" label="Room" name="room" :options="rooms" />
      <q-btn type="submit" label="Join Chat" @click.prevent="onSubmit" />
    </q-form>
  </div>
</template>
