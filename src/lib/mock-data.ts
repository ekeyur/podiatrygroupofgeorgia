import type { Service, TeamMember, Testimonial, Page } from "@/types/wordpress";

// ============================================
// Fallback Services (used when WP page fetch fails)
// ============================================

export const FALLBACK_SERVICES: Service[] = [
  {
    title: "Laser Pain Relief & Healing",
    slug: "laser-pain-relief",
    content:
      "<p>Our Nexus 10W Class 4 laser therapy uses specific light wavelengths to reduce inflammation and accelerate cell repair. Over 90% of patients experience positive results across 3–9 sessions lasting 10–15 minutes each.</p>",
    acf: {
      shortDescription:
        "Class 4 laser therapy to reduce inflammation, accelerate tissue repair, and relieve chronic foot and ankle pain.",
      icon: { sourceUrl: "", altText: "" },
      heroImage: { sourceUrl: "", altText: "" },
    },
    seo: {
      title: "Laser Pain Relief & Healing | Podiatry Group of Georgia",
      metaDesc:
        "Class 4 laser therapy for foot and ankle pain relief and accelerated healing in Marietta, GA.",
    },
  },
  {
    title: "Clearly Beautiful Nails",
    slug: "clearly-beautiful-nails",
    content:
      "<p>Our Q-Clear Q-Switch laser treatment eliminates toenail fungus infections painlessly in under 10 minutes. New clean nail growth typically appears within 2–4 months.</p>",
    acf: {
      shortDescription:
        "Painless Q-Clear laser treatment to eliminate toenail fungus — results in as little as one session.",
      icon: { sourceUrl: "", altText: "" },
      heroImage: { sourceUrl: "", altText: "" },
    },
    seo: {
      title: "Clearly Beautiful Nails | Podiatry Group of Georgia",
      metaDesc:
        "Painless Q-Clear laser treatment for toenail fungus in Marietta, GA. Results in as little as one session.",
    },
  },
  {
    title: "Diabetic Foot Care",
    slug: "diabetic-foot-care",
    content:
      "<p>Comprehensive diabetic foot care to prevent complications and protect your mobility.</p>",
    acf: {
      shortDescription:
        "Comprehensive diabetic foot care to prevent complications and protect your mobility.",
      icon: { sourceUrl: "", altText: "" },
      heroImage: { sourceUrl: "", altText: "" },
    },
    seo: {
      title: "Diabetic Foot Care | Podiatry Group of Georgia",
      metaDesc:
        "Specialized diabetic foot care in Georgia. Prevent ulcers, infections, and neuropathy complications.",
    },
  },
  {
    title: "Foot Surgery",
    slug: "foot-surgery",
    content:
      "<p>Minimally invasive foot and ankle surgery for bunions, hammertoes, heel spurs, and more.</p>",
    acf: {
      shortDescription:
        "Minimally invasive foot and ankle surgery for bunions, hammertoes, heel spurs, and more.",
      icon: { sourceUrl: "", altText: "" },
      heroImage: { sourceUrl: "", altText: "" },
    },
    seo: {
      title: "Foot Surgery | Podiatry Group of Georgia",
      metaDesc:
        "Minimally invasive foot and ankle surgery in Marietta, GA. Bunion, hammertoe, and reconstructive procedures.",
    },
  },
  {
    title: "Custom Orthotics",
    slug: "orthotics",
    content:
      "<p>Precision-crafted custom orthotics to correct alignment and relieve foot pain.</p>",
    acf: {
      shortDescription:
        "Precision-crafted custom orthotics to correct alignment and relieve foot pain.",
      icon: { sourceUrl: "", altText: "" },
      heroImage: { sourceUrl: "", altText: "" },
    },
    seo: {
      title: "Custom Orthotics | Podiatry Group of Georgia",
      metaDesc:
        "Custom orthotic inserts crafted with 3D scanning. Correct alignment and relieve foot pain.",
    },
  },
];

// ============================================
// Fallback Team Members (used when WP page fetch fails)
// ============================================

export const FALLBACK_TEAM_MEMBERS: TeamMember[] = [
  {
    title: "Dr. Neha Delvadia",
    slug: "dr-delvadia",
    content: "",
    acf: {
      credentials: "DPM",
      specialty: "Podiatric Medicine & Surgery",
      bio: "Board-certified podiatrist providing comprehensive foot and ankle care at Podiatry Group of Georgia.",
      headshot: {
        sourceUrl:
          "https://www.podiatrygroupofgeorgia.com/wp-content/uploads/2024/04/1.jpg",
        altText: "Dr. Neha Delvadia",
      },
      acceptingPatients: true,
    },
    seo: {
      title: "Dr. Neha Delvadia, DPM | Podiatry Group of Georgia",
      metaDesc:
        "Meet Dr. Neha Delvadia — board-certified podiatrist at Podiatry Group of Georgia.",
    },
  },
];

// ============================================
// Mock Testimonials (no WP source exists)
// ============================================

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    content:
      "<p>I had been suffering from plantar fasciitis for over a year before visiting the Podiatry Group of Georgia. They created a treatment plan that included custom orthotics and physical therapy exercises. Within a few months, my pain was completely gone. I can't recommend them enough!</p>",
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
      "<p>Had bunion surgery and the results were amazing. The doctor explained every step of the process and the recovery was smoother than I expected. The office staff were also incredibly helpful with scheduling and insurance questions.</p>",
    acf: {
      patientName: "Jennifer L.",
      rating: 4,
      source: "Google",
    },
  },
];

// ============================================
// Mock Homepage (fallback when WP home page isn't available)
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
