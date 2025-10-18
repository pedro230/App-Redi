import LoginCard from './LoginCard'
import { useFetch } from '../hooks/useFetch'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface RedemptionMetric {
  partnerName: string
  total: number
  today: number
}

const sampleMetrics: RedemptionMetric[] = [
  { partnerName: 'Bali Hai Beach Club', total: 182, today: 6 },
  { partnerName: 'EcoTransporte', total: 94, today: 3 },
  { partnerName: 'Mercado Verde', total: 121, today: 5 }
]

export default function PartnerDashboard(): JSX.Element {
  const loginFields = [
    {
      name: 'cnpj',
      label: 'CNPJ ou CPF do responsável',
      placeholder: '00.000.000/0001-00',
      autoComplete: 'username'
    },
    {
      name: 'password',
      label: 'Senha administrativa',
      type: 'password',
      placeholder: 'Sua senha segura',
      autoComplete: 'current-password'
    },
    {
      name: 'otp',
      label: 'Token Resi ID',
      placeholder: '123456',
      autoComplete: 'one-time-code'
    }
  ]

  const {
    data: partners,
    loading,
    error
  } = useFetch<Array<{ id: number, trade_name: string, plan: string }>>('/api/partners', [])

  return (
    <section className="bg-white/80 rounded-3xl shadow-xl p-8 md:p-12 text-resi-emerald">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <LoginCard
          persona="parceiro"
          title="Central do parceiro Resi"
          subtitle="Controle ofertas, consulte métricas em tempo real e fortaleça o relacionamento com moradores certificados."
          fields={loginFields}
          actionText="Entrar como parceiro"
          helpText="Ainda não é parceiro? Fale com nosso time em parceiros@resi.eco."
          dataNotice="Ativamos MFA padrão para proteger dados de consumo e faturamento."
        />

        <div className="space-y-8">
          <header className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-resi-emerald/70">Painel do parceiro</p>
              <h2 className="text-3xl font-bold">Desempenho hoje</h2>
            </div>
            <button className="bg-resi-emerald text-white px-5 py-2 rounded-full hover:bg-resi-emerald-light transition-colors">
              Criar nova oferta
            </button>
          </header>

          <div className="grid md:grid-cols-3 gap-4">
            {sampleMetrics.map((metric) => (
              <div key={metric.partnerName} className="rounded-2xl border border-resi-emerald/10 bg-resi-sand/40 p-5">
                <p className="text-sm uppercase tracking-wide text-resi-emerald/70">{metric.partnerName}</p>
                <p className="text-3xl font-semibold text-resi-emerald mt-3">{metric.total}</p>
                <p className="text-sm text-resi-emerald/80">resgates totais</p>
                <p className="mt-2 text-resi-emerald/70">{metric.today} hoje</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-resi-emerald/10 bg-resi-sand/30 p-6 space-y-4">
              <h3 className="text-xl font-semibold">Fluxo financeiro</h3>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-semibold text-resi-emerald">R$ 28.940</p>
                <span className="text-sm text-resi-emerald/70">+18% vs. mês anterior</span>
              </div>
              <p className="text-sm text-resi-emerald/80">Liquidações programadas toda terça-feira com split automático Resi.</p>
            </div>

            <div className="bg-resi-emerald text-white rounded-2xl p-6">
              <h3 className="text-xl font-semibold">Parceiros ativos</h3>
              {error && (
                <p className="mt-4 rounded-xl bg-red-50/90 px-4 py-3 text-sm text-red-800">
                  Não foi possível carregar os dados de parceiros: {error}
                </p>
              )}
              <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-resi-sand">
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <li key={`skeleton-${index}`} className="bg-white/10 rounded-xl px-4 py-3 animate-pulse">
                        <div className="h-4 bg-white/40 rounded w-3/4" />
                        <div className="mt-3 h-3 bg-white/30 rounded w-1/3" />
                      </li>
                    ))
                  : partners.length > 0
                    ? partners.map((partner) => (
                        <li key={partner.id} className="bg-white/10 rounded-xl px-4 py-3 flex justify-between items-center">
                          <span>{partner.trade_name}</span>
                          <span className="text-xs uppercase tracking-widest bg-resi-emerald-light/30 text-resi-sand px-2 py-1 rounded-full">
                            {partner.plan}
                          </span>
                        </li>
                      ))
                    : (
                        <li className="col-span-full bg-white/10 rounded-xl px-4 py-3 text-center">
                          Nenhum parceiro ativo cadastrado para exibição.
                        </li>
                      )}
              </ul>
            </div>
          </div>
        </div>
  const { data: partners } = useQuery({
    queryKey: ['partners-dashboard'],
    queryFn: async () => {
      const response = await axios.get('/api/partners')
      return response.data as Array<{ id: number, trade_name: string, plan: string }>
    }
  })

  return (
    <section className="bg-white/80 rounded-3xl shadow-xl p-8 md:p-12 text-resi-emerald space-y-6">
      <header className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-resi-emerald/70">Painel do parceiro</p>
          <h2 className="text-3xl font-bold">Desempenho hoje</h2>
        </div>
        <button className="bg-resi-emerald text-white px-5 py-2 rounded-full hover:bg-resi-emerald-light transition-colors">
          Criar nova oferta
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        {sampleMetrics.map((metric) => (
          <div key={metric.partnerName} className="rounded-2xl border border-resi-emerald/10 bg-resi-sand/40 p-5">
            <p className="text-sm uppercase tracking-wide text-resi-emerald/70">{metric.partnerName}</p>
            <p className="text-3xl font-semibold text-resi-emerald mt-3">{metric.total}</p>
            <p className="text-sm text-resi-emerald/80">resgates totais</p>
            <p className="mt-2 text-resi-emerald/70">{metric.today} hoje</p>
          </div>
        ))}
      </div>

      <div className="bg-resi-emerald text-white rounded-2xl p-6">
        <h3 className="text-xl font-semibold">Parceiros ativos</h3>
        <ul className="mt-4 grid md:grid-cols-2 gap-3 text-resi-sand">
          {partners?.map((partner) => (
            <li key={partner.id} className="bg-white/10 rounded-xl px-4 py-3 flex justify-between items-center">
              <span>{partner.trade_name}</span>
              <span className="text-xs uppercase tracking-widest bg-resi-emerald-light/30 text-resi-sand px-2 py-1 rounded-full">
                {partner.plan}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
