import { Database } from "../supabase"

type Profile = {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

// react-hook-form form values
type FormValues = {
  displayName: string
  phone: string
  observations: string | null
  serviceId: string
  option: { value: string; label: string } | null
  date: Date
  time: string
}

type Appointment = Database["public"]["Tables"]["appointments"]["Row"]

type Service = Database["public"]["Tables"]["services"]["Row"]

type Option = Database["public"]["Tables"]["options"]["Row"]

export { Profile, FormValues, Appointment, Service, Option }
