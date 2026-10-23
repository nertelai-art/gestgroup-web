// Dades reals de Gestgroup (gestgroup.es, consultada el 23-10-2026; vegeu docs/fonts.md).

export const site = {
  name: "Gestgroup",
  phone: "931 156 344",
  phoneHref: "tel:+34931156344",
  street: "Carrer del Mestre Francesc Civil, 8, Bajos",
  postalCode: "17005",
  city: "Girona",
  region: "Girona",
  country: "ES",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Carrer+del+Mestre+Francesc+Civil+8+17005+Girona",
  linkedin: "https://es.linkedin.com/company/gestgroup",
  /** Fix i no del rellotge: el web és estàtic i ha de sortir igual a cada build. */
  copyrightYear: 2026,
  /** Adreça pública del web nou. Es canvia quan passi al domini del client. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gestgroup-web.vercel.app",
} as const;

/** Logos de clients que Gestgroup ja ensenya a la seva web, en el mateix ordre. */
export const clients = [
  { name: "Dilme", file: "dilmelogofnserif.png" },
  { name: "Vipram", file: "logo_vipram.png" },
  { name: "HECO", file: "Logo-HECO-300ppp.png" },
  { name: "Promindsa", file: "logo-promindsa.png" },
  { name: "Volex", file: "logo-volex-positivo.png" },
  { name: "Prefer", file: "prefer_logo.png" },
  { name: "Solutioma", file: "solutioma_logo.png" },
  { name: "Vilarmau i Freixa", file: "vilarmau_i_freixa.png" },
  { name: "Noatum", file: "noatum_logo.png" },
  { name: "Fedrigoni", file: "fedrigoni-logo-1-1.png" },
  { name: "Marco", file: "logo_marco.png" },
  { name: "Iberdigest Group", file: "iberdigest-group-logo.png" },
  { name: "Spass", file: "spass-logo.png" },
  { name: "Grup Conesa", file: "grup-conesa.png" },
  { name: "Casa Paraire", file: "casa_paraire_logo.png" },
] as const;
