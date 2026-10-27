import { certifications, education, experience, orgLine, skills } from '../content/resume'

/*
  One semantic résumé, styled entirely by the layout that wraps it.
  Class hooks: rs, rs-section, rs-h, rs-list, rs-entry, rs-when, rs-body,
  rs-title, rs-meta, rs-points, rs-desc, rs-tags.
*/
export default function Resume({ className = '' }) {
  return (
    <div className={`rs ${className}`.trim()}>
      <section className="rs-section rs-experience">
        <h2 className="rs-h">Experience</h2>
        <ol className="rs-list">
          {experience.map((e) => (
            <li key={e.role + e.start} className="rs-entry">
              <div className="rs-when">{e.start} – {e.end}</div>
              <div className="rs-body">
                <h3 className="rs-title">{e.role}</h3>
                <p className="rs-meta">{orgLine(e)}</p>
                <ul className="rs-points">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rs-section rs-skills">
        <h2 className="rs-h">Skills</h2>
        <ul className="rs-tags">
          {skills.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      <section className="rs-section rs-education">
        <h2 className="rs-h">Education</h2>
        <ol className="rs-list">
          {education.map((e) => (
            <li key={e.school} className="rs-entry">
              <div className="rs-when">{e.start} – {e.end}</div>
              <div className="rs-body">
                <h3 className="rs-title">{e.degree}</h3>
                <p className="rs-meta">{orgLine(e)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {certifications.length > 0 && (
        <section className="rs-section rs-certifications">
          <h2 className="rs-h">Certifications</h2>
          <ol className="rs-list">
            {certifications.map((c) => (
              <li key={c.name} className="rs-entry">
                <div className="rs-when">{c.issued}</div>
                <div className="rs-body">
                  <h3 className="rs-title">{c.name}</h3>
                  <p className="rs-meta">{c.issuer}</p>
                  {c.id && <p className="rs-desc">Credential ID {c.id}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

    </div>
  )
}
