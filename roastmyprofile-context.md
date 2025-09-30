# Contexto do Projeto: RoastMyProfile - AI Dating Profile Roaster

## Visão Geral
Estamos desenvolvendo um MVP (Minimum Viable Product) de um site viral focado em monetização rápida. O produto é uma plataforma web chamada **RoastMyProfile** que usa IA para analisar perfis de aplicativos de namoro (Tinder, Bumble, Hinge) de forma brutalmente honesta e engraçada.

## Conceito do Produto
Os usuários fazem upload de:
1. Sua foto principal do perfil de dating
2. Sua bio/descrição

Em troca de **R$ 9,90** (aproximadamente $2 USD), recebem:
- **Análise por IA (GPT-4 Vision)** da qualidade da foto
- **Roast engraçado mas construtivo** do perfil completo
- **Score de atratividade** (0-100)
- **Plano de ação detalhado** com melhorias prioritárias
- **Sugestões específicas** de como reescrever a bio
- **Templates otimizados** para copiar

## Por Que Esta Ideia?
Escolhemos "AI Roast My Dating Profile" por:

### Vantagens de Mercado:
- **Dor emocional real**: Pessoas frustradas com falta de matches estão dispostas a pagar
- **Mercado enorme**: Milhões usam apps de namoro diariamente
- **Viralidade orgânica**: Conteúdo é naturalmente compartilhável (TikTok, Instagram Stories)
- **Baixa barreira de entrada**: Apenas $9,90 = impulso de compra alto
- **Margens altas**: Custo de IA ~$0,10 por análise = 85%+ de lucro

### Diferencial Competitivo:
- **Tom único**: Humor brutal mas construtivo (não só crítica)
- **Análise visual**: Usa GPT-4 Vision para avaliar fotos (não só texto)
- **Acionável**: Não só aponta problemas, dá soluções específicas
- **Shareability**: Resultados são feitos para serem compartilhados socialmente

## Stack Tecnológica Atual

### Frontend:
- **Next.js 14** (App Router)
- **React** com hooks
- **Tailwind CSS** para estilização
- **Lucide React** para ícones

### Planejado para Produção:
- **tRPC**: APIs type-safe entre frontend/backend
- **Prisma ORM**: Gerenciamento de banco de dados
- **PostgreSQL**: Database (via Supabase)
- **OpenAI API**: GPT-4 Vision para análise de imagens e texto
- **Stripe**: Processamento de pagamentos
- **Uploadthing**: Upload e armazenamento de imagens
- **Vercel**: Hospedagem e deployment

## Arquitetura do Fluxo

```
1. Landing Page (viral, moderna)
   ↓
2. Upload (foto + bio + nome)
   ↓
3. Payment (Stripe - R$ 9,90)
   ↓
4. Processing (OpenAI API analisa)
   ↓
5. Result Page (roast + score + action plan)
   ↓
6. Share (botões sociais para viralização)
```

## Modelo de Monetização

### Receita Primária:
- **R$ 9,90 por roast** (one-time payment)
- Custo: ~R$ 1,35 (IA + Stripe)
- **Lucro: R$ 8,55 por venda (86% margem)**

### Expansão Futura:
1. **Premium Tier** (R$ 24,90): Análise de 5 fotos + rewrite de bio
2. **Subscription** (R$ 14,90/mês): Roasts ilimitados + A/B testing de perfis
3. **B2B**: Pacotes para dating coaches
4. **Afiliados**: 20% comissão para influencers

## Projeção Financeira (3 meses)

**Cenário Conservador:**
- Mês 1: 50 vendas = R$ 495 (testando + ajustes)
- Mês 2: 300 vendas = R$ 2.970 (após viralização inicial)
- Mês 3: 800 vendas = R$ 7.920

**Cenário Otimista (se viralizar forte):**
- Mês 2-3: 2.000-5.000 vendas/mês = R$ 20k-50k

## Estratégia de Lançamento Viral

### Fase 1 - Desenvolvimento (Semana 1-2):
- ✅ MVP criado (landing + upload + resultado)
- ⏳ Integração OpenAI API
- ⏳ Stripe payment
- ⏳ Database setup

