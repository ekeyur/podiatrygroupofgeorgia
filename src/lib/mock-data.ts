import type { Service, TeamMember, Testimonial, Page } from "@/types/wordpress";

// ============================================
// Mock Services
// ============================================

export const MOCK_SERVICES: Service[] = [
  {
    title: "Bunion Treatment",
    slug: "bunion-treatment",
    content:
      "<p>Bunions are bony bumps that form at the base of the big toe, causing the joint to push outward. Our podiatrists offer both conservative and surgical treatment options tailored to the severity of your condition.</p><p>Conservative treatments include custom orthotics, padding, splinting, and anti-inflammatory medications. When surgery is necessary, we use minimally invasive techniques to realign the joint and reduce recovery time.</p>",
    acf: {
      shortDescription:
        "Expert bunion evaluation and treatment — from custom orthotics to minimally invasive surgery.",
      icon: { sourceUrl: "", altText: "Bunion treatment icon" },
      heroImage: { sourceUrl: "", altText: "Bunion treatment" },
      faq: [
        {
          question: "Do bunions always require surgery?",
          answer:
            "No. Many bunions can be managed with orthotics, proper footwear, and padding. Surgery is recommended only when conservative treatments fail to relieve pain.",
        },
        {
          question: "How long is recovery after bunion surgery?",
          answer:
            "Most patients return to normal shoes in 6–8 weeks. Full recovery typically takes 3–6 months depending on the procedure.",
        },
      ],
      ctaText: "Schedule a Bunion Consultation",
    },
    seo: {
      title: "Bunion Treatment | Podiatry Group of Georgia",
      metaDesc:
        "Expert bunion treatment in Georgia. Conservative care and minimally invasive surgery options available.",
    },
  },
  {
    title: "Diabetic Foot Care",
    slug: "diabetic-foot-care",
    content:
      "<p>Diabetes can cause nerve damage (neuropathy) and poor circulation in the feet, increasing the risk of ulcers, infections, and other serious complications. Regular podiatric care is essential for preventing these problems.</p><p>Our diabetic foot care program includes comprehensive foot exams, wound care, custom diabetic shoes and inserts, and patient education on daily foot care routines.</p>",
    acf: {
      shortDescription:
        "Comprehensive diabetic foot care to prevent complications and protect your mobility.",
      icon: { sourceUrl: "", altText: "Diabetic foot care icon" },
      heroImage: { sourceUrl: "", altText: "Diabetic foot care" },
      faq: [
        {
          question: "How often should diabetics see a podiatrist?",
          answer:
            "The American Diabetes Association recommends at least one comprehensive foot exam per year, with more frequent visits if you have neuropathy or a history of foot ulcers.",
        },
        {
          question: "Are diabetic shoes covered by insurance?",
          answer:
            "Yes. Medicare and most insurance plans cover therapeutic shoes and inserts for qualifying diabetic patients under the Therapeutic Shoe Bill.",
        },
      ],
      ctaText: "Book a Diabetic Foot Exam",
    },
    seo: {
      title: "Diabetic Foot Care | Podiatry Group of Georgia",
      metaDesc:
        "Specialized diabetic foot care in Georgia. Prevent ulcers, infections, and neuropathy complications.",
    },
  },
  {
    title: "Custom Orthotics",
    slug: "orthotics",
    content:
      "<p>Custom orthotics are prescription medical devices designed to correct biomechanical imbalances in your feet. Unlike over-the-counter insoles, custom orthotics are crafted from precise molds of your feet to address your specific needs.</p><p>We use advanced 3D scanning technology to create orthotics that provide optimal support, improve alignment, and reduce pain caused by plantar fasciitis, flat feet, high arches, and other conditions.</p>",
    acf: {
      shortDescription:
        "Precision-crafted custom orthotics to correct alignment and relieve foot pain.",
      icon: { sourceUrl: "", altText: "Custom orthotics icon" },
      heroImage: { sourceUrl: "", altText: "Custom orthotics" },
      faq: [
        {
          question: "How long do custom orthotics last?",
          answer:
            "With proper care, custom orthotics typically last 2–5 years. We recommend annual check-ups to assess wear and ensure they still fit correctly.",
        },
        {
          question: "Will insurance cover custom orthotics?",
          answer:
            "Many insurance plans cover custom orthotics with a podiatrist's prescription. Our office will verify your benefits and handle pre-authorization.",
        },
      ],
      ctaText: "Get Fitted for Custom Orthotics",
    },
    seo: {
      title: "Custom Orthotics | Podiatry Group of Georgia",
      metaDesc:
        "Custom orthotic inserts crafted with 3D scanning. Correct alignment and relieve foot pain.",
    },
  },
];

