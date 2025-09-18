<script setup lang="ts">
import { login } from '@/service/authService'
import { showError, showSuccess, showInfo, showWarning } from '@/utils/alert_message'

import { ref, reactive } from 'vue'
interface FormState {
  username: string
  password: string
}

const emit = defineEmits(['stepChange'])
const form = reactive<FormState>({
  username: '',
  password: '',
})

const handleLogin = async () => {
  const res = await login(form)
  if (res && res.code == 200) {
    localStorage.setItem('token', res.payload)
    emit('stepChange', 2)
  } else {
    showError(() => res.message)
    form.username = ''
    form.password = ''
  }
}

const onFinish = (values: any) => {
  handleLogin()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <div class="h-full w-full px-4">
    <div class="label-white mt-[-40px] flex h-full flex-col items-center justify-center">
      <img class="mx-auto mb-[40px] h-[50px]" src="/icon/aim.png" />
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
          <a-input v-model:value="form.username" size="large" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]"
        >
          <a-input-password v-model:value="form.password" size="large" />
        </a-form-item>
        <a-form-item class="!pt-5" :wrapper-col="{ offset: 6 }">
          <a-button
            class="!h-[40px] !w-[150px] !rounded-full !border-0 !bg-[var(--color-accent-dark)] !text-white"
            html-type="submit"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
