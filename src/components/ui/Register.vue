<script setup lang="ts">
import { register } from '@/service/authService'
import { showError } from '@/utils/alert_message'

import { ref, reactive } from 'vue'
interface FormState {
  username: string
  password: string
  confirmPassword: string
}

const emit = defineEmits(['stepChange'])
const form = reactive<FormState>({
  username: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    showError('รหัสผ่านไม่ตรงกัน')
    form.confirmPassword = ''
    return
  }
  const payload = {
    username: form.username,
    password: form.password,
  }
  const res = await register(payload)
  if (res && res.code == 0) {
    localStorage.setItem('token', res.payload)
    emit('stepChange', 2)
  } else {
    form.username = ''
    form.password = ''
    form.confirmPassword = ''
  }
}

const onFinish = (values: any) => {
  handleRegister()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <div class="h-full w-full px-4">
    <div class="label-white flex h-full flex-col items-center justify-center">
      <img class="mx-auto mb-[30px] h-[50px]" src="/icon/aim.png" />
      <a-form
        :model="form"
        name="login "
        class="w-[75%]"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="username"
          name="username"
          :rules="[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้งาน!' }]"
        >
          <a-input size="large" v-model:value="form.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]"
        >
          <a-input-password size="large" v-model:value="form.password" />
        </a-form-item>
        <a-form-item
          label="Password Again"
          name="confirmPassword"
          :rules="[{ required: true, message: 'กรุณากรอกรหัสผ่านอีกครั้ง!' }]"
        >
          <a-input-password size="large" v-model:value="form.confirmPassword" />
        </a-form-item>
        <a-form-item class="!pt-5" :wrapper-col="{ offset: 6 }">
          <a-button
            class="!h-[40px] !w-[150px] !rounded-full !border-0 !bg-[var(--color-accent-dark)] !text-white"
            html-type="submit"
            >Register</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
