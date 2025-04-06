import React, { useState } from 'react'
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {  login } from '@/store/authSlice'

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



function LoginForm() {

  const navigate = useNavigate()
  const [loading , setLoading] = useState(false)

    const formSchema = z.object({
      email: z.string().min(3).max(50),
        password: z.string().min().max(16),
      })
      
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
          email: "",
           password: "",
        },
      })

      const dispatch = useDispatch()

      async function onSubmit(values) {
        if (loading) return; // Prevent duplicate requests
        setLoading(true);
         console.log(values)
        try {
          const response = await simpleFetch({
            method: 'POST',
            data: values,
            url: api.loginUser
          });

         // const anotherResponse = 
      
          console.log('Login Response Full Object:', response);
          
          // Explicitly dispatch the entire response object
          dispatch(login({
            data : response.data.user,
            accessToken : response.data.accessToken,
            refreshToken : response.data.refreshToken
          }));
          
          navigate("/")
        } catch (error) {
          console.error('Login failed', error);
        }  finally {
          setLoading(false);
        }
      }

      return (
  
    
    <Form {...form}  >
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-11 sm:w-1/2  flex flex-wrap gap-8 justify-center border w-4/5 ">




<FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"}>email</FormLabel>
            <FormControl>
              <Input  placeholder="Enter your Email" className="text-gray-500" {...field} />
   
            </FormControl>
            <FormDescription>

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
            <FormLabel className={"text-gray-500"}>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" className="text-gray-500" {...field} />
   
            </FormControl>
            <FormDescription>

            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />

      <Button className="sm:top-8 relative   hover:bg-rose-950 bg-rose-900"  type="submit">Login</Button>
    
    </form>
    <Button onClick={() => navigate("/signup")} className="sm:top-8 relative  hover:bg-rose-950 bg-rose-900"  type="submit">Sign up</Button>

      <div className=' flex justify-center h-28 '>
        {
          loading ? <Icons.spinner className="mr-2 h-10 w-10 animate-spin text-white" /> : null
        }
    
      </div>
  </Form>
  )
}

export default LoginForm