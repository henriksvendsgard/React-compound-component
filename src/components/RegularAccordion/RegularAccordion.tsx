import { useState } from "react";
import "./RegularAccordion.css";

// DEN "VANLIGE" MÅTEN - Props-basert tilnærming

// Vi sender ALL data gjennom props - virker fornuftig i starten...
interface AccordionItem {
    id: string;
    title: string;
    content: string;
    // Hva om vi trenger et ikon? Legg til enda en prop...
    icon?: string;
    // Hva om vi trenger en badge? Legg til enda en prop...
    badge?: string;
    // Hva med tilpasset styling? Flere props...
    titleClassName?: string;
    contentClassName?: string;
    // Hva om vi vil ha en knapp i noen elementer? Flere props...
    hasButton?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    // Dette begynner å bli uhåndterlig... 😰
}

interface RegularAccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    // Og så trenger vi callbacks for alt...
    onItemClick?: (id: string) => void;
}

export function RegularAccordion({
    items,
    allowMultiple = false,
    onItemClick,
}: RegularAccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }
            return allowMultiple ? [...prev, id] : [id];
        });
        onItemClick?.(id);
    };

    return (
        <div className="regular-accordion">
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);
                return (
                    <div key={item.id} className="regular-accordion-item">
                        <button
                            className={`regular-accordion-trigger ${item.titleClassName || ""}`}
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                        >
                            {/* Betinget rendering for hver mulig prop */}
                            {item.icon && <span className="icon">{item.icon}</span>}
                            <span>{item.title}</span>
                            {item.badge && <span className="badge">{item.badge}</span>}
                            <span className={`chevron ${isOpen ? "open" : ""}`}>▼</span>
                        </button>
                        <div
                            className={`regular-accordion-content ${isOpen ? "open" : ""} ${
                                item.contentClassName || ""
                            }`}
                        >
                            <div className="regular-accordion-content-inner">
                                {/* Bare ren tekst - hva om vi trenger rikt innhold? */}
                                <p>{item.content}</p>
                                {/* Betinget rendering for knapp */}
                                {item.hasButton && (
                                    <button className="content-button" onClick={item.onButtonClick}>
                                        {item.buttonText}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// PROBLEMENE MED DENNE TILNÆRMINGEN:
//
// 1. PROP-EKSPLOSJON 💥
//    Hver ny funksjon = nye prop(s)
//    Ikon? Badge? Knapp? Tilpassede stiler? Tilpassede komponenter?
//    Interfacet vokser i det uendelige...
//
// 2. BEGRENSET FLEKSIBILITET 🔒
//    Hva om ett element trenger en helt annen layout?
//    Hva om vi må rendre et skjema i ett element?
//    Vi kan ikke enkelt tilpasse individuelle elementer
//
// 3. TETT KOBLING ⛓️
//    Forelder-komponenten må kjenne ALLE detaljene
//    om hva accordionen kan rendre
//
// 4. DÅRLIG KOMPOSISJON 🧩
//    Kan ikke enkelt legge til nye elementtyper
//    Kan ikke nøste komponenter naturlig
//    Vanskelig å utvide uten å endre kildekoden
//
