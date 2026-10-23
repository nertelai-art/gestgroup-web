import { notFound } from "next/navigation";

// Qualsevol adreça de dins d'un idioma que no existeix mostra la 404 pròpia (amb capçalera i peu).
export default function Rest() {
  notFound();
}
