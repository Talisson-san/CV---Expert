export type PersonalData = {
  name: string
  phone: string
  email: string
  address: string
  birthDay: string
  birthMonth: string
  birthYear: string
}

export type EducationStatus =
  | 'concluido'
  | 'andamento'
  | 'trancado'

export type Education = {
  id: number
  type: string
  course: string
  institution: string
  city: string
  state: string
  status: EducationStatus
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
}