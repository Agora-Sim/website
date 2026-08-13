/* ============================================================
   0. METHOD CONTENT
   Every string the method section renders. Language: pt-PT.

   Card `lines` are methodology statements, not results — no
   invented figures. Numbers that read as real output must be real.
   ============================================================ */

/* --- 1. Section --- */

export const METHOD = {
  eyebrow: 'Método',
  headline: ['Uma ferramenta, muitos', 'problemas por resolver.'],
  body:
    'O simulador testa o impacto de uma política pública com o mesmo rigor com que ' +
    'testaria um gargalo numa autarquia, ou qualquer outro problema de gestão pública. ' +
    'Onde os dados não existem, uma investigação vai buscá-los — para que a ' +
    'transparência não dependa de quem já os tem.',
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
      title: 'Impacto de uma política',
      subtitle: 'Simulação sobre dados abertos',
      lines: [
        'Testa o cenário antes da decisão',
        'Milhares de agentes sintéticos',
        'Isola a variável em análise',
        'Sem dados pessoais',
      ],
    },
    {
      id: 'gargalo',
      icon: 'flow',
      title: 'Gargalo organizacional',
      subtitle: 'Réplica de um processo público',
      lines: [
        'Mapeia cada etapa do processo',
        'Identifica onde o processo trava',
        'Compara alternativas de desenho',
        'Modelo aberto e auditável',
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