### Fase 2 - Soft Launch (Semana 3):
- Testes com 20-30 amigos
- Ajuste do prompt da IA
- Coleta de roasts reais para marketing

### Fase 3 - Viralização (Semana 4-8):
- **Reddit**: r/Tinder, r/Bumble, r/hingeapp, r/dating_advice
- **TikTok**: Vídeos mostrando roasts engraçados (formato antes/depois)
- **Twitter/X**: Thread com exemplos reais
- **ProductHunt**: Launch oficial
- **Instagram Ads**: Retargeting 18-35 anos interessados em dating

### Fase 4 - Escala (Mês 3+):
- Parcerias com dating coaches (afiliados)
- Conteúdo SEO (blog sobre "como melhorar perfil tinder")
- Expansion: "Roast My LinkedIn", "Roast My Instagram Bio"

## Funcionalidades do MVP Atual

### ✅ Implementado:
1. **Landing Page**: Hero section, social proof, exemplo de roast
2. **Upload Flow**: Foto + bio + nome
3. **Payment Screen**: Simulação de checkout
4. **Result Page**: Roast completo + score + action plan
5. **Responsive**: Mobile-friendly
6. **Design**: Moderno, gradientes, animações sutis

### ⏳ Próximos Passos Técnicos:
1. **Backend tRPC**: Endpoints para upload, payment, análise
2. **OpenAI Integration**: Prompt engineering para roasts consistentes
3. **Stripe**: Checkout real + webhooks
4. **Database**: Schema para users, roasts, payments
5. **Auth**: NextAuth para histórico de roasts
6. **Analytics**: Tracking de conversão

## Prompt da IA (Rascunho)

```
Você é um especialista em perfis de dating com humor ácido mas construtivo.

Analise esta foto e bio de perfil de dating e forneça:

1. ROAST DA FOTO (2-3 frases engraçadas mas honestas sobre:
   - Qualidade da iluminação
   - Expressão facial
   - Composição
   - Red flags visuais)

2. ROAST DA BIO (2-3 frases sobre:
   - Clichês usados
   - Falta de especificidade
   - Tom da escrita
   - O que está faltando)

3. SCORE (0-100) com justificativa breve

4. TOP 3 AÇÕES PRIORITÁRIAS (específicas e acionáveis)

Tom: 70% humor, 30% construtivo. Seja direto mas não cruel.
```

## Métricas de Sucesso

### KPIs Primários:
- **Conversion Rate**: Landing → Payment (objetivo: 15%)
- **Share Rate**: Usuários que compartilham resultado (objetivo: 30%)
- **Repeat Rate**: Usuários que voltam após melhorar perfil (objetivo: 10%)

### KPIs Secundários:
- Tempo médio na landing page
- Taxa de abandono no upload
- NPS (Net Promoter Score)
- Custo de Aquisição por Cliente (CAC)

## Riscos e Mitigações

### Risco 1: IA gera conteúdo ofensivo
**Mitigação**: Content moderation layer, review manual dos primeiros 100 roasts

### Risco 2: Baixo tráfego inicial
**Mitigação**: Budget pequeno para ads ($200-500), parcerias com micro-influencers

### Risco 3: Chargeback de pagamentos
**Mitigação**: Preview claro do que o usuário receberá, política de satisfação

### Risco 4: Custos de IA escalarem
**Mitigação**: Cache de análises similares, otimização de tokens, considerar fine-tuning



**Objetivos Imediatos**:
1. Setup do database schema
2. Criar endpoints tRPC
3. Integrar OpenAI API com prompt otimizado
4. Implementar Stripe checkout + webhooks
5. Testar com 10-20 usuários reais
6. Ajustar prompt da IA baseado em feedback
7. Launch público em 2 semanas

## Notas Importantes

- **Prioridade 1**: Qualidade do roast (prompt engineering)
- **Prioridade 2**: UX do pagamento (mínima fricção)
- **Prioridade 3**: Shareability (botões sociais, templates)
- Manter design simples e foco no core value
- Iterar rápido baseado em feedback real
- Não sobre-engenheirar no início

---

**Este documento serve como contexto completo para LLMs e desenvolvedores trabalharem no projeto. Inclui decisões de produto, stack técnico, estratégia de negócio e próximos passos.**