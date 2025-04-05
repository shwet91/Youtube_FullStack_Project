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
import { useParams } from 'react-router-dom'
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import { toast } from "sonner"
 
const formSchema = z.object({
     description: z.string().min().max(50),
  
           title: z.string().min().max(50),

})

function EditVideo() {

  const { videoId } = useParams()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined
    },
  })

 async function onSubmit(values) {

  const formData = new FormData()

  formData.append("title" , values.title)
  formData.append("description" , values.description)
  formData.append("thumbnail" ,form.getValues("thumbnail"))

 
  const response = await simpleFetch({
    url : `${api.updateVideo}/${videoId}`,
    method : "PATCH",
    data : formData
  })

  console.log(response)
  if(response.success){
    toast(`video updated`)
  }
  }
 


  return (
    <div>
 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-7 sm:w-1/2  flex flex-wrap gap-8  border-2 w-4/5 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem >
              <FormLabel className={"text-gray-500"} >Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Title" className="text-gray-500 file:text-white" type="text" {...field} />
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
              <FormLabel className={"text-gray-500"}>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter the Description" className="text-gray-500 file:text-white" {...field} />
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
              <FormLabel className={"text-gray-500"}>Thumbnail</FormLabel>
              <FormControl>
                <Input placeholder="Upload new Thumbnail"
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
        <Button className="sm:top-8 relative bg-rose-800 hover:bg-rose-950"  type="submit">Edit Video</Button>
      </form>
    </Form>
    </div>
  )
}

export default EditVideo