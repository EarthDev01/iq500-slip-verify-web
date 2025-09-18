<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  //   content: {
  //     type: String,
  //     required: true
  //   },
  //   onConfirm: {
  //     type: Function,
  //     required: true
  //   },
  //   onCancel: {
  //     type: Function,
  //     required: true
  //   }
})
const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <Transition name="chat-fade" appear>
    <div
      v-if="show"
      @click="emit('cancel')"
      class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/40"
    >
      <div @click.stop class="min-w-[350px] rounded bg-[var(--color-gray-dark)] p-4">
        <p>Delete chat?</p>
        <div class="py-4">This will delete the chat history.</div>
        <div class="mt-4 flex justify-end gap-4">
          <a-button
            @click="emit('cancel')"
            class="!h-[40px] !rounded-full !border-0 !bg-[var(--color-gray-dark)] !text-white"
            >cancel</a-button
          >
          <a-button
            @click="emit('confirm')"
            class="!h-[40px] !rounded-full !border-0 !bg-[var(--color-orange)] !text-white"
            >Delete</a-button
          >
        </div>
      </div>
    </div>
  </Transition>
</template>
