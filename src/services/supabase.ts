import { createClient } from "@supabase/supabase-js"
import { Database } from "../supabase"
export const supabaseUrl = "https://cfoacirdcdvvzqhdrkyv.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
