import emailjs from '@emailjs/browser';
import { useState, type FormEvent, type ReactNode } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import {
  ArrowRight,
  Menu,
  Mail,
  MapPin,
  Send,
  PhoneCall,
  Sparkles,
  X,
} from 'lucide-react'
import { Reveal } from './components/Reveal'
import { faqs } from './data'
import type { ContactFormErrors, ContactFormValues } from './types'
import './App.css'

const projectTypes = [
  'Electromechanical Contracting',
  'Industrial Equipment Supply',
  'Architectural & Structural Engineering',
  'Global Import / Export Logistics',
  'Integrated Project Support',
 ] as const

const initialFormValues: ContactFormValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
}




// Specialized unique descriptions matching each capability idea
const capabilityDetails: Record<string, string> = {
  'Electrical Material Supply':
    'Supply of high-quality electrical materials including power cables (1.5 mm² × 2 core up to 3 × 300 mm² + 150 mm²), industrial generators ranging from 5 kVA to 1200 kVA, Automatic Transfer Switches (ATS), terminal boxes with phase bars, energy meters, lighting systems, and full electrical distribution accessories for industrial and commercial projects.',

  'Control Panels & Protection Systems':
    'Design, assembly, and supply of electrical control panels including MCB, MCCB, ACB, and RCD protection systems. We provide full panel integration, wiring, testing, safety verification, and commissioning to ensure reliable and safe power distribution.',

  'Electromechanical Services':
    'Complete electromechanical solutions including supply and installation of power feeder cables, control panels, electrical distribution systems, equipment integration, site installation supervision, testing, and full system commissioning for industrial and infrastructure projects.',

  'Testing & Commissioning':
    'Full electrical system testing and commissioning services including load testing, insulation resistance testing, performance verification, safety compliance inspection, fault detection, and final operational handover with technical documentation.'
}

// Portfolio projects with exact requested public file paths and professional descriptions
const portfolioProjects = [  {
    id: 'minilik-hospital',
    title: 'Minilik Second Hospital Existing Building (B + G + 8)',
    category: 'Electromechanical & Maintenance',
    description: 'Comprehensive electrical installation and high-capacity machine maintenance. Executed the strategic setup and optimization of a 300 KVA Uninterruptible Power Supply (UPS) system, alongside a heavy-duty 1200 KVA power Transformer and an integrated Automatic Transfer Switch (ATS). Additionally completed specialized structural routing and fixing of dedicated primary electrical lines to enhance infrastructure reliability for the hospital morgue facility.',
    image: '/Minilik Second.webp',
    metrics: ['300 KVA UPS', '1200 KVA Transformer', 'ATS Integration']
  },
  
  {
    id: 'lideta-subcity',
    title: 'Lideta Sub City Administration Complex (2B + G + 11)',
    category: 'Heavy Electrical Installation',
    description: 'Large-scale structural electrical infrastructure layout and substation implementation for a landmark administrative complex. Primary engineering scope focused on the positioning, configuring, and testing of heavy power distribution Transformers alongside robust Air Circuit Breaker (ACB) control panels engineered to safely manage high-amperage feeds rated strictly above 1200A.',
image: '/Lidta Sub City (2B + G + 11).webp',
    metrics: ['2B + G + 11 Scale', 'ACB Control Panels', 'Feeds > 1200A']
  },
  {
    id: 'corridor-projects',
    title: 'Addis Ababa Urban Corridor Infrastructure Projects',
    category: 'Civic Infrastructure & Lighting',
    description: 'Dynamic urban renewal and municipal electrical network development across high-priority transport corridors. Scope involved structural foundation anchoring, cable layout orchestration, and parameter alignment for high-efficiency corridor street light poles ranging from 4 to 6 meters in height, complete with matching garden lighting systems and integrated public outdoor grid amenities.',
    image: '/Corridor projects Around Adiss Abeba light poles 4-6 meters & Garden light & others.jpg',
    metrics: ['4-6m Light Poles', 'Garden Systems', 'Corridor Grid']
  },
{
  id: 'alert-hospital',
  title: 'Alert Hospital Trauma Center',
  category: 'Healthcare Infrastructure',
  description:
    'Focused on power distribution systems, electrical wiring installations, and compliance with building electrical codes to ensure stable and safe power supply for critical healthcare operations.',
  image: '/alert.jpg',
  metrics: ['Healthcare', 'HVAC', 'Power Systems'],
},
{
  id: 'cinema-complex',
  title: 'Cinema Complex Development',
  category: 'Commercial Entertainment',
  description:
    'Implementation of electrical wiring systems, power distribution networks, and building code compliance to support lighting, HVAC, and entertainment infrastructure.',
  image: '/cinema.jpg',
  metrics: ['Cinema', 'MEP Systems', 'Commercial'],
},
{
  id: 'fhc',
  title: 'FHC (Federal Housing Corporation) - Zenebe Work 3',
  category: 'Residential Infrastructure',
  description:
    'Electrical power distribution, wiring installation, and adherence to building electrical codes for residential infrastructure development.',
  image: '/FHC.jpg',
  metrics: ['Housing', 'Residential', 'Infrastructure'],
},
{
  id: 'shala-etete',
  title: 'Shala Etete Real Estate',
  category: 'Real Estate Development',
  description:
    'Electrical installation works focused on power distribution, wiring systems, and compliance with building codes for real estate projects.',
  image: '/shala.jpg',
  metrics: ['Real Estate', 'Construction', 'MEP'],
},
{
  id: 'welega-university',
  title: 'Wolega University Shambu Campus Administrative Office',
  category: 'Educational Infrastructure',
  description:
    'Electrical power distribution and wiring installation aligned with building code standards to support reliable campus infrastructure.',
  image: '/welega.jpg',
  metrics: ['University', 'Education', 'Engineering'],
}
]

