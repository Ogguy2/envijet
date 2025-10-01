"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MaintContainer from "@/components/layouts/MainContainer";
import React from "react";
import bg from "../../public/assets/images/hero-1.jpg";
import { motion } from "motion/react";
import { FaRightLeft, FaRightLong } from "react-icons/fa6";
import Papa from "papaparse";
import { TiArrowLoop } from "react-icons/ti";
import {
  FaCalendarCheck,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegEnvelope,
} from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { Dialog } from "radix-ui";

interface Airport {
  // id	ident	type	name	latitude_deg	longitude_deg	elevation_ft	continent	iso_country	iso_region	municipality	scheduled_service	icao_code	iata_code	gps_code	local_code	home_link	wikipedia_link	keywords
  id: string;
  ident: string;
  type: string;
  name: string;
  latitude_deg: string;
  longitude_deg: string;
  elevation_ft: string;
  continent: string;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: string;
  icao_code: string;
  iata_code: string;
  gps_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
}
export default function HomePage() {
  const optionFly = [
    {
      name: "Aller simple",
      value: "Aller simple",
      icon: <FaRightLong />,
    },
    {
      name: "Aller-retour",
      value: "Aller-retour",
      icon: <FaRightLeft />,
    },
    {
      name: "Vols multiples",
      value: "Vols multiples",
      icon: <TiArrowLoop />,
    },
  ];
  const [flyOption, setFlyOption] = React.useState(optionFly[0]);
  const handleActivateOption = (option: {
    name: string;
    value: string;
    icon: React.JSX.Element;
  }) => {
    setFlyOption(option);
  };
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative">
          <div className="absolute w-full h-full bg-black/30"></div>
          <div
            style={{
              backgroundImage: `url(${bg.src})`,
            }}
            className="w-full h-[600px] bg-cover bg-center bg-fixed"></div>
        </div>
        <MaintContainer>
          <div className="border border-black/15 shadow rounded-lg ">
            <div className="">
              {/* Fly option */}
              <div className="">
                <FlightOptions
                  options={optionFly}
                  handleActivateOption={handleActivateOption}
                  optionSelected={flyOption}
                />
              </div>
              {/* Fly form */}
              <div className="p-3">
                {flyOption.value === "Aller simple" && <OneWayFormRequest />}
                {flyOption.value === "Aller-retour" && <RoundTripFormRequest />}
                {flyOption.value === "Vols multiples" && (
                  <MultiLegFormRequest />
                )}
              </div>
            </div>
            <div className="">
              {/* Plane Option swith fly option */}
              <div className="my-20"></div>
            </div>
          </div>
        </MaintContainer>
      </div>
      <Footer />
    </div>
  );
}

