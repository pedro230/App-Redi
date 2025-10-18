import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'

export type LoginField = {
  name: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
}

interface LoginCardProps {
  persona: 'morador' | 'parceiro' | 'prefeitura'
  title: string
  subtitle: string
  fields: LoginField[]
  actionText: string
  helpText: string
  dataNotice?: string
}

export default function LoginCard({
  persona,
  title,
  subtitle,
  fields,
  actionText,
  helpText,
  dataNotice
}: LoginCardProps): JSX.Element {
  const personaLabel = useMemo(
    () => persona.charAt(0).toUpperCase() + persona.slice(1),
    [persona]
  )

  const initialValues = useMemo(() => {
    const values: Record<string, string> = {}
    for (const field of fields) {
      values[field.name] = ''
    }
    return values
  }, [fields])

  const [formValues, setFormValues] = useState(initialValues)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  useEffect(() => {
    setFormValues(initialValues)
  }, [initialValues])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
  }

  const isValid = fields.every((field) => formValues[field.name]?.trim().length > 0)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return
    setStatus('submitting')

    // Simula requisição de login enquanto os endpoints reais são integrados
    await new Promise((resolve) => setTimeout(resolve, 800))

    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
    }, 2000)
  }

  return (
    <div className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/30 rounded-3xl p-8 shadow-[0_20px_60px_rgba(6,33,28,0.35)] backdrop-blur-md">
      <header className="space-y-2">
        <span className="text-xs uppercase tracking-[0.4em] text-white/70">Portal {personaLabel}</span>
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-white/70 leading-relaxed">{subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label htmlFor={`${persona}-${field.name}`} className="text-sm font-medium text-white/80">
              {field.label}
            </label>
            <input
              id={`${persona}-${field.name}`}
              name={field.name}
              type={field.type ?? 'text'}
              autoComplete={field.autoComplete}
              value={formValues[field.name]}
              onChange={handleChange}
              required
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-resi-sand focus:ring-2 focus:ring-resi-sand/60 outline-none transition"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={!isValid || status === 'submitting'}
          className="w-full rounded-full bg-resi-sand text-resi-emerald font-semibold py-3 uppercase tracking-[0.3em] disabled:opacity-60 disabled:cursor-not-allowed hover:bg-white transition"
        >
          {status === 'submitting' ? 'Acessando…' : actionText}
        </button>
      </form>

      <footer className="mt-6 space-y-2 text-xs text-white/60">
        <p>{helpText}</p>
        {dataNotice ? <p className="text-white/50">{dataNotice}</p> : null}
        <p className="text-white/40">Suporte 24h: suporte@resi.eco</p>
      </footer>

      {status === 'success' ? (
        <div className="mt-4 text-sm text-resi-sand bg-resi-emerald/20 border border-resi-sand/40 rounded-2xl px-4 py-3">
          Login realizado com sucesso. Redirecionando…
        </div>
      ) : null}
    </div>
  )
}
