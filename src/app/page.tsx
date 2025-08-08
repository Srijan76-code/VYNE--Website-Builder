"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'sonner'

const page = () => {
  const [value,setValue]=useState("")
  const trpc=useTRPC()
  const invoke=useMutation(trpc.invoke.mutationOptions({onSuccess:()=>{
    toast.success("Background Job Started")
  }}))

  return (
    <div className='m-64' >
      <Input value={value} onChange={(e)=>setValue(e.target.value)} />
      <Button disabled={invoke.isPending} onClick={()=>invoke.mutate({value:value})} >Invoke Background Job</Button>
    </div>
  )
}

export default page