// Explicitly defined custom moving data array matching the detailed text found in the document photos
const certifications = [
  {
    title: "Professional License",
    file: "/biru1.jpg",
  },
  {
    title: "Business License & Tax Registration Certificate",
    file: "/biru2.jpg",
  },
  {
    title: "Professional Certification",
    file: "/biru3.png",
  },
  {
  title: "Work Experience Verification Letter",
  file: "/biru4.jpg"
}
]
const clientProjects = [
  {
    project: "Nifas Silk Lafto Sub City Building (2B+ G+11)",
    client: "ETETE Construction",
    totalAmount: 1755124.42,
  },
  {
    project: "Shala Etete real state (B+ G+11)",
    client: "ETETE Construction",
    totalAmount: 5240856.22,
  },
  {
    project: "Bantu Hospital",
    client: "ETETE Construction",
    totalAmount: 421853.96,
  },
  {
    project: "Addis Ababa Municipality Maintenance",
    client: "ETETE Construction and AV Engineering",
    totalAmount: 312442.39,
  },
  {
    project: "Wolega university Shambu campus Administrative office",
    client: "ETETE Construction",
    totalAmount: 670455.96,
  },
  {
    project: "BuliHora Administrative office (2 blocks G+4)",
    client: "AV Engineering",
    totalAmount: 3160833.0,
  },
  {
    project: "Negele Borena Administrative office (G+3)",
    client: "AV Engineering",
    totalAmount: 1752131.0,
  },
  {
    project: "CMC Mezaber Trading Mixed use Building (2 B + G+8)",
    client: "ETETE Construction",
    totalAmount: 3130522.78,
  },
  {
    project: "T/Haimanot Mixed use Building (B+ G+11)",
    client: "ETETE Construction",
    totalAmount: 753889.32,
  },
  {
    project: "Bole Amrosh (B+ G+11)",
    client: "ETETE Construction",
    totalAmount: 318698.18,
  },
  {
    project: "Crown Site 40/60 (2 blocks, B+ G+9)",
    client: "MURAZA LAJA Construction",
    totalAmount: 485381.0,
  },
  {
    project: "FHC (Federal Housing Corporation) Zenebe Work 3",
    client: "ETETE Construction",
    totalAmount: 19258629.99,
  },
];
function App() {
  
  const [] = useState(false)
const [] = useState<string | null>(null)
  const [] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle')
  
  // Interactive state tracking for the corporate capabilities panel
  const [selectedCapability, setSelectedCapability] = useState<string>('Electrical Material Supply')
const [showAllProjects, setShowAllProjects] = useState(false)
const [showContractPortfolio, setShowContractPortfolio] = useState(false)
const [] = useState(false)
const [selectedCredential, setSelectedCredential] = useState<string | null>(null)
  

  const validateForm = (values: ContactFormValues) => {
    const nextErrors: ContactFormErrors = {}

    if (!values.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!values.company.trim()) nextErrors.company = 'Please enter your company name.'
if (!values.email.trim()) {
  nextErrors.email = 'Please enter your email.'
} else if (
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
) {
  nextErrors.email = 'Please enter a valid email address.'
}
   if (!values.phone.trim()) {
  nextErrors.phone = 'Please enter a phone number.'
} else {
  const phone = values.phone.replace(/[\s()-]/g, '')

  const ethiopianPhoneRegex =
    /^(09\d{8}|07\d{8}|\+2519\d{8}|\+2517\d{8})$/

  if (!ethiopianPhoneRegex.test(phone)) {
    nextErrors.phone =
      'Enter a valid Ethiopian number (09..., 07..., +2519..., or +2517...)'
  }
}
    if (!values.projectType) nextErrors.projectType = 'Please select a project type.'
    if (values.message.trim().length < 20) {
      nextErrors.message = 'Please add a few more details about the project.'
    }

    return nextErrors
  }

  const updateField = <K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    setFormErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
    setFormStatus('idle')
  }

 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  const nextErrors = validateForm(formValues)
  setFormErrors(nextErrors)

  if (Object.keys(nextErrors).length > 0) {
    return
  }

  try {
await emailjs.send(
  'service_ad2uwwc',
  'template_nixvmai',
  {
    full_name: formValues.fullName,
    company: formValues.company,
    email: formValues.email,
    reply_to: formValues.email,
    phone: formValues.phone,
    project_type: formValues.projectType,
    message: formValues.message
  },
  '8hiFmTOP3G_j_5KYs'
)

   setFormStatus('success')
setFormValues(initialFormValues)

// auto hide success after 4 seconds
setTimeout(() => {
  setFormStatus('idle')
}, 4000)
  } catch (error) {
  console.error('EmailJS Error:', error)
  alert(JSON.stringify(error))
}
}

  // Pure strict explicit order matching requested layout
  const orderedNavLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090d15] text-white selection:bg-[#0a84ff] selection:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-96 w-96 rounded-full bg-[#0a84ff]/18 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-[#10b981]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%)]" />
      </div>

      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090d15]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a href="#home" className="flex items-center gap-3 group">
  
  {/* LOGO */}
  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden">
    <img
      src="/image.png"
      alt="Biruk logo"
      className="h-10 w-10 object-contain transition duration-300 group-hover:scale-110"
    />
  </span>

  {/* NAME */}
  <span className="text-xl font-black uppercase tracking-[0.35em] text-white transition duration-300 group-hover:text-[#0a84ff]">
    Biruk
  </span>

