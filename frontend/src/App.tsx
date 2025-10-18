import type { ReactNode } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import LandingHero from './components/LandingHero'
import ResidentDashboard from './components/ResidentDashboard'
import PartnerDashboard from './components/PartnerDashboard'
import PublicDashboard from './components/PublicDashboard'

function Shell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen px-4 py-10 md:py-16 bg-gradient-to-b from-resi-emerald to-[#06211C] text-white">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">R</div>
          <div>
            <p className="text-lg font-semibold tracking-wide">Resi</p>
            <p className="text-sm text-white/70">Benefícios verdes para moradores</p>
          </div>
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.3em]">
          <Link to="/morador" className="hover:text-resi-sand transition-colors">Morador</Link>
          <Link to="/parceiro" className="hover:text-resi-sand transition-colors">Parceiro</Link>
          <Link to="/prefeitura" className="hover:text-resi-sand transition-colors">Prefeitura</Link>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto space-y-12">{children}</main>
      <footer className="max-w-6xl mx-auto mt-16 text-sm text-white/60 border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 md:justify-between">
        <p>© {new Date().getFullYear()} Resi. Costa Esmeralda com tecnologia verde.</p>
        <div className="flex gap-4">
          <a href="#privacidade" className="hover:text-resi-sand">Privacidade</a>
          <a href="#lgpd" className="hover:text-resi-sand">LGPD</a>
          <a href="#contato" className="hover:text-resi-sand">Contato</a>
        </div>
      </footer>
    </div>
  )
}

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Shell>
            <LandingHero />
          </Shell>
        }
      />
      <Route
        path="/morador"
        element={
          <Shell>
            <ResidentDashboard />
          </Shell>
        }
      />
      <Route
        path="/parceiro"
        element={
          <Shell>
            <PartnerDashboard />
          </Shell>
        }
      />
      <Route
        path="/prefeitura"
        element={
          <Shell>
            <PublicDashboard />
          </Shell>
        }
      />
    </Routes>
  )
}
