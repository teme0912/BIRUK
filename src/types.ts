export interface NavLink {
  label: string
  href: string
}

export interface ServiceCard {
  title: string
  description: string
  accent: string
}

export interface ProjectCard {
  title: string
  subtitle: string
  summary: string
  badges: string[]
  accent: string
  details?: string
}

export interface PartnerTickerItem {
  name: string
  category: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ContactFormValues {
  fullName: string
  company: string
  email: string
  phone: string
  projectType: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>