</a>
<div className="hidden items-center gap-2 lg:flex">
  {orderedNavLinks.map((link) => (
    <a
      key={link.href}
      href={link.href}
      className="
        relative px-4 py-2 rounded-full
        text-sm font-medium text-white/60
        transition-all duration-300 ease-out

        hover:text-white
        hover:bg-white/10
        hover:backdrop-blur-md
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        hover:-translate-y-0.5

        active:scale-95
      "
    >
      {link.label}
    </a>
  ))}
</div>
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#0a84ff]/40 bg-[#0a84ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(10,132,255,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f94ff]"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:border-white/25 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {mobileMenuOpen ? (
          <div className="border-t border-white/10 bg-[#090d15]/95 px-5 pb-5 pt-3 backdrop-blur-xl lg:hidden sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {orderedNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0a84ff] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(10,132,255,0.3)]"
              >
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="main-with-fixed-header">
        {/* --- HOME SECTION --- */}
        <section id="home" className="home-hero px-5 pb-24 pt-20 sm:px-8 lg:px-10 lg:pt-32 relative overflow-hidden min-h-[85vh] flex items-center">
         <div className="absolute inset-0 z-0">
  <img
    src="/spencerwing-power-plant-2840909_1920.jpg"
    alt="Home Background"
    className="h-full w-full object-cover object-center brightness-110 contrast-105"
  />
</div>

          <div className="mx-auto max-w-7xl relative z-10 w-full">
            <div className="py-12 sm:py-16 lg:py-20">
              <div className="max-w-4xl hero-content">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0a84ff]/20 bg-[#0a84ff]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7dd3fc] mb-6">
                  <Sparkles className="h-4 w-4" />
                  Where expertise meets dedication
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">Engineering Excellence.</h1>

                <p className="mt-3 max-w-xl text-lg leading-8 text-white/80">
  We specialize in <span className="font-bold text-white">advanced building electrical installations</span>, 
  <span className="font-bold text-white">premium material supply</span>, precision testing, and certified commissioning services. 
  From heavy industrial infrastructure to commercial complexes, we deliver high-quality engineering systems designed for safe, reliable, and efficient operation.
</p>
                <div className="mt-8 hero-cta-wrap">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a84ff] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(10,132,255,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f94ff]"
                  >
                    Contact Us
                    <PhoneCall className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow=""
                title="About"
                description="We operate with a structured engineering approach aligned with the requirements of institutional investors, industrial procurement teams, and large-scale infrastructure developers, ensuring reliability, compliance, and execution excellence across all projects."
              />
              
            </Reveal>

<div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-12">
                <Reveal>
                {/* --- MODERN ABOUT CORE SECTION --- */}