// ============================================
// Mock Team Members
// ============================================

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    title: "Dr. Sarah Mitchell",
    slug: "dr-sarah-mitchell",
    content:
      "<p>Dr. Sarah Mitchell is a board-certified podiatrist with over 15 years of experience treating conditions of the foot and ankle. She specializes in sports medicine, bunion correction, and diabetic foot care.</p><p>Dr. Mitchell is dedicated to providing personalized care plans that get patients back on their feet as quickly as possible. She takes the time to educate each patient about their condition and all available treatment options.</p>",
    acf: {
      credentials: "DPM, FACFAS",
      specialty: "Sports Medicine & Bunion Correction",
      bio: "Board-certified podiatrist with over 15 years of experience. Specializes in sports medicine, bunion correction, and diabetic foot care.",
      headshot: { sourceUrl: "", altText: "Dr. Sarah Mitchell" },
      education: [
        {
          school: "Barry University School of Podiatric Medicine",
          degree: "Doctor of Podiatric Medicine",
          year: "2008",
        },
        {
          school: "Emory University",
          degree: "Bachelor of Science in Biology",
          year: "2004",
        },
      ],
      certifications: [
        { name: "American Board of Foot and Ankle Surgery (ABFAS)" },
        { name: "Fellow, American College of Foot and Ankle Surgeons" },
      ],
      acceptingPatients: true,
    },
    seo: {
      title: "Dr. Sarah Mitchell, DPM | Podiatry Group of Georgia",
      metaDesc:
        "Meet Dr. Sarah Mitchell — board-certified podiatrist specializing in sports medicine and bunion correction.",
    },
  },
  {
    title: "Dr. James Chen",
    slug: "dr-james-chen",
    content:
      "<p>Dr. James Chen is a fellowship-trained podiatric surgeon specializing in reconstructive foot and ankle surgery. With a particular interest in complex deformity correction and wound care, Dr. Chen brings advanced surgical expertise to the Podiatry Group of Georgia.</p><p>He is passionate about using the latest minimally invasive techniques to help patients recover faster and achieve better outcomes.</p>",
    acf: {
      credentials: "DPM, FACFAS",
      specialty: "Reconstructive Surgery & Wound Care",
      bio: "Fellowship-trained podiatric surgeon specializing in reconstructive foot and ankle surgery, complex deformity correction, and advanced wound care.",
      headshot: { sourceUrl: "", altText: "Dr. James Chen" },
      education: [
        {
          school: "Temple University School of Podiatric Medicine",
          degree: "Doctor of Podiatric Medicine",
          year: "2010",
        },
        {
          school: "University of Georgia",
          degree: "Bachelor of Science in Chemistry",
          year: "2006",
        },
      ],
      certifications: [
        { name: "American Board of Foot and Ankle Surgery (ABFAS)" },
        { name: "Fellow, American College of Foot and Ankle Surgeons" },
        { name: "Certified Wound Specialist (CWS)" },
      ],
      acceptingPatients: true,
    },
    seo: {
      title: "Dr. James Chen, DPM | Podiatry Group of Georgia",
      metaDesc:
        "Meet Dr. James Chen — fellowship-trained podiatric surgeon specializing in reconstructive surgery and wound care.",
    },
  },
];

// ============================================
// Mock Testimonials
// ============================================

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    content:
      "<p>I had been suffering from plantar fasciitis for over a year before visiting the Podiatry Group of Georgia. Dr. Mitchell created a treatment plan that included custom orthotics and physical therapy exercises. Within a few months, my pain was completely gone. I can't recommend them enough!</p>",
    acf: {
      patientName: "Maria S.",
      rating: 5,
      source: "Google",
    },
  },
  {
    content:
      "<p>As a diabetic, I need regular foot check-ups. The team here is thorough, caring, and always makes time to answer my questions. They caught a potential issue early and treated it before it became serious. I feel confident my feet are in good hands.</p>",
    acf: {
      patientName: "Robert T.",
      rating: 5,
      source: "Healthgrades",
    },
  },
  {
    content:
      "<p>Had bunion surgery with Dr. Chen and the results were amazing. He explained every step of the process and the recovery was smoother than I expected. The office staff were also incredibly helpful with scheduling and insurance questions.</p>",
    acf: {
      patientName: "Jennifer L.",
      rating: 4,
      source: "Google",
    },
  },
];

// ============================================
// Mock Homepage
// ============================================

export const MOCK_HOMEPAGE: Page = {
  title: "Home",
  content: "",
  slug: "home",
  acf: {
    heroHeadline: "Expert Foot & Ankle Care in Georgia",
    heroSubtext:
      "The Podiatry Group of Georgia provides comprehensive podiatric medicine — from routine care to advanced surgery. Schedule your appointment today.",
    heroImage: { sourceUrl: "", altText: "Podiatry Group of Georgia office" },
  },
  seo: {
    title: "Podiatry Group of Georgia | Expert Foot & Ankle Care",
    metaDesc:
      "Comprehensive podiatric care in Georgia. Bunion treatment, diabetic foot care, custom orthotics, and more.",
  },
};
