import { RegularAccordion } from "./components/RegularAccordion";
import { Accordion } from "./components/CompoundAccordion";
import "./App.css";

function App() {
    // ============================================
    // DEN VANLIGE MÅTEN - Data-drevet tilnærming
    // ============================================
    const regularAccordionItems = [
        {
            id: "1",
            title: "Hva er React?",
            content:
                "React er et JavaScript-bibliotek for å bygge brukergrensesnitt. Det lar deg sette sammen komplekse UI-er fra små, isolerte kodebiter kalt komponenter.",
            icon: "⚛️",
        },
        {
            id: "2",
            title: "Hvorfor bruke TypeScript?",
            content:
                "TypeScript legger til statisk typing i JavaScript, som hjelper med å fange feil tidlig og forbedrer kodekvalitet og vedlikeholdbarhet.",
            icon: "📘",
            badge: "Populær",
        },
        {
            id: "3",
            title: "Hva med Vite?",
            content:
                "Vite er et moderne byggeverktøy som gir en raskere og slankere utviklingsopplevelse for moderne webprosjekter.",
            icon: "⚡",
            hasButton: true,
            buttonText: "Les mer",
            onButtonClick: () => alert("Knapp klikket!"),
        },
    ];

    return (
        <div className="app">
            <header className="header">
                <h1>React Compound Components</h1>
                <p className="subtitle">Frontend Forum Demo av Henrik</p>
            </header>

            <main className="main">
                {/* TILNÆRMING 1: DEN VANLIGE MÅTEN */}
                <section className="demo-section">
                    <div className="section-header">
                        <span className="section-badge bad">❌ Problemet</span>
                        <h2>Vanlig Props-basert tilnærming</h2>
                        <p className="section-description">
                            Alt sendes gjennom props. Virker enkelt i starten, men blir fort
                            begrensende...
                        </p>
                    </div>

                    <div className="demo-container">
                        <div className="code-preview">
                            <div className="code-label">Bruk</div>
                            <pre className="code-block">
                                <code>{`<RegularAccordion
  items={[
    {
      id: "1",
      title: "Hva er React?",
      content: "React er...",
      icon: "⚛️",
      badge: "Populær",
      hasButton: true,
      buttonText: "Les mer",
      onButtonClick: () => {...}
      // 😰 Trenger flere props?
      // Legg dem til i interfacet...
    }
  ]}
/>`}</code>
                            </pre>
                        </div>

                        <div className="component-demo">
                            <div className="demo-label">Resultat</div>
                            <RegularAccordion items={regularAccordionItems} />
                        </div>
                    </div>

                    <div className="problems-list">
                        <h3>⚠️ Problemer med denne tilnærmingen:</h3>
                        <ul>
                            <li>
                                <strong>Prop-eksplosjon</strong> – Hver ny funksjon krever nye props
                            </li>
                            <li>
                                <strong>Begrenset fleksibilitet</strong> – Vanskelig å tilpasse
                                individuelle elementer
                            </li>
                            <li>
                                <strong>Tett kobling</strong> – Forelder må kjenne alle detaljer
                            </li>
                            <li>
                                <strong>Dårlig komposisjon</strong> – Vanskelig å utvide eller nøste
                                komponenter
                            </li>
                        </ul>
                    </div>
                </section>

                {/* TILNÆRMING 2: COMPOUND COMPONENT MØNSTER */}
                <section className="demo-section">
                    <div className="section-header">
                        <span className="section-badge good">✨ Løsningen</span>
                        <h2>Compound Component Mønster</h2>
                        <p className="section-description">
                            Komponenter som jobber sammen for å danne et komplett UI. Du
                            kontrollerer strukturen, biblioteket gir oppførselen.
                        </p>
                    </div>

                    <div className="demo-container">
                        <div className="code-preview">
                            <div className="code-label">Bruk</div>
                            <pre className="code-block">
                                <code>{`<Accordion allowMultiple>
  <Accordion.Item id="1">
    <Accordion.Trigger>
      <span>⚛️</span>
      <span>Hva er React?</span>
      {/* Legg hva som helst her! */}
    </Accordion.Trigger>
    <Accordion.Content>
      {/* Full kontroll over innholdet! */}
      <p>React er et bibliotek...</p>
      <CustomComponent />
      <button>Hvilken som helst knapp!</button>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}</code>
                            </pre>
                        </div>

                        <div className="component-demo">
                            <div className="demo-label">Resultat</div>
                            <Accordion allowMultiple defaultOpen={["1"]}>
                                <Accordion.Item id="1">
                                    <Accordion.Trigger>
                                        <span className="trigger-icon">⚛️</span>
                                        <span>Hva er React?</span>
                                        <span className="trigger-badge">Ny</span>
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        <p className="content-text">
                                            React er et JavaScript-bibliotek for å bygge
                                            brukergrensesnitt. Det lar deg sette sammen komplekse
                                            UI-er fra små, isolerte kodebiter kalt komponenter.
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item id="2">
                                    <Accordion.Trigger>
                                        <span className="trigger-icon">📘</span>
                                        <span>Hvorfor bruke TypeScript?</span>
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        <p className="content-text">
                                            TypeScript legger til statisk typing i JavaScript, som
                                            hjelper med å fange feil tidlig.
                                        </p>
                                        {/* Se! Vi kan legge til hvilken som helst komponent her */}
                                        <div className="custom-content">
                                            <span className="custom-tag">Anbefalt</span>
                                            <span className="custom-tag">Typesikkerhet</span>
                                            <span className="custom-tag">Bedre DX</span>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item id="3">
                                    <Accordion.Trigger>
                                        <span className="trigger-icon">⚡</span>
                                        <span>Hva med Vite?</span>
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        <p className="content-text">
                                            Vite er et moderne byggeverktøy som gir en raskere
                                            utviklingsopplevelse.
                                        </p>
                                        {/* Hvilken som helst tilpasset layout vi vil! */}
                                        <div className="feature-grid">
                                            <div className="feature-card">
                                                <span className="feature-icon">🚀</span>
                                                <span>Rask HMR</span>
                                            </div>
                                            <div className="feature-card">
                                                <span className="feature-icon">📦</span>
                                                <span>Optimalisert bygg</span>
                                            </div>
                                            <div className="feature-card">
                                                <span className="feature-icon">🔌</span>
                                                <span>Plugin-system</span>
                                            </div>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>

                    <div className="benefits-list">
                        <h3>✅ Fordeler med dette mønsteret:</h3>
                        <ul>
                            <li>
                                <strong>Fleksibel komposisjon</strong> – Legg hva som helst i
                                trigger eller innhold
                            </li>
                            <li>
                                <strong>Rent API</strong> – Ingen prop-eksplosjon, enkelt ansvar
                            </li>
                            <li>
                                <strong>Implisitt tilstandsdeling</strong> – Context håndterer
                                tilstand bak kulissene
                            </li>
                            <li>
                                <strong>Inversjon av kontroll</strong> – Du kontrollerer markup,
                                biblioteket gir oppførsel
                            </li>
                        </ul>
                    </div>
                </section>

                {/* DYBDEFORKLARING */}
                <section className="deep-dive">
                    <h2>🔍 Hvorfor er dette bedre? En dypere forklaring</h2>

                    <div className="deep-dive-grid">
                        <div className="deep-dive-card">
                            <div className="deep-dive-icon">🧩</div>
                            <h3>Fleksibel Komposisjon</h3>
                            <p>
                                Med den vanlige tilnærmingen er du låst til det komponenten støtter.
                                Vil du ha et bilde i headeren? En tooltip? Et skjema i innholdet? Du
                                må endre selve komponenten eller legge til flere props.
                            </p>
                            <p>
                                Med compound components bestemmer <strong>du</strong> hva som
                                rendres. Komponenten gir deg bare "rammeverket" – åpne/lukke-logikk,
                                animasjoner, tilgjengelighet – mens du har full frihet over
                                innholdet.
                            </p>
                            <div className="deep-dive-example">
                                <span className="example-label">Eksempel:</span>
                                <code>{`<Accordion.Content>
  <MyCustomForm />
  <VideoPlayer />
  <HvaSomHelstHer />
</Accordion.Content>`}</code>
                            </div>
                        </div>

                        <div className="deep-dive-card">
                            <div className="deep-dive-icon">📦</div>
                            <h3>Ingen Prop-eksplosjon</h3>
                            <p>
                                Den vanlige tilnærmingen lider av "props-spredning". Hver gang du
                                trenger noe nytt, må du legge til nye props. Over tid blir
                                interfacet uhåndterlig stort med mange valgfrie felter.
                            </p>
                            <p>
                                Compound components unngår dette helt. I stedet for å konfigurere
                                alt gjennom props, <strong>komponerer</strong> du UI-en direkte.
                                Dette gjør koden mer lesbar og lettere å forstå.
                            </p>
                            <div className="deep-dive-comparison">
                                <div className="comparison-bad">
                                    <span>❌ Props-basert</span>
                                    <code>
                                        icon, badge, hasButton, buttonText, buttonIcon,
                                        buttonVariant...
                                    </code>
                                </div>
                                <div className="comparison-good">
                                    <span>✅ Compound</span>
                                    <code>Bare legg til det du trenger som barn!</code>
                                </div>
                            </div>
                        </div>

                        <div className="deep-dive-card">
                            <div className="deep-dive-icon">🔄</div>
                            <h3>Implisitt Tilstandsdeling</h3>
                            <p>
                                Context API lar komponentene dele tilstand uten prop drilling.
                                Rot-komponenten håndterer all logikk (hvilke elementer er åpne), og
                                under-komponentene "bare vet" hva de trenger.
                            </p>
                            <p>
                                Dette betyr at <code>Accordion.Trigger</code> automatisk vet hvilket
                                element den tilhører og kan toggle det – uten at du trenger å koble
                                det opp manuelt.
                            </p>
                            <div className="deep-dive-flow">
                                <span className="flow-item">Accordion</span>
                                <span className="flow-arrow">→ Context →</span>
                                <span className="flow-item">Item</span>
                                <span className="flow-arrow">→ Context →</span>
                                <span className="flow-item">Trigger/Content</span>
                            </div>
                        </div>

                        <div className="deep-dive-card">
                            <div className="deep-dive-icon">🎮</div>
                            <h3>Inversjon av Kontroll (IoC)</h3>
                            <p>
                                I den vanlige tilnærmingen kontrollerer komponenten alt – den
                                bestemmer hvordan ting rendres. Du som bruker har lite kontroll.
                            </p>
                            <p>
                                Med compound components er det <strong>omvendt</strong>. Du har
                                kontrollen over struktur og utseende, mens komponenten bare gir deg
                                oppførselen. Dette er samme prinsipp som HTMLs native elementer som{" "}
                                <code>&lt;select&gt;</code> og <code>&lt;option&gt;</code>.
                            </p>
                            <div className="deep-dive-example">
                                <span className="example-label">
                                    Native HTML bruker samme mønster:
                                </span>
                                <code>{`<select>
  <option>Valg 1</option>
  <option>Valg 2</option>
</select>`}</code>
                            </div>
                        </div>
                    </div>

                    <div className="deep-dive-summary">
                        <h3>💡 Oppsummert</h3>
                        <p>
                            Compound Component Pattern handler om å gi utviklere{" "}
                            <strong>fleksibilitet uten kompleksitet</strong>. I stedet for å forutse
                            alle mulige bruksscenarier og lage props for dem, gir du brukerne
                            byggesteinene de trenger for å lage akkurat det de vil – mens du
                            håndterer den kompliserte logikken bak kulissene.
                        </p>
                    </div>
                </section>

                {/* MØNSTEROVERSIKT */}
                <section className="pattern-overview">
                    <h2>Mønsteret i et nøtteskall</h2>
                    <div className="pattern-cards">
                        <div className="pattern-card">
                            <div className="pattern-number">1</div>
                            <h3>Opprett Context</h3>
                            <p>Del tilstand mellom forelder og barn uten prop drilling</p>
                            <code>const AccordionContext = createContext()</code>
                        </div>
                        <div className="pattern-card">
                            <div className="pattern-number">2</div>
                            <h3>Rot-komponent</h3>
                            <p>Håndterer tilstand og gir context til alle barn</p>
                            <code>&lt;AccordionContext.Provider value=&#123;...&#125;&gt;</code>
                        </div>
                        <div className="pattern-card">
                            <div className="pattern-number">3</div>
                            <h3>Under-komponenter</h3>
                            <p>
                                Bruker context via custom hooks for å få tilgang til delt tilstand
                            </p>
                            <code>const &#123; isOpen &#125; = useAccordionContext()</code>
                        </div>
                        <div className="pattern-card">
                            <div className="pattern-number">4</div>
                            <h3>Sett sammen</h3>
                            <p>Fest under-komponenter til rot for rent punktum-notasjon API</p>
                            <code>Accordion.Item, Accordion.Trigger</code>
                        </div>
                    </div>
                </section>

                {/* EKSEMPLER FRA VIRKELIGHETEN */}
                <section className="real-world">
                    <h2>Brukes av populære biblioteker som:</h2>
                    <div className="library-examples">
                        <div className="library-card">
                            <span className="library-name">Radix UI</span>
                            <code>Dialog.Root, Dialog.Trigger, Dialog.Content</code>
                        </div>
                        <div className="library-card">
                            <span className="library-name">Headless UI</span>
                            <code>Menu, Menu.Button, Menu.Items, Menu.Item</code>
                        </div>
                        <div className="library-card">
                            <span className="library-name">Shadcn UI</span>
                            <code>Tabs, TabList, Tab, TabPanels, TabPanel</code>
                        </div>
                        <div className="library-card">
                            <span className="library-name">Chakra UI</span>
                            <code>Accordion, AccordionItem, AccordionButton</code>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>Frontend Forum Demo • React Compound Components • Henrik Svendsgård 🧙</p>
            </footer>
        </div>
    );
}

export default App;
