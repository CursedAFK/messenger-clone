'use client'

import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from './Button'
import Input from './Inputs/Input'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(
    () => (variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')),
    [variant]
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
    }

    if (variant === 'LOGIN') {
    }
  }

  const socialActions = (action: string) => {
    setIsLoading(true)
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              label='Name'
              register={register}
              id='name'
              type='text'
              errors={errors}
            />
          )}

          <Input
            label='Email'
            register={register}
            id='email'
            type='email'
            errors={errors}
          />

          <Input
            label='Password'
            register={register}
            id='password'
            type='password'
            errors={errors}
          />

          <div>
            <Button fullWidth disabled={isLoading} type='submit'>
              {variant === 'LOGIN' ? 'Log In' : 'Register'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
