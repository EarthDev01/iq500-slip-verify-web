import { defineStore } from "pinia";
import { ref } from "vue";
import { type ChatMessage } from "@/types/chat";

const useStoreApp = defineStore("app", () => {
    const message = ref<ChatMessage[]>([])

  
  return { message }
});

export default useStoreApp;