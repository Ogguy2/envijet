import { Airport } from "@/types";
import { Dialog } from "radix-ui";
import Btn from "../Buttons";
import React from "react";
import Papa from "papaparse";

const DialogDepartureAirpot = ({
  children,
  setSelectedAirport,
  data,
}: {
  children: React.ReactNode;
  data: Airport | null;
  setSelectedAirport: (airport: Airport) => void;
}) => {
  // Timeout de la recherche
  const [searchTimeout, setSearchTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Controleur de la recherche
  const [abortController, setAbortController] =
    React.useState<AbortController | null>(null);
  // Liste des aéroports filtrés
  const [filteredAirports, setFilteredAirports] = React.useState([]);
  // Query de la recherche
  const [query, setQuery] = React.useState(data?.name || "");
  // Liste de tous les aéroports
  const [allAirports, setAllAirports] = React.useState([]);

  // const [open, setOpen] = React.useState(false);

  // Charger le CSV une fois au montage
  React.useEffect(() => {}, []);

  //  Recherche des aéroports dans la base de données
  const filterAirports = (searchQuery: any) => {
    if (!searchQuery.trim()) {
      setFilteredAirports([]);
      return [];
    }
    console.log(searchQuery);
    const filtered = allAirports
      .filter(
        (airport: Airport) =>
          airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (airport.iata_code &&
            airport.iata_code
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (airport.icao_code &&
            airport.icao_code
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (airport.municipality &&
            airport.municipality
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (airport.iso_country &&
            airport.iso_country
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (airport.keywords &&
            airport.keywords.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, 10); // Limiter à 10 résultats

    setFilteredAirports(filtered);
    return filtered;
  };

  // On cherche les aéroports selon le query
  const handleSearchAirports = (event: any) => {
    const value = event.target.value;
    setQuery(value);

    // On reset si le champ est vide
    if (!value.trim()) {
      setFilteredAirports([]);
      return;
    }

    // On annule le timeout précédent
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // On annule la "requête" précédente (simulée avec abort controller)
    if (abortController) {
      abortController.abort();
    }

    // On crée un nouveau contrôleur pour cette recherche
    const controller = new AbortController();
    setAbortController(controller);

    // Débounce de 300ms
    const timeout = setTimeout(() => {
      try {
        const results = filterAirports(value);

        // Ne mettre à jour que si la recherche n'a pas été annulée
        if (!controller.signal.aborted) {
          setFilteredAirports(results);
        }
      } catch (error: any) {
        // Ignorer les erreurs d'annulation
        if (error.name !== "AbortError") {
          console.error("Erreur recherche:", error);
          setFilteredAirports([]);
        }
      }
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleSelectAirport = (airport: Airport) => {
    setQuery(`${airport.name} (${airport.iata_code})`);
    setSelectedAirport(airport);
    setFilteredAirports([]);
  };

  // Nettoyage
  React.useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (abortController) abortController.abort();
    };
  }, [searchTimeout, abortController]);

  const resetAllState = () => {
    setFilteredAirports([]);
    if (data) {
      setQuery(data.name);
      filterAirports(data.name);
    }
  };

  return (
    <Dialog.Root
      onOpenChange={value => {
        resetAllState();
        const loadAirports = () => {
          Papa.parse("/airports.csv", {
            download: true,
            header: true,
            complete: (result: any) => {
              setAllAirports(
                result.data.filter(
                  (airport: Airport) => airport.name && airport.iata_code
                )
              );
            },
            error: error => {
              console.error("Erreur chargement CSV:", error);
            },
          });
        };
        if (value && allAirports.length === 0) {
          loadAirports();
        } else {
        }
      }}>
      <Dialog.Trigger className="w-full">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/40 h-screen w-screen inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed space-y-4 bg-white left-1/2 top-1/2 w-full sm:w-[500px]   -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-4  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className="">
            <div className="">
              <input
                id={"title"}
                type="text"
                value={query}
                onChange={handleSearchAirports}
                className="p-2.5 shadow text-primary border border-primary/30 rounded-md w-full"
                placeholder="Rechercher un aéroport..."
              />
            </div>
            <div className=" my-3 h-60 overflow-y-auto">
              {filteredAirports.map((airport: Airport, index: number) => (
                <Dialog.Close asChild key={index}>
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSelectAirport(airport)}>
                    {airport.municipality && (
                      <div className="">{airport.municipality}</div>
                    )}
                    <div className="text-sm  font-semibold italic">
                      {airport.name}{" "}
                      {airport.iata_code && `(${airport.iata_code})`}
                    </div>
                  </div>
                </Dialog.Close>
              ))}
            </div>
          </div>
          <Dialog.Close asChild>
            <Btn className="w-full" title="Close" onClick={() => {}} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDepartureAirpot;
