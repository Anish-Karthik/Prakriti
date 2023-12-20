"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Doctor, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { updateDoctor } from "@/lib/actions/user.actions"
import { useUploadThing } from "@/lib/hooks/uploadthing"
import { cn, isBase64Image } from "@/lib/utils"
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

const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  experience: z.string(),
  certificate: z.string(),
  speciality: z.string(),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
})

interface AccountFormFieldProps {
  form: any
  name: string
}

const DoctorProfile = ({
  user,
}: {
  user: Partial<User> & { doctor?: Doctor | null }
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [certs, setCerts] = useState<File[]>([])
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
      certificate: user?.doctor?.certificate || "",
      experience: user?.doctor?.experience || "",
      speciality: user?.doctor?.speciality || "",
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

  function handleCertChange(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) {
    e.preventDefault()
    const fileReader = new FileReader()

    if (e.target?.files && e.target.files.length > 0) {
      const file = e.target?.files[0]
      setCerts(Array.from(e.target.files))

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

    const hasCertChanged = isBase64Image(blob)

    if (hasCertChanged) {
      const imgRes = await startUpload(certs)

      if (imgRes && imgRes[0].url) {
        values.certificate = imgRes[0].url
      }
    }

    await updateDoctor({
      userId: user.id!,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      email: user.email!,
      hashedPassword: user.hashedPassword!,
      path: pathname,
      certificate: values.certificate,
      experience: values.experience,
      speciality: values.speciality,
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
        // @ts-ignore
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <AccountProfilePhoto
          form={form}
          handleImageChange={handleImageChange}
          name="profile_photo"
        />
        <AccountInputField form={form} name="name" />
        <AccountInputField form={form} name="username" />
        <AccountInputField form={form} name="speciality" />
        <AccountProfilePhoto
          form={form}
          handleImageChange={handleCertChange}
          name="certificate"
          type="flat"
        />
        <AccountTextArea form={form} name="bio" />
        <Button type="submit" variant={"outline"} className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default DoctorProfile

function AccountProfilePhoto({
  form,
  handleImageChange,
  name,
  type = "rounded",
}: AccountFormFieldProps & {
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => void
  type?: "rounded" | "flat"
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-4">
          <FormLabel className={cn("account-form_image-label")}>
            {field.value ? (
              <Image
                src={field.value}
                alt="Profile Photo"
                width={60}
                height={40}
                priority={true}
                className={cn(
                  type === "rounded" ? "object-contain" : "w-[50%] px-[5%]"
                )}
              />
            ) : (
              <Image
                src={"assets/profile.svg"}
                alt="Profile Photo"
                width={60}
                height={40}
                className="object-contain"
              />
            )}
          </FormLabel>
          <FormControl className="flex-1 text-base-semibold text-gray-200">
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload a profile photo"
              className="account-form_image-input w-full"
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
