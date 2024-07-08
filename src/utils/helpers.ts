import moment from "moment"

export function getSessionFormData() {
  return sessionStorage.getItem("formData")
    ? JSON.parse(sessionStorage.getItem("formData") as string)
    : null
}

export function setSessionFormData(formData: any) {
  const currentFormData = getSessionFormData()
  if (!currentFormData) {
    return sessionStorage.setItem("formData", JSON.stringify(formData))
  }

  const newFormData = { ...currentFormData, ...formData }
  sessionStorage.setItem("formData", JSON.stringify(newFormData))
}

export function clearSessionFormData() {
  sessionStorage.removeItem("formData")
}

export function isToday(dateString: string) {
  return moment(dateString).isSame(moment(), "day")
}
