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
import api from '@/backend/api'
import { simpleFetch } from '@/backend/simpleFetch'
import { changeCoverImage } from '@/store/authSlice'
import { useDispatch } from 'react-redux'

import { toast } from "sonner"

 
const formSchema = z.object({   
})

function ChangeCoverImage() {

  const dispatch = useDispatch()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            
        },
      })

    async  function onSubmit () {

        // console.log(form.getValues("avatar"))

        const formData = new FormData()
        formData.append("coverImage" , form.getValues("coverImage"))

        const response = await simpleFetch({
            method : "POST",
            url : api.updateUserCoverImage ,
            data : formData
        })

        dispatch(changeCoverImage({
          coverImage : response.data.coverImage
        }))

        toast("Cover Image has been changed.")

        console.log("this is the response :" , response.data.coverImage)
      }
  return (
    <div>

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="w-1/2 inline-block m-6" >
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="file" 
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

        <Button type="submit">Change Cover Image</Button>
      </form>
    </Form>

    </div>
  )
}

export default ChangeCoverImage