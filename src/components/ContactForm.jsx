import { useEffect, useRef, useState } from 'react'
import { site } from '../content/site.js'
import { submitForm } from '../lib/submitForm.js'

const EMPTY = { name: '', email: '', type: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values, errors) {
  const result = {}
  if (!values.name.trim()) result.name = errors.name
  if (!values.email.trim()) result.email = errors.emailRequired
  else if (!EMAIL_RE.test(values.email.trim())) result.email = errors.emailInvalid
  if (!values.type) result.type = errors.type
  return result
}

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
        {optional && <span className="ml-2 text-sm font-normal text-roast-soft">{optional}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const { contact } = site
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)
  const successRef = useRef(null)
  const busy = useRef(false)

  // წარმატების შემდეგ ფოკუსი გადადის შეტყობინებაზე (screen reader-ისთვისაც)
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const set = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (busy.current) return

    const found = validate(values, contact.errors)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('idle')
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }

    busy.current = true
    setStatus('sending')
    try {
      await submitForm({
        name: values.name.trim(),
        email: values.email.trim(),
        type: values.type,
        message: values.message.trim(),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      busy.current = false
    }
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const invalid = (name) => (errors[name] ? { 'aria-invalid': 'true', 'aria-describedby': `${name}-error` } : {})

  return (
    <section id="contact" aria-labelledby="contact-title" className="grain py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-3xl font-bold leading-tight md:text-5xl">
            {contact.title}
          </h2>
        </div>

        <div className="lg:col-span-7">
          {status === 'success' ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="py-2 outline-offset-8"
            >
              <p className="font-serif text-2xl font-bold leading-snug md:text-3xl">{contact.success}</p>
              <button type="button" onClick={reset} className="btn btn-outline mt-8">
                {contact.again}
              </button>
            </div>
          ) : (
            <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-6">
              <Field id="name" label={contact.labels.name} error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="field"
                  value={values.name}
                  onChange={set('name')}
                  {...invalid('name')}
                />
              </Field>

              <Field id="email" label={contact.labels.email} error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="field"
                  value={values.email}
                  onChange={set('email')}
                  {...invalid('email')}
                />
              </Field>

              <Field id="type" label={contact.labels.type} error={errors.type}>
                <select
                  id="type"
                  name="type"
                  required
                  className="field"
                  value={values.type}
                  onChange={set('type')}
                  {...invalid('type')}
                >
                  <option value="">{contact.typePlaceholder}</option>
                  {contact.types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="message" label={contact.labels.message} optional={contact.labels.optional}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="field resize-y"
                  value={values.message}
                  onChange={set('message')}
                />
              </Field>

              {status === 'error' && (
                <p role="alert" className="font-medium text-error">
                  {contact.errors.submit}
                </p>
              )}

              {/* onClick ამუშავებს ფორმას იმ გარემოშიც, სადაც ბრაუზერი submit-ივენთს ბლოკავს
                  (მაგ. sandbox iframe preview); busy-დაცვა გამორიცხავს ორმაგ გაგზავნას. */}
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
                disabled={status === 'sending'}
                onClick={handleSubmit}
              >
                {status === 'sending' ? contact.sending : contact.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
