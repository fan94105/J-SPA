import moment from "moment"
import { TablesInsert, TablesUpdate } from "../supabase"
import { PAGE_SIZE } from "../utils/constants"
import supabase from "./supabase"

type getAppointmentsType = {
  filter: { field: string; value: string } | null
  sortBy: {
    field: string
    direction: string
  }
  page: number
}

export async function getAppointments({
  filter,
  sortBy,
  page,
}: getAppointmentsType) {
  let query = supabase.from("appointments").select("*", { count: "exact" })

  // FILTER
  if (filter) query = query.eq(filter.field, filter.value)

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" })

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  const { data, count, error } = await query

  if (error) {
    console.error(error)
    throw new Error("Appointments could not be loaded")
  }

  return { data, count }
}

export async function getAppointmentsByDate(date: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("date", date)

  if (error) {
    console.error(error)
    throw new Error(`Appointments on ${date} could not be loaded`)
  }

  return data
}

export async function getAppointmentsByLineId(lineId: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("lineId", lineId)
    .eq("status", "confirmed")

  if (error) {
    console.error(error)
    throw new Error(`LineID ${lineId} appointments could not be loaded`)
  }

  return data
}

export async function getAppointmentsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .gte("date", date)
    .lte("date", moment().format("YYYY-MM-DD"))

  if (error) {
    console.error(error)
    throw new Error("Appointments after date could not be loaded")
  }

  return data
}

export async function getConfirmedAppointmentsAfterDate({
  status,
  date,
}: {
  status: "confirmed" | "completed"
  date: string
}) {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .gte("date", date)
    .lte("date", moment().format("YYYY-MM-DD"))
    .eq("status", status)

  if (error) {
    console.error(error)
    throw new Error("Confirmed appointments could not be loaded")
  }

  return data
}

export async function getTodayConfirmedAppointments() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("date", moment().format("YYYY-MM-DD"))
    .eq("status", "confirmed")

  if (error) {
    console.error(error)
    throw new Error("Today confirmed appointments could not be loaded")
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
