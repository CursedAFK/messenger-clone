'use client'

import useRoutes from '@/hooks/useRoutes'
import { User } from '@prisma/client'
import { useState } from 'react'
import Avatar from '../Avatar'
import DesktopItem from './DesktopItem'

type DesktopSidebarProps = {
  currentUser: User
}

export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const routes = useRoutes()

  return (
    <div className='hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r lg:bg-white lg:pb-4 xl:px-6'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map(function (route) {
            return <DesktopItem key={route.label} {...route} />
          })}
        </ul>
      </nav>

      <nav className='mt-4 flex flex-col items-center justify-between'>
        <div
          onClick={function () {
            setIsOpen(true)
          }}
          className='cursor-pointer transition hover:opacity-75'
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  )
}