<div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

  {/* HEADER */}
  <div className="flex items-start justify-between border-b border-white/10 pb-5">
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-[#7dd3fc]/80">
        Company Overview
      </p>

      <h3 className="mt-2 text-2xl font-semibold text-white">
        Engineering Execution & Power Systems Focus
      </h3>
    </div>

    <div className="rounded-full border border-[#0a84ff]/20 bg-[#0a84ff]/10 px-3 py-1 text-xs font-semibold text-[#7dd3fc]">
      Active
    </div>
  </div>

  {/* SIMPLE DESCRIPTION */}
  <p className="mt-6 text-sm leading-7 text-white/70">
    Biruk Trading & Engineering focuses on electrical power systems, building wiring,
    and material supply for construction and infrastructure projects. We ensure
    safe power distribution, structured installation, and compliance with building standards.
  </p>

  {/* AFFILIATION */}
  <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
      Corporate Affiliation
    </p>

    <p className="mt-3 text-sm text-white/70 leading-6">
      Sister company of <span className="text-white font-semibold">
        Yilma General Electrical & Electromechanical Materials Supply & Fix
      </span>
    </p>

    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#7dd3fc]">
      Grade “ሀ” Taxpayer Company
    </div>
  </div>

  {/* CORE STRENGTHS (CLEAN LIST) */}
  <div className="mt-6">
    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
      Core Strengths
    </p>

    <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-white/70">
      <div className="flex items-start gap-2">
        <span className="text-[#0a84ff]">•</span>
        Electrical power distribution systems
      </div>

      <div className="flex items-start gap-2">
        <span className="text-[#0a84ff]">•</span>
        Building electrical wiring installation
      </div>

      <div className="flex items-start gap-2">
        <span className="text-[#0a84ff]">•</span>
        Electrical material supply for projects
      </div>

      <div className="flex items-start gap-2">
        <span className="text-[#0a84ff]">•</span>
        System testing & commissioning support
      </div>
    </div>
  </div>

  {/* WORK FLOW (SIMPLIFIED) */}
  <div className="mt-8">
    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
      Project Flow
    </p>

    <div className="mt-4 space-y-3">

      {[
        "Design & electrical planning for building systems",
        "Material supply and site preparation",
        "Electrical installation and wiring execution",
        "Testing, verification, and final handover"
      ].map((step, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a84ff]/20 text-xs font-bold text-[#7dd3fc]">
            {i + 1}
          </span>
          <span className="text-sm text-white/70">{step}</span>
        </div>
      ))}

    </div>
  </div>

</div>
              </Reveal>

              <Reveal delay={80}>
<div className="grid gap-6 self-start">                  
<div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(10,132,255,0.08),rgba(255,255,255,0.02),rgba(16,185,129,0.04))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">

  {/* HEADER */}
  <div className="flex items-center justify-between border-b border-white/10 pb-4">
    <div>
      <p className="text-xs uppercase tracking-[0.32em] text-white/45">
        Core Frameworks
      </p>

      <h3 className="mt-1 text-xl font-semibold text-white">
        Cross-functional industrial capability
      </h3>
    </div>

    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#7dd3fc]">
      Active
    </div>
  </div>

  {/* GRID + DETAILS (SAME PANEL) */}
  <div className="mt-6 space-y-3">

    {[
      'Electrical Material Supply',
      'Control Panels & Protection Systems',
      'Electromechanical Services',
      'Testing & Commissioning'
    ].map((item) => {
      const isSelected = selectedCapability === item;

      return (
        <button
          key={item}
          onClick={() => setSelectedCapability(item)}
          className={`w-full text-left rounded-xl border px-4 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
            isSelected
              ? 'border-[#0a84ff] bg-[#0a84ff]/15 text-white'
              : 'border-white/5 bg-black/40 text-white/60 hover:border-white/20'
          }`}
        >
          {item}
        </button>
      );
    })}

  </div>

  {/* DETAILS INSIDE SAME BOX */}
  <div className="mt-6 border-t border-white/10 pt-5">
    <p className="text-[10px] uppercase tracking-[0.35em] text-[#7dd3fc]/70">
      Technical Parameters — {selectedCapability}
    </p>

    <p className="mt-3 text-sm leading-7 text-white/70">
      {capabilityDetails[selectedCapability]}
    </p>
  </div>

</div>
                </div>
              </Reveal>
            </div>
          </div>
          {/* CERTIFICATIONS & CREDENTIALS */}

<section className="px-5 py-20 sm:px-8 lg:px-10">
  <div className="mx-auto max-w-7xl">

    <div className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff]">
        Certifications & Credentials
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
        Verified Company Documents
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-white/60">
        Official business registrations, licenses and credentials demonstrating
        our operational compliance and engineering capabilities.
      </p>
    </div>

<div className="mt-12 flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
        {certifications.map((item) => (

        <div
  key={item.title}
className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
>
          <img
            src={item.file}
            alt={item.title}
            className="h-64 w-full object-cover"
          />

          <div className="p-6">
            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>

            <button
              onClick={() => setSelectedCredential(item.file)}
              className="mt-4 w-full rounded-xl bg-[#0a84ff] px-5 py-3 text-sm font-semibold text-white hover:bg-[#158dff]"
            >
              View Document
            </button>
          </div>
        </div>

      ))}

    </div>

  </div>
