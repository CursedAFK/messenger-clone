'use client'

import useRoutes from '@/app/hooks/useRoutes'
import { useState } from 'react'

export default function DesktopSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const routes = useRoutes()

  return (
    <div className='hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r lg:bg-white lg:pb-4 xl:px-6'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'></ul>
      </nav>
    </div>
  )
}
