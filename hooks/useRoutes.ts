import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUser } from 'react-icons/hi2'
import useConversation from './useConversation'

export default function useRoutes() {
  const pathname = usePathname()

  const { conversationId } = useConversation()

  const routes = useMemo(
    function () {
      return [
        {
          label: 'Chat',
          href: '/conversations',
          icon: HiChat,
          active: pathname === '/conversations' || Boolean(conversationId)
        },
        {
          label: 'Users',
          href: '/users',
          icon: HiUser,
          active: pathname === '/users'
        },
        {
          label: 'Logout',
          href: '#',
          onClick() {
            signOut()
          },
          icon: HiArrowLeftOnRectangle
        }
      ]
    },
    [pathname, conversationId]
  )

  return routes
}