</section>
          <section className="px-5 py-20 sm:px-8 lg:px-10">
  <div className="mx-auto max-w-7xl">
    
    <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(10,132,255,0.08),rgba(255,255,255,0.02),rgba(16,185,129,0.04))] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff]">
          Company Performance
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Proven Engineering Excellence
        </h2>

        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          Delivering reliable electromechanical, infrastructure, and industrial
          engineering solutions across Ethiopia.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center hover:border-[#0a84ff]/40 transition duration-300">
          <h3 className="text-5xl font-black text-[#0a84ff]">8+</h3>
          <p className="mt-3 text-white/70">
            Years of Proven Experience
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center hover:border-[#0a84ff]/40 transition duration-300">
          <h3 className="text-5xl font-black text-[#0a84ff]">50+</h3>
          <p className="mt-3 text-white/70">
            Skilled Engineers & Technicians
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center hover:border-[#0a84ff]/40 transition duration-300">
          <h3 className="text-5xl font-black text-[#0a84ff]">100+</h3>
          <p className="mt-3 text-white/70">
            Projects Successfully Delivered
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center hover:border-[#0a84ff]/40 transition duration-300">
          <h3 className="text-5xl font-black text-[#10b981]">24/7</h3>
          <p className="mt-3 text-white/70">
            Technical & Project Support
          </p>
        </div>

      </div>

      <div className="mt-10 rounded-2xl border border-[#0a84ff]/20 bg-[#0a84ff]/5 p-6 text-center">
        <p className="text-sm text-white/80">
          Trusted by healthcare institutions, universities, commercial developments,
          government projects, and industrial infrastructure programs.
        </p>
      </div>

    </div>
  </div>
</section>
        </section>

        {/* --- PORTFOLIO SECTION --- */}
        <section id="portfolio" className="px-5 py-20 sm:px-8 lg:px-10 border-t border-white/5 bg-black/[0.15]" >
        {/* --- COMPANY STATS SECTION --- */}

          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow=""
                title="Selected projects"
                description="Reviewing our past construction deployment history, custom parameter setups, and high-voltage grid integration schemes completed within strict municipal and health guidelines."
              />
            </Reveal>

<div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                 {(showAllProjects
  ? portfolioProjects
  : portfolioProjects.slice(0, 3)
).map((project, index) => (
                <Reveal key={project.id} delay={index * 100}>
                  <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1527]/40 shadow-2xl backdrop-blur-md hover:border-white/20 transition-all duration-300 group">
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-white/5">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute left-4 top-4 rounded-xl bg-[#090d15]/90 border border-white/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#7dd3fc] backdrop-blur-md">
                        {project.category}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-[#0a84ff] transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="mt-4 flex-1 text-sm leading-7 text-white/60">
                        {project.description}
                      </p>
                      
                      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {project.metrics.map((metric) => (
                          <span key={metric} className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-semibold text-[#7dd3fc]">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center gap-5">

  {/* PROJECT BUTTON */}
  <button
  onClick={() => {
    const nextState = !showAllProjects

    setShowAllProjects(nextState)

    if (!nextState) {
      setShowContractPortfolio(false)
    }

    document
      .getElementById('portfolio')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }}
  className="
    group
    relative
    overflow-hidden
    rounded-full
    border
    border-[#0a84ff]/30
    bg-[#0a84ff]
    px-8
    py-4
    text-sm
    font-semibold
    text-white
    shadow-[0_20px_60px_rgba(10,132,255,0.35)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-[1.02]
  "
>
  <span className="relative z-10 flex items-center gap-2">
    {showAllProjects
      ? "Show Featured Projects"
      : "Explore Full Portfolio"}

    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
  </span>
</button>

  {/* SECOND BUTTON */}
  {showAllProjects && (

    <div className="mt-8 flex justify-center">
  <button
    type="button"
    onClick={() => setShowContractPortfolio(prev => !prev)}
    className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white transition hover:border-[#0a84ff]"
  >
    {showContractPortfolio
      ? "Hide Contract Portfolio"
      : "Explore Contract Portfolio"}
  </button>
</div>
  )}

</div>
{showContractPortfolio && (

<section className="mt-10">

  <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">

    <h2 className="text-3xl font-bold text-white">
      Financial Project Overview
    </h2>

    <p className="mt-2 text-white/60">
      Project values, clients and completed contracts.
    </p>

<div className="mt-8 w-full overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm text-white/70">

        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Client</th>
            <th className="px-6 py-4">Contract Value</th>
          </tr>
        </thead>

        <tbody>

          {clientProjects.map((item, i) => (

            <tr
              key={i}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="px-6 py-4">
                {item.project}
              </td>

              <td className="px-6 py-4">
                {item.client}
              </td>

              <td className="px-6 py-4 text-[#7dd3fc] font-semibold">
                ETB {item.totalAmount.toLocaleString()}
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</section>

)}
      {/* --- CLIENT PROJECTS TABLE --- */}

        </section>

        {/* --- SERVICES SECTION --- */}
       {/* --- SERVICES SECTION (MODERN UPGRADE) --- */}
<section
  id="services"
  className="px-5 py-24 sm:px-8 lg:px-10 border-t border-white/5 bg-[#070b12]"
>
  <div className="mx-auto max-w-7xl">

    <SectionHeading
      eyebrow=""
      title="Our Core Services"
      description="Focused electrical engineering execution, power distribution systems, wiring infrastructure, and compliant building installations for industrial and commercial projects."
    />

    {/* GRID */}
<div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
      {[
        {
          title: "Power Distribution Systems",
          desc: "Design and execution of safe and stable electrical power distribution networks for buildings and industrial facilities.",
          icon: "⚡"
        },
        {
          title: "Electrical Wiring Installation",
          desc: "Complete internal and external wiring systems aligned with international building electrical standards and safety codes.",
          icon: "🔌"
        },
        {
          title: "Building Electrical Compliance",
          desc: "Ensuring all installations follow approved electrical building codes, safety regulations, and inspection requirements.",
          icon: "📐"
        },
        {
          title: "Electrical Material Supply",
          desc: "Provision of certified electrical components, cables, breakers, panels, and distribution accessories for projects.",
          icon: "📦"
        },
        {
          title: "Site Installation Support",
          desc: "On-site supervision and support for electrical installation, routing, and system setup during construction phases.",
          icon: "🏗️"
        },
        {
          title: "System Testing & Verification",
          desc: "Basic electrical testing, continuity checks, and functional verification before system activation.",
          icon: "🧪"
        }
      ].map((service, i) => (
        <div
          key={i}
          className="
            group relative overflow-hidden
            rounded-2xl border border-white/10
            bg-white/[0.03]
            p-6
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#0a84ff]/40
            hover:bg-white/[0.06]
          "
        >

          {/* glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#0a84ff]/10 via-transparent to-[#10b981]/10" />

          {/* ICON */}
          <div className="relative flex items-center gap-3">
            <div className="text-2xl">{service.icon}</div>

            <h3 className="text-base font-semibold text-white group-hover:text-[#0a84ff] transition">
              {service.title}
            </h3>
          </div>

          {/* DESCRIPTION */}
          <p className="relative mt-4 text-sm leading-6 text-white/60">
            {service.desc}
          </p>

          {/* bottom line */}
          <div className="relative mt-6 h-[1px] w-full bg-white/5 overflow-hidden">
            <div className="h-full w-0 group-hover:w-full transition-all duration-500 bg-[#0a84ff]" />
          </div>

        </div>
      ))}

    </div>
  </div>
</section>

        {/* --- TRUST SECTION / HORIZONTAL TICKER --- */}
        <section id="trust" className="px-5 py-10 sm:px-8 lg:px-10 bg-black/[0.1]">
        
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow=""
                title="Live Operations Ticker"
                description="The horizontal dynamic viewport provides persistent reference points of municipal, high-voltage, and hospital systems engineering workflows."
              />
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] py-6 shadow-inner backdrop-blur-xl">
               <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] py-6 shadow-inner backdrop-blur-xl">

  <div className="project-slider-wrapper">

    <div className="project-slider-track">

      {[...portfolioProjects, ...portfolioProjects].map((project, index) => (

        <div key={index} className="project-slide">

          <img
            src={project.image}
            alt={project.title}
            className="project-slide-image"
          />

          <div className="project-slide-overlay">

            <span className="project-slide-category">
              {project.category}
            </span>

            <h3 className="project-slide-title">
              {project.title}
            </h3>

          </div>

        </div>

      ))}

    </div>

  </div>

</div>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/45">FAQ</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Common project questions.</h3>

                  <div className="mt-6 space-y-3">
                    {faqs.map((faq, index) => {
                      const isOpen = activeFaq === index
                      return (
                        <div key={faq.question} className="rounded-2xl border border-white/5 bg-black/30 overflow-hidden transition-all duration-300">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                            aria-expanded={isOpen}
                          >
                            <span className="text-sm font-medium text-white/90 sm:text-base">{faq.question}</span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <div className="overflow-hidden px-5">
                              <p className="text-sm leading-7 text-white/60 border-t border-white/5 pt-3">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.02),rgba(10,132,255,0.05),rgba(16,185,129,0.02))] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-[#0a84ff]/25 bg-[#0a84ff]/12 p-3 text-[#7dd3fc]">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.32em] text-white/45">Need a quick answer?</p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                        Share the scope, and we will take it from there.
                      </h3>
                    </div>
                  </div>

                  <div className="quick-contact mt-6 flex flex-col sm:flex-row gap-3">
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=temesgengodebo19@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 text-center border border-white/10 rounded-xl bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#0a84ff] transition-all duration-300"
>
  Email Us
</a>                   
<a
  href="tel:+251911045505"
  className="flex-1 text-center border border-[#0a84ff]/30 rounded-xl bg-[#0a84ff]/10 text-[#7dd3fc] px-4 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#0a84ff] hover:text-white transition-all duration-300"
>
  Call Representative
</a>             
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { label: 'Technical clarity', value: 'Scope-first, B2B-friendly communication.' },
                      { label: 'Delivery model', value: 'Flexible support across sourcing and site execution.' },
                      { label: 'Industries', value: 'Education, hospitality, industrial, and commercial.' },
                      { label: 'Response channel', value: 'Contact form, phone, or direct email inquiry.' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-white/5 bg-black/40 p-4">
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#0a84ff]">{item.label}</p>
                        <p className="mt-2 text-xs leading-5 text-white/70">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
 
<section
  id="contact"
  className="px-5 py-24 sm:px-8 lg:px-10 border-t border-white/5 bg-gradient-to-b from-[#070b12] to-[#05070c]"
>
  <div className="mx-auto max-w-7xl">

    <SectionHeading
      eyebrow=""
      title="Let’s Build Something Powerful"
      description="Share your project scope and we’ll respond with technical guidance, cost estimation, or full execution plan."
    />

    {/* GRID */}
<div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
        {/* LEFT SIDE */}
<div className="flex flex-col gap-6 h-full">
        {/* HEADQUARTERS */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-7">
          <p className="text-xs uppercase tracking-[0.35em] text-[#7dd3fc]/80">
            Headquarters
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-white">
             View Office Location
          </h3>

          <p className="mt-3 text-sm text-white/60 leading-7">
            Available for industrial, healthcare, government and commercial engineering projects across Ethiopia.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60">
              Currently accepting new projects
            </span>
          </div>
        </div>

        {/* CONTACT CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">{[
  {
    label: "Phone",
    type: "dropdown",
    icon: PhoneCall,
    options: [
      { text: "+251 974 438 122" },
      { text: "+251 911 137 775" },
      { text: "+251 911 045 505" }
    ]
  },
  {
    label: "Email",
    value: "birukyisihak3@gmail.com",
    icon: Mail,
href: "https://mail.google.com/mail/?view=cm&fs=1&to=birukyisihak3@gmail.com"
  },
  {
    label: "Telegram",
    value: "@Biruk002",
    icon: Send,
    href: "https://t.me/Biruk002"
  },

  // ✅ ADD THIS HERE
  {
    label: "LinkedIn",
    value: "Biruk Yisihak",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/biruk-yisihak/"
  },

  {
    label: "Location",
    value: "British Embassy – Yeka (Megenagna area), Addis Ababa",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=British+Embassy+Addis+Ababa+Comoros+Street"
  }
].map((item) => (

  item.type === "dropdown" ? (
    /* 🔥 DROPDOWN CARD (PHONE) */
    <div
      key={item.label}
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-[#7dd3fc] border border-white/5">
          <item.icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            {item.label}
          </p>

          <p className="text-sm font-medium text-white/80">
            Available Numbers
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
      {item.options.map((opt: any) => (
  <a
    key={opt.text}
    href={`tel:${opt.text.replace(/\s+/g, '')}`}
    className="
      flex items-center justify-between
      rounded-xl
      border border-white/10
      bg-white/[0.03]
      px-3 py-3
      text-sm font-medium
      text-[#7dd3fc]
      transition-all duration-300
      hover:border-[#0a84ff]
      hover:bg-[#0a84ff]/10
      hover:text-white
    "
  >
    <span>{opt.text}</span>
    <PhoneCall className="h-4 w-4" />
  </a>
))}
      </div>
    </div>

  ) : (

    /* 🔥 NORMAL CARDS (EMAIL, TELEGRAM, LOCATION) */
    <a
      key={item.label}
      href={item.href}
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-3
      hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
    >
      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-[#7dd3fc] border border-white/5">
        <item.icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-white/40">
          {item.label}
        </p>

        <p className="text-sm font-medium text-white/80 truncate">
          {item.value}
        </p>
      </div>
    </a>

  )

))}
        </div>

        {/* RESPONSE TIME */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7dd3fc]/70">
            Response Time
          </p>
          <p className="mt-2 text-sm text-white/60 leading-6">
            Typically within 24 hours for engineering inquiries and project proposals.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE FORM */}
{/* RIGHT SIDE FORM */}
<div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 h-full flex flex-col">

  {/* HEADER */}
<div className="mb-4 border-b border-white/5 pb-3">
{formStatus === 'success' && (
  <div className="mb-6 rounded-2xl border border-green-400/20 bg-green-500/10 p-5">

    <div className="flex items-start gap-3">

      {/* ICON */}
      <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-300 border border-green-400/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm font-semibold text-green-300">
          Message Sent Successfully 🚀
        </p>

        <p className="text-xs text-white/60 mt-1">
          We received your inquiry and will respond within 24 hours.
        </p>

        <p className="text-xs text-white/40 mt-2">
          Project Type: {formValues.projectType || "Not specified"}
        </p>
      </div>

    </div>
  </div>
)}
    <p className="text-xs uppercase tracking-[0.35em] text-[#7dd3fc]/80">
      Project Inquiry
    </p>

    <h3 className="mt-2 text-2xl font-semibold text-white">
      Tell us about your project
    </h3>

    <p className="mt-1 text-sm text-white/50">
      Fast technical response within 24 hours
    </p>
  </div>

  {/* FORM */}
<form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
    {/* ROW: NAME + COMPANY */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldLabel text="Full Name" error={formErrors.fullName}>
        <input
          className={inputClassName(formErrors.fullName)}
          value={formValues.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </FieldLabel>

      <FieldLabel text="Company" error={formErrors.company}>
        <input
          className={inputClassName(formErrors.company)}
          value={formValues.company}
          onChange={(e) => updateField("company", e.target.value)}
          placeholder="Company"
        />
      </FieldLabel>
    </div>

    {/* PHONE */}

<FieldLabel text="Email" error={formErrors.email}>
  <input
    type="email"
    autoComplete="email"
    className={inputClassName(formErrors.email)}
    value={formValues.email}
    onChange={(e) => updateField('email', e.target.value)}
    placeholder="john@company.com"
  />
</FieldLabel>

   <FieldLabel text="Phone" error={formErrors.phone}>
  <input
    type="tel"
    autoComplete="tel"
    className={inputClassName(formErrors.phone)}
    value={formValues.phone}
    onChange={(e) => updateField("phone", e.target.value)}
    placeholder="+251911123456"
  />
</FieldLabel>
    {/* PROJECT TYPE */}
    <FieldLabel text="Project Type" error={formErrors.projectType}>
      <select
        className={inputClassName(formErrors.projectType)}
        value={formValues.projectType}
        onChange={(e) => updateField("projectType", e.target.value)}
      >
        <option value="">Select project type</option>
        {projectTypes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </FieldLabel>

    {/* MESSAGE (THIS WAS THE ISSUE AREA) */}
    <FieldLabel text="Message" error={formErrors.message}>
      <textarea
  className={
  inputClassName(formErrors.message) +
  " min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] resize-none leading-6 w-full"
}
    value={formValues.message}
        onChange={(e) => updateField("message", e.target.value)}
        placeholder="Brief scope, timeline, requirements..."
      />
    </FieldLabel>

    {/* BUTTON */}
    <button
      type="submit"
      className="w-full mt-auto rounded-xl bg-[#0a84ff] py-4 text-sm font-semibold text-white
      shadow-[0_10px_30px_rgba(10,132,255,0.25)]
      hover:shadow-[0_15px_40px_rgba(10,132,255,0.35)]
      hover:-translate-y-0.5 transition"
    >
      Send Inquiry
      <ArrowRight className="inline ml-2 h-4 w-4" />
    </button>

  </form>
</div>
    </div>
  </div>
</section>
{selectedCredential && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-5"
    onClick={() => setSelectedCredential(null)}
  >
    <div
      className="max-w-5xl"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedCredential}
        alt="Document"
        className="max-h-[90vh] rounded-2xl"
      />

      <button
        onClick={() => setSelectedCredential(null)}
        className="mt-4 w-full rounded-xl bg-[#0a84ff] py-3 font-semibold text-white"
      >
        Close
      </button>
    </div>
  </div>
)}
      </main>

      {/* --- Footer Component --- */}
      <footer className="border-t border-white/10 bg-[#060a12] px-5 py-12 sm:px-8 lg:px-10">
<div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">          
          <div className="flex flex-col gap-2 order-2 sm:order-1">
            <div className="flex flex-col gap-3">

  <h2 className="text-4xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-[#0a84ff] via-[#7dd3fc] to-[#10b981] bg-clip-text text-transparent">
    BIRUK
    <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#7dd3fc]/80">
  Founder & Managing Director
</p>
  </h2>

  <div className="flex items-center gap-2">
    <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-[#0a84ff] to-[#10b981]" />
    
  </div>

  <p className="text-sm text-white/50">
    © 2026
    <span className="font-semibold text-[#7dd3fc]">
      {" "}Biruk Trading & Engineering
    </span>.
    All rights reserved.
  </p>

</div>

          </div>
          
          

        </div>
      </footer>
    </div>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
  primaryId?: string
}

function SectionHeading({ eyebrow, title, description, primaryId }: SectionHeadingProps) {
  return (
    <div className="max-w-4xl" id={primaryId}>
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">{description}</p>
    </div>
  )
}

interface FieldLabelProps {
  text: string
  error?: string
  className?: string
  children: ReactNode
}

function FieldLabel({ text, error, className = '', children }: FieldLabelProps) {
  return (
<label className={`block w-full ${className}`}>
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.25em] text-white/40">{text}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-semibold text-[#fca5a5]">{error}</span> : null}
    </label>
  )
}

function inputClassName(error?: string) {
  const baseClassName =
'w-full rounded-xl border bg-[#0b1220]/60 px-3.5 py-3 text-sm text-white placeholder:text-white/20 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#0a84ff]/50 focus:bg-[#0b1220] focus:shadow-[0_0_0_4px_rgba(10,132,255,0.12)]'
  return error ? `${baseClassName} border-[#ef4444]/40` : `${baseClassName} border-white/5 hover:border-white/20`
}

export default App