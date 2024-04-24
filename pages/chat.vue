<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { type Socket, io } from 'socket.io-client'

const route = useRoute()

interface Chat {
  username: string
  text: string
  time: string
  room?: string
}
interface User {
  id: string
  username: string
  room: string
}
const message = ref('')
const chats = ref<Chat[]>([])
const users = ref<User[]>([])
const socket = ref<Socket>()
const currentRoom = ref('')
async function sendMessage() {
  socket.value?.emit('chatMessage', message.value)
  await nextTick(() => message.value = '')
}
onMounted(() => {
  const { username, room } = route.query as Partial<Chat>
  if (!username || !room)
    navigateTo('/')

  socket.value = io({
    path: '/api/socket.io',
  })
  //   Join ChatRoom
  socket.value.emit('joinRom', { username, room })
  socket.value.on('message', (response: Chat) => {
    chats.value.push(response)
  })
  socket.value.on('roomUsers', (response: { room: string, users: User[] }) => {
    currentRoom.value = response.room
    users.value = response.users
  })
})
onBeforeUnmount(() => {
  console.log('Disconnect Block')
  socket.value?.disconnect()
})
</script>

<template>
  <q-card class="" :style="{ body: { padding: 'p-0 sm:p-0' } }">
    <div class="text-primary flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <q-icon
          name="i-heroicons-chat-bubble-left-right"
          class="h-6 w-6 font-semibold"
        />
      </div>
      <div
        class="bg-primary cursor-pointer px-3 py-1.5 text-white"
        @click="navigateTo('/')"
      >
        Leave {{ $route.query.room }}
      </div>
    </div>
    <div class="flex">
      <!-- Sidebar -->
      <div class="bg-slate-100 px-6 py-4">
        <div class="mb-4">
          <div class="mb-2 flex items-center gap-x-2 rounded-md bg-white px-3 py-1.5">
            <q-icon
              name="i-heroicons-chat-bubble-bottom-center-text"
              class="h-6 w-6 font-semibold"
            />
            <div class="text-base">
              Room Name
            </div>
          </div>
          <div class="mb-2 ml-2 text-base text-gray-500 capitalize hover:text-gray-900">
            {{ currentRoom }}
          </div>
        </div>
        <div>
          <div class="mb-2 flex items-center gap-x-2 rounded-md bg-white px-3 py-1.5">
            <q-icon name="i-heroicons-user-group" class="h-6 w-6 font-semibold" />
            <div class="text-base">
              Users
            </div>
          </div>
          <div
            v-for="(user, i) in users"
            :key="i"
            class="mb-2 ml-2 text-base text-gray-500 capitalize hover:text-gray-900"
            :class="{ 'border-b border-primary': user.username === route.query.username }"
          >
            {{ user.username }}
          </div>
        </div>
      </div>
      <!-- Chat -->
      <div class="h-96 flex-1 overflow-y-auto px-8 py-10">
        <div
          v-for="(chat, i) in chats"
          :key="i"
          class="mb-3 w-full flex bg-transparent"
          :class="{
            'justify-center': chat.username === 'NuxtChatapp Admin',
            'justify-end': chat.username === route.query.username,
            'justify-start': chat.username !== route.query.username,
          }"
        >
          <div
            class="mb-3 w-1/2 rounded-md px-6 py-2"
            :class="{
              'bg-primary/20': chat.username === route.query.username,
              'bg-green-300': chat.username !== route.query.username,
            }"
          >
            <div class="flex items-center gap-x-3">
              <div class="text-primary text-xs font-semibold">
                {{ chat.username }}
              </div>
              <div class="text-xs">
                {{ chat.time }}
              </div>
            </div>
            <div class="mt-1 text-base">
              {{ chat.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage">
      <q-input
        v-model="message"
        placeholder="Enter your message...."
        :ui="{ padding: 'px-6 py-10' }"
      >
        <q-btn
          icon="i-heroicons-paper-airplane"
          size="xs"
          color="primary"
          variant="solid"
          :trailing="false"
          label="Send"
          class="my-3"
          type="submit"
        />
      </q-input>
    </form>
  </q-card>
</template>

<style scoped></style>
