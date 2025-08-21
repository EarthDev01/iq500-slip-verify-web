<script setup lang="ts">
import { type AllRoomPayload } from '@/types/room'
import useStoreApp from '@/stores/userStore'
import { ref, onMounted, computed } from 'vue'
import BaseInputSearch from '../common/BaseInputSearch.vue'
import BaseModalConfirms from '../common/BaseModalConfirm.vue'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { mockRooms } from '@/mock'

const emit = defineEmits(['stepChange'])
const roomChats = ref<AllRoomPayload[]>([])
const storeApp = useStoreApp()
const showDelete = ref(false)
const showDeleteId = ref<string>('')
const search = ref('')
const getAllBusiness = async () => {
  roomChats.value = mockRooms.payload
}

const selectBusiness = (code: string) => {
  emit('stepChange', 3)
}

const filteredRooms = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return roomChats.value
  return roomChats.value.filter((room) => room.last_message?.toLowerCase().includes(keyword))
})

const handleShowDelete = (id: string) => {
  showDeleteId.value = id
  console.log('Show delete options for room:', id)
}

const handleDelete = (id: string) => {
  showDeleteId.value = ''
  showDelete.value = true
  console.log('Delete room with id:', id)
}
onMounted(async () => {
  getAllBusiness()
})
</script>
<template>
  <div class="px-5 py-2">
    <div class="grid grid-cols-1 gap-2">
      <div class="relative">
        <BaseInputSearch v-model="search" placeholder="ค้นหาห้องแชท" />
      </div>

      <div class="mt-4 flex items-center justify-between">
        <p class="text-lg">Rooms</p>
        <div class="flex gap-4">
          <div
            @click="selectBusiness('')"
            class="flex cursor-pointer items-center gap-1 rounded-2xl px-3 py-1 hover:bg-[var(--color-accent-dark)]"
          >
            <PlusOutlined class="!text-sm" />
            <p>New Chat</p>
          </div>
        </div>
      </div>
      <div
        class="scroll-hide mt-2 max-h-[450px] overflow-y-auto rounded-lg bg-[var(--color-darkest)]"
      >
        <div
          v-for="data in filteredRooms"
          @click="selectBusiness(data.id)"
          :key="data.id"
          class="flex cursor-pointer items-center justify-between border-b-2 border-[var(--color-dark)] px-4 py-3 hover:rounded-lg hover:bg-[var(--color-accent)]/40"
        >
          <p class="!w-[270px] truncate text-white">
            {{ data.last_message }}
          </p>
          <div @click.stop="handleShowDelete(data.id)" class="h-[20px]">
            <EllipsisOutlined class="text-xl" v-if="showDeleteId !== data.id" />
            <p
              v-else
              @click.stop="handleDelete(data.id)"
              class="cursor-pointer text-red-400 hover:underline"
            >
              Delete
            </p>
          </div>
        </div>
      </div>
    </div>
    <BaseModalConfirms
      :show="showDelete"
      @cancel="showDelete = false"
      @confirm="handleDelete(showDeleteId)"
    />
  </div>
</template>
