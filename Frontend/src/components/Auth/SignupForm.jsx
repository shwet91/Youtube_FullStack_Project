import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import api from '@/backend/api'
import { formFetch } from '@/backend/formFetch'
import { login } from '@/store/authSlice'
import { useState } from 'react'

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
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Icons } from '../Icons/Icons'





function SignupForm() {

     const dispatch = useDispatch()  
     const navigate = useNavigate()
      const [loading , setLoading] = useState(false)

    const formSchema = z.object({
      fullName: z.string().min(3).max(50),

         username: z.string().min(3).max(50),

         email: z.string().min(3).max(50),

      })
      
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fullName: "123",
          username: "123",
           password: "",
        },
      })


    async function onSubmit(values ) {
      if (loading) return; // Prevent duplicate requests
      setLoading(true);
      console.log(form.getValues("coverImage"))
      const formData = new FormData()
      formData.append("username" , values.username)
      formData.append("fullName" , values.fullName)
      formData.append("email" , values.email)
      formData.append("password" , values.password)
      formData.append("avatar" , form.getValues("avatar"))
      formData.append("coverImage" , form.getValues("CoverImage"))


    const response  = await formFetch({
      url : api.registerUser,
      method : "POST",
      data : formData
    })

      dispatch(login({
        data : response.data
      }))

      console.log(response)
      setLoading(false);

      }

      

      return (
  
    
    <Form {...form}  >
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-7 sm:w-1/2  flex flex-wrap gap-8  border-2 w-4/5 ">
      <FormField  
        control={form.control}
        name="fullName"
        
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >fullName</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" className="text-gray-500" {...field} />
   
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />



<FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >Username</FormLabel>
            <FormControl>
              <Input className="text-gray-500"  placeholder="shadcn" {...field} />
   
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />



<FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >Email</FormLabel>
            <FormControl>
              <Input className="text-gray-500" placeholder="shadcn" {...field} />
   
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />



<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >Password</FormLabel>
            <FormControl>
              <Input className="text-gray-500" type="password" placeholder="shadcn" {...field} />
   
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />






<FormField
  control={form.control}
  name="avatar"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={"text-gray-500"} >Avatar</FormLabel>
      <FormControl>
        <Input
          type="file" className="text-gray-500 file:text-gray-600 hover:file:bg-gray-300"
          accept="image/*"
          onChange={(event) => {
            field.onChange(event.target.files?.[0]); // Capture the file
          }}
        />
      </FormControl>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>



<FormField
  control={form.control}
  name="coverImage"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={"text-gray-500"} >coverImage</FormLabel>
      <FormControl>
        <Input
          type="file" className="text-gray-500 file:text-gray-600 hover:file:bg-gray-300 " 
          accept="image/*" 
          onChange={(event) => {
            field.onChange(event.target.files?.[0]); // Capture the file
          }}
        />
      </FormControl>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


      <Button className="sm:top-8 relative hover:bg-rose-950 bg-rose-900" type="submit">Sign Up</Button>
    
    </form>
    <Button onClick={() => navigate("/login")} className={"sm:top-8 hover:bg-rose-950 bg-rose-900 relative "} >Login</Button>
     <div className=' flex justify-center h-28 '>
             {
               loading ? <Icons.spinner className="mr-2 h-10 w-10 animate-spin text-white" /> : null
             }
         
           </div>
  </Form>
   
  )
}

export default SignupForm