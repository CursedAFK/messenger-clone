import { User } from '@prisma/client'
import Image from 'next/image'

type AvatarProps = {
  user: User
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className='relative'>
      <div className='relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11'>
        <Image
          src={user.image || '/images/placeholder.jpg'}
          alt='avatar'
          fill
        />
      </div>
    </div>
  )
}
