# Plano de Negócios Completo — Resi

## 1. Visão Geral

**Nome do produto:** Resi  
**Propósito:** Plataforma digital que reconhece e recompensa moradores locais com benefícios exclusivos, fortalece o comércio regional e empodera o poder público com dados confiáveis para políticas de incentivo.  
**Proposta ESG:** Estímulo à economia local (S), incentivo a parceiros que adotam práticas sustentáveis (E) e governança transparente sobre dados (G).

## 2. Problema & Oportunidade

| Público | Dor Principal | Impacto Atual | Oportunidade com o Resi |
|---------|---------------|---------------|-------------------------|
| Moradores | Falta de reconhecimento e preços diferenciados; filas longas. | Gastos maiores e sensação de injustiça em atrações locais. | Benefícios tangíveis (descontos, filas prioritárias) e senso de pertencimento. |
| Parceiros locais | Baixa previsibilidade de fluxo, dificuldade em mensurar campanhas. | Dependência de alta temporada e promoções genéricas. | Recorrência via descontos segmentados, dados agregados para marketing, CRM automatizado. |
| Prefeituras/associações | Programas de morador difíceis de auditar; fraudes em comprovantes. | Perda de arrecadação, ineficiência operacional. | Score de residência auditável, relatórios de impacto econômico em tempo real. |

## 3. Análise de Mercado

### 3.1 Tamanho de mercado (TAM/SAM/SOM)
- **TAM Brasil (turismo doméstico):** ~R$ 200 bi/ano em viagens e lazer (MTur, 2023). 40% desse valor ocorre em destinos turísticos com população residente relevante → R$ 80 bi.
- **SAM (regiões turísticas com alta sazonalidade):** 30 principais destinos litorâneos e serranos (cidades com ≥50 mil habitantes e >500 mil turistas/ano) → ~R$ 18 bi.
- **SOM (Costa Esmeralda SC + expansão SC):** R$ 720 mi/ano em consumo turístico, com 40% gasto por moradores → R$ 288 mi de gasto potencial a ser capturado via benefícios.

### 3.2 Segmentação de clientes
1. **Moradores**: 18-55 anos, usuários intensivos de smartphone, renda média R$ 3–12 mil, valorizam experiências locais e economia colaborativa.  
2. **Parceiros comerciais**: Restaurantes, beach clubs, meios de hospedagem boutique, mobilidade local, eventos culturais.  
3. **Órgãos públicos/associações**: Prefeituras, secretarias de turismo, associações empresariais.

### 3.3 Concorrência e diferenciais

| Concorrente | Modelo | Lacunas | Diferencial Resi |
|-------------|--------|---------|------------------|
| **iFood Benefícios/Clube** | Marketplace com cashbacks genéricos. | Foco nacional, não comprova moradia, baixa personalização regional. | ResidentScore, exclusividade local, integração com prefeitura. |
| **Clubes locais (ex.: Clubinho Floripa, Prime Gourmet)** | Cartões de desconto físicos/digitais. | Verificação manual, pouca análise de dados, foco em turistas. | Score automatizado, dados em dashboard, antifraude por QR dinâmico. |
| **Programas municipais (ex.: CadÚnico municipal)** | Serviços públicos específicos. | Processos lentos, sem integração com comércios. | API única conectando poder público e iniciativa privada. |
| **Aplicativos de fidelidade genéricos (Mercafacil, Dotz)** | Pontuação ampla, sem recorte territorial. | Falta de recorte local e prova de residência. | Desenho urbano, incentivos ESG locais, regras customizáveis por nível. |

## 4. Proposta de Valor Detalhada

### 4.1 ResidentScore e níveis
- Bronze (40–59): acesso a comunicações e pré-ofertas.  
- Prata (60–79): descontos médios (10%) e convites para eventos locais.  
- Ouro (≥80): benefícios premium (20%–30%), filas expressas, estacionamento exclusivo.  
- Visitante (<40): acesso ao preço cheio e possibilidade de migrar mediante prova adicional.

### 4.2 Benefícios ESG
- **Ambiental:** campanhas incentivando transporte compartilhado; cálculo de CO₂ evitado quando moradores usam transporte público parceiro.  
- **Social:** parte da receita destinada a fundos comunitários; destaque para negócios liderados por mulheres e comunidades tradicionais.  
- **Governança:** LGPD by design, auditoria para prefeituras, relatórios trimestrais públicos.

## 5. Produto & Tecnologia

### 5.1 Arquitetura técnica
- **Frontend moradores (PWA/React + Capacitor):** app Resi com tema verde inspirado na Costa Esmeralda; onboarding guiado, carteira digital de benefícios e mapa de parceiros.  
- **Frontend parceiros (React web responsivo):** leitor de QR, gestão de ofertas e dashboard de métricas.  
- **Backend (FastAPI + PostgreSQL):** microserviço REST com módulos de autenticação, ResidentScore, regras de desconto, antifraude.  
- **Fila/worker (RQ/Celery):** processamento assíncrono de OCR e análise comportamental.  
- **Armazenamento seguro:** S3 compatível (Backblaze/Wasabi) com criptografia AES256, TTL 30 dias para documentos.  
- **Observabilidade:** Prometheus + Grafana, logs estruturados (OpenTelemetry).  
- **Segurança:** JWT para QR, MFA opcional, segregação de funções para operadores, pentest semestral.

