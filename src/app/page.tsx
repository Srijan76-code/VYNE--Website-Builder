"use client"
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

const page = () => {
  const trpc=useTRPC()
  const invoke=useMutation(trpc.invoke.mutationOptions({onSuccess:()=>{
    toast.success("Background Job Started")
  }}))

  return (
    <div className='m-64' >
      <Button disabled={invoke.isPending} onClick={()=>invoke.mutate({text:"srijan is god"})} >Invoke Background Job</Button>
    </div>
  )
}

export default page
