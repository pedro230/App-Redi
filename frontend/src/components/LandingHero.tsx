import { Link } from 'react-router-dom'

export default function LandingHero(): JSX.Element {
  return (
    <section className="bg-resi-emerald text-white py-16 px-6 md:px-16 rounded-3xl shadow-2xl">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="uppercase tracking-[0.4em] text-resi-sand text-sm font-semibold">
            Costa Esmeralda, SC
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Resi — benefícios reais para quem vive o litoral todos os dias
          </h1>
          <p className="mt-6 text-lg text-resi-sand/90">
            Descontos verdes, filas expressas e experiências exclusivas para moradores. Insights e fidelização para parceiros. Transparência para o poder público.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/morador"
              className="bg-resi-emerald-light hover:bg-resi-sand hover:text-resi-emerald transition-colors text-lg font-semibold px-6 py-3 rounded-full text-center"
            >
              Sou morador
            </Link>
            <Link
              to="/parceiro"
              className="border border-resi-sand text-resi-sand hover:bg-resi-sand hover:text-resi-emerald transition-colors text-lg font-semibold px-6 py-3 rounded-full text-center"
            >
              Sou parceiro
            </Link>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-resi-sand">ResidentScore em ação</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-resi-sand/70">Morador Ouro</p>
              <div className="mt-2 bg-white/20 rounded-full h-3">
                <div className="bg-resi-emerald-light h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm mt-1 text-resi-sand/80">Score 85 — comprovante + validação comunitária</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-resi-sand/80">
              <div className="bg-white/10 rounded-2xl p-3">
                <p className="font-semibold text-white">Praia Viva</p>
                <p>20% OFF nas quintas</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-3">
                <p className="font-semibold text-white">EcoTransporte</p>
                <p>Passagem com 30% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
