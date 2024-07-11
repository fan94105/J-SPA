import { TablesInsert, TablesUpdate } from "../supabase"
import supabase from "./supabase"

export async function getOptions() {
  const { data, error } = await supabase.from("options").select("*")

  if (error) throw new Error("Options could not be loaded")

  return data
}

export async function getOption(id: number) {
  const { data, error } = await supabase
    .from("options")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw new Error("Option could not be loaded")

  return data
}

export async function createOption(newOption: TablesInsert<"options">) {
  const { data, error } = await supabase
    .from("options")
    .insert([newOption])
    .select()

  if (error) throw new Error("Option could not be created")

  return data
}

export async function editOption(
  newOption: TablesUpdate<"options">,
  id: number
) {
  const { data, error } = await supabase
    .from("options")
    .update(newOption)
    .eq("id", id)
    .select()

  if (error) throw new Error("Option could not be updated")

  return data
}

export async function deleteOption(id: string) {
  const { error } = await supabase.from("options").delete().eq("id", id)

  if (error) throw new Error(error.message)
}
