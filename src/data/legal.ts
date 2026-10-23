// Textos legals. La política de privacitat i la de galetes són CÒPIA LITERAL de la «Nota legal y política
// de Cookies» de gestgroup.es (nota-legal.php, consultada el 23-10-2026); només s'hi ha corregit
// «fimalidad». L'avís legal no existeix a la seva web: el redacta Nertel amb les seves dades i està
// pendent de revisió per Gestgroup (vegeu docs/fonts.md).
// Els enllaços van en format [text](url); `{lang}` es canvia per l'idioma de la pàgina.

import { site } from "./site";

export type LegalBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] };

const { legal } = site;

export const legalNotice: LegalBlock[] = [
  {
    kind: "p",
    text: "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web.",
  },
  {
    kind: "ul",
    items: [
      `Titular: ${legal.name}`,
      `NIF: ${legal.nif}`,
      `Domicilio social: ${legal.address}`,
      `Oficina: ${site.street}, ${site.postalCode} ${site.city}`,
      `Teléfono: ${site.phone}`,
      `Correo electrónico: [${site.email}](mailto:${site.email})`,
    ],
  },
  { kind: "h3", text: "Objeto" },
  {
    kind: "p",
    text: `Este sitio web informa de los servicios de consultoría, optimización de costes, soporte e innovación IT de ${legal.name}. El acceso y el uso del sitio atribuyen la condición de usuario e implican la aceptación de este aviso legal.`,
  },
  { kind: "h3", text: "Propiedad intelectual e industrial" },
  {
    kind: "p",
    text: `Los contenidos de este sitio web (textos, imágenes, marcas y logotipos) son propiedad de ${legal.name} o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o transformación sin autorización expresa. Los logotipos de clientes se muestran como referencia de proyectos realizados.`,
  },
  { kind: "h3", text: "Responsabilidad" },
  {
    kind: "p",
    text: `${legal.name} no se hace responsable de los daños derivados del uso de este sitio web ni de los contenidos de sitios de terceros enlazados desde él.`,
  },
  { kind: "h3", text: "Protección de datos y cookies" },
  {
    kind: "p",
    text: "El tratamiento de los datos personales se rige por la [Política de privacidad](/{lang}/privacidad) y el uso de cookies, por la [Política de cookies](/{lang}/cookies).",
  },
  { kind: "h3", text: "Legislación aplicable" },
  { kind: "p", text: "Este aviso legal se rige por la legislación española." },
];

const email = `[${legal.email}](mailto:${legal.email})`;

export const privacyPolicy: LegalBlock[] = [
  { kind: "h3", text: "LEGISLACIÓN." },
  {
    kind: "p",
    text: "En cumplimiento del Reglamento Europeo (UE)2016/679 (Reglamento general de protección de datos o 'RGPD'), relativo a la transparencia de la información, comunicación y modalidades de ejercicio de los derechos del interesado y del Artículo 13 relativo a la información que deberá facilitarse cuando los datos personales se obtengan del interesado.",
  },
  { kind: "h3", text: "RESPONSABLE DEL TRATAMIENTO." },
  { kind: "ul", items: [`Identidad: ${legal.name}`, `NIF: ${legal.nif}`, `Dirección: ${legal.address}`, `E-Mail: ${email}`] },
  { kind: "h3", text: "FINALIDAD DEL TRATAMIENTO." },
  {
    kind: "p",
    text: 'La finalidad del tratamiento es la de "Gestionar la relación con los potenciales clientes que contactan por medio del formulario de contacto".',
  },
  { kind: "h3", text: "LEGITIMIZACIÓN." },
  {
    kind: "p",
    text: "Le informamos de que la base legal para el tratamiento de sus datos es la de poder atender su solicitud de contacto. El interesado da su consentimiento al rellenar el formulario y enviar sus datos.",
  },
  { kind: "h3", text: "CONSERVACIÓN DE LOS DATOS." },
  { kind: "p", text: "Los datos proporcionados se conservarán durante los plazos legalmente establecidos." },
  { kind: "h3", text: "CESIONES DE DATOS." },
  { kind: "p", text: "Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal." },
  { kind: "h3", text: "DERECHOS DEL INTERESADO." },
  {
    kind: "p",
    text: "Tendrá derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos. Podrá solicitar la limitación u oposición del tratamiento de sus datos, en cuyo caso únicamente los conservaremos para cumplir con las obligaciones legalmente establecidas.",
  },
  { kind: "h3", text: "DERECHO A NO SER OBJETO DE DECISIONES INDIVIDUALES AUTOMATIZADAS, INCLUIDA LA ELABORACIÓN DE PERFILES." },
  {
    kind: "p",
    text: "No se realizan sobre el usuario decisiones individuales automatizadas ni se elaboran perfiles que produzcan efectos jurídicos o le afecten significativamente de modo similar.",
  },
  { kind: "h3", text: "DÓNDE EJERCER LOS DERECHOS." },
  {
    kind: "p",
    text: `Para el ejercicio de sus derechos debe enviar un correo electrónico a ${email} indicando por escrito su petición y adjuntando fotocopia de su DNI.`,
  },
  { kind: "h3", text: "MEDIDAS DE SEGURIDAD." },
  {
    kind: "p",
    text: `Teniendo en cuenta el estado de la técnica, los costes de aplicación, y la naturaleza, el alcance, el contexto y los fines del tratamiento, así como riesgos de probabilidad y gravedad variables para los derechos y libertades de las personas físicas, ${legal.name} aplica las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo.`,
  },
  { kind: "h3", text: "TRATAMIENTO BASADO EN EL CONSENTIMIENTO DEL AFECTADO." },
  { kind: "p", text: "A través de esta página web Gestgroup.es no se recoge ningún dato personal sin su consentimiento." },
  { kind: "h3", text: "DEBER DE CONFIDENCIALIDAD." },
  {
    kind: "p",
    text: `De conformidad con el artículo 5.1 f) del Reglamento (UE) 2016/679 ${legal.name} se compromete a tratar de forma absolutamente confidencial sus datos de carácter personal y a utilizarlos sólo para las finalidades indicadas.`,
  },
  { kind: "h3", text: "INEXACTITUD DE LOS DATOS OBTENIDOS DIRECTAMENTE DEL AFECTADO." },
  {
    kind: "p",
    text: "A los efectos previstos en el artículo 5.1 d) del Reglamento (UE) 2016/679, no serán imputables al responsable del tratamiento los datos personales que sean inexactos con respecto a los fines para los que se tratan, si usted no ha ejercitado su derecho de rectificación.",
  },
  { kind: "h3", text: "DERECHO A RECLAMAR." },
  {
    kind: "p",
    text: "En el caso de que no esté conforme con el tratamiento de sus datos podrá dirigir sus reclamaciones ante las Autoridades de protección de datos.",
  },
];

