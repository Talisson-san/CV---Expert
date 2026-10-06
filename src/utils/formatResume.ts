import { months } from '../data/resumeData'
import type { Education, Experience, PersonalData } from '../types/resume'

export function formatMonthYear(month: string, year: string) {
  const normalizedMonth = month.trim()
  const normalizedYear = year.trim()

  let monthLabel = ''
  if (normalizedMonth) {
    const monthNumber = Number(normalizedMonth)
    monthLabel =
      Number.isInteger(monthNumber) && monthNumber >= 1 && monthNumber <= 12
        ? months[monthNumber - 1]
        : normalizedMonth
  }

  if (monthLabel && normalizedYear) {
    return `${monthLabel}/${normalizedYear}`
  }

  return normalizedYear || monthLabel
}

export function formatAddress(personalData: PersonalData) {
  const address = personalData.address.trim()
  const houseNumber = personalData.houseNumber.trim()

  if (!address) return ''
  return houseNumber ? `${address}, nº ${houseNumber}` : address
}

export function buildPdfBaseName(name: string) {
  const normalized = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return normalized ? `${normalized}-curriculo` : 'curriculo'
}

export function formatBirthDate(personalData: PersonalData) {
  if (
    !personalData.birthDay ||
    !personalData.birthMonth ||
    !personalData.birthYear
  ) {
    return ''
  }

  return `${personalData.birthDay}/${months[Number(personalData.birthMonth) - 1]}/${personalData.birthYear}`
}

export function formatEducationPeriod(education: Education) {
  const start = formatMonthYear(education.startMonth, education.startYear)

  if (education.status === 'andamento') {
    return start ? `${start} - Atual` : ''
  }

  const end = formatMonthYear(education.endMonth, education.endYear)
  if (start && end) return `${start} - ${end}`
  return start || end
}

export function formatExperiencePeriod(experience: Experience) {
  const start = formatMonthYear(experience.startMonth, experience.startYear)
  const end = experience.current
    ? 'Atual'
    : formatMonthYear(experience.endMonth, experience.endYear)

  if (start && end) return `${start} - ${end}`
  return start || end
}
