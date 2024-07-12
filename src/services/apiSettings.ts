import { TablesUpdate } from "../supabase"
import supabase from "./supabase"

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single()

  if (error) throw new Error("Settings could not be loaded")

  return data
}

export async function updateSettings(newSettings: TablesUpdate<"settings">) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .single()

  if (error) throw new Error("Settings could not be updated")

  return data
}