const OneWayFormRequest = () => {
  // Recherche active
  const [searchActive, setSearchActive] = React.useState(false);
  // Timeout de la recherche
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  // Controleur de la recherche
  const [abortController, setAbortController] = React.useState(null);
  // Loading
  const [loading, setLoading] = React.useState(false);
  // Liste des aéroports
  const [airports, setAirports] = React.useState([]);
  // Liste des aéroports filtrés
  const [filteredAirports, setFilteredAirports] = React.useState([]);
  // Query de la recherche
  const [query, setQuery] = React.useState("");
  // Liste de tous les aéroports
  const [allAirports, setAllAirports] = React.useState([]);

  // Charger le CSV une fois au montage
  React.useEffect(() => {
    const loadAirports = () => {
      Papa.parse("/airports.csv", {
        download: true,
        header: true,
        complete: result => {
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
    loadAirports();
  }, []);

  //  Recherche des aéroports dans la base de données
  const filterAirports = searchQuery => {
    if (!searchQuery.trim()) {
      setFilteredAirports([]);
      return [];
    }

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

  // On active la recherche
  const handleSearchActive = () => {
    setSearchActive(true);
  };

  // On blur la recherche
  const handleSearchBlur = () => {
    // Petit délai pour permettre le clic sur les résultats
    setTimeout(() => {
      setSearchActive(false);
    }, 200);
  };

  // On cherche les aéroports selon le query
  const handleSearchAirports = event => {
    const value = event.target.value;
    setQuery(value);

    // On reset si le champ est vide
    if (!value.trim()) {
      setFilteredAirports([]);
      setLoading(false);
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
        setLoading(true);
        const results = filterAirports(value);

        // Ne mettre à jour que si la recherche n'a pas été annulée
        if (!controller.signal.aborted) {
          setFilteredAirports(results);
        }
      } catch (error) {
        // Ignorer les erreurs d'annulation
        if (error.name !== "AbortError") {
          console.error("Erreur recherche:", error);
          setFilteredAirports([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleSelectAirport = airport => {
    setQuery(`${airport.name} (${airport.iata_code})`);
    setFilteredAirports([]);
    setSearchActive(false);
  };

  // Nettoyage
  React.useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (abortController) abortController.abort();
    };
  }, [searchTimeout, abortController]);

  return (
    <div className="py-10 space-y-6">
      <div className="grid relative grid-cols-4 gap-6">
        {/* Aéroport de départ */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure">Aéroport de départ</label>
          </div>
          <div>
            <div className="rounded p-3 flex items-center gap-3 border border-gray-200">
              <div>
                <FaPlaneDeparture />
              </div>
              <div className="flex-1">
                <p className="font-bold">Côte d'Ivoire - Abidjan</p>
                <input
                  id="departure"
                  type="text"
                  className="w-full border-none p-0 focus:outline-none focus:ring-0"
                  placeholder="Rechercher un aéroport"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Aéroport d'arrivée */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="arrival">Aéroport d'arrivée</label>
          </div>
          <div className="relative">
            <div className="flex-1 relative">
              <FaPlaneArrival
                className="text-primary absolute top-1/2 -translate-y-1/2 left-3"
                size={20}
              />
              <input
                id="arrival"
                type="text"
                value={query}
                onChange={handleSearchAirports}
                onFocus={handleSearchActive}
                onBlur={handleSearchBlur}
                className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                placeholder="Rechercher un aéroport..."
              />
              {loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}
            </div>

            {searchActive && (filteredAirports.length > 0 || loading) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                {loading ? (
                  <div className="p-3 text-center text-gray-500">
                    Recherche en cours...
                  </div>
                ) : (
                  filteredAirports.map((airport: Airport, index: number) => (
                    <div
                      key={`${airport.iata_code}-${index}`}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSelectAirport(airport)}>
                      {airport.municipality && (
                        <div className="">{airport.municipality}</div>
                      )}
                      <div className="text-sm text-gray-600 italic">
                        {airport.name}{" "}
                        {airport.iata_code && `(${airport.iata_code})`}
                      </div>
                    </div>
                  ))
                )}

                {filteredAirports.length === 0 && !loading && query.trim() && (
                  <div className="p-3 text-center text-gray-500">
                    Aucun aéroport trouvé
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Date du départ */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Date du départ</label>
          </div>
          <div>
            <div className="rounded p-3 flex items-center gap-3 border border-gray-200">
              <div>
                <FaCalendarCheck />
              </div>
              <div>
                <p className="font-bold">Départ pour le</p>
                <p className="">01 Juin 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nombre de passagers */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="passengers">Nombre de passagers</label>
          </div>
          <div>
            <div className="rounded p-3 flex items-center gap-3 border border-gray-200">
              <div>
                <IoPeopleSharp />
              </div>
              <div>
                <p className="font-bold">1 Passager</p>
                <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[250px]">
                  Adulte
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <button className="p-2.5 px-7 border font-semibold rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
          Réserver
        </button>
      </div>
    </div>
  );
};

const DepartureDialog = () => {
  return (
    <div className="">
      <Dialog.Root modal={true}>
        <Dialog.Trigger asChild>
          <div className="space-y-2">
            <div className="font-semibold">
              <label htmlFor="">Aéroport de départ</label>
            </div>
            <div>
              <div className=" rounded bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer duration-300 p-3 flex items-center gap-3 ">
                <div>
                  <FaPlaneDeparture />
                </div>
                <div>
                  <p className="font-bold">Côte d'ivoire - Abidjan</p>
                  <div className=" text-ellipsis overflow-hidden whitespace-nowrap  max-w-[250px] ">
                    Aéroport Aéroport international de Cocody Aéroport Aéroport
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className=" data-{state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed fixed w-screen h-screen  inset-0 bg-black/20" />
          <Dialog.Content className="fixed min-w-xl bg-white rounded-lg p-4 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title></Dialog.Title>
            <div className="space-y-4">
              {/* Input search */}
              <div className="">
                <div className="flex-1  relative">
                  <FaRegEnvelope
                    className="text-primary absolute top-1/2 -translate-y-1/2 left-4"
                    size={20}
                  />
                  <input
                    type="text"
                    className="p-2.5 ps-[50px]  placeholder:font-semibold font-semibold text-primary  border border-primary rounded-md  w-full"
                    placeholder="name@exemple.com"
                  />
                </div>
              </div>
              {/* List of airports */}
              <div></div>
              <div>
                <Dialog.Close className="w-full p-2.5 px-7 border font-semibold rounded-md bg-primary text-white ">
                  Fermer
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

const RoundTripFormRequest = () => {
  return <div>BBBBBBBBBBBBBBBBBBBBBBBBBB</div>;
};

const MultiLegFormRequest = () => {
  return <div>CCCCCCCCCCCCCCCCCCCCCCC</div>;
};

const ArrivalDialog = () => {
  return <div>ArrivalDialog</div>;
};

const PassengersDialog = () => {
  return <div>PassengersDialog</div>;
};

const DateDialog = () => {
  return <div>DateDialog</div>;
};

interface FlyOptionProps {
  optionSelected: { name: string; value: string };
  options: { name: string; value: string; icon: React.JSX.Element }[];
  handleActivateOption: (option: {
    name: string;
    value: string;
    icon: React.JSX.Element;
  }) => void;
}
const FlightOptions = ({
  options,
  handleActivateOption,
  optionSelected,
}: FlyOptionProps) => {
  return (
    <div className="relative w-full">
      {/* Container */}
      <div className="grid grid-cols-3 bg-primary/10 rounded-lg relative overflow-hidden">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleActivateOption(option)}
            className={`h-16 flex items-center justify-center gap-2 relative z-10 ${
              optionSelected.value === option.value
                ? "text-white font-semibold"
                : "text-gray-700"
            }`}>
            <span>{option.icon}</span>
            <span>{option.name}</span>
          </button>
        ))}

        {/* Barre animée */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 h-16 w-1/3 bg-primary rounded-lg"
          animate={{
            left:
              optionSelected.value === "Aller simple"
                ? "0%"
                : optionSelected.value === "Aller-retour"
                ? "33.333%"
                : "66.666%",
          }}
        />
      </div>
    </div>
  );
};
