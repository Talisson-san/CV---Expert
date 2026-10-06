import { useState } from 'react'

import EducationForm from './components/EducationForm'
import ExportCreditModal from './components/ExportCreditModal'
import ExperienceForm from './components/ExperienceForm'
import Header from './components/Header'
import LanguagesForm from './components/LanguagesForm'
import ObjectiveForm from './components/ObjectiveForm'
import PersonalDataForm from './components/PersonalDataForm'
import QualificationsForm from './components/QualificationsForm'
import ResumeDocument from './components/ResumeDocument'
import ResumePreview from './components/ResumePreview'
import SectionNavigation from './components/SectionNavigation'
import SkillsForm from './components/SkillsForm'
import { sections } from './data/resumeData'
import type { ProfessionalArea } from './data/resumeData'
import { buildPdfBaseName } from './utils/formatResume'
import type {
  Education,
  Experience,
  Language,
  PersonalData,
  Qualification,
  Skill,
} from './types/resume'

const emptyPersonalData: PersonalData = {
  name: '',
  phone: '',
  email: '',
  address: '',
  houseNumber: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
}

const createEducation = (): Education => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  type: '',
  course: '',
  institution: '',
  city: '',
  state: '',
  status: 'concluido',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
})

const createExperience = (): Experience => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  company: '',
  role: '',
  city: '',
  state: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  current: false,
  description: '',
})

const createQualification = (): Qualification => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  title: '',
  institution: '',
  year: '',
  workload: '',
})

