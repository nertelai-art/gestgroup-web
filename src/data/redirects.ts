// Adreces de la web vella de gestgroup.es (PHP de Blaupixel, vegeu docs/fonts.md) i on porten ara. Quan
// el domini apunti aquí, qui vingui de Google o d'un enllaç antic arriba a la pàgina que toca i no a una
// 404. Permanents (308), perquè Google passi el que tenien a les adreces noves.

export const legacyRedirects = [
  { source: "/index.php", destination: "/es" },
  { source: "/quienes-somos.php", destination: "/es/empresa" },
  { source: "/gestcost.php", destination: "/es#gestor-global" },
  { source: "/gestinnova.php", destination: "/es#servicios" },
  { source: "/gesthelp.php", destination: "/es#soporte" },
  { source: "/clientes.php", destination: "/es#clientes" },
  { source: "/contactar.php", destination: "/es#contacto" },
  { source: "/nota-legal.php", destination: "/es/aviso-legal" },
  // El blog només té un article, el cas dels 800 MDM, que aquí és una pàgina pròpia.
  { source: "/blog.php", destination: "/es/casos/mdm-intune-samsung" },
  { source: "/blog-details.html", destination: "/es/casos/mdm-intune-samsung" },
  { source: "/es/blog/instalacion-de-800-mdm-microsoft-intune-en-dispositivos-samsung-3", destination: "/es/casos/mdm-intune-samsung" },
] as const;
