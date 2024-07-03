import { TablesInsert, TablesUpdate } from "../supabase"
import supabase, { supabaseUrl } from "./supabase"

export async function getServices() {
  const { data, error } = await supabase.from("services").select("*")

  if (error) {
    console.error(error)
    throw new Error("Services could not be loaded")
  }

  return data
}

export async function getService(id: number) {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    throw new Error("Service could not be loaded")
  }

  return data
}

export async function createService(newService: TablesInsert<"services">) {
  // https://cfoacirdcdvvzqhdrkyv.supabase.co/storage/v1/object/public/service-images/service-1.jpg

  const imageName = `${Math.random()}-${
    (newService.image as unknown as File).name
  }`.replaceAll("/", "")

  const imagePath = `${supabaseUrl}/storage/v1/object/public/service-images/${imageName}`

  const { data, error } = await supabase
    .from("services")
    .insert([{ ...newService, image: imagePath }])
    .select()
    .single()

  if (error) throw new Error("Service could not be created")

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("service-images")
    .upload(imageName, newService.image as unknown as File)

  // Delete service if image upload failed
  if (storageError) {
    await supabase.from("services").delete().eq("id", data.id)

    console.error(storageError)

    throw new Error(
      "Service image could not be uploaded and the service was not created"
    )
  }

  return data
}

export async function editService(
  newService: TablesUpdate<"services">,
  id: number
) {
  // Original image name
  const { image } = await getService(id)
  const originalImageName = image?.split("/").pop() as string

  const hasImagePath = newService.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${
    (newService.image as unknown as File).name
  }`.replaceAll("/", "")

  const imagePath = hasImagePath
    ? newService.image
    : `${supabaseUrl}/storage/v1/object/public/service-images/${imageName}`

  const { data, error } = await supabase
    .from("services")
    .update({ ...newService, image: imagePath })
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error("Service could not be updated")

  if (hasImagePath) return data

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("service-images")
    .upload(imageName, newService.image as unknown as File)

  // Delete service if image upload failed
  if (storageError) {
    await supabase.from("services").delete().eq("id", data.id)

    console.error(storageError)

    throw new Error(
      "Service image could not be uploaded and the service was not created"
    )
  }

  // Delete original image
  const { error: storageDeleteError } = await supabase.storage
    .from("service-images")
    .remove([`${originalImageName}`])

  if (storageDeleteError)
    throw new Error("Orginal service image could not be deleted")

  return data
}

export async function deleteService(id: number) {
  const { data, error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)

  const imageName = data.image?.split("/").pop() as string

  // Delete image
  const { error: storageError } = await supabase.storage
    .from("service-images")
    .remove([`${imageName}`])

  if (storageError) throw new Error("Service image could not be deleted")

  return data
}
