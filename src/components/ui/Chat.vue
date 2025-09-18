<script setup lang="ts">
import { type ChatMessage } from '@/types/chat'
import { ref, onMounted } from 'vue'
import { getMessage } from '@/service/message'

import { showError } from '@/utils/alert_message'
import userStore from '@/stores/userStore'
import messageStore from '@/stores/messageStore'

const message = ref<ChatMessage[]>([])
const storeUser = userStore()
const storeMessage = messageStore()

const fetchMessages = async (roomID: string) => {
  const res = await getMessage(roomID)
  if (res && res.code == 200) {
    storeMessage.message = res.payload
  } else {
    showError(() => res.message)
    storeMessage.message = []
  }
}

onMounted(() => {
  const roomID = storeUser.roomID
  if (roomID) {
    fetchMessages(roomID)
  }
})
</script>

<template>
  <div class="chat-container bg-[var(--color-darkest)] px-4 py-2">
    <div
      v-for="msg in storeMessage.message"
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
        <p v-if="msg.message_type === 'text'">{{ msg.message }}</p>
        <img v-else :src="msg.message" alt="" />
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
