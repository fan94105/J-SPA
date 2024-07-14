import supabase from "./supabase"

import {
  AuthFormValues,
  SignupFormValues,
  UpdateUserData,
} from "../types/global"
import { TablesUpdate } from "../supabase"
import { UserAttributes } from "@supabase/supabase-js"

export async function signup({ fullName, email, password }: SignupFormValues) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  })

  if (error) throw new Error(error.message)

  return data
}

export async function login({ email, password }: AuthFormValues) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)

  return data?.user
}

export async function updateCurrentUser({
  fullName,
  password,
}: UpdateUserData) {
  let updateData = {} as UserAttributes
  if (fullName) updateData = { data: { fullName } }
  if (password) updateData = { password }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)

  return data
}
