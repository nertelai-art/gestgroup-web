// Validació del formulari d'anàlisi gratuïta. La fan servir el navegador i el servidor, igual.

export const interestIds = ["costs", "support", "innovation"] as const;
export type InterestId = (typeof interestIds)[number];

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interests: InterestId[];
  message: string;
  privacy: boolean;
};

export type ContactField = "name" | "company" | "email" | "phone" | "privacy";
export type ContactErrors = Partial<Record<ContactField, true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s]{6,20}$/;
const LIMITS = { name: 120, company: 160, email: 200, phone: 30, message: 4000 };

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim() || input.name.length > LIMITS.name) errors.name = true;
  if (!input.company.trim() || input.company.length > LIMITS.company) errors.company = true;
  if (!EMAIL.test(input.email.trim()) || input.email.length > LIMITS.email) errors.email = true;
  if (input.phone.trim() && !PHONE.test(input.phone.trim())) errors.phone = true;
  if (!input.privacy) errors.privacy = true;
  return errors;
}

/** Converteix un cos desconegut (JSON del navegador) en dades netes, o `null` si no té la forma esperada. */
export function parseContact(body: unknown): ContactInput | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const text = (key: string, max: number) => (typeof raw[key] === "string" ? (raw[key] as string).slice(0, max) : "");
  const interests = Array.isArray(raw.interests)
    ? raw.interests.filter((id): id is InterestId => interestIds.includes(id as InterestId))
    : [];
  return {
    name: text("name", LIMITS.name + 1),
    company: text("company", LIMITS.company + 1),
    email: text("email", LIMITS.email + 1),
    phone: text("phone", LIMITS.phone + 1),
    interests: [...new Set(interests)],
    message: text("message", LIMITS.message),
    privacy: raw.privacy === true,
  };
}
