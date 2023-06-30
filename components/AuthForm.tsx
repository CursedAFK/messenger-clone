'use client'

import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import AuthSocialButton from './AuthSocialButton'
import Button from './Button'
import Input from './Inputs/Input'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const session = useSession()

  const router = useRouter()

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
      axios
        .post('/api/register', data)
        .then(function () {
          signIn('credentials', {
            ...data
          })
        })
        .catch(function () {
          toast.error('Something went wrong')
        })
        .finally(function () {
          setIsLoading(false)
        })
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then(function (callback) {
          if (callback?.error) {
            toast.error('Invalid credentials')
          }

          if (callback?.ok && !callback.error) {
            toast.success('Logged in successfully')
            router.push('/users')
          }
        })
        .finally(function () {
          setIsLoading(false)
        })
    }
  }

  const socialActions = (action: string) => {
    setIsLoading(true)

    signIn(action.toLowerCase(), {
      redirect: false
    })
      .then(function (callback) {
        if (callback?.error) {
          toast.error('Invalid credentials')
        }

        if (callback?.ok && !callback.error) {
          toast.success('Logged in successfully')
        }
      })
      .finally(function () {
        setIsLoading(false)
      })
  }

  useEffect(
    function () {
      if (session.status === 'authenticated') {
        router.push('/users')
      }
    },
    [session, router]
  )

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
              disabled={isLoading}
            />
          )}

          <Input
            label='Email'
            register={register}
            id='email'
            type='email'
            errors={errors}
            disabled={isLoading}
          />

          <Input
            label='Password'
            register={register}
            id='password'
            type='password'
            errors={errors}
            disabled={isLoading}
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

            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              Icon={BsGithub}
              onClick={() => socialActions('GITHUB')}
            />

            <AuthSocialButton
              Icon={BsGoogle}
              onClick={() => socialActions('GOOGLE')}
            />
          </div>
        </div>

        <div className='mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500'>
          <div>
            {variant === 'LOGIN'
              ? 'Don’t have an account?'
              : 'Already have an account?'}
          </div>

          <div onClick={toggleVariant} className='cursor-pointer underline'>
            {variant === 'LOGIN' ? 'Register' : 'Log In'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
