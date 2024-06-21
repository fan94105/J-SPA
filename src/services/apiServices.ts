import supabase from "./supabase"

export async function getServices() {
  const { data, error } = await supabase.from("services").select("*")

  if (error) {
    console.error(error)
    throw new Error("Services could not be loaded")
  }

  return data
}

export async function getService(id: string) {
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
