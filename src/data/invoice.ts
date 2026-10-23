// La factura de l'escena «Cada línia, revisada». És un EXEMPLE IL·LUSTRATIU amb xifres rodones, i al web
// surt dit així: l'únic número de Gestgroup és l'estalvi mitjà del 30% que declara a la seva web.
// Les sis partides són les que Gestgroup diu que analitza (gestcost.php).

export type InvoiceLineId = "communications" | "licenses" | "software" | "hardware" | "databases" | "staff";

export type InvoiceLine = { id: InvoiceLineId; before: number; after: number };

export const invoiceLines: readonly InvoiceLine[] = [
  { id: "communications", before: 4200, after: 2600 },
  { id: "licenses", before: 2800, after: 1850 },
  { id: "software", before: 1600, after: 1250 },
  { id: "hardware", before: 2100, after: 1450 },
  { id: "databases", before: 900, after: 750 },
  { id: "staff", before: 3400, after: 2600 },
];

export const invoiceTotals = {
  before: invoiceLines.reduce((sum, line) => sum + line.before, 0),
  after: invoiceLines.reduce((sum, line) => sum + line.after, 0),
};
