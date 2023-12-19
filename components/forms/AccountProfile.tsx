"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { updateUser } from "@/lib/actions/user.actions"
import { useUploadThing } from "@/lib/hooks/uploadthing"
import { isBase64Image } from "@/lib/utils"
import { UserValidation } from "@/lib/validations/user"
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
import { Textarea } from "@/components/ui/textarea"
import { User } from "@prisma/client"



interface AccountProfileProps {
  user: User,
  btnTitle: string
}

interface AccountFormFieldProps {
  form: any
  name: string
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user.username || "",
      name: user.name || "",
      bio: user.bio || "",
      profile_photo: user.image,
    },
  })

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) {
    e.preventDefault()
    const fileReader = new FileReader()

    if (e.target?.files && e.target.files.length > 0) {
      const file = e.target?.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes("image")) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""
        onChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo

    const hasImageChanged = isBase64Image(blob)

    if (hasImageChanged) {
      const imgRes = await startUpload(files)

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url
      }
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    })

    if (pathname === "/profile/edit") {
      router.back()
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <AccountProfilePhoto
          form={form}
          handleImageChange={handleImageChange}
          name="profile"
        />
        <AccountInputField form={form} name="name" />
        <AccountInputField form={form} name="username" />
        <AccountTextArea form={form} name="bio" />

        <Button type="submit" variant={"outline"} className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile

function AccountProfilePhoto({
  form,
  handleImageChange,
  name,
}: AccountFormFieldProps & {
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => void
}) {
  return (
    <FormField
      control={form.control}
      name="profile_photo"
      render={({ field }) => (
        <FormItem className="flex items-center gap-4">
          <FormLabel className="account-form_image-label">
            {field.value ? (
              <Image
                src={field.value}
                alt="Profile Photo"
                width={96}
                height={96}
                priority={true}
                className="rounded-full object-contain"
              />
            ) : (
              <Image
                src={"assets/profile.svg"}
                alt="Profile Photo"
                width={30}
                height={30}
                className="rounded-full object-contain"
              />
            )}
          </FormLabel>
          <FormControl className="flex-1 text-base-semibold text-gray-200">
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload a profile photo"
              className="account-form_image-input"
              onChange={(e) => handleImageChange(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AccountInputField({ form, name }: AccountFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3 w-full">
          <FormLabel className="text-base-semibold text-light-2">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={`Enter your ${name}`}
              className="account-form_input no-focus"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function AccountTextArea({ form, name }: AccountFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3 w-full">
          <FormLabel className="text-base-semibold text-light-2">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>
          <FormControl>
            <Textarea
              rows={10}
              className="account-form_input no-focus"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
