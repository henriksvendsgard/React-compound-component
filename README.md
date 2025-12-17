# React Compound Component Pattern Demo

En interaktiv demo som viser forskjellen mellom tradisjonell props-basert tilnærming og Compound Component-mønsteret i React.

**Frontend Forum Demo av Henrik Svendsgård** 🧙

## 🚀 Kom i gang

```bash
# Installer avhengigheter
npm install

# Start utviklingsserveren
npm run dev
```

Åpne [http://localhost:5173](http://localhost:5173) i nettleseren.

## 📖 Om prosjektet

Dette prosjektet demonstrerer **Compound Component Pattern** – et kraftig designmønster i React som gir fleksible og komponerbare komponenter.

### Hva er Compound Components?

Compound Components er et mønster hvor flere komponenter jobber sammen for å danne et komplett UI. I stedet for å sende all konfigurasjon gjennom props, lar du brukeren **komponere** UI-en ved å sette sammen underkomponenter.

## 🔍 De to tilnærmingene

### ❌ Den vanlige måten (Props-basert)

```tsx
<RegularAccordion
    items={[
        {
            id: "1",
            title: "Tittel",
            content: "Innhold",
            icon: "⚛️",
            badge: "Ny",
            hasButton: true,
            buttonText: "Klikk",
            onButtonClick: () => {},
            // 😰 Trenger flere props? Legg dem til i interfacet...
        },
    ]}
/>
```

**Problemer:**

-   💥 **Prop-eksplosjon** – Hver ny funksjon krever nye props
-   🔒 **Begrenset fleksibilitet** – Vanskelig å tilpasse individuelle elementer
-   ⛓️ **Tett kobling** – Forelder må kjenne alle detaljer
-   🧩 **Dårlig komposisjon** – Vanskelig å utvide eller nøste

### ✨ Compound Component Pattern

```tsx
<Accordion allowMultiple>
    <Accordion.Item id="1">
        <Accordion.Trigger>
            <span>⚛️</span>
            <span>Tittel</span>
            <CustomBadge>Ny</CustomBadge>
        </Accordion.Trigger>
        <Accordion.Content>
            {/* Full kontroll over innholdet! */}
            <p>Hva som helst her...</p>
            <MyCustomComponent />
            <button>Hvilken som helst knapp!</button>
        </Accordion.Content>
    </Accordion.Item>
</Accordion>
```

**Fordeler:**

-   🧩 **Fleksibel komposisjon** – Legg hva som helst i trigger eller innhold
-   📦 **Rent API** – Ingen prop-eksplosjon, enkelt ansvar
-   🔄 **Implisitt tilstandsdeling** – Context håndterer tilstand bak kulissene
-   🎮 **Inversjon av kontroll** – Du kontrollerer markup, biblioteket gir oppførsel

## 🏗️ Implementasjonen

Mønsteret består av fire hoveddeler:

1. **Context** – Del tilstand mellom forelder og barn uten prop drilling
2. **Rot-komponent** – Håndterer tilstand og gir context til alle barn
3. **Under-komponenter** – Bruker context via custom hooks
4. **Object.assign** – Fester under-komponenter til rot for punktum-notasjon

```tsx
// Forenklet struktur
const AccordionContext = createContext();

function AccordionRoot({ children }) {
    const [openItems, setOpenItems] = useState([]);
    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            {children}
        </AccordionContext.Provider>
    );
}

export const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
});
```

## 📁 Prosjektstruktur

```
src/
├── App.tsx                          # Hovedapplikasjon med demo
├── App.css                          # Styling for demo-siden
├── components/
│   ├── CompoundAccordion/           # ✨ Compound component implementasjon
│   │   ├── CompoundAccordion.tsx
│   │   ├── CompoundAccordion.css
│   │   └── index.ts
│   └── RegularAccordion/            # ❌ Tradisjonell props-basert
│       ├── RegularAccordion.tsx
│       ├── RegularAccordion.css
│       └── index.ts
└── main.tsx
```

## 🌍 Brukes av populære biblioteker

Dette mønsteret brukes av mange populære React-biblioteker:

| Bibliotek       | Eksempel                                          |
| --------------- | ------------------------------------------------- |
| **Radix UI**    | `Dialog.Root`, `Dialog.Trigger`, `Dialog.Content` |
| **Headless UI** | `Menu`, `Menu.Button`, `Menu.Items`               |
| **Shadcn UI**   | `Tabs`, `TabList`, `Tab`, `TabPanels`             |
| **Chakra UI**   | `Accordion`, `AccordionItem`, `AccordionButton`   |

## 🛠️ Teknologier

-   ⚛️ React 19
-   📘 TypeScript
-   ⚡ Vite
-   🎨 CSS (ingen UI-biblioteker)

## 📜 Scripts

| Script            | Beskrivelse                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start utviklingsserver      |
| `npm run build`   | Bygg for produksjon         |
| `npm run preview` | Forhåndsvis produksjonsbygg |
| `npm run lint`    | Kjør ESLint                 |

## 📚 Lær mer

-   [React Documentation - Compound Components](https://react.dev/learn/passing-data-deeply-with-context)
-   [Kent C. Dodds - Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
-   [Radix UI](https://www.radix-ui.com/)
-   [Headless UI](https://headlessui.com/)

---

Laget med ❤️ for Frontend Forum