### 5.2 Roadmap de produto
- **Fase 1 (MVP – 10 semanas)**: verificação por comprovante, ResidentScore básico, QR dinâmico, dashboard parceiros v1, painel prefeitura com relatórios básicos.  
- **Fase 2 (6 meses)**: georresidência leve, recomendação personalizada, integração com pagamento (Pix/arranjo aberto).  
- **Fase 3 (12 meses)**: convênios municipais, passes digitais para transporte/estacionamento, API aberta para integrações POS.

### 5.3 Protótipo UI/UX (descrição textual)
1. **Tela inicial:** Fundo verde-azulado (#0F6458) com ondas inspiradas na costa. CTA "Sou morador" e "Sou parceiro".  
2. **Onboarding morador:** carrossel ilustrado explicando benefícios; fluxo de upload com card claro destacando status do ResidentScore em tempo real (barra progressiva).  
3. **Carteira de benefícios:** cards horizontais com selo verde para parceiros sustentáveis; botão "Gerar QR" em destaque.  
4. **Mapa verde esmeralda:** marcadores com ícone de concha para atrações, ícone de folha para negócios ESG.  
5. **Painel parceiro:** gráfico de barras com resgates por dia, lista de ofertas ativas, botão grande para "Escanear QR" com modo câmera.  
6. **Painel prefeitura:** mapa de calor de bairros, tabela com ResidentScore médio, filtro por período.

## 6. Estratégia de Go-to-Market

### 6.1 Lançamento piloto (Costa Esmeralda, SC)
1. **Parcerias âncora:** beach clubs (ex.: Bali Hai), restaurantes (ex.: Zephyr), transporte náutico e cooperativas de táxi.  
2. **Campanha 360º:** mídia OOH leve (totens na orla), marketing de influência com moradores, eventos "Resi Day" em praças.  
3. **Incentivos iniciais:** 3 meses gratuitos para os 20 primeiros parceiros; cashback de R$ 20 em créditos para os 5 primeiros resgates por morador.

### 6.2 Estratégia de aquisição
- **Moradores:** campanhas de SMS/WhatsApp via prefeitura, anúncios segmentados por CEP, gamificação (ranking de bairros).  
- **Parceiros:** equipe de field sales com CRM (Pipedrive), proposta de ROI com dados históricos; webinars sobre LGPD.  
- **Prefeitura:** proposta de valor público com redução de fraude, relatórios trimestrais, indicadores ESG.

### 6.3 Retenção
- Push segmentado por nível, desafios mensais ("Morador Ouro que visitar 3 parceiros ganha ingresso"), newsletter ESG.  
- Programa de advocacy: moradores podem enviar convite para comerciantes e ganham pontos extras quando o parceiro se cadastra.

## 7. Operação & Equipe

| Função | Quantidade | Responsabilidades |
|--------|------------|-------------------|
| CEO/Head de Produto | 1 | Estratégia, relacionamento com prefeitura, fundraising. |
| CTO | 1 | Arquitetura, segurança, entrega técnica. |
| Engenheiro Backend | 2 | APIs, integrações, antifraude. |
| Engenheiro Frontend/App | 2 | PWA, app do parceiro, UI/UX. |
| Cientista de Dados | 1 | ResidentScore avançado, modelagem antifraude. |
| Designer UX | 1 | Pesquisa com moradores, protótipos. |
| Sales/CS | 2 | Aquisição e suporte a parceiros. |
| Operações LGPD/DPO | 1 | Compliance e privacidade. |

## 8. Plano Financeiro (3 anos)

### 8.1 Premissas
- MVP lançado em 10 semanas com equipe enxuta.  
- Início com 1 cidade piloto (20 parceiros), expansão para 3 cidades no ano 2 e 7 cidades no ano 3.  
- Ticket médio por transação: R$ 120; desconto médio oferecido: 15%.  
- Conversão morador ativo/parceiro: 600 moradores ativos por parceiro no ano 1, crescendo 35% a.a.  
- Mensalidade SaaS por ponto de venda: R$ 199; take rate 1,5% quando pagamento integrado (a partir do ano 2).

### 8.2 Receita projetada (R$ mil)

| Ano | Parceiros ativos | Receita SaaS | Receita take rate | Receita mídia | Receita total |
|-----|------------------|--------------|-------------------|---------------|---------------|
| 1 | 60 PDVs (20 parceiros x 3 PDVs) | 143 | 0 | 30 | **173** |
| 2 | 240 PDVs | 572 | 162 | 96 | **830** |
| 3 | 560 PDVs | 1.337 | 672 | 210 | **2.219** |

### 8.3 Custos projetados (R$ mil)

| Categoria | Ano 1 | Ano 2 | Ano 3 |
|-----------|-------|-------|-------|
| Equipe (8–10 FTEs) | 960 | 1.440 | 1.920 |
| Infraestrutura & licenças | 120 | 180 | 240 |
| Marketing & vendas | 240 | 420 | 630 |
| Suporte jurídico/LGPD | 90 | 120 | 150 |
| Total custos operacionais | **1.410** | **2.160** | **2.940** |

### 8.4 Indicadores financeiros
- **CAC médio parceiro (ano 1):** R$ 3.000 (field sales + onboarding).  
- **Payback parceiro:** ~10 meses (mensalidade + upsell de mídia).  
- **LTV parceiro:** R$ 10.740 (36 meses, churn 2,5%/mês).  
- **Break-even:** Início do ano 4 com expansão geográfica + monetização municipal.  
- **Capex inicial:** R$ 450 mil (desenvolvimento + marketing piloto). Recomendado levantar seed de R$ 2,5 mi para 18 meses de runway.

## 9. Estratégia de Investimento (Pitch Deck — 1 slide)

> **Título:** "Resi — Economia local, benefício real"  
> **Problema:** Moradores pagam preço de turista; comércios não reconhecem o público local; municípios perdem controle sobre benefícios.  
> **Solução:** App com ResidentScore (0–100), QR antifraude e dashboards para parceiros e prefeitura.  
> **Mercado:** R$ 18 bi SAM em destinos turísticos brasileiros; Costa Esmeralda como beachhead.  
> **Tração esperada:** 20 parceiros âncora, 12k moradores verificados em 6 meses, NPS > 60.  
> **Modelo:** SaaS R$ 199/PDV + 1,5% take rate + licenças municipais.  
> **Diferenciais:** Verificação multicamada, ESG integrado, insights de dados.  
> **Equipe:** Fundadores com experiência em govtech e SaaS.  
> **Uso do investimento:** Produto (40%), go-to-market (35%), compliance/ops (15%), reservas (10%).

## 10. Plano de Lançamento Detalhado (90 dias)

| Semana | Marco | Descrição |
|--------|-------|-----------|
| 1-2 | Pesquisa em campo | Entrevistas com moradores, pré-cadastro de parceiros, alinhamento prefeitura. |
| 3-6 | Desenvolvimento MVP | Frontend PWA + app parceiro, backend FastAPI, OCR integrado (Google Vision ou Mindee). |
| 7 | Beta fechado | 50 moradores e 5 parceiros convidados; teste de fluxo e UX. |
| 8 | Ajustes LGPD e antifraude | Revisão jurídica, criação do botão de exclusão de dados. |
| 9 | Campanha de pré-lançamento | Conteúdo orgânico + anúncios locais, contratação de promotores. |
| 10 | Lançamento oficial | Evento Resi Day, cobertura de imprensa local, ativação nas praias. |
| 11-12 | Otimização | Monitoramento de métricas, ajustes no ResidentScore, negociação para expansão municipal. |

## 11. Indicadores-chave & OKRs
- **Produto:** (O) Alcance NPS ≥ 60 no piloto; (KR1) 75% dos moradores concluem verificação em <5 minutos; (KR2) SLA <2s para geração de QR.  
- **Crescimento:** (O) 12k moradores ativos em 6 meses; (KR1) 40% MAU/DAU; (KR2) 3 parceiros ESG certificados por bairro.  
- **Sustentabilidade:** (O) Reduzir emissões em transporte turístico; (KR1) 20% de resgates em transporte coletivo/compartilhado; (KR2) 1 tonelada CO₂ evitada reportada no ano 1.  
- **Compliance:** (O) Zero incidentes de dados críticos; (KR1) 100% solicitações LGPD respondidas em 72h; (KR2) Auditoria externa aprovada.

## 12. Riscos & Mitigações
- **Adoção baixa pelos moradores:** realizar onboarding assistido com agentes locais, gamificação.  
- **Resistência de parceiros a descontos:** mostrar ROI com dados e permitir regras flexíveis (horários/dias específicos).  
- **Preocupações com privacidade:** comunicação transparente, uso opcional de georresidência, certificação ISO 27701.  
- **Dependência de prefeituras:** manter produto B2B independente, oferecer relatórios white-label para associações.  
- **Escalabilidade técnica:** arquitetura modular, uso de infraestrutura na nuvem, testes de carga periódicos.

## 13. Próximos Passos Imediatos
1. Validar protótipo de UI com 10 moradores e 5 parceiros.  
2. Fechar contrato piloto com associação comercial local.  
3. Contratar time core (CTO + Eng. backend + Designer).  
4. Iniciar desenvolvimento seguindo repositório presente (frontend + backend + infraestrutura).  
5. Preparar campanha "Morador Verde" destacando parceiros sustentáveis na Costa Esmeralda.

---

**Resi — Benefícios reais para quem constrói a cidade todos os dias.**
