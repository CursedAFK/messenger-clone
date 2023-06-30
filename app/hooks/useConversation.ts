import { useParams } from 'next/navigation'
import { useMemo } from 'react'

interface ConversationParams {
  conversationId: string
}

export default function useConversation() {
  const params = useParams() as unknown as ConversationParams

  const conversationId = useMemo(
    function () {
      if (!params.conversationId) {
        return ''
      }

      return params.conversationId
    },
    [params.conversationId]
  )

  const isOpen = useMemo(
    function () {
      return Boolean(conversationId)
    },
    [conversationId]
  )

  return useMemo(
    function () {
      return {
        conversationId,
        isOpen
      }
    },
    [isOpen, conversationId]
  )
}
