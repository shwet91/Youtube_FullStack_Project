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
import { changeAvatar } from '@/store/authSlice'
import { useDispatch } from 'react-redux'

import { toast } from "sonner"

 
const formSchema = z.object({   
})

function ChangeAvatar() {

  const dispatch = useDispatch()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            
        },
      })

    async  function onSubmit () {

        // console.log(form.getValues("avatar"))

        const formData = new FormData()
        formData.append("avatar" , form.getValues("avatar"))

        const response = await simpleFetch({
            method : "POST",
            url : api.updateUserAvatar ,
            data : formData
        })

        dispatch(changeAvatar({
          avatar : response.data.avatar
        }))

        toast("Avatar has been changed")

        console.log("this is the response :" , response)
      }
  return (
    <div>

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="w-1/2 inline-block m-6" >
              <FormLabel>Avatar</FormLabel>
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

        <Button type="submit">Change Avatar</Button>
      </form>
    </Form>

    </div>
  )
}

export default ChangeAvatar