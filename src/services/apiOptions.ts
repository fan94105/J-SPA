import supabase from "./supabase"

export async function getOptions() {
  const { data, error } = await supabase.from("options").select("*")

  if (error) throw new Error("Options could not be loaded")

  return data
}

export async function getOption(id: string) {
  const { data, error } = await supabase
    .from("options")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error("Option could not be loaded")

  return data
}
