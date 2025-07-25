import type { NotificationType } from '@/types/NotificationType'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref<NotificationType>('info')
  const visible = ref(false)
  const timeout = ref('')

  const notify = (
    msg: string,
    msgType: NotificationType = 'info',
    showingTime: string = '5000',
  ) => {
    visible.value = false
    message.value = ''

    setTimeout(() => {
      message.value = msg
      type.value = msgType
      timeout.value = showingTime
      visible.value = true
    }, 10)
  }

  const clear = () => {
    message.value = ''
    visible.value = false
  }

  return {
    message,
    type,
    visible,
    notify,
    timeout,
    clear,
  }
})
