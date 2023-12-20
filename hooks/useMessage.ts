import { Message } from "ai"
import create from "zustand"

interface MessageStore {
  messages: Message[]
  addMessages: (newMessages: Message[]) => void // Renamed addMessage to addMessages and adjusted the parameter type
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessages: (newMessages) => {
    // Updated to handle an array of messages
    set((state) => ({ messages: [...state.messages, ...newMessages] })) // Spread both the existing messages and newMessages
  },
}))
