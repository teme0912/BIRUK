import type {
  FaqItem,
  NavLink,
  PartnerTickerItem,
  ProjectCard,
  ServiceCard,
} from './types'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const services: ServiceCard[] = [
  {
    title: 'Electromechanical Contracting',
    description:
      'Integrated electrical, mechanical, and control-system delivery for campuses, hotels, and industrial facilities.',
    accent: 'Electric Blue',
  },
  {
    title: 'Industrial Equipment Supply',
    description:
      'Procurement of high-spec equipment, technical components, and site-ready systems with disciplined sourcing.',
    accent: 'Precision Supply',
  },
  {
    title: 'Architectural & Structural Engineering',
    description:
      'Design-aware execution for resilient building infrastructure, fit-outs, and structural coordination.',
    accent: 'Built Environment',
  },
  {
    title: 'Global Import/Export Logistics',
    description:
      'Cross-border coordination, documentation, and delivery management for time-critical B2B programs.',
    accent: 'Global Reach',
  },
]

export const projects: ProjectCard[] = [
  {
    title: 'University of Gondar Complex',
    subtitle: 'Modern Electrical Grid Installation',
    summary:
      'Upgraded campus power distribution and load-balancing infrastructure to ensure reliable academic operations.',
    badges: ['Campus Infrastructure', 'Power Distribution', 'Electrical Upgrade'],
    accent: 'from-[#0A84FF]/35 via-[#111827] to-[#0b1220]',
    details:
      'Scope included LV/MV distribution upgrades, redundant UPS provisioning, SCADA-capable metering, and phased commissioning to minimize operational downtime.',
  },
  {
    title: 'Arba Minch University',
    subtitle: 'Industrial Power & Mechanical Systems',
    summary:
      'Integrated mechanical and power systems with robust sequencing and control for industrial facilities.',
    badges: ['Industrial Systems', 'Mechanical Works', 'Campus Expansion'],
    accent: 'from-[#10B981]/30 via-[#111827] to-[#0b1220]',
    details:
      'Scope included PLC-based control integration, motor-start sequencing, energy-efficiency optimization, and spare-part profiling for sustainable operations.',
  },
  {
    title: 'Hospitality & Commercial Sites',
    subtitle: 'Fit-out, Utilities, and Logistics Support',
    summary:
      'Coordinated MEP fit-out and logistics for hotels and commercial developments, delivered with strict QA and detailed handover documentation.',
    badges: ['Hospitality', 'Fit-out', 'Supply Chain'],
    accent: 'from-[#38BDF8]/30 via-[#111827] to-[#0b1220]',
    details:
      'Scope included vendor-managed logistics, coordinated MEP fit-out sequencing, comprehensive on-site QA/QC, and tailored handover documentation for operations teams.',
  },
  
]

export const partners: PartnerTickerItem[] = [
  { name: 'University of Gondar', category: 'Education' },
  { name: 'Arba Minch University', category: 'Education' },
  { name: 'Premium Hotels', category: 'Hospitality' },
  { name: 'Industrial Parks', category: 'Manufacturing' },
  { name: 'Public Infrastructure', category: 'Civic Projects' },
  { name: 'Commercial Developers', category: 'Real Estate' },
]
export const faqs: FaqItem[] = [
  {
    question: 'What project sizes do you typically handle?',
    answer:
      'We support large-scale B2B programs ranging from campus infrastructure and commercial fit-outs to industrial supply and cross-border procurement.',
  },
  {
    question: 'Do you manage both sourcing and on-site execution?',
    answer:
      'Yes. We can coordinate procurement, logistics, and field delivery so the technical scope stays consistent from order through handover.',
  },
  {
    question: 'Can you work with architects, consultants, or general contractors?',
    answer:
      'Absolutely. Our team integrates into multi-stakeholder project environments and aligns with the design and delivery teams on site.',
  },
  {
    question: 'How do I request a quotation?',
    answer:
      'Use the inquiry form below with your company and project details. We will route the request for technical review and follow-up.',
  },
]