<script setup lang="ts">
import BaseInput from '../common/BaseInputMessage.vue'
import { ref } from 'vue'
import { postMessage } from '@/service/message'
import useStoreApp from '@/stores/userStore'
import { showError } from '@/utils/alert_message'
import messageStore from '@/stores/messageStore'
const emit = defineEmits(['update:modelValue'])

const message = ref<string>('')
const imagesPreview = ref<string[]>([])
const filesImg = ref<File[]>([])
const previewVisible = ref(false)
const previewTitle = ref('รูปภาพที่แนบมา')
const imagePreview = ref<string>('')
const storeApp = useStoreApp()
const storeMessage = messageStore()

const handleCancel = () => {
  previewVisible.value = false
}
const updateFiles = (files: File[]) => {
  filesImg.value = files
  imagesPreview.value = files.map((file) => URL.createObjectURL(file))
  sendMessage()
}

const openPreview = (url: string) => {
  previewVisible.value = true
  previewTitle.value = 'รูปภาพที่แนบมา'
  imagePreview.value = url
}

const handleDeleteImage = (index: number) => {
  imagesPreview.value.splice(index, 1)
  filesImg.value.splice(index, 1)
}

const sendMessage = async () => {
  if (!message.value.trim() && !filesImg.value.length) return
  const payload = {
    room_id: storeApp.roomID,
    message: message.value,
    img: imagesPreview.value.length > 0 ? imagesPreview.value[0] : '',
  }
  const res = await postMessage(payload)
  if (res && res.code == 200) {
    pushMessage()
    message.value = ''
    filesImg.value = []
    imagesPreview.value = []
  } else {
    showError(() => res.message)
  }
}
const pushMessage = async () => {
  const messages = message.value
    ? message.value
    : imagesPreview.value.length > 0
      ? imagesPreview.value[0]
      : ''
  const payload = {
    id: new Date().getTime().toString(),
    type: 'reply',
    room_id: storeApp.roomID,
    message: messages,
    message_type: message.value ? 'text' : 'image',
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  }
  storeMessage.message.unshift(payload)
}
</script>
<template>
  <!-- <div
    v-if="imagesPreview.length"
    class="mt-2 flex max-h-[80px] w-full flex-wrap gap-4 overflow-y-auto bg-[var(--color-dark)] p-2"
  >
    <div
      v-for="(url, index) in imagesPreview"
      @click="openPreview(url)"
      :key="index"
      class="relative"
    >
      <img
        :src="url"
        alt="Preview"
        class="size-[60px] cursor-pointer rounded border object-cover"
      />
      <CloseOutlined
        @click.stop="handleDeleteImage(index)"
        class="absolute top-0 right-0 rounded bg-[var(--color-primary)]/40 p-1 text-sm !font-semibold hover:bg-[var(--color-primary)]"
      />
    </div>

    <a-modal
      class="!w-[800px]"
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img :src="imagePreview" alt="" />
    </a-modal>
  </div> -->
  <div class="z-999 flex h-[65px] items-center gap-2 px-4">
    <BaseInput
      @submit.prevent="sendMessage"
      v-model="message"
      @update:files="updateFiles"
      placeholder="Message..."
      :multiple="false"
      class="rounded-lg bg-[var(--color-secondary)] text-[var(--color-text)]"
    />
    <div @click="sendMessage">
      <img class="cursor-pointer p-2 hover:scale-110" src="@/assets/icon/buttonSend.svg" alt="" />
    </div>
  </div>
</template>
