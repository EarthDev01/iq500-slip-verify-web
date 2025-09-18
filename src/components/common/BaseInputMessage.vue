<script setup lang="ts">
import { ref, watch } from 'vue'
import { PaperClipOutlined } from '@ant-design/icons-vue'
import type { UploadProps } from 'ant-design-vue/es/upload'
import { showError } from '@/utils/alert_message'

const emit = defineEmits(['update:modelValue', 'update:imageUpload', 'update:files'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  maxFiles: {
    type: Number,
    default: 5,
  },
})

const inputValue = ref(props.modelValue)
const uploadedFiles = ref<File[]>([])

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
  if (!file.type.startsWith('image/')) {
    showError('กรุณาเลือกไฟล์รูปภาพเท่านั้น')
    return false
  }

  // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showError('ขนาดไฟล์ต้องไม่เกิน 5MB')
    return false
  }

  // ถ้าเป็น single mode ให้ล้างไฟล์เก่าก่อน
  if (!props.multiple) {
    uploadedFiles.value = []
  }

  // ตรวจสอบจำนวนไฟล์สูงสุด
  if (uploadedFiles.value.length >= props.maxFiles) {
    showError(`สามารถอัปโหลดได้สูงสุด ${props.maxFiles} ไฟล์`)
    return false
  }

  uploadedFiles.value.push(file)
  emit('update:files', uploadedFiles.value)

  return false
}

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  },
)

watch(inputValue, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div class="w-full">
    <form @submit.prevent class="w-full max-w-sm">
      <div class="flex items-center gap-4 px-2 py-1">
        <input
          v-model="inputValue"
          autocomplete="off"
          class="mr-3 w-full appearance-none border-none bg-transparent leading-tight focus:outline-none"
          :type="type"
          :placeholder="placeholder"
        />
        <a-upload :show-upload-list="false" :multiple="multiple" :before-upload="beforeUpload">
          <PaperClipOutlined
            class="cursor-pointer rounded p-2 !text-white hover:scale-110 hover:bg-[var(--color-primary)]/50"
          />
        </a-upload>
      </div>
    </form>
  </div>
</template>
