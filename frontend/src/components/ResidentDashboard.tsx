import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMemo } from 'react'
import LoginCard from './LoginCard'

type Offer = {
  id: number
  partner_id: number
  title: string
  description: string
  min_level: string
  discount_percent: number
  days_of_week: number[]
}

type Partner = {
  id: number
  trade_name: string
  categories: string[]
  city: string
}

export default function ResidentDashboard(): JSX.Element {
  const loginFields = [
    {
      name: 'cpf',
      label: 'CPF',
      placeholder: '000.000.000-00',
      autoComplete: 'username'
    },
    {
      name: 'password',
      label: 'Código de acesso',
      type: 'password',
      placeholder: '••••••',
      autoComplete: 'current-password'
    }
  ]

  const { data: offers } = useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const response = await axios.get('/api/offers')
      return response.data as Offer[]
    }
  })

  const { data: partners } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await axios.get('/api/partners')
      return response.data as Partner[]
    }
  })

  const offersByPartner = useMemo(() => {
    if (!offers || !partners) return []
    return offers.map((offer) => {
      const partner = partners.find((p) => p.id === offer.partner_id)
      return {
        ...offer,
        partnerName: partner?.trade_name ?? 'Parceiro Resi',
        categories: partner?.categories ?? []
      }
    })
  }, [offers, partners])

  return (
    <section className="bg-white/90 rounded-3xl shadow-xl p-8 md:p-12 text-resi-emerald">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <LoginCard
          persona="morador"
          title="Acesse sua carteira verde"
          subtitle="Valide sua moradia para desbloquear descontos sustentáveis, filas expressas e experiências exclusivas na Costa Esmeralda."
          fields={loginFields}
          actionText="Entrar como morador"
          helpText="Primeiro acesso? Faça a prova de residência pelo aplicativo Resi."
          dataNotice="Utilizamos seus dados apenas para confirmar residência, de acordo com a LGPD."
        />

        <div className="space-y-8">
          <header className="flex flex-col lg:flex-row justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.35em] text-sm text-resi-emerald/70">Carteira Resi</p>
              <h2 className="text-3xl font-bold">Morador Ouro — Porto Belo</h2>
            </div>
            <div className="bg-resi-emerald text-white rounded-2xl px-6 py-4 flex flex-col items-start">
              <span className="text-xs uppercase tracking-widest text-resi-sand/80">ResidentScore</span>
              <span className="text-3xl font-semibold">85</span>
              <span className="text-sm text-resi-sand/90">Válido até 12/09</span>
            </div>
          </header>

          <div className="rounded-2xl border border-resi-emerald/10 bg-resi-sand/30 p-6">
            <h3 className="text-xl font-semibold">Resumo ESG pessoal</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm text-resi-emerald/80">
              <div>
                <p className="text-3xl font-semibold text-resi-emerald">12</p>
                <p>negócios locais apoiados</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-resi-emerald">R$ 428</p>
                <p>economia no mês</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-resi-emerald">18 kg</p>
                <p>CO₂ evitado (transporte coletivo)</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {offersByPartner.map((offer) => (
              <article key={offer.id} className="border border-resi-emerald/10 rounded-2xl p-6 bg-resi-sand/40">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold">{offer.partnerName}</h3>
                    <p className="text-sm uppercase tracking-wide text-resi-emerald/70">
                      {offer.categories.join(' • ')}
                    </p>
                  </div>
                  <span className="bg-resi-emerald/10 text-resi-emerald px-3 py-1 rounded-full text-sm font-medium">
                    {offer.discount_percent}% OFF
                  </span>
                </div>
                <p className="mt-4 text-resi-emerald/80">{offer.description}</p>
                <p className="mt-3 text-sm font-medium text-resi-emerald/70">Disponível para níveis {offer.min_level}+.</p>
                <button className="mt-5 bg-resi-emerald text-white px-4 py-2 rounded-full hover:bg-resi-emerald-light transition-colors">
                  Gerar QR dinâmico
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
