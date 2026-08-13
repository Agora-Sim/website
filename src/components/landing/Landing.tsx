import { HeroDiagram } from "./HeroDiagram";
import { LanguageToggle } from "./LanguageToggle";

const GITHUB_URL = "https://github.com/Agora-Sim";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="label-eyebrow">{children}</span>;
}

function PrimaryLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
    >
      {children}
    </a>
  );
}

function SecondaryLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
    >
      {children}
    </a>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-border ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">{children}</div>
    </section>
  );
}

function Card({
  index,
  title,
  children,
  tag,
}: {
  index?: string;
  title: string;
  children: React.ReactNode;
  tag?: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-card p-6">
      {(index || tag) && (
        <div className="mb-4 flex items-center justify-between">
          {index && <span className="font-mono text-xs text-muted-foreground">{index}</span>}
          {tag && (
            <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {tag}
            </span>
          )}
        </div>
      )}
      <h3 className="text-xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Portugal stripe */}
      <div className="pt-stripe h-[3px] w-full" aria-hidden />
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-sm border border-border bg-card"
            >
              <span className="flex h-2.5 w-2.5 overflow-hidden rounded-full">
                <span className="block h-full w-[38%]" style={{ background: "var(--sage)" }} />
                <span className="block h-full w-[62%]" style={{ background: "var(--ember)" }} />
              </span>
            </span>
            <span className="text-lg font-semibold tracking-tight leading-none">AgoraSim</span>
            <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
              v0 · early
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#problem" className="hover:text-foreground">Problem</a>
            <a href="#how" className="hover:text-foreground">Approach</a>
            <a href="#cases" className="hover:text-foreground">Case studies</a>
            <a href="#open" className="hover:text-foreground">Open source</a>
            <a href="#status" className="hover:text-foreground">Status</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium hover:bg-secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Eyebrow>Open-source · Public-policy simulation · PT</Eyebrow>
              <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                Simulating better public systems for Portugal.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                AgoraSim is an open-source platform for modelling public-policy
                problems, testing alternatives, and turning simulations into
                evidence-based proposals.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryLink href={GITHUB_URL} external>
                  View on GitHub
                  <span aria-hidden>↗</span>
                </PrimaryLink>
                <SecondaryLink href="#how">Explore the vision</SecondaryLink>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Stage
                  </dt>
                  <dd className="mt-1 text-foreground">Early research</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Focus
                  </dt>
                  <dd className="mt-1 text-foreground">Portugal</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Code
                  </dt>
                  <dd className="mt-1 text-foreground">Open · Python</dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <div className="rounded-md border border-border bg-card p-3 shadow-[0_1px_0_var(--rule)]">
                <div className="flex items-center justify-between border-b border-border px-2 py-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    simulation · graph view
                  </span>
                  <span className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--ember)" }}
                    />
                  </span>
                </div>
                <HeroDiagram className="h-auto w-full" />
              </div>
              <p className="mt-3 px-1 font-mono text-[11px] text-muted-foreground">
                fig. 01 — agents, levers, constraints, outcomes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section id="problem">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>01 — The problem</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Public decisions are complex. Testing them in the real world is expensive.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Hospitals, transport networks, public services, and urban systems
              involve many interacting agents, constraints, delays, costs, and
              trade-offs. AgoraSim aims to provide a space where different
              scenarios can be explored before decisions are made.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card index="a." title="Complex systems">
                Many actors, feedback loops, and constraints make outcomes hard to
                predict from intuition alone.
              </Card>
              <Card index="b." title="Policy trade-offs">
                Every alternative has costs and side effects. Making them explicit
                is part of the analysis.
              </Card>
              <Card index="c." title="Evidence first">
                Simulation lets us pressure-test ideas before they affect real
                lives and budgets.
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* How */}
      <Section id="how">
        <Eyebrow>02 — Approach</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-3xl sm:text-4xl">
          From simulation to concrete alternatives.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Model the system",
              d: "Represent the structure, actors, constraints, and flows of a real public system.",
            },
            {
              n: "02",
              t: "Simulate scenarios",
              d: "Test alternative policies, structures, and operational decisions.",
            },
            {
              n: "03",
              t: "Generate reports",
              d: "Translate results into clear, evidence-based proposals for Portugal.",
            },
          ].map((s) => (
            <div key={s.n} className="bg-card p-8">
              <div className="font-mono text-xs text-muted-foreground">step {s.n}</div>
              <h3 className="mt-3 text-xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cases */}
      <Section id="cases">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>03 — Early directions</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Initial case studies.</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card tag="Exploratory case study" title="Public Hospital Management">
            Model hospital structure, workflows, capacity, hierarchy, and operational
            constraints. Validate the simulation against known metrics, then test
            different policies to improve performance.
          </Card>
          <Card tag="Exploratory case study" title="Lisbon Metro Communication">
            Explore clearer ways to represent Lisbon&apos;s metro structure as the
            network changes, combining design, usability, and transport-system
            thinking.
          </Card>
        </div>
      </Section>

      {/* Open source */}
      <Section id="open" className="azulejo-bg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>04 — Open source</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Built in the open.</h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              AgoraSim is open-source because public-interest modelling should be
              inspectable, reproducible, and collaborative. The goal is not only
              to build simulations, but to create frameworks others can critique,
              improve, and reuse.
            </p>
            <div className="mt-7">
              <PrimaryLink href={GITHUB_URL} external>
                Open GitHub
                <span aria-hidden>↗</span>
              </PrimaryLink>
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group block rounded-md border border-border bg-card p-6 transition hover:bg-secondary"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 place-items-center rounded-sm border border-border font-mono text-xs"
                  aria-hidden
                >
                  A
                </span>
                <div>
                  <div className="font-mono text-sm">Agora-Sim</div>
                  <div className="text-xs text-muted-foreground">github.com/Agora-Sim</div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">
                ↗
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Organisation
                </dt>
                <dd className="mt-1">Agora-Sim</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Focus repo
                </dt>
                <dd className="mt-1">Simulator</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Language
                </dt>
                <dd className="mt-1">Python</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Spirit
                </dt>
                <dd className="mt-1">Open-source</dd>
              </div>
            </dl>
          </a>
        </div>
      </Section>

      {/* Audience */}
      <Section id="audience">
        <Eyebrow>05 — Audience</Eyebrow>
        <h2 className="mt-4 text-3xl sm:text-4xl">Who this is for.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Engineers & researchers", d: "Build, extend, and critique the simulation models." },
            { t: "Public-policy students", d: "Use the platform as a sandbox for applied analysis." },
            { t: "Civic technologists", d: "Contribute tooling, datasets, and visualisations." },
            { t: "Decision-makers", d: "Read transparent analyses grounded in explicit assumptions." },
          ].map((a) => (
            <div key={a.t} className="rounded-md border border-border bg-card p-5">
              <h3 className="text-base">{a.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Status / roadmap */}
      <Section id="status">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>06 — Status</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Early-stage project.</h2>
            <p className="mt-5 text-muted-foreground">
              AgoraSim is currently in its early development phase. The first
              objective is to build robust simulation foundations, document
              assumptions clearly, and develop small but meaningful case studies.
            </p>
          </div>
          <ol className="relative space-y-5 border-l border-border pl-6">
            {[
              { s: "now", t: "Define modelling framework" },
              { s: "next", t: "Build first simulation tools" },
              { s: "next", t: "Validate with known metrics" },
              { s: "later", t: "Compare alternative policies" },
              { s: "later", t: "Publish clear reports" },
            ].map((r, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-background"
                  style={i === 0 ? { background: "var(--ember)", borderColor: "var(--ember)" } : undefined}
                  aria-hidden
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {r.s}
                  </span>
                  <span className="text-base text-foreground">{r.t}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Final CTA */}
      <Section id="contribute" className="bg-secondary/50">
        <div className="rounded-md border border-border bg-card p-10 sm:p-14">
          <Eyebrow>Contribute</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl sm:text-4xl">
            Help build simulation tools for better public decisions.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryLink href={GITHUB_URL} external>
              View on GitHub
              <span aria-hidden>↗</span>
            </PrimaryLink>
            <SecondaryLink href={GITHUB_URL} external>
              Follow the project
            </SecondaryLink>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-sm border border-border bg-card"
              >
                <span className="flex h-2.5 w-2.5 overflow-hidden rounded-full">
                  <span className="block h-full w-[38%]" style={{ background: "var(--sage)" }} />
                  <span className="block h-full w-[62%]" style={{ background: "var(--ember)" }} />
                </span>
              </span>
              <span className="text-lg font-semibold tracking-tight">AgoraSim</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Open-source simulation for public-policy challenges in Portugal.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Project
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener" className="hover:underline">
                  GitHub
                </a>
              </li>
              <li><a href="#how" className="hover:underline">Vision</a></li>
              <li><a href="#cases" className="hover:underline">Case studies</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Colophon
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Built in the open. Names, scope, and code may evolve as the project matures.
            </p>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-6 py-5 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} AgoraSim — open-source initiative</span>
            <span>Lisboa · Portugal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
