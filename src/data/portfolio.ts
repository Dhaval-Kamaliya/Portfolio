
// Project images live in src/assets/. Any .png/.jpg/.jpeg/.webp file placed there is
// picked up automatically by its file name (without extension). If a file is missing,
// the site shows a placeholder instead of breaking.
const assetModules = import.meta.glob("/src/assets/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const asset = (name: string): string | undefined => {
  const key = Object.keys(assetModules).find((k) =>
    k.replace(/^.*\//, "").replace(/\.[^.]+$/, "") === name,
  );
  return key ? assetModules[key] : undefined;
};

export const portrait = asset("portrait");

const safarMockup = asset("safar-mobile-app-mockup-v2");
const jobPortalMockup = asset("job-portal-mobile-app-mockup-v2");
const foodDeliveryRiderMockup = asset("food-delivery-rider-mockup-v2");
const reminderAppMockup = asset("reminder-app");
const inventoryManagementMockup = asset("inventory-management");
const onboardingScreensMockup = asset("onboarding-screens");

/**
 * All portfolio content lives here.
 * [BRACKETED] text = editable placeholder — replace with real details.
 */

export const profile = {
  name: "Dhaval Kamaliya",
  role: "UI/UX Designer",
  experience: "2.5+ Years of Experience",
  location: "Ahmedabad, Gujarat, India",
  email: "dhavalkamaliya097@gmail.com",
  phone: "+91 7046844645",
  resumeUrl: `${import.meta.env.BASE_URL}Dhaval_Kamaliya_Resume.pdf`, // file lives in /public
  socials: [
    { label: "LinkedIn", url: "#" },
    { label: "Behance", url: "#" },
    { label: "Dribbble", url: "#" },
    { label: "GitHub", url: "https://dhaval-kamaliya.github.io/Portfolio/" },
  ],
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  cardLabel: string;
  description: string;
  role: string;
  platform: string;
  tools: string[];
  image?: string | undefined;
  imageAlt: string;
  figmaUrl: string;
  overview: string[];
  challenge: string;
  userGoals: string[];
  userFlow: string[];
  components: string[];
  outcome: string;
};

const goalsTbd = ["[Add actual user goal]", "[Add actual user goal]", "[Add actual user goal]"];

export const projects: Project[] = [
  {
    slug: "safar", index: "01", name: "SAFAR",
    tagline: "Travel / Ticket Booking Mobile Application",
    category: "Travel / Ticket Booking App", cardLabel: "Travel / Ticket Booking App",
    description: "A travel and ticket-booking mobile app focused on destination discovery, destination details, ratings, pricing, and booking.",
    role: "UI/UX Designer", platform: "Mobile Application", tools: ["Figma"],
    image: safarMockup, imageAlt: "SAFAR travel app screens mockup",
    figmaUrl: "https://www.figma.com/design/5Eg5gc1fjlL97q8MI1EE2p/Explora---Travel-Tickets-Booking-App--Community-?node-id=0-1&p=f&t=Fw6to5ZlqsNFfIc0-0",
    overview: ["Destination discovery & browsing", "Destination details", "Ratings", "Pricing", "Booking interactions"],
    challenge: "[Add actual project challenge]", userGoals: goalsTbd,
    userFlow: ["Discover destination", "Destination details", "Ratings & pricing", "Book"],
    components: ["Destination cards", "Rating elements", "Price labels", "Booking CTA", "Navigation", "Buttons"],
    outcome: "[Add actual project outcome]",
  },
  {
    slug: "job-portal", index: "02", name: "Job Portal",
    tagline: "Job search experience for finding and applying to relevant roles.",
    category: "Job Search / Recruitment", cardLabel: "Job Search / Recruitment",
    description: "A job search experience covering login, registration, job listings, job details, and profile.",
    role: "UI/UX Designer", platform: "Mobile / Web Interface", tools: ["Figma"],
    image: jobPortalMockup, imageAlt: "Job Portal app screens mockup",
    figmaUrl: "https://www.figma.com/design/qQopiu1BDg5Y3SSXyGI6mx/Job-Find?node-id=0-1&p=f&t=LKABYjx1UO4zqDNU-0",
    overview: ["Authentication", "Job discovery", "Job listings", "Job details", "Profile"],
    challenge: "[Add actual project challenge]", userGoals: goalsTbd,
    userFlow: ["Login / Register", "Job listings", "Job details", "Apply"],
    components: ["Input fields", "Buttons", "Job cards", "Search", "Navigation", "Profile components"],
    outcome: "[Add actual project outcome]",
  },
  {
    slug: "food-delivery", index: "03", name: "Food Delivery",
    tagline: "Rider mobile application for delivery profile, vehicle information, ratings, reviews and account details.",
    category: "Rider / Delivery App", cardLabel: "Rider / Delivery App",
    description: "A rider app covering login, rider profile, vehicle information, ratings & reviews, and account details.",
    role: "UI/UX Designer", platform: "Mobile Application", tools: ["Figma"],
    image: foodDeliveryRiderMockup, imageAlt: "Food Delivery rider app screens mockup",
    figmaUrl: "https://www.figma.com/design/sl90vz0WRfahWbaJJeIvdH/Food-Delivery?node-id=0-1&p=f&t=5OCsX1xItII7ODME-0",
    overview: ["Rider login", "Rider profile", "Vehicle information", "Ratings & reviews", "Account information"],
    challenge: "[Add actual project challenge]", userGoals: goalsTbd,
    userFlow: ["Rider login", "Rider profile", "Vehicle / account info", "Ratings & reviews"],
    components: ["Login fields", "Buttons", "Profile cards", "Rating components", "Review cards", "Information cards"],
    outcome: "[Add actual project outcome]",
  },
  {
    slug: "inventory-management", index: "04", name: "Inventory Management",
    tagline: "Interface for managing inventory and stock.",
    category: "Inventory / Management System", cardLabel: "Management Dashboard",
    description: "An inventory management interface built around stock overview and product management.",
    role: "UI/UX Designer", platform: "Web Application / Dashboard", tools: ["Figma"],
    image: inventoryManagementMockup, imageAlt: "Inventory management screens mockup",
    figmaUrl: "https://www.figma.com/design/oICGtrX97NJb7VK5CzYr1d/Inventory-management?node-id=0-1&p=f&t=Au9Ab4Cp8eiFJu30-0",
    overview: ["Inventory overview", "Products", "Stock management"],
    challenge: "[Add actual project challenge]", userGoals: goalsTbd,
    userFlow: ["Overview", "Products", "Stock details", "Update stock"],
    components: ["Tables", "Cards", "Search", "Filters", "Navigation", "Buttons"],
    outcome: "[Add actual project outcome]",
  },
  {
    slug: "reminder", index: "05", name: "Reminder",
    tagline: "Mobile app for creating and keeping track of reminders.",
    category: "Productivity / Reminder App", cardLabel: "Productivity App",
    description: "A productivity mobile app for creating, viewing, and managing reminders.",
    role: "UI/UX Designer", platform: "Mobile Application", tools: ["Figma"],
    image: reminderAppMockup, imageAlt: "Reminder mobile app screens mockup",
    figmaUrl: "https://www.figma.com/design/FjaNIXddIBeQcXhFyf9Gqw/Reminder?node-id=0-1&p=f&t=TZGAcGkWf3hI1Xe6-0",
    overview: ["Reminder list", "Create reminder", "Reminder details"],
    challenge: "[Add actual project challenge]", userGoals: goalsTbd,
    userFlow: ["Reminder list", "Create reminder", "Set details", "Saved"],
    components: ["List items", "Buttons", "Input fields", "Date & time pickers", "Navigation"],
    outcome: "[Add actual project outcome]",
  },
  {
    slug: "onboarding", index: "06", name: "Onboarding Screen",
    tagline: "Onboarding, login, and signup screens for a community mobile app.",
    category: "Mobile Onboarding / Authentication / Community", cardLabel: "Mobile Onboarding / Authentication",
    description: "Mobile onboarding and authentication screens focused on visual hierarchy and clear form design.",
    role: "UI/UX Designer", platform: "Mobile Application", tools: ["Figma"],
    image: onboardingScreensMockup, imageAlt: "Onboarding and authentication mobile screens",
    figmaUrl: "https://www.figma.com/design/QOK0JCtLav2vpgL9afd0S7/Mobile-Onboarding-Screens--Login---Community-?node-id=0-1&p=f&t=Rvl87MaoOXELuEz7-0",
    overview: ["Onboarding", "Login", "Signup", "Form design"],
    challenge: "[Add actual project challenge]", userGoals: goalsTbd,
    userFlow: ["Onboarding", "Login", "Signup", "Community"],
    components: ["Onboarding slides", "Page indicators", "Input fields", "Buttons", "Social login"],
    outcome: "[Add actual project outcome]",
  },
];

export const experience = [
  {
    company: "TX Tech",
    title: "Jr. UI/UX Designer",
    dates: "Sep 2025 — Present",
    points: [
      "Designed clean and user-friendly interfaces for web and mobile applications.",
      "Developed wireframes, user journeys, and interactive prototypes.",
      "Worked closely with senior designers and developers to translate requirements into design solutions.",
      "Improved usability through continuous iteration and feedback-driven design.",
    ],
  },
  {
    company: "eDigillence Infosolutions",
    title: "UI/UX & Graphic Designer",
    dates: "Dec 2023 — Aug 2025",
    points: [
      "Worked with cross-functional teams to identify user requirements and business objectives.",
      "Designed responsive UI for multiple web and mobile applications.",
      "Created wireframes, user flows, and high-fidelity prototypes using Figma and Adobe XD.",
      "Collaborated with developers and product managers to deliver user-centered design solutions.",
      "Contributed to branding and visual identity, aligning UI components with business goals.",
      "Iterated designs based on feedback and usability testing to improve user experience.",
    ],
  },
];

export const processSteps = [
  { num: "01", title: "Understand", text: "Understand users, business goals, requirements, and constraints." },
  { num: "02", title: "Explore", text: "Research, analyze, brainstorm, and explore possible solutions." },
  { num: "03", title: "Structure", text: "Create user flows, information architecture, and wireframes." },
  { num: "04", title: "Design", text: "Create visual systems, UI components, prototypes, and responsive interfaces." },
  { num: "05", title: "Refine", text: "Test, collect feedback, iterate, and improve the experience." },
];

export const coreSkills = [
  "Wireframing",
  "User Flows",
  "Prototyping",
  "Responsive UI",
  "Interaction Design",
  "Design Systems",
  "Usability",
];

export const tools = {
  experienced: ["Figma", "Adobe XD", "Framer", "Canva", "Photoshop", "Illustrator"],
  working: ["CorelDRAW", "Adobe Premiere Pro", "AI Tools"],
};

export const services = {
  primary: [
    { title: "UI/UX Design", text: "End-to-end interface and experience design." },
    { title: "Mobile App Design", text: "Native-feeling iOS and Android interfaces." },
    { title: "Web Design", text: "Clear, responsive websites and web apps." },
    { title: "Wireframing", text: "Structure and flows before visuals." },
    { title: "Prototyping", text: "Interactive flows to test ideas early." },
    { title: "Design Systems", text: "Reusable components and tokens." },
    { title: "Responsive Design", text: "Layouts that adapt to every screen." },
    { title: "Visual Design", text: "Typography, color, hierarchy." },
  ],
  secondary: ["Branding", "Graphic Design", "Social Media Creatives"],
};

export const thinking = [
  "Start with the problem.",
  "Understand the user.",
  "Reduce complexity.",
  "Design with purpose.",
  "Test. Learn. Iterate.",
];

export const navLinks = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Process", id: "process" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];
