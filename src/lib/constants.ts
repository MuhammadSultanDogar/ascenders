export const LOGO = {
  width: 757,
  height: 646,
  src: "/logo.png",
} as const;

export const MARKETPLACES = [
  { id: "amazon", name: "Amazon", slug: "amazon", x: "8%", y: "24%", rotate: -10 },
  { id: "shopify", name: "Shopify", slug: "shopify", x: "82%", y: "18%", rotate: 8 },
  { id: "walmart", name: "Walmart", slug: "walmart", x: "88%", y: "56%", rotate: -6 },
  { id: "ebay", name: "eBay", slug: "ebay", x: "6%", y: "58%", rotate: 10 },
  { id: "tiktok", name: "TikTok", slug: "tiktok", x: "76%", y: "72%", rotate: -8 },
] as const;

export const PARTNER_BRANDS = [
  { name: "Amazon", slug: "amazon" },
  { name: "Walmart", slug: "walmart" },
  { name: "eBay", slug: "ebay" },
  { name: "Shopify", slug: "shopify" },
  { name: "TikTok", slug: "tiktok" },
  { name: "Meta", slug: "meta" },
  { name: "Google", slug: "google" },
  { name: "Instagram", slug: "instagram" },
  { name: "Facebook", slug: "facebook" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "Go High Level", slug: "gohighlevel" },
] as const;

export const COMPANY = {
  name: "Ascenders IT Solutions LLC",
  tagline: "Digitally Advancing Sustainability",
  email: "business@eascenders.com",
  phone: "1-561-730-9092",
  phoneHref: "tel:+15617309092",
  whatsappHref: "https://wa.me/923007337822",
  office: {
    label: "Model Town, Multan, Pakistan",
    lat: 30.2442649,
    lng: 71.4996891,
    mapsUrl:
      "https://www.google.com/maps/place/Model+Town,+Multan,+Pakistan/@30.244956,71.4952088,19.68z",
    embedUrl:
      "https://maps.google.com/maps?q=30.2442649,71.4996891&hl=en&z=17&output=embed",
  },
} as const;

export const SITE = {
  url: "https://www.eascenders.com",
  title: "Ascenders IT Solutions LLC",
  description:
    "Premium digital marketing, ecommerce marketplace management, reinstatements, and Go High Level automation. Serving brands across USA, UK & Australia since 2015.",
  locale: "en_US",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
] as const;

export const MARKETS = ["USA", "UK", "AUS"] as const;

export const SOCIALS = {
  instagram: "https://www.instagram.com/eascenders?igsh=am03ZHR0ZmIwN2Z2&utm_source=qr",
  facebook: "https://www.facebook.com/share/1FJo4s8Qeu/?mibextid=wwXIfr",
  linkedin: "https://www.linkedin.com/company/ascenders-it-solutions-pvt-ltd/",
  instagramReel: "https://www.instagram.com/reel/C353SybIM8-/?igsh=ajQ2OTZtejRwanZl",
  instagramReel2: "https://www.instagram.com/reel/C38H-9mIsLC/?igsh=MTdvdnM1ZmZ6bWRiYg==",
} as const;

export const SERVICES = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    headline: ["WE AMPLIFY", "YOUR", "PRESENCE."],
    description:
      "Performance-driven campaigns, brand storytelling, and growth strategies engineered for measurable impact across every channel.",
    items: [],
    accent: "01",
  },
  {
    id: "ecommerce",
    title: "Ecommerce Solutions",
    headline: ["WE SCALE", "YOUR", "MARKETPLACES."],
    description:
      "Full-spectrum marketplace management — from listing optimization to revenue acceleration on the world's largest platforms.",
    items: [
      "Amazon Seller Management",
      "Walmart Seller Management",
      "eBay Seller Management",
      "TikTok Shop",
      "Shopify",
    ],
    accent: "02",
  },
  {
    id: "reinstatements",
    title: "Reinstatements",
    headline: ["WE RESTORE", "YOUR", "ACCOUNTS."],
    description:
      "Expert appeal strategies and compliance recovery when suspensions threaten your business. We fight to get you back online.",
    items: [
      "Amazon Seller Reinstatement",
      "Walmart Marketplace Suspension",
      "eBay Restrictions",
    ],
    accent: "03",
  },
  {
    id: "gohighlevel",
    title: "Go High Level",
    headline: ["WE AUTOMATE", "YOUR", "GROWTH."],
    description:
      "AI-powered automation, CRM workflows, and intelligent systems that convert leads while you focus on scaling.",
    items: ["AI Automation", "CRM Workflows", "Lead Generation Systems"],
    accent: "04",
  },
] as const;

export const PORTFOLIO = [
  {
    id: "01",
    url: "https://www.instagram.com/p/DJ7S3J9OHQB/?igsh=aGYycjRyZjBkMnd0",
    embed: "https://www.instagram.com/p/DJ7S3J9OHQB/embed",
  },
  {
    id: "02",
    url: "https://www.instagram.com/p/DJ4sTjcuaMx/?igsh=MWs2ZGtkNDB0bjF6NA==",
    embed: "https://www.instagram.com/p/DJ4sTjcuaMx/embed",
  },
  {
    id: "03",
    url: "https://www.instagram.com/p/DKsXeyLOkA5/?igsh=MTU4ejB4c2R6eTg1eQ==",
    embed: "https://www.instagram.com/p/DKsXeyLOkA5/embed",
  },
  {
    id: "04",
    url: "https://www.instagram.com/p/DLhqLPBI0m7/",
    embed: "https://www.instagram.com/p/DLhqLPBI0m7/embed",
  },
] as const;

export const TIMELINE = [
  { year: "2015", label: "Founded", detail: "Started in Multan, Pakistan" },
  { year: "2017", label: "Growth", detail: "Expanded into multiple ventures" },
  { year: "2019", label: "Lahore", detail: "Opened Lahore office" },
  { year: "2021", label: "UAE", detail: "Established UAE presence" },
  { year: "2023", label: "Global", detail: "Serving USA, UK & Australia" },
  { year: "Today", label: "Ascenders", detail: "Offices in UAE, Lahore & Multan" },
] as const;

export const SOCIAL_POSTS = [
  {
    id: "ig-reel",
    platform: "instagram" as const,
    type: "reel" as const,
    title: "Behind the scenes at Ascenders",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    url: SOCIALS.instagramReel,
    likes: "2.4K",
  },
  {
    id: "ig-reel-2",
    platform: "instagram" as const,
    type: "reel" as const,
    title: "Growth strategies in action",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    url: SOCIALS.instagramReel2,
    likes: "1.8K",
  },
  {
    id: "linkedin-1",
    platform: "linkedin" as const,
    type: "post" as const,
    title: "Ascenders IT Solutions — expanding digital commerce across three continents",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    url: SOCIALS.linkedin,
    likes: "342",
  },
  {
    id: "ig-post",
    platform: "instagram" as const,
    type: "post" as const,
    title: "Marketplace mastery — Amazon, Walmart, eBay & beyond",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    url: SOCIALS.instagram,
    likes: "891",
  },
] as const;
