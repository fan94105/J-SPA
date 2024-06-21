import { TablesInsert, TablesUpdate } from "../supabase"
import supabase from "./supabase"

export async function getAppointments() {
  let { data, error } = await supabase.from("appointments").select("*")

  if (error) {
    console.error(error)
    throw new Error("Appointments could not be loaded")
  }

  return data
}

export async function getAppointment(id: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    throw new Error("Appointment could not be loaded")
  }

  return data
}

export async function createAppointment(
  newAppointment: TablesInsert<"appointments">
) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([newAppointment])
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error("Appointment could not be added")
  }
  return data
}

export async function editAppointment(
  newAppointment: TablesUpdate<"appointments">,
  id: string
) {
  const { data, error } = await supabase
    .from("appointments")
    .update(newAppointment)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error("Appointment could not be edited")
  }

  return data
}

export async function deleteAppointment(id: string) {
  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Appointment could not be deleted")
  }

  return data
}
