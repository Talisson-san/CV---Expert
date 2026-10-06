import {
  educationStatusLabels,
  languageLevelLabels,
} from '../data/resumeData'
import type {
  Education,
  Experience,
  Language,
  PersonalData,
  Qualification,
  Skill,
} from '../types/resume'
import {
  formatAddress,
  formatBirthDate,
  formatEducationPeriod,
  formatExperiencePeriod,
} from '../utils/formatResume'

type ResumeDocumentProps = {
  personalData: PersonalData
  professionalObjective: string
  educationList: Education[]
  experienceList: Experience[]
  qualificationList: Qualification[]
  skills: Skill[]
  languages: Language[]
  showPlaceholders?: boolean
}

function ResumeDocument({
  personalData,
  professionalObjective,
  educationList,
  experienceList,
  qualificationList,
  skills,
  languages,
  showPlaceholders = false,
}: ResumeDocumentProps) {
  const birthDate = formatBirthDate(personalData)
  const address = formatAddress(personalData)
  const contactItems = [
    personalData.phone,
    personalData.email,
    address,
    birthDate,
  ].filter(Boolean)

  const educationEntries = educationList.filter(
    (education) =>
      education.type ||
      education.course ||
      education.institution ||
      education.city ||
      education.state ||
      education.startYear ||
      education.endYear,
  )

  const experienceEntries = experienceList.filter(
    (experience) =>
      experience.role ||
      experience.company ||
      experience.description ||
      experience.city ||
      experience.state ||
      experience.startYear ||
      experience.endYear,
  )

  const qualificationEntries = qualificationList.filter(
    (qualification) =>
      qualification.title ||
      qualification.institution ||
      qualification.year ||
      qualification.workload,
  )

  const languageEntries = languages.filter((language) => language.name.trim())

  const showObjective = Boolean(professionalObjective.trim()) || showPlaceholders
  const showEducation = educationEntries.length > 0 || showPlaceholders
  const showExperience = experienceEntries.length > 0
  const showQualifications = qualificationEntries.length > 0
  const showSkills = skills.length > 0
  const showLanguages = languageEntries.length > 0

  return (
    <article className="resume-sheet bg-white text-slate-900">
      <div className="resume-inner p-[18mm]">
        <header className="border-b-2 border-slate-800 pb-5">
          <h1 className="text-[25px] font-bold uppercase leading-tight tracking-tight text-slate-950">
            {personalData.name || (showPlaceholders ? 'Seu nome completo' : '')}
          </h1>
          {(contactItems.length > 0 || showPlaceholders) && (
            <p className="mt-3 text-[11px] leading-5 text-slate-600">
              {contactItems.length > 0
                ? contactItems.join(' • ')
                : 'Telefone • E-mail • Endereço • Data de nascimento'}
            </p>
          )}
        </header>

        {showObjective && (
          <section className="resume-section py-5">
            <h2 className="resume-heading">Objetivo profissional</h2>
            <p className="mt-2 whitespace-pre-line text-[11.5px] leading-[1.65] text-slate-700">
              {professionalObjective ||
                (showPlaceholders
                  ? 'Seu objetivo profissional será exibido aqui.'
                  : '')}
            </p>
          </section>
        )}

        {showEducation && (
          <section className="resume-section border-t border-slate-300 py-5">
            <h2 className="resume-heading">Formação acadêmica</h2>
            <div className="mt-3 space-y-3.5">
              {educationEntries.length > 0 ? (
                educationEntries.map((education) => {
                  const location = [education.city, education.state]
                    .filter(Boolean)
                    .join(' - ')
                  const period = formatEducationPeriod(education)
                  const metadata = [
                    location,
                    period,
                    educationStatusLabels[education.status],
                  ].filter(Boolean)

                  return (
                    <div key={education.id} className="resume-entry">
                      <h3 className="text-[12px] font-semibold leading-5 text-slate-950">
                        {education.course || education.type || 'Formação'}
                      </h3>
                      {education.type && education.course && (
                        <p className="text-[10.5px] font-medium leading-4 text-slate-500">
                          {education.type}
                        </p>
                      )}
                      {education.institution && (
                        <p className="text-[11px] leading-5 text-slate-700">
                          {education.institution}
                        </p>
                      )}
                      {metadata.length > 0 && (
                        <p className="text-[10px] leading-4 text-slate-500">
                          {metadata.join(' • ')}
                        </p>
                      )}
                    </div>
                  )
                })
              ) : (
                <p className="text-[11px] text-slate-400">
                  Sua formação acadêmica será exibida aqui.
                </p>
              )}
            </div>
          </section>
        )}

        {showExperience && (
          <section className="resume-section border-t border-slate-300 py-5">
            <h2 className="resume-heading">Experiência profissional</h2>
            <div className="mt-3 space-y-4">
              {experienceEntries.map((experience) => {
                const location = [experience.city, experience.state]
                  .filter(Boolean)
                  .join(' - ')
                const period = formatExperiencePeriod(experience)
                return (
                  <div key={experience.id} className="resume-entry">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[12px] font-semibold leading-5 text-slate-950">
                        {experience.role || 'Experiência profissional'}
                      </h3>
                      {period && (
                        <span className="text-[10px] text-slate-500">{period}</span>
                      )}
                    </div>
                    {experience.company && (
                      <p className="text-[11px] font-medium leading-5 text-slate-700">
                        {experience.company}
                      </p>
                    )}
                    {location && (
                      <p className="text-[10px] leading-4 text-slate-500">{location}</p>
                    )}
                    {experience.description && (
                      <p className="mt-1.5 whitespace-pre-line text-[11px] leading-[1.6] text-slate-700">
                        {experience.description}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {showQualifications && (
          <section className="resume-section border-t border-slate-300 py-5">
            <h2 className="resume-heading">Qualificações</h2>
            <div className="mt-3 space-y-2.5">
              {qualificationEntries.map((qualification) => {
                const metadata = [
                  qualification.institution,
                  qualification.year,
                  qualification.workload,
                ].filter(Boolean)

                return (
                  <div key={qualification.id} className="resume-entry">
                    <h3 className="text-[11.5px] font-semibold leading-5 text-slate-950">
                      {qualification.title || 'Qualificação'}
                    </h3>
                    {metadata.length > 0 && (
                      <p className="text-[10px] leading-4 text-slate-500">
                        {metadata.join(' • ')}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {showSkills && (
          <section className="resume-section border-t border-slate-300 py-5">
            <h2 className="resume-heading">Habilidades e competências</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11px] leading-5 text-slate-700">
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-start gap-2">
                  <span aria-hidden="true" className="font-semibold text-slate-700">•</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {showLanguages && (
          <section className="resume-section border-t border-slate-300 pt-5">
            <h2 className="resume-heading">Idiomas</h2>
            <div className="mt-3 space-y-1 text-[11px] leading-5 text-slate-700">
              {languageEntries.map((language) => (
                <p key={language.id}>
                  <span className="font-semibold text-slate-950">{language.name}</span>
                  {' — '}
                  {languageLevelLabels[language.level]}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

export default ResumeDocument
