<script setup lang="ts">
import { type ChatMessage } from '@/types/chat'
import { ref, onMounted } from 'vue'
import { mockMessage } from '@/mock'

const message = ref<ChatMessage[]>([])

const fetchMessages = async (roomID: string) => {
  message.value = mockMessage.payload
}

onMounted(() => {
  const roomID = localStorage.getItem('roomChatID')
  if (roomID) {
    fetchMessages(roomID)
  }
})
</script>

<template>
  <div class="chat-container bg-[var(--color-darkest)] px-4 py-2">
    <div
      v-for="msg in message"
      :key="msg.message"
      :class="['my-2 mt-2 flex', msg.type === 'reply' ? 'justify-end' : 'justify-start']"
    >
      <div
        :class="[
          msg.type === 'reply'
            ? 'rounded-l-2xl rounded-tr-2xl bg-[var(--color-accent-dark)] text-white'
            : 'rounded-tl-2xl rounded-r-2xl bg-[var(--color-gray-dark)] text-white',
          'max-w-[80%] px-4 py-2 break-all text-black',
        ]"
      >
        <p>{{ msg.message }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.chat-container {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* ซ่อน scrollbar ทุกเบราว์เซอร์ */
  /* Firefox */ /* IE 10+ */

  /* scrollbar-width: none; */
  /* -ms-overflow-style: none; */
}
/* Chrome, Safari, Edge */
.chat-container::-webkit-scrollbar {
  display: none;
}
</style>
