export type PersonalData = {
  name: string
  phone: string
  email: string
  address: string
  houseNumber: string
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

export type Experience = {
  id: number
  company: string
  role: string
  city: string
  state: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  current: boolean
  description: string
}

export type Qualification = {
  id: number
  title: string
  institution: string
  year: string
  workload: string
}

export type Skill = {
  id: number
  name: string
}

export type LanguageLevel =
  | 'basico'
  | 'intermediario'
  | 'avancado'
  | 'fluente'
  | 'nativo'

export type Language = {
  id: number
  name: string
  level: LanguageLevel
}
