/* ============================================================
   0. METHOD CONTENT
   Every string the method section renders. Language: pt-PT.

   Card `lines` are methodology statements, not results — no
   invented figures. Numbers that read as real output must be real.
   ============================================================ */

/* --- 1. Section --- */

export const METHOD = {
  eyebrow: 'Método',
  headline: ['Um método, muitos', 'problemas por resolver.'],
  body:
    'Usamos o método científico: testamos empiricamente para tirar conclusões ' +
    'concretas sobre o impacto de medidas, arquiteturas, hierarquias, etc. Para ' +
    'isso desenvolvemos o Simulador, uma ferramenta que replica qualquer ambiente ' +
    'com grande flexibilidade. Cada projeto junta essa investigação a um relatório ' +
    'completo das soluções mais discutidas.',
  /* Two cards, not three — the reference stages exactly two, and a third
     diluted the "one engine, staggered" composition. The investigation
     angle stays in `body` above rather than getting its own card. */
  cards: [
    {
      id: 'simulacao',
      icon: 'network',
      /* Only this card is stamped: it names the tool itself. Stamping both
         would read as two products instead of one engine on two problems. */
      stamp: 'Simulador',
      title: 'Simulação da realidade',
      subtitle: 'Código todo open-source',
      lines: [
        'Ferramenta flexível para diferentes tipos de problemas',
        'Acompanhamento de ferramentas de análise',
        'Permite testar o possível impacto de uma solução',
        'Validado com dados reais',
      ],
    },
    {
      id: 'gargalo',
      icon: 'flow',
      title: 'Baseado na realidade',
      subtitle: 'Utilizando dados reais para prever impacto',
      lines: [
        'Análise investigacional do problema',
        'Transparência sobre a natureza da questão',
        'Trabalho completo e detalhado',
        'Relatório disponível para download',
      ],
    },
  ],
  /* The stamp on the first card is the link to the tool it names, so the
     label here is what a screen reader gets, not visible copy. */
  repo: {
    label: 'Ver o simulador no GitHub',
    href: 'https://github.com/Agora-Sim/Simulator',
  },
};
