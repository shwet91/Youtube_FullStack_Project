// take fullName , username , email from user and update that

import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { changeDetails } from '@/store/authSlice'
import { useDispatch } from 'react-redux'

import { toast } from "sonner"

 
const formSchema = z.object({
  username: z.string().min(2).max(50),
  fullName: z.string().min(2).max(50),
  email: z.string().min(2).max(50)
})



function UpdateUserDetails() {

  const dispatch = useDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: ""
    },
  })
  

   async function onSubmit(values) {

      console.log(values)

      const response = await simpleFetch({
          url : api.updateAccountDetails,
          data : values ,
          method : 'Post'
      })

      console.log(response)

      dispatch(changeDetails({
        username: response.data.username,
        fullName: response.data.fullName,
        email: response.data.email,
      }))
      toast("User details has been changed.")

    }


  return (
    <div className='  p-4  '>

<Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
        <FormField
          control={form.control}
          name="fullName"
          
          render={({ field }) => (
            <FormItem className=" w-1/3 inline-block m-6 " >
              <FormLabel>fullname</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="" />
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className=" w-1/3 inline-block  m-6 " >
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="" />
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


       <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" w-1/3 inline-block m-6 " >
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="" />
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />




        <Button type="submit">Submit</Button>
      </form>
    </Form>
  

    </div>
  )
}

export default UpdateUserDetails