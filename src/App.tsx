import emailjs from '@emailjs/browser';
import { useState, useRef, useEffect, type FormEvent, type ReactNode } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import Swal from "sweetalert2";
import {
  ArrowRight,
  Menu,
  MapPin,
  ChevronRight,
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
  'Industrial Equipment Supply',
  'Architectural & Structural Engineering',
  'Global Import Logistics',
  'Integrated Project Support',
  'Site Survey & Feasibility Assessment',
  'Electrical Load Calculation & Design',
  'Material Specification & Procurement',
  'Advance Payment & Contract Agreement',
  'Testing, Commissioning & Handover',
  'Maintenance & After-Sales Support',
  'Consensus & Technical Consultation',
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
  const [activeSection, setActiveSection] = useState("home");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [activeFaq, setActiveFaq] = useState<number | null>(null)
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}, [])
useEffect(() => {
  document.title = "Biruk Trading & Engineering | Electrical & Electromechanical Services"

  const meta = document.querySelector("meta[name='description']")
  if (meta) {
    meta.setAttribute(
      "content",
      "Electrical installation, power distribution, electromechanical services and engineering solutions in Ethiopia."
    )
  }
}, [])
useEffect(() => {
  const handleHashChange = () => {
    const id = window.location.hash.replace('#', '')
    if (id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  window.addEventListener('hashchange', handleHashChange)
  return () => window.removeEventListener('hashchange', handleHashChange)
}, [])
useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll("section[id]");

    let current = "home";

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop - 120;
      const sectionHeight = (section as HTMLElement).offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.id;
      }
    });

    setActiveSection(current);
  };

  window.addEventListener("scroll", handleScroll);

  // Set the correct section on page load
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
useEffect(() => {
  document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
  return () => {
    document.body.style.overflow = ''
  }
}, [mobileMenuOpen])
  const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle')
  const [loading, setLoading] = useState(false)
  const [, setIsSending] = useState(false);
  
  // Interactive state tracking for the corporate capabilities panel
const [selectedCapability, setSelectedCapability] = useState<string | null>(null)  
const [showAllProjects, setShowAllProjects] = useState(false)
const [showContractPortfolio, setShowContractPortfolio] = useState(false)
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
  setLoading(true)
  setIsSending(true);
  const nextErrors = validateForm(formValues)
  setFormErrors(nextErrors)

  if (Object.keys(nextErrors).length > 0) {
    setLoading(false)
    return
  }

  try {
    console.log("Sending with:", {
  service: import.meta.env.VITE_EMAILJS_SERVICE,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE,
  public: import.meta.env.VITE_EMAILJS_PUBLIC,
  data: {
    full_name: formValues.fullName,
    email: formValues.email,
    phone: formValues.phone,
  }
})
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE,
  import.meta.env.VITE_EMAILJS_TEMPLATE,
  {
    full_name: formValues.fullName,
    company: formValues.company,
    email: formValues.email,
    phone: formValues.phone,
    project_type: formValues.projectType,
    message: formValues.message,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC
);
  // ✅ SUCCESS UI STATE
  setFormStatus("success")
  setLoading(false)
  setIsSending(false)

  // optional scroll to contact
  setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    })
  }, 300)

  // reset form
  setFormValues(initialFormValues)

  // auto reset success message
  timeoutRef.current = setTimeout(() => {
    setFormStatus("idle")
  }, 5000)

  // 🔥 NICE POPUP (like professional systems)
  Swal.fire({
    icon: "success",
    title: "Message Sent Successfully",
    text: "We will contact you within 24 hours.",
    timer: 2000,
    showConfirmButton: false,
  })

} catch (error) {
  console.error("EmailJS Error:", error)

  setLoading(false)

  // ❌ ERROR UI
  Swal.fire({
    icon: "error",
    title: "Message Failed",
    text: "Please check your connection or try again later.",
  })
}}
useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
}, [])
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
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-4 lg:px-10">
          <a href="#home" className="flex min-w-0 items-center gap-2 sm:gap-3 group">
  
  {/* LOGO */}