const cookieHead = ["Nombre", "Titular", "Duración", "Finalidad"];
const analytics = "[Consultar](https://www.google.com/analytics/learn/privacy.html?hl=es)";

export const cookiePolicy: LegalBlock[] = [
  { kind: "h3", text: "¿Qué son las Cookies?" },
  {
    kind: "p",
    text: "Las cookies son pequeños archivos de datos que se reciben en el terminal desde el sitio Web visitado y se usan para registrar ciertas interacciones de la navegación en un sitio Web almacenando datos que podrán ser actualizados y recuperados. Estos archivos se almacenan en el ordenador del usuario y contiene datos anónimos que no son perjudiciales para su equipo. Se utilizan para recordar las preferencias del usuario, como el idioma seleccionado, datos de acceso o personalización de la página.",
  },
  {
    kind: "p",
    text: "Las cookies también pueden ser utilizadas para registrar información anónima acerca de cómo un visitante utiliza un sitio. Por ejemplo, desde qué página Web ha accedido, o si ha utilizado un 'banner' publicitario para llegar.",
  },
  { kind: "h3", text: "¿Por qué esta web utiliza cookies?" },
  {
    kind: "p",
    text: `${legal.name} utiliza cookies estrictamente necesarias y esenciales para que usted utilice nuestros sitios Web y le permitan moverse libremente, utilizar áreas seguras, opciones personalizadas, etc. Éstas se utilizan para ayudar a mejorar el servicio al cliente, midiendo el uso y el rendimiento de la página, para optimizarla y personalizarla.`,
  },
  {
    kind: "p",
    text: `Nuestros sitios también pueden tener enlaces de redes sociales (como Facebook o Twitter). ${legal.name} no controla las cookies utilizadas por estas Web externas. Para más información sobre las cookies de las redes sociales u otras Webs ajenas, aconsejamos revisar sus propias políticas de cookies.`,
  },
  {
    kind: "table",
    caption: "Según su finalidad",
    head: ["Tipo", "Descripción"],
    rows: [
      [
        "Cookies técnicas",
        "Las cookies técnicas son aquellas imprescindibles y estrictamente necesarias para el correcto funcionamiento de un portal Web y la utilización de las diferentes opciones y servicios que ofrece. Por ejemplo, las que sirven para el mantenimiento de la sesión, la gestión del tiempo de respuesta, rendimiento o validación de opciones, utilizar elementos de seguridad, compartir contenido con redes sociales, etc.",
      ],
      [
        "Cookies de personalización",
        "Estas cookies permiten al usuario especificar o personalizar algunas características de las opciones generales de la página Web, Por ejemplo, definir el idioma, configuración regional o tipo de navegador.",
      ],
      [
        "Cookies analíticas",
        "Las cookies analíticas son las utilizadas por nuestros portales Web, para elaborar perfiles de navegación y poder conocer las preferencias de los usuarios del mismo con el fin de mejorar la oferta de productos y servicios. Por ejemplo, mediante una cookie analítica se controlarían las áreas geográficas de mayor interés de un usuario, cuál es el producto de más aceptación, etc.",
      ],
      [
        "Cookies publicitarias / de publicidad",
        "Las cookies publicitarias permiten la gestión de los espacios publicitarios en base a criterios concretos. Por ejemplo la frecuencia de acceso, el contenido editado, etc. Las cookies de publicidad permiten a través de la gestión de la publicidad almacenar información del comportamiento a través de la observación de hábitos, estudiando los accesos y formando un perfil de preferencias del usuario, para ofrecerle publicidad relacionada con los intereses de su perfil.",
      ],
    ],
  },
  {
    kind: "table",
    caption: "Según plazo",
    head: ["Tipo", "Descripción"],
    rows: [
      ["Cookies de sesión", "Las cookies de sesión son aquellas que duran el tiempo que el usuario está navegando por la página Web y se borran al término."],
      [
        "Cookies persistentes",
        "Estas cookies quedan almacenadas en el terminal del usuario, por un tiempo más largo, facilitando así el control de las preferencias elegidas sin tener que repetir ciertos parámetros cada vez que se visite el sitio Web.",
      ],
    ],
  },
  { kind: "h3", text: "¿Qué uso le damos a los diferentes tipos de cookies?" },
  {
    kind: "table",
    caption: "Cookies Esenciales",
    head: cookieHead,
    rows: [
      ["rgpdModel", "Propia", "Ilimitado", "Recoge la validación de cookies"],
      ["rgpdModelGroup", "Propia", "Ilimitado", "Recoge el número de grupos de cookies"],
      ["group_1", "Propia", "Ilimitado", "Recoge aceptación o no del grup1"],
      ["group_2", "Propia", "Ilimitado", "Recoge aceptación o no del grup2"],
      ["group_3", "Propia", "Ilimitado", "Recoge aceptación o no del grup3"],
    ],
  },
  { kind: "table", caption: "Cookies Funcionalidad", head: cookieHead, rows: [["PHPSESSID", "Propia", "Ilimitado", "Recordar el idioma"]] },
  {
    kind: "table",
    caption: "Cookies Analítica",
    head: cookieHead,
    rows: [
      ["_gat_gtag_UA_43438553_13", "Google Analytics", "30 minutos", analytics],
      ["_gid", "Google Analytics", "30 minutos", analytics],
      ["_ga", "Google Analytics", "2 años", analytics],
    ],
  },
  { kind: "table", caption: "Cookies Publicidad", head: cookieHead, rows: [["N/A", "N/A", "N/A", "N/A"]] },
  { kind: "h3", text: "¿Y si no quiero tener estas cookies o no hago nada al respecto?" },
  {
    kind: "p",
    text: "Para cumplir con la legislación vigente, tenemos que pedir su permiso para gestionar cookies. Si decide no autorizar el tratamiento indicándonos su no conformidad, sólo usaríamos las cookies técnicas, puesto que son imprescindibles para la navegación por nuestra Web. En este caso, no almacenaríamos ninguna cookie. En el caso de seguir navegando por nuestro sitio Web sin denegar su autorización implica que acepta su uso.",
  },
  {
    kind: "p",
    text: "Tenga en cuenta que si rechaza o borra las cookies de navegación, no podremos mantener sus preferencias, algunas características de las páginas no estarán operativas, no podremos ofrecerle servicios personalizados y cada vez que vaya a navegar por nuestra Web tendremos que solicitarle de nuevo su autorización para el uso de cookies.",
  },
  {
    kind: "p",
    text: "Si aún así, decide modificar la configuración de su acceso a la página Web, debe saber que es posible eliminar las cookies o impedir que se registre esta información en su equipo en cualquier momento mediante la modificación de los parámetros de configuración de su navegador:",
  },
  {
    kind: "ul",
    items: [
      "[Configuración de cookies de Internet Explorer](http://windows.microsoft.com/es-es/windows-vista/block-or-allow-cookies)",
      "[Configuración de cookies de Firefox](http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we)",
      "[Configuración de cookies de Google Chrome](https://support.google.com/chrome/answer/95647?hl=es)",
      "[Configuración de cookies de Safari](http://support.apple.com/kb/HT1677?viewlocale=es_ES&locale=es_ES)",
    ],
  },
  {
    kind: "p",
    text: "Estos navegadores están sometidos a actualizaciones o modificaciones, por lo que no podemos garantizar que se ajusten completamente a la versión de su navegador. También puede ser que utilice otro navegador no contemplado en estos enlaces como Konqueror, Arora, Flock, etc. Para evitar estos desajustes, puede acceder directamente desde las opciones de su navegador que se encuentra generalmente en el menú de Opciones, en la sección de 'Privacidad'. (Por favor, consulte la ayuda de su navegador para más información.)",
  },
];

export const legalPages = {
  "aviso-legal": { key: "notice", blocks: legalNotice },
  privacidad: { key: "privacy", blocks: privacyPolicy },
  cookies: { key: "cookies", blocks: cookiePolicy },
} as const;

export type LegalSlug = keyof typeof legalPages;

/** Parteix un text amb enllaços [text](url) en trossos, per pintar-los sense `dangerouslySetInnerHTML`. */
export function parseLinks(text: string, lang: string): ({ text: string } | { text: string; href: string })[] {
  const parts: ({ text: string } | { text: string; href: string })[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index) });
    parts.push({ text: match[1]!, href: match[2]!.replace("{lang}", lang) });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
