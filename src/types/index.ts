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


interface Fly {
  departureAirport: Airport | null;
  arrivalAirport: Airport | null;
  date: Date;
}

export type { Airport, Fly };
