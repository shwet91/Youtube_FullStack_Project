import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { simpleFetch } from '@/backend/simpleFetch'
import { toast } from 'sonner'
import { Icons } from '../Icons/Icons.jsx'
import { useState } from 'react'


function UploadVideo() {

   const [loading , setLoading] = useState(false)
  
    const formSchema = z.object({
     description: z.string().min().max(50),

         title: z.string().min().max(50),

         duration: z.string().min().max(50),

      })
      
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: "",
            videoFile: undefined,
            thumbnail: undefined
        },
      })


    async function onSubmit(values ) {
      if (loading) return; // Prevent duplicate requests
        setLoading(true);

      console.log("worked")
      const formData = new FormData()
      formData.append("title" , values.title)
      formData.append("description" , values.description)
      formData.append("duration" , values.duration)
      formData.append("videoFile" , form.getValues("videoFile"))
      formData.append("thumbnail" , form.getValues("thumbnail"))
       
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

    const response  = await simpleFetch({
      url : "http://localhost:8000/api/v1/videos/",
      method : "POST",
      data : formData
    })

      console.log(response)
      setLoading(false)
      toast("video Uploaded")
      }

      return (
  
    
    <Form {...form}  >
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-7 sm:w-1/2  flex flex-wrap gap-8  border-2 w-4/5 ">

<FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >Title</FormLabel>
            <FormControl>
              <Input className="text-gray-500"  placeholder="title" {...field} />
   
            </FormControl>
            <FormDescription>

            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />



<FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >Description</FormLabel>
            <FormControl>
              <Input className="text-gray-500" placeholder="description" {...field} />
   
            </FormControl>
            <FormDescription>

            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />



<FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={"text-gray-500"} >Duration</FormLabel>
            <FormControl>
              <Input className="text-gray-500" type="text" placeholder="duration" {...field} />
   
            </FormControl>
            <FormDescription>

            </FormDescription>
            <FormMessage />
          </FormItem>


        )}
      />

<FormField
  control={form.control}
  name="videoFile"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={"text-gray-500"} >videoFile</FormLabel>
      <FormControl>
        <Input
          type="file" className="text-gray-500 file:text-white"
          onChange={(event) => {
            field.onChange(event.target.files?.[0]); // Capture the file
          }}
        />
      </FormControl>
      <FormDescription>

      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>



<FormField
  control={form.control}
  name="thumbnail"
  render={({ field }) => (
    <FormItem>
      <FormLabel className={"text-gray-500"} >Thumbnail</FormLabel>
      <FormControl>
        <Input
          type="file" className="text-gray-500 file:text-white"
          accept="image/*"
          onChange={(event) => {
            field.onChange(event.target.files?.[0]); // Capture the file
          }}
        />
      </FormControl>
      <FormDescription>

      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>

      <Button className="sm:top-8 relative bg-rose-800 hover:bg-rose-950" type="submit" >Upload Video</Button>
    </form>

    <div className=' flex justify-center h-28 '>
            {
              loading ? <Icons.spinner className="mr-2 h-10 w-10 animate-spin text-white" /> : null
            }
        
          </div>
  </Form>
  )
}

export default UploadVideo