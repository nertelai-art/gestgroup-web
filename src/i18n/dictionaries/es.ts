// Textos en castellà. Són la referència de tipus: el català ha de tenir les mateixes claus.
// Tot el que es diu de Gestgroup surt de la seva web (docs/fonts.md). El que no, s'hi diu.

const es = {
  meta: {
    title: "Gestgroup · Consultoría IT que piensa en el ahorro | Girona",
    description:
      "Revisamos las facturas de comunicaciones, licencias, software y hardware de su empresa y le decimos qué sobra. Ahorro medio del 30%, soporte IT 24/7 y sin permanencia. Girona.",
  },
  skip: "Saltar al contenido",
  nav: {
    label: "Navegación principal",
    services: "Servicios",
    method: "Método",
    case: "Caso real",
    faq: "Preguntas",
    cta: "Análisis gratuito",
    language: "Idioma",
    menu: "Menú",
    close: "Cerrar menú",
  },
  hero: {
    eyebrow: "Consultoría IT · Girona",
    titleStart: "Pague",
    titleHighlight: "lo justo",
    titleEnd: "por su informática.",
    lead: "Revisamos las facturas de comunicaciones, licencias, software y hardware de su empresa, le decimos qué sobra y lo negociamos por usted.",
    cta: "Pida el análisis gratuito",
    call: "Llámenos",
    proof: ["+25 años en IT", "Ahorro medio del 30%", "Soporte 24/7, sin permanencia"],
    ringLabel: "Logotipo de Gestgroup",
    scroll: "Siga bajando",
  },
  clients: {
    title: "Empresas que ya tienen su IT bajo control",
  },
  invoice: {
    eyebrow: "Cómo trabajamos sus facturas",
    title: "Cada línea, revisada. Lo que sobra, fuera.",
    steps: [
      { title: "Lo reunimos todo", text: "Juntamos en una sola vista todo lo que su empresa paga en informática, de cualquier operador y proveedor." },
      { title: "Encontramos lo que sobra", text: "Líneas sin uso, licencias residuales, mantenimientos duplicados, tarifas fuera de mercado." },
      { title: "Lo negociamos por usted", text: "Reajustamos contratos y tarifas sin perder prestaciones ni frenar el negocio." },
      { title: "Y lo mantenemos así", text: "Seguimos midiendo cada mes para que el ahorro no se pierda con el tiempo." },
    ],
    card: {
      label: "Gasto IT mensual",
      company: "Su empresa, S.L.",
      before: "Antes",
      after: "Después",
      total: "Total al mes",
      saving: "de ahorro",
      example: "Ejemplo ilustrativo. El ahorro de su empresa lo verá en el análisis gratuito.",
    },
    lines: {
      communications: { name: "Comunicaciones", detail: "Móvil, fijo y datos", finding: "Tarifas fuera de mercado y líneas sin uso" },
      licenses: { name: "Licencias", detail: "Ofimática y sistemas", finding: "Licencias residuales" },
      software: { name: "Software contratado", detail: "Aplicaciones de gestión", finding: "Funciones que nadie usa" },
      hardware: { name: "Hardware", detail: "Equipos y mantenimiento", finding: "Sobrestock y contratos duplicados" },
      databases: { name: "Bases de datos", detail: "Servidores y rendimiento", finding: "Recursos sobredimensionados" },
      staff: { name: "Soporte y personal IT", detail: "Horas y servicios", finding: "Tareas sin automatizar" },
    },
  },
  services: {
    eyebrow: "Qué hacemos",
    title: "Un solo interlocutor para toda su informática.",
    lead: "Hardware, software, comunicaciones o personal: el objetivo es siempre el mismo, que su departamento de IT rinda más y cueste menos.",
    items: [
      {
        id: "global",
        tag: "Gestor Global",
        title: "Su CIO as a Service",
        text: "Hacemos de director de IT externo: analizamos, medimos y gestionamos todo el gasto informático de la empresa.",
        points: ["Comunicaciones: móvil, fijo y datos", "Hardware, software y licencias", "Bases de datos", "Gestión del personal IT"],
      },
      {
        id: "help",
        tag: "Soporte",
        title: "Helpdesk 24/7 externalizado",
        text: "Un centro de soporte al usuario con técnicos de nivel avanzado, en remoto o en sus oficinas, y SLA comprometidos.",
        points: ["24 horas, 365 días", "Técnicos de campo in situ", "Servicios gestionados con monitorización", "Sin permanencia"],
      },
      {
        id: "innova",
        tag: "Innovación",
        title: "Su departamento de I+D+i",
        text: "Traducimos lo que necesita su negocio en tecnología: desarrollo, datos y automatización para trabajar mejor.",
        points: ["Desarrollo de software", "Analítica de datos", "Automatización e integraciones", "Optimización energética"],
      },
    ],
  },
  method: {
    eyebrow: "Método LeanIT + Kaizen",
    title: "No es una auditoría de un día. Es mejora continua.",
    lead: "Medimos, recortamos y volvemos a medir. Cada vuelta del ciclo deja su IT un poco más eficiente.",
    phases: [
      { title: "Análisis", text: "Estudiamos al detalle sus facturas y los procesos de su departamento, sin frenar la productividad." },
      { title: "LeanIT", text: "Optimizamos costes y procesos internos para liberar tiempo y recursos que invertir en otra cosa." },
      { title: "KaizenIT", text: "Eliminamos lo que no aporta valor y hacemos seguimiento continuo de cada coste y cada proceso." },
      { title: "Asesoramiento", text: "Le acompañamos en cada decisión tecnológica para innovar con criterio, y vuelta a empezar." },
    ],
    cycle: "Ciclo de mejora continua",
  },
  case: {
    eyebrow: "Caso real · 2025",
    title: "800 móviles de empresa, bajo control.",
    text: "Un cliente con la plantilla repartida por varios puntos necesitaba gestionar y proteger su flota móvil. Desplegamos Microsoft Intune con Portal de Empresa y Samsung Knox en 800 terminales: alta de dispositivos, políticas de seguridad, pruebas piloto, formación del equipo y soporte continuo.",
    stats: [
      { value: 800, prefix: "", suffix: "", label: "dispositivos configurados y operativos" },
      { value: 95, prefix: "−", suffix: "%", label: "de incidencias técnicas" },
      { value: 100, prefix: "", suffix: "%", label: "de cumplimiento de las políticas de ciberseguridad" },
    ],
    tech: ["Microsoft Intune", "Portal de Empresa", "Samsung Knox", "Microsoft 365"],
  },
  figures: {
    title: "Las cifras que nos avalan",
    items: [
      { value: 25, prefix: "+", suffix: "", label: "años de experiencia en IT" },
      { value: 30, prefix: "", suffix: "%", label: "de ahorro medio para nuestros clientes" },
      { value: 24, prefix: "", suffix: "/7", label: "soporte los 365 días del año" },
      { value: 0, prefix: "", suffix: "", label: "meses de permanencia" },
    ],
  },
  founder: {
    eyebrow: "Nuestra filosofía",
    quote: "Escuchando mucho a mis clientes y sin renunciar a mis ideales he llegado, con toda la humildad, a donde hoy estamos. Nuestro lema es hacer todas las gestiones con pasión.",
    name: "Albert Giró",
    role: "CEO de Gestgroup",
    text: "Gestgroup nace de Gestcost, la división que desde 2010 asesora y optimiza las facturas de telefonía de las empresas. Hoy aplicamos ese mismo oficio a todo el departamento de IT, siempre del lado del cliente.",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que nos preguntan antes de empezar",
    items: [
      { q: "¿Cuánto cuesta el análisis?", a: "Nada. Revisamos sus facturas y le enseñamos dónde puede ahorrar, sin compromiso." },
      {
        q: "¿Tendré que cambiar de operador o de proveedor?",
        a: "No necesariamente. Analizamos tarifas de cualquier operador y proveedor; buena parte del ahorro sale de renegociar y de dejar de pagar lo que no se usa.",
      },
      { q: "¿Qué parte de mi informática revisan?", a: "Toda: comunicaciones (móvil, fijo y datos), hardware, software, licencias, bases de datos y gestión del personal IT." },
      { q: "¿El soporte tiene permanencia?", a: "No. Nuestros servicios son sin permanencia: los usa mientras le sirvan y no le penalizamos por dejarlos." },
      { q: "¿Atienden fuera de horario?", a: "Sí. El soporte funciona las 24 horas, los 365 días del año, en remoto o presencialmente." },
      {
        q: "¿Trabajan solo en Girona?",
        a: "La oficina está en Girona, pero nuestros clientes están en toda España, y algunos tienen oficinas por todo el mundo.",
      },
    ],
  },
  contact: {
    eyebrow: "Análisis gratuito",
    title: "Descubra cuánto le sobra en sus facturas.",
    lead: "Déjenos sus datos y le llamamos para preparar el análisis. Sin compromiso.",
    callTitle: "¿Prefiere llamar?",
    visitTitle: "Dónde estamos",
    form: {
      name: "Nombre",
      company: "Empresa",
      email: "Correo electrónico",
      phone: "Teléfono",
      optional: "opcional",
      interests: "¿Qué quiere revisar?",
      interestOptions: { costs: "Facturas y costes IT", support: "Soporte 24/7", innovation: "Innovación y desarrollo" },
      message: "Cuéntenos algo más",
      privacy: "Acepto que Gestgroup use estos datos para contactarme sobre mi solicitud.",
      submit: "Solicitar el análisis gratuito",
      sending: "Enviando…",
      success: "Gracias, {name}. Le llamaremos en breve para preparar el análisis.",
      again: "Enviar otra solicitud",
      errors: {
        name: "Escriba su nombre.",
        company: "Escriba el nombre de la empresa.",
        email: "Revise el correo: falta la @ o el dominio.",
        phone: "El teléfono solo puede tener números, espacios y el signo +.",
        privacy: "Necesitamos su permiso para contactarle.",
        server: "No se ha podido enviar. Inténtelo de nuevo o llámenos al 931 156 344.",
      },
    },
  },
  footer: {
    tagline: "IT bajo control. Costes claros.",
    rights: "Todos los derechos reservados.",
    linkedin: "Gestgroup en LinkedIn",
    top: "Volver arriba",
  },
  notFound: {
    title: "Esta página no existe",
    text: "Puede que el enlace sea antiguo. Lo que buscaba seguramente está en la página principal.",
    back: "Ir al inicio",
  },
};

export default es;
export type Dictionary = typeof es;