<span className="relative flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-[#0a84ff]/30 shadow-[0_0_30px_rgba(10,132,255,0.35)] overflow-hidden">
    <img
      src="/image.png"
      alt="Biruk logo"
className="h-9 w-9 sm:h-12 sm:w-12 object-contain transition duration-300 group-hover:scale-110"    />
  </span>

  {/* NAME */}
<span className="
text-lg sm:text-2xl
font-black
uppercase
tracking-[0.2em] sm:tracking-[0.35em]
bg-gradient-to-r
from-[#0a84ff]
via-[#7dd3fc]
to-[#10b981]
bg-clip-text
text-transparent
transition
duration-300
truncate
">    Biruk
  </span>

</a>
<div className="hidden items-center gap-2 lg:flex">
{orderedNavLinks.map((link) => {
  const isActive = activeSection === link.href.replace("#", "");

  return (
    <a
      key={link.href}
      href={link.href}
      className={`
        relative px-4 py-2 rounded-full
        text-sm font-semibold transition-all duration-300

        ${
          isActive
            ? "bg-[#0a84ff]/20 text-[#0a84ff] shadow-[0_0_20px_rgba(10,132,255,0.35)]"
            : "text-white/60 hover:text-[#0a84ff] hover:bg-white/10"
        }
      `}
    >
      {link.label}
    </a>
  );
})}
</div>
          
          
          <div className="hidden items-center gap-3 lg:flex">
            <a
                    href="#contact"
className="
inline-flex
items-center
justify-center
gap-2
rounded-full
bg-[#0a84ff]
px-7
py-4
text-sm
font-semibold
text-white
shadow-[0_15px_40px_rgba(10,132,255,0.4)]
transition-all
duration-300
hover:-translate-y-1
hover:scale-105
hover:bg-[#1593ff]
"                  >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:border-white/25 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
aria-label={mobileMenuOpen ? 'Close mobile navigation menu' : 'Open mobile navigation menu'}
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
        <section id="home" className="home-hero px-4 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pt-32 relative overflow-hidden min-h-[80vh] sm:min-h-[85vh] flex items-center">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0a84ff]/20 bg-[#0a84ff]/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-white mb-4 sm:mb-6">
  <Sparkles className="h-4 w-4" />
  Where expertise meets dedication
</div>

<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
Engineering Excellence
<br />
<span className="text-[#7dd3fc]">
For Critical Infrastructure
</span>
</h1><div className="mt-6 flex flex-wrap gap-3">

<span className="rounded-full border border-[#7dd3fc]/70 bg-[#0a84ff]/30 px-4 py-2 text-xs font-black text-white shadow-[0_0_16px_rgba(10,132,255,0.5)] backdrop-blur-sm">
    Electrical Installation
  </span>

<span className="rounded-full border border-[#7dd3fc]/70 bg-[#0a84ff]/30 px-4 py-2 text-xs font-black text-white shadow-[0_0_16px_rgba(10,132,255,0.5)] backdrop-blur-sm">
 Power Distribution
  </span>

  <span className="rounded-full border border-[#7dd3fc]/70 bg-[#0a84ff]/30 px-4 py-2 text-xs font-black text-white shadow-[0_0_16px_rgba(10,132,255,0.5)] backdrop-blur-sm">

    Electrical Material Supply
  </span>

<span className="rounded-full border border-[#7dd3fc]/70 bg-[#0a84ff]/30 px-4 py-2 text-xs font-black text-white shadow-[0_0_16px_rgba(10,132,255,0.5)] backdrop-blur-sm">
    Testing & Commissioning
  </span>

</div>
               <p className="mt-3 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-white">
  We specialize in{' '}
  <span className="font-black text-[#7dd3fc]">advanced building electrical installations</span>,{' '}
  <span className="font-black text-[#7dd3fc]">premium material supply</span>,{' '}
  <span className="font-black text-[#7dd3fc]">precision testing</span>, and{' '}
  <span className="font-black text-[#7dd3fc]">certified commissioning services</span>.{' '}
  From heavy industrial infrastructure to commercial complexes, we deliver{' '}
  <span className="font-black text-[#0a84ff]">high-quality engineering systems</span>{' '}
  designed for{' '}
  <span className="font-black text-[#10b981]">safe, reliable, and efficient operation</span>.
</p>

                <div className="mt-8 hero-cta-wrap">
                  <a
                    href="#contact"
className="
inline-flex
items-center
justify-center
gap-2
rounded-full
bg-[#0a84ff]
px-7
py-4
text-sm
font-semibold
text-white
shadow-[0_15px_40px_rgba(10,132,255,0.4)]
transition-all
duration-300
hover:-translate-y-1
hover:scale-105
hover:bg-[#1593ff]
"                  >
                    Contact Us
                    <PhoneCall className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        {/* --- ABOUT SECTION --- */}
<section id="about" className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 relative overflow-hidden">

  {/* BACKGROUND GLOW */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#0a84ff]/5 blur-3xl" />
  </div>

  <div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <Reveal>
      <div className="flex flex-col gap-2 mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#0a84ff]">
          Who We Are
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white">
          About <span className="bg-gradient-to-r from-[#0a84ff] to-[#7dd3fc] bg-clip-text text-transparent">Biruk Trading</span>
        </h2>
        <p className="mt-2 max-w-2xl text-base text-white/50 leading-7">
          A certified Grade "ሀ" electrical engineering company delivering safe,
          reliable, and code-compliant power systems across Ethiopia since 2016.
        </p>
      </div>
    </Reveal>

    {/* ROW 1 — MISSION + TRUSTED BY */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

      {/* MISSION */}
      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a84ff]/8 via-white/[0.02] to-transparent p-8 backdrop-blur-xl">
       
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-2xl bg-[#0a84ff]/20 border border-[#0a84ff]/30 flex items-center justify-center text-lg">
              ⚡
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#0a84ff]">Mission</p>
              <h3 className="text-xl font-bold text-white">Engineering Execution & Power Systems</h3>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/60">
            Biruk Trading & Engineering delivers professional electrical power systems,
            building wiring, and material supply for construction and infrastructure
            projects across Ethiopia. We ensure safe power distribution, structured
            installation, and full compliance with international building standards.
          </p>

          {/* AFFILIATION */}
          <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">
              Corporate Affiliation
            </p>
            <p className="text-sm text-white/70 leading-6">
              Sister company of{' '}
              <span className="font-bold text-white">
                Yilma General Electrical & Electromechanical Materials Supply & Fix
              </span>
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#0a84ff]/30 bg-[#0a84ff]/10 px-4 py-1.5 text-xs font-bold text-[#7dd3fc]">
              ✓ Grade "ሀ" Taxpayer Company
            </div>
          </div>
        </div>
      </Reveal>

      {/* STATS — 1 col */}
    {/* TRUSTED BY */}
      <Reveal delay={80}>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff] mb-4">
            Trusted By
          </p>
          <div className="space-y-3">
            {[
              { icon: '🏥', label: 'Healthcare Institutions' },
              { icon: '🏛️', label: 'Government Projects' },
              { icon: '🎓', label: 'Universities & Campuses' },
              { icon: '🏗️', label: 'Industrial Infrastructure' },
  { icon: '🏢', label: 'Commercial Complexes and 🏘️Residential Developments'},
 

             
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 hover:border-[#0a84ff]/20 transition duration-300"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm text-white/60">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

    </div>

    {/* ROW 2 — STRENGTHS + FLOW + CAPABILITIES */}
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">

      {/* CORE STRENGTHS */}
      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff] mb-4">
            Core Strengths
          </p>
          <div className="space-y-3">
            {[
              { icon: '⚡', title: 'Power Distribution', desc: 'Safe electrical networks for buildings.' },
              { icon: '🔌', title: 'Building Wiring', desc: 'International safety code compliant.' },
              { icon: '📦', title: 'Material Supply', desc: 'Certified cables, panels, breakers.' },
              { icon: '🧪', title: 'Testing & Commissioning', desc: 'Full verification and documentation.' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3 hover:border-[#0a84ff]/20 transition duration-300"
              >
                <span className="text-base mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* PROJECT FLOW */}
      <Reveal delay={60}>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff] mb-4">
            How We Work
          </p>
          <div className="space-y-3">
            {[
              { step: '01', title: 'Design & Planning', desc: 'Electrical layout and system design.' },
              { step: '02', title: 'Material Supply', desc: 'Certified component procurement.' },
              { step: '03', title: 'Installation', desc: 'On-site wiring and system setup.' },
              { step: '04', title: 'Testing & Handover', desc: 'Verification and client handover.' },
            ].map((item, i) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0a84ff]/15 text-xs font-black text-[#7dd3fc] border border-[#0a84ff]/20">
                    {item.step}
                  </span>
                  {i < 3 && <div className="w-px h-3 bg-white/10 mt-1" />}
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CAPABILITIES SELECTOR */}
      <Reveal delay={80}>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff] mb-4">
            Technical Capabilities
          </p>
          <div className="space-y-2">
            {[
              'Electrical Material Supply',
              'Control Panels & Protection Systems',
              'Electromechanical Services',
              'Testing & Commissioning',
            ].map((item) => {
              const isSelected = selectedCapability === item
              return (
               <button
                  key={item}
                  onClick={() => setSelectedCapability(item)}
                  className={`w-full text-left rounded-xl border px-4 py-3 text-xs font-semibold transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? 'border-[#0a84ff] bg-[#0a84ff]/15 text-white shadow-[0_0_20px_rgba(10,132,255,0.2)]'
                      : 'border-white/10 bg-black/20 text-white/50 hover:border-[#0a84ff]/40 hover:bg-[#0a84ff]/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#0a84ff] shadow-[0_0_6px_rgba(10,132,255,0.8)]'
                          : 'bg-white/20 group-hover:bg-[#0a84ff]/50'
                      }`} />
                      {item}
                    </span>
                    <span className={ `text-[10px] transition-all duration-300 ${
                      isSelected ? 'text-[#7dd3fc]' : 'text-white/20 group-hover:text-[#0a84ff]/60'
                    }`}>
                      {isSelected ? '▼ open' : '▶ tap'}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

        {selectedCapability ? (
            <div className="mt-4 rounded-2xl border border-[#0a84ff]/20 bg-[#0a84ff]/5 p-4 relative overflow-hidden">
              {/* animated top border */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#0a84ff] via-[#7dd3fc] to-[#10b981]" />

              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7dd3fc]">
                  Technical Details
                </p>
                <span className="text-[10px] text-[#0a84ff] font-semibold animate-pulse">
                  ● Live
                </span>
              </div>
              <p className="text-xs leading-6 text-white/70">
                {capabilityDetails[selectedCapability]}
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-white/5 bg-black/20 p-4 flex items-center justify-center gap-2">
              <span className="text-lg">👆</span>
              <p className="text-xs text-white/30">
                Select a capability above to see details
              </p>
            </div>
          )}
        </div>
      </Reveal>

    </div>

    {/* ROW 3 — CERTIFICATIONS */}
    <Reveal>
      <div className="mt-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff]">
              Certifications & Credentials
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">Verified Company Documents</h3>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
          {certifications.map((item) => (
            <div
              key={item.title}
              className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#0a84ff]/30 transition duration-300"
            >
              <img
                src={item.file}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <button
                  onClick={() => setSelectedCredential(item.file)}
                  className="mt-3 w-full rounded-xl bg-[#0a84ff] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#158dff] transition"
                >
                  View Document
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>

    {/* ROW 4 — COMPANY PERFORMANCE */}
    <Reveal>
      <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a84ff]/8 via-white/[0.02] to-[#10b981]/5 p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff]">
              Company Performance
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">Proven Engineering Excellence</h3>
          </div>
          <div className="rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-xs font-bold text-[#10b981]">
            ✓ Trusted Across Ethiopia
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { value: '8+', label: 'Years of Experience', color: 'text-[#0a84ff]', glow: 'rgba(10,132,255,0.3)' },
            { value: '50+', label: 'Engineers & Technicians', color: 'text-[#0a84ff]', glow: 'rgba(10,132,255,0.3)' },
            { value: '100+', label: 'Projects Delivered', color: 'text-[#0a84ff]', glow: 'rgba(10,132,255,0.3)' },
            { value: '24/7', label: 'Technical Support', color: 'text-[#10b981]', glow: 'rgba(16,185,129,0.3)' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-6 text-center hover:border-white/20 transition duration-300"
            >
              <p className={`text-2xl sm:text-4xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="mt-2 text-xs text-white/50 leading-5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-5 text-center">
          <p className="text-sm text-white/50">
            Trusted by{' '}
            <span className="text-white font-semibold">healthcare institutions</span>,{' '}
            <span className="text-white font-semibold">universities</span>,{' '}
            <span className="text-white font-semibold">government projects</span>, and{' '}
            <span className="text-white font-semibold">industrial infrastructure programs</span>.
          </p>
        </div>
      </div>
    </Reveal>

  </div>
</section>

        {/* --- PORTFOLIO SECTION --- */}
     {/* --- PORTFOLIO SECTION --- */}
<section id="portfolio" className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 border-t border-white/5 relative overflow-hidden">

  {/* BACKGROUND GLOW */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#0a84ff]/5 blur-3xl" />
  </div>

  <div className="mx-auto max-w-7xl">

    {/* HEADER */}
    <Reveal>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#0a84ff]">
            Our Work
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            Selected{' '}
            <span className="bg-gradient-to-r from-[#0a84ff] to-[#7dd3fc] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
            Real-world electrical engineering deployments across healthcare,
            government, education, and commercial infrastructure in Ethiopia.
          </p>
        </div>

        {/* PROJECT COUNT BADGE */}
        <div className="shrink-0 w-full sm:w-auto rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-center">
          <p className="text-3xl font-black text-[#0a84ff]">{portfolioProjects.length}+</p>
          <p className="text-xs text-white/40 mt-1">Projects Shown</p>
        </div>
      </div>
    </Reveal>

    {/* PROJECTS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(showAllProjects ? portfolioProjects : portfolioProjects.slice(0, 3)).map((project, index) => (
        <Reveal key={project.id} delay={index * 80}>
          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d1527]/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#0a84ff]/40 hover:shadow-[0_30px_80px_rgba(10,132,255,0.2)]">

            {/* IMAGE */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
              />

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-[#0d1527]/20 to-transparent" />

              {/* CATEGORY BADGE */}
              <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-[#090d15]/80 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-widest text-[#7dd3fc] backdrop-blur-md">
                {project.category}
              </div>

              {/* INDEX NUMBER */}
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl bg-[#0a84ff]/20 border border-[#0a84ff]/30 text-xs font-black text-[#7dd3fc]">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-base font-bold text-white group-hover:text-[#7dd3fc] transition duration-300 line-clamp-2">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-xs leading-6 text-white/50 line-clamp-3">
                {project.description}
              </p>

              {/* DIVIDER */}
              <div className="my-4 h-px w-full bg-white/5" />

              {/* METRICS */}
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-lg border border-[#0a84ff]/20 bg-[#0a84ff]/10 px-2.5 py-1 text-[0.65rem] font-bold text-[#7dd3fc]"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>

            {/* BOTTOM GLOW LINE */}
            <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-[#0a84ff] via-[#7dd3fc] to-[#10b981]" />

          </div>
        </Reveal>
      ))}
    </div>

    {/* BUTTONS */}
    <div className="mt-12 flex flex-col items-center gap-4">

      <button
        onClick={() => {
          const nextState = !showAllProjects
          setShowAllProjects(nextState)
          if (!nextState) setShowContractPortfolio(false)
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-[#0a84ff]/40 bg-[#0a84ff] px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold text-white shadow-[0_15px_40px_rgba(10,132,255,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,132,255,0.45)]"
      >
        {showAllProjects ? 'Show Featured Only' : 'Explore Full Portfolio'}
        <ArrowRight className={`h-4 w-4 transition-all duration-300 ${showAllProjects ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
      </button>

      {showAllProjects && (
        <button
          type="button"
          onClick={() => setShowContractPortfolio(prev => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-[#0a84ff]/40 hover:text-white"
        >
          {showContractPortfolio ? 'Hide Contract Portfolio' : 'View Contract Portfolio'}
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>

    {/* CONTRACT PORTFOLIO TABLE */}
    {showContractPortfolio && (
      <Reveal>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">

          <div className="px-4 sm:px-8 py-5 sm:py-6 border-b border-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a84ff]">
              Financial Overview
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">Contract Portfolio</h3>
            <p className="mt-1 text-sm text-white/40">
              Project values, clients and completed contracts.
            </p>
          </div>

          <div className="responsive-table-wrap w-full">
            <table className="responsive-table w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">#</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Project</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Client</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Contract Value</th>
                </tr>
              </thead>
              <tbody>
                {clientProjects.map((item, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition duration-200">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold text-white/20">
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-white/70">{item.project}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-white/50">{item.client}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className="rounded-lg border border-[#0a84ff]/20 bg-[#0a84ff]/10 px-3 py-1 text-xs font-bold text-[#7dd3fc]">
                        ETB {item.totalAmount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTAL */}
          <div className="px-4 sm:px-8 py-4 sm:py-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-white/40">Total Contract Value</p>
            <span className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-2 text-sm font-black text-[#10b981]">
              ETB {clientProjects.reduce((sum, item) => sum + item.totalAmount, 0).toLocaleString()}
            </span>
          </div>

        </div>
      </Reveal>
    )}

  </div>
</section>

        {/* --- SERVICES SECTION --- */}
<section
  id="services"
  className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 border-t border-white/5 bg-[#070b12]"
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
        <section id="trust" className="px-4 py-10 sm:px-8 lg:px-10 bg-black/[0.1]">
        
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow=""
                title="Live Operations Ticker"
                description="The horizontal dynamic viewport provides persistent reference points of municipal, high-voltage, and hospital systems engineering workflows."
              />
            </Reveal>

            <Reveal delay={80}>
                             <div>
<div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] py-6 shadow-inner backdrop-blur-xl">

  <div className="project-slider-wrapper">

    <div className="project-slider-track">

      {[...portfolioProjects, ...portfolioProjects].map((project, index) => (

        <div key={index} className="project-slide">

          <img
             src={project.image}
  alt={project.title}
  loading="lazy"
  decoding="async"
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
  aria-controls={`faq-${index}`}
>
                            <span className="text-sm font-medium text-white/90 sm:text-base">{faq.question}</span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
<div
id={`faq-button-${index}`}
  className="overflow-hidden px-5"
>
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
  className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 border-t border-white/5 bg-gradient-to-b from-[#070b12] to-[#05070c]"
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
<div className="flex flex-col gap-5 h-full">

  {/* SMALL STATUS CARD */}
  <div className="rounded-3xl border border-[#0a84ff]/20 bg-gradient-to-br from-[#0b1220] to-[#101827] p-6">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7dd3fc]">
          Office
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          Addis Ababa, Ethiopia
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/60">
          Electrical engineering services for commercial,
          industrial and government projects.
        </p>
      </div>

      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a84ff]/15">
        <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-[#7dd3fc]" />
      </div>

    </div>

    <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#10b981]/20 bg-[#10b981]/10 px-4 py-3">

      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>

      <span className="text-xs font-semibold text-[#10b981]">
        Currently Accepting New Projects
      </span>

    </div>

  </div>

  {/* CONTACT CARDS */}
  <div className="grid gap-4">

    {/* PHONE DROPDOWN */}
    <details className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">

      <summary className="flex cursor-pointer list-none items-center justify-between p-5 hover:bg-white/[0.04]">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a84ff]/15">
            <PhoneCall className="h-5 w-5 text-[#7dd3fc]" />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
              Phone
            </p>

            <h4 className="text-sm font-semibold text-white">
              Available Numbers
            </h4>
          </div>

        </div>

        <ChevronRight className="h-5 w-5 text-white/40 transition group-open:rotate-90" />

      </summary>

      <div className="border-t border-white/5 p-4 space-y-2">

        {[
          "+251 974 438 122",
          "+251 911 137 775",
          "+251 911 045 505",
        ].map((phone) => (

          <a
            key={phone}
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-[#0a84ff] hover:bg-[#0a84ff]/10"
          >
            <span className="text-sm font-medium text-white">
              {phone}
            </span>

            <PhoneCall className="h-4 w-4 text-[#7dd3fc]" />
          </a>

        ))}

      </div>

    </details>

    {/* TELEGRAM */}

    <a
      href="https://t.me/Biruk002"
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#0a84ff]/40 transition"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a84ff]/15">
          <Send className="h-5 w-5 text-[#7dd3fc]" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Telegram
          </p>

          <h4 className="text-sm font-semibold text-white">
            @Biruk002
          </h4>
        </div>

      </div>

    </a>

    {/* LINKEDIN */}

    <a
      href="https://www.linkedin.com/in/biruk-yisihak/"
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#0a84ff]/40 transition"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a84ff]/15">
          <FaLinkedin className="h-5 w-5 text-[#7dd3fc]" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            LinkedIn
          </p>

          <h4 className="text-sm font-semibold text-white">
            Biruk Yisihak
          </h4>
        </div>

      </div>

    </a>

    {/* LOCATION */}

    <a
      href="https://www.google.com/maps/search/?api=1&query=British+Embassy+Addis+Ababa+Comoros+Street"
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#0a84ff]/40 transition"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a84ff]/15">
          <MapPin className="h-5 w-5 text-[#7dd3fc]" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Office Location
          </p>

          <h4 className="text-sm font-semibold text-white">
            British Embassy – Yeka
          </h4>

          <p className="text-xs text-white/40 mt-1">
            Opposite Megenagna, Addis Ababa
          </p>
        </div>

      </div>

    </a>

  </div>

</div>
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
  disabled={loading}
  className="w-full mt-auto rounded-xl bg-[#0a84ff] py-4 text-sm font-semibold text-white
  shadow-[0_10px_30px_rgba(10,132,255,0.25)]
  hover:shadow-[0_15px_40px_rgba(10,132,255,0.35)]
  hover:-translate-y-0.5 transition
  disabled:opacity-60 disabled:cursor-not-allowed"
>
{loading ? (
  <span className="flex items-center justify-center gap-2">
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    Sending...
  </span>
) : (
  <span>
    Send Inquiry <ArrowRight className="inline ml-2 h-4 w-4" />
  </span>
)}
</button>
  </form>
</div>
    </div>
  </div>
</section>
{selectedCredential && (
  <div
    className="credential-modal fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 sm:p-5"
    onClick={() => setSelectedCredential(null)}
  >
    <div
      className="w-full max-w-5xl"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedCredential}
        alt="Document"
        className="rounded-2xl"
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
<button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  aria-label="Scroll to top"
  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-[#0a84ff] shadow-[0_8px_30px_rgba(10,132,255,0.4)] flex items-center justify-center hover:scale-110 transition"
>
  <ArrowRight className="h-5 w-5 rotate-[-90deg] text-white" />
</button>
 </main>

      {/* --- Footer Component --- */}
      <footer className="border-t border-white/10 bg-[#060a12] px-4 py-10 sm:px-8 sm:py-12 lg:px-10">
<div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">          
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">

  <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] bg-gradient-to-r from-[#0a84ff] via-[#7dd3fc] to-[#10b981] bg-clip-text text-transparent">
    BIRUK
  </h2>
  <p className="text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#7dd3fc]/80">
    Founder & Managing Director
  </p>

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
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
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
'w-full rounded-xl border bg-[#0b1220]/60 px-3.5 py-3 text-base sm:text-sm text-white placeholder:text-white/20 outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#0a84ff]/50 focus:bg-[#0b1220] focus:shadow-[0_0_0_4px_rgba(10,132,255,0.12)]'
  return error ? `${baseClassName} border-[#ef4444]/40` : `${baseClassName} border-white/5 hover:border-white/20`
}

export default App