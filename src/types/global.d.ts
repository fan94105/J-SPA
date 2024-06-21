import { Database } from "../supabase"

type Profile = {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

type Service = {
  id: number
  name: string
  description: string
  image: string
  regularPrice: number
  discount: number
  duration: number
}

// type Appointment = {
//   id: number
//   serviceId: number
//   userId: string
//   date: string
//   time: string
// }

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

export { Profile, Service, FormValues, Appointment }
