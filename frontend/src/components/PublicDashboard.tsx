import LoginCard from './LoginCard'

const indicators = [
  { label: 'Economia local movimentada', value: 'R$ 1,2 mi', detail: '+28% vs. mês anterior' },
  { label: 'Fraudes bloqueadas', value: '37', detail: 'emissão automática de alertas' },
  { label: 'CO₂ evitado', value: '1,04 t', detail: 'transporte compartilhado' }
]

const neighborhoods = [
  { name: 'Bombas', score: 78 },
  { name: 'Centro Porto Belo', score: 82 },
  { name: 'Perequê', score: 74 }
]

export default function PublicDashboard(): JSX.Element {
  const loginFields = [
    {
      name: 'email',
      label: 'E-mail institucional',
      type: 'email',
      placeholder: 'nome@prefeitura.sc.gov.br',
      autoComplete: 'email'
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: 'Digite sua senha segura',
      autoComplete: 'current-password'
    },
    {
      name: 'otp',
      label: 'Token de homologação',
      placeholder: '000000',
      autoComplete: 'one-time-code'
    }
  ]

  return (
    <section className="bg-white/80 rounded-3xl shadow-xl p-8 md:p-12 text-resi-emerald">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <LoginCard
          persona="prefeitura"
          title="Monitoramento territorial"
          subtitle="Acompanhe a movimentação econômica local, trace políticas públicas baseadas em dados e reduza fraudes em benefícios ao morador."
          fields={loginFields}
          actionText="Entrar na conta pública"
          helpText="Solicite credenciais oficiais ao time Resi Governo."
          dataNotice="Integrações com sistemas municipais seguem padrões LGPD e ISO 27001."
        />

        <div className="space-y-8">
          <header className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-resi-emerald/70">Prefeitura & associações</p>
              <h2 className="text-3xl font-bold">Indicadores ESG</h2>
            </div>
            <button className="border border-resi-emerald text-resi-emerald px-5 py-2 rounded-full hover:bg-resi-emerald hover:text-white transition-colors">
              Exportar relatório
            </button>
          </header>

          <div className="grid md:grid-cols-3 gap-4">
            {indicators.map((indicator) => (
              <div key={indicator.label} className="rounded-2xl border border-resi-emerald/10 bg-resi-sand/40 p-6">
                <p className="text-sm uppercase tracking-wide text-resi-emerald/70">{indicator.label}</p>
                <p className="text-2xl font-semibold mt-3 text-resi-emerald">{indicator.value}</p>
                <p className="text-sm text-resi-emerald/80">{indicator.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-resi-emerald text-white rounded-2xl p-6">
            <h3 className="text-xl font-semibold">ResidentScore médio por bairro</h3>
            <ul className="mt-4 space-y-3">
              {neighborhoods.map((neighborhood) => (
                <li key={neighborhood.name} className="flex items-center gap-3">
                  <span className="w-32 text-resi-sand/90">{neighborhood.name}</span>
                  <div className="flex-1 bg-white/20 h-3 rounded-full">
                    <div
                      className="bg-resi-emerald-light h-3 rounded-full"
                      style={{ width: `${neighborhood.score}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right text-resi-sand font-semibold">{neighborhood.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
  return (
    <section className="bg-white/80 rounded-3xl shadow-xl p-8 md:p-12 text-resi-emerald space-y-6">
      <header className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-resi-emerald/70">Prefeitura & associações</p>
          <h2 className="text-3xl font-bold">Indicadores ESG</h2>
        </div>
        <button className="border border-resi-emerald text-resi-emerald px-5 py-2 rounded-full hover:bg-resi-emerald hover:text-white transition-colors">
          Exportar relatório
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        {indicators.map((indicator) => (
          <div key={indicator.label} className="rounded-2xl border border-resi-emerald/10 bg-resi-sand/40 p-6">
            <p className="text-sm uppercase tracking-wide text-resi-emerald/70">{indicator.label}</p>
            <p className="text-2xl font-semibold mt-3 text-resi-emerald">{indicator.value}</p>
            <p className="text-sm text-resi-emerald/80">{indicator.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-resi-emerald text-white rounded-2xl p-6">
        <h3 className="text-xl font-semibold">ResidentScore médio por bairro</h3>
        <ul className="mt-4 space-y-3">
          {neighborhoods.map((neighborhood) => (
            <li key={neighborhood.name} className="flex items-center gap-3">
              <span className="w-32 text-resi-sand/90">{neighborhood.name}</span>
              <div className="flex-1 bg-white/20 h-3 rounded-full">
                <div
                  className="bg-resi-emerald-light h-3 rounded-full"
                  style={{ width: `${neighborhood.score}%` }}
                ></div>
              </div>
              <span className="w-12 text-right text-resi-sand font-semibold">{neighborhood.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
