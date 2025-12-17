import { createContext, useContext, useState, useCallback } from "react";
import "./CompoundAccordion.css";

// COMPOUND COMPONENT MØNSTER ✨

// Steg 1: Opprett en context for å dele tilstand mellom komponenter
interface AccordionContextType {
    openItems: string[];
    toggleItem: (id: string) => void;
    allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

// Custom hook for å konsumere contexten
function useAccordionContext() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion-komponenter må brukes innenfor en <Accordion>-forelder");
    }
    return context;
}

// Steg 2: Opprett en context for individuelle elementer
interface AccordionItemContextType {
    id: string;
    isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

function useAccordionItemContext() {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error("Accordion.Trigger/Content må brukes innenfor en <Accordion.Item>");
    }
    return context;
}

// KOMPONENTENE

// Rot-komponent - gir delt tilstand
interface AccordionRootProps {
    children: React.ReactNode;
    allowMultiple?: boolean;
    defaultOpen?: string[];
}

function AccordionRoot({ children, allowMultiple = false, defaultOpen = [] }: AccordionRootProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = useCallback(
        (id: string) => {
            setOpenItems((prev) => {
                if (prev.includes(id)) {
                    return prev.filter((item) => item !== id);
                }
                return allowMultiple ? [...prev, id] : [id];
            });
        },
        [allowMultiple]
    );

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
            <div className="compound-accordion">{children}</div>
        </AccordionContext.Provider>
    );
}

// Element-komponent - wrapper hver accordion-seksjon
interface AccordionItemProps {
    children: React.ReactNode;
    id: string;
}

function AccordionItem({ children, id }: AccordionItemProps) {
    const { openItems } = useAccordionContext();
    const isOpen = openItems.includes(id);

    return (
        <AccordionItemContext.Provider value={{ id, isOpen }}>
            <div className="compound-accordion-item" data-state={isOpen ? "open" : "closed"}>
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

// Trigger-komponent - den klikkbare headeren
interface AccordionTriggerProps {
    children: React.ReactNode;
    className?: string;
}

function AccordionTrigger({ children, className = "" }: AccordionTriggerProps) {
    const { toggleItem } = useAccordionContext();
    const { id, isOpen } = useAccordionItemContext();

    return (
        <button
            className={`compound-accordion-trigger ${className}`}
            onClick={() => toggleItem(id)}
            aria-expanded={isOpen}
        >
            {children}
            <span className={`chevron ${isOpen ? "open" : ""}`}>▼</span>
        </button>
    );
}

// Innhold-komponent - det sammenleggbare innholdsområdet
interface AccordionContentProps {
    children: React.ReactNode;
    className?: string;
}

function AccordionContent({ children, className = "" }: AccordionContentProps) {
    const { isOpen } = useAccordionItemContext();

    return (
        <div className={`compound-accordion-content ${isOpen ? "open" : ""} ${className}`}>
            <div className="compound-accordion-content-inner">{children}</div>
        </div>
    );
}

// SETT SAMMEN COMPOUND COMPONENTEN

// Fest under-komponenter til hoved-komponenten
export const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
});

// HVORFOR DETTE ER BEDRE:
//
// 1. FLEKSIBEL KOMPOSISJON 🧩
//    Legg HVA SOM HELST i triggeren eller innholdet!
//    Ikoner, badges, skjemaer, bilder - du bestemmer!
//
// 2. RENT API 📦
//    Ingen prop-eksplosjon - bare sett sammen det du trenger
//    Hver komponent har ett enkelt ansvar
//
// 3. IMPLISITT TILSTANDSDELING 🔄
//    Context håndterer tilstanden bak kulissene
//    Komponenter "bare fungerer" sammen
//
// 4. INVERSJON AV KONTROLL 🎮
//    DU kontrollerer markup og struktur
//    Biblioteket gir oppførselen
//
// 5. KJENT MØNSTER 💡
//    Ligner på HTMLs native <select>/<option>
//    Brukes av populære biblioteker (Radix, Headless UI, osv.)
//