const createLanguage = (): Language => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  name: '',
  level: 'intermediario',
})

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)

  const [personalData, setPersonalData] =
    useState<PersonalData>(emptyPersonalData)
  const [professionalArea, setProfessionalArea] =
    useState<ProfessionalArea>('')
  const [professionalObjective, setProfessionalObjective] = useState('')
  const [educationList, setEducationList] = useState<Education[]>([
    createEducation(),
  ])
  const [experienceList, setExperienceList] = useState<Experience[]>([
    createExperience(),
  ])
  const [qualificationList, setQualificationList] = useState<Qualification[]>([
    createQualification(),
  ])
  const [skills, setSkills] = useState<Skill[]>([])
  const [languages, setLanguages] = useState<Language[]>([createLanguage()])

  const updatePersonalData = (field: keyof PersonalData, value: string) => {
    setPersonalData((current) => ({ ...current, [field]: value }))
  }

  const updateEducation = (
    id: number,
    field: keyof Education,
    value: string,
  ) => {
    setEducationList((current) =>
      current.map((education) => {
        if (education.id !== id) return education

        const updated = { ...education, [field]: value } as Education
        if (field === 'status' && value === 'andamento') {
          updated.endMonth = ''
          updated.endYear = ''
        }

        return updated
      }),
    )
  }

  const removeEducation = (id: number) => {
    if (!window.confirm('Remover esta formação do currículo?')) return
    setEducationList((current) =>
      current.filter((education) => education.id !== id),
    )
  }

  const updateExperience = (
    id: number,
    field: keyof Experience,
    value: string | boolean,
  ) => {
    setExperienceList((current) =>
      current.map((experience) => {
        if (experience.id !== id) return experience

        const updated = { ...experience, [field]: value } as Experience
        if (field === 'current' && value === true) {
          updated.endMonth = ''
          updated.endYear = ''
        }
        return updated
      }),
    )
  }

  const removeExperience = (id: number) => {
    if (!window.confirm('Remover esta experiência do currículo?')) return
    setExperienceList((current) =>
      current.filter((experience) => experience.id !== id),
    )
  }

  const updateQualification = (
    id: number,
    field: keyof Qualification,
    value: string,
  ) => {
    setQualificationList((current) =>
      current.map((qualification) =>
        qualification.id === id
          ? { ...qualification, [field]: value }
          : qualification,
      ),
    )
  }

  const removeQualification = (id: number) => {
    if (!window.confirm('Remover esta qualificação do currículo?')) return
    setQualificationList((current) =>
      current.filter((qualification) => qualification.id !== id),
    )
  }

  const addSkill = (name: string) => {
    const normalized = name.trim().toLocaleLowerCase('pt-BR')
    if (
      skills.some(
        (skill) => skill.name.trim().toLocaleLowerCase('pt-BR') === normalized,
      )
    ) {
      return
    }

    setSkills((current) => [
      ...current,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: name.trim(),
      },
    ])
  }

  const updateLanguage = (
    id: number,
    field: keyof Language,
    value: string,
  ) => {
    setLanguages((current) =>
      current.map((language) =>
        language.id === id
          ? ({ ...language, [field]: value } as Language)
          : language,
      ),
    )
  }

  const removeLanguage = (id: number) => {
    if (!window.confirm('Remover este idioma do currículo?')) return
    setLanguages((current) => current.filter((language) => language.id !== id))
  }

  const resetResume = () => {
    const hasContent =
      Object.values(personalData).some(Boolean) ||
      professionalObjective.trim() ||
      educationList.some((item) => item.course || item.institution || item.type) ||
      experienceList.some((item) => item.role || item.company || item.description) ||
      qualificationList.some((item) => item.title || item.institution) ||
      skills.length > 0 ||
      languages.some((item) => item.name.trim())

    if (
      hasContent &&
      !window.confirm(
        'Iniciar um novo currículo? Todos os dados preenchidos nesta sessão serão apagados.',
      )
    ) {
      return
    }

    setPersonalData(emptyPersonalData)
    setProfessionalArea('')
    setProfessionalObjective('')
    setEducationList([createEducation()])
    setExperienceList([createExperience()])
    setQualificationList([createQualification()])
    setSkills([])
    setLanguages([createLanguage()])
    setPreviewOpen(false)
    setExportModalOpen(false)
    setActiveSection(0)
  }

  const pdfBaseName = buildPdfBaseName(personalData.name)

  const confirmExport = () => {
    const originalTitle = document.title
    const restoreTitle = () => {
      document.title = originalTitle
    }

    document.title = pdfBaseName
    window.addEventListener('afterprint', restoreTitle, { once: true })
    setExportModalOpen(false)

    window.setTimeout(() => {
      window.print()
      window.setTimeout(() => {
        if (document.title === pdfBaseName) restoreTitle()
      }, 1500)
    }, 120)
  }

  const completedSections = [
    Object.values(personalData).some(Boolean),
    Boolean(professionalObjective.trim()),
    educationList.some(
      (item) => item.course || item.institution || item.type || item.startYear,
    ),
    experienceList.some(
      (item) => item.role || item.company || item.description || item.startYear,
    ),
    qualificationList.some(
      (item) => item.title || item.institution || item.year,
    ),
    skills.length > 0,
    languages.some((item) => item.name.trim()),
  ]

  return (
    <>
      <div className="app-screen min-h-screen bg-[#969696] text-slate-900">
        <Header
          onOpenPreview={() => setPreviewOpen(true)}
          onOpenExport={() => setExportModalOpen(true)}
          onNewResume={resetResume}
        />

        <div className="lg:flex lg:min-h-[calc(100vh-4rem)]">
          <SectionNavigation
            activeSection={activeSection}
            completedSections={completedSections}
            onSelectSection={setActiveSection}
          />

          <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
            <div className="mx-auto max-w-5xl">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                <span>Etapa {activeSection + 1} de {sections.length}</span>
                <span className="truncate text-right normal-case tracking-normal text-white/70">
                  {sections[activeSection]}
                </span>
              </div>

              <section className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                {activeSection === 0 ? (
                  <PersonalDataForm
                    personalData={personalData}
                    onChange={updatePersonalData}
                  />
                ) : activeSection === 1 ? (
                  <ObjectiveForm
                    professionalArea={professionalArea}
                    professionalObjective={professionalObjective}
                    onAreaChange={setProfessionalArea}
                    onObjectiveChange={setProfessionalObjective}
                  />
                ) : activeSection === 2 ? (
                  <EducationForm
                    educationList={educationList}
                    onAdd={() =>
                      setEducationList((current) => [...current, createEducation()])
                    }
                    onRemove={removeEducation}
                    onUpdate={updateEducation}
                  />
                ) : activeSection === 3 ? (
                  <ExperienceForm
                    experienceList={experienceList}
                    onAdd={() =>
                      setExperienceList((current) => [
                        ...current,
                        createExperience(),
                      ])
                    }
                    onRemove={removeExperience}
                    onUpdate={updateExperience}
                  />
                ) : activeSection === 4 ? (
                  <QualificationsForm
                    qualificationList={qualificationList}
                    onAdd={() =>
                      setQualificationList((current) => [
                        ...current,
                        createQualification(),
                      ])
                    }
                    onRemove={removeQualification}
                    onUpdate={updateQualification}
                  />
                ) : activeSection === 5 ? (
                  <SkillsForm
                    skills={skills}
                    professionalArea={professionalArea}
                    onAdd={addSkill}
                    onRemove={(id) =>
                      setSkills((current) =>
                        current.filter((skill) => skill.id !== id),
                      )
                    }
                  />
                ) : (
                  <LanguagesForm
                    languages={languages}
                    onAdd={() =>
                      setLanguages((current) => [...current, createLanguage()])
                    }
                    onRemove={removeLanguage}
                    onUpdate={updateLanguage}
                  />
                )}
              </section>
            </div>
          </main>
        </div>

        <ResumePreview
          open={previewOpen}
          onOpen={() => setPreviewOpen(true)}
          onClose={() => setPreviewOpen(false)}
          personalData={personalData}
          professionalObjective={professionalObjective}
          educationList={educationList}
          experienceList={experienceList}
          qualificationList={qualificationList}
          skills={skills}
          languages={languages}
        />

        <ExportCreditModal
          open={exportModalOpen}
          fileName={`${pdfBaseName}.pdf`}
          onCancel={() => setExportModalOpen(false)}
          onConfirm={confirmExport}
        />
      </div>

      <div className="print-root" aria-hidden="true">
        <ResumeDocument
          personalData={personalData}
          professionalObjective={professionalObjective}
          educationList={educationList}
          experienceList={experienceList}
          qualificationList={qualificationList}
          skills={skills}
          languages={languages}
        />
      </div>
    </>
  )
}

export default App
