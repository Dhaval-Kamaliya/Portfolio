/**
 * Detailed case-study content per project, written from the screens visible
 * in each project's mockup. [Bracketed] text = details only the designer knows.
 */
export type CaseStudy = {
  subtitle: string;
  overview: string[];
  contribution: string[];
  challenge: string;
  goals: { title: string; text: string }[];
  flow: string[];
  colors: { name: string; hex: string }[];
  visualNotes: { label: string; text: string }[];
  components: { name: string; purpose: string }[];
  keyScreens: { title: string; text: string }[];
  outcome: string[];
};

const baseContribution = ["User interface design", "User flow", "Visual design", "Component design"];

export const caseStudies: Record<string, CaseStudy> = {
  "job-portal": {
    subtitle: "Mobile Job Search Experience",
    overview: [
      "Job Portal is a mobile job-search app that takes a candidate from creating an account to browsing open roles and managing their own profile.",
      "The design covers login and signup, a job listing feed and a profile screen, keeping each step focused on one task so candidates can move from sign-in to browsing jobs without friction.",
    ],
    contribution: baseContribution,
    challenge:
      "Present a lot of job information — titles, companies and details — in a way that stays easy to scan on a small screen, while keeping sign-up short enough that candidates reach the listings quickly.",
    goals: [
      { title: "Get started quickly", text: "Log in or create an account through short, focused forms." },
      { title: "Browse open roles", text: "Scan job listings with the key details visible at a glance." },
      { title: "Manage my profile", text: "Keep personal and professional information in one place." },
    ],
    flow: ["Login / Sign up", "Job listings", "Job details", "Profile"],
    colors: [
      { name: "Neutral gray", hex: "#8E9197" },
      { name: "Light surface", hex: "#F2F2F4" },
      { name: "Dark text", hex: "#1E1F24" },
    ],
    visualNotes: [
      { label: "Cards", text: "Job listings are grouped into separate cards so each role reads as one unit." },
      { label: "Forms", text: "Login and signup use stacked input fields with a single primary button." },
      { label: "Typography", text: "[Add project typeface]" },
    ],
    components: [
      { name: "Input fields", purpose: "Login and signup forms" },
      { name: "Primary buttons", purpose: "Main action on each screen" },
      { name: "Job cards", purpose: "Summarise each role in the listing" },
      { name: "Profile section", purpose: "Candidate information" },
    ],
    keyScreens: [
      { title: "Authentication", text: "Login and signup screens with clear fields and one primary action." },
      { title: "Job discovery", text: "A listing screen where candidates browse available roles as cards." },
      { title: "Profile", text: "A profile screen that brings the candidate's details together." },
    ],
    outcome: ["Short, focused authentication flow", "Scannable job cards", "Consistent visual language across screens"],
  },
  reminder: {
    subtitle: "Mobile Reminder App",
    overview: [
      "Reminder is a mobile productivity app for creating reminders and keeping track of what is still pending.",
      "The central screen organises scheduled reminders into a clear list. From there, users can add a new reminder, choose how often it repeats, and review reminders that are still pending.",
    ],
    contribution: baseContribution,
    challenge:
      "Make adding a reminder — including repeat options — feel quick, while keeping the main list easy to read so users always know what is coming up.",
    goals: [
      { title: "See what's coming up", text: "Review all reminders in one organised list." },
      { title: "Add a reminder fast", text: "Create a new reminder from a dedicated add screen." },
      { title: "Set repeats", text: "Choose how often a reminder should repeat." },
      { title: "Track pending items", text: "Check which reminders are still pending." },
    ],
    flow: ["Reminder list", "Add new reminder", "Set repeat option", "Pending reminders"],
    colors: [
      { name: "Pink accent", hex: "#E8638C" },
      { name: "Soft pink", hex: "#F7D3DE" },
      { name: "Gray surface", hex: "#E9E9EC" },
      { name: "Dark text", hex: "#2A2A2E" },
    ],
    visualNotes: [
      { label: "Accent", text: "Pink highlights the main actions against a calm gray base." },
      { label: "Lists", text: "Reminders are shown as separate list items for quick scanning." },
      { label: "Typography", text: "[Add project typeface]" },
    ],
    components: [
      { name: "Reminder list items", purpose: "Show each scheduled reminder" },
      { name: "Add button", purpose: "Start creating a reminder" },
      { name: "Repeat options", purpose: "Choose how often it repeats" },
      { name: "Input fields", purpose: "Reminder title and details" },
    ],
    keyScreens: [
      { title: "Reminder list", text: "The home screen lists scheduled reminders in a clear order." },
      { title: "New reminder", text: "A dedicated screen for entering a new reminder." },
      { title: "Repeat & pending", text: "Repeat settings and a view of reminders still pending." },
    ],
    outcome: ["Clear list-based overview", "Simple add-and-repeat flow", "Consistent pink-and-gray visual identity"],
  },
  onboarding: {
    subtitle: "Onboarding & Authentication Screens",
    overview: [
      "Onboarding Screen is a set of mobile screens covering the whole entry journey of a community app — from first-launch onboarding to account creation and profile setup.",
      "The set includes onboarding, login, signup, verification, password reset, profile and community screens, designed as one consistent flow.",
    ],
    contribution: baseContribution,
    challenge:
      "Design many entry screens — onboarding, sign-in, verification and password recovery — that feel like one connected journey and keep forms clear at every step.",
    goals: [
      { title: "Understand the app", text: "Get introduced through onboarding screens on first launch." },
      { title: "Create an account", text: "Sign up and verify the account." },
      { title: "Get back in", text: "Log in, or reset a forgotten password." },
      { title: "Join the community", text: "Set up a profile and enter the community." },
    ],
    flow: ["Onboarding", "Sign up / Login", "Verification", "Profile setup", "Community"],
    colors: [
      { name: "Gray-blue", hex: "#8A9BB0" },
      { name: "Light surface", hex: "#F4F6F9" },
      { name: "Dark text", hex: "#1F2430" },
    ],
    visualNotes: [
      { label: "Forms", text: "Login, signup and reset screens share the same field and button styles." },
      { label: "Consistency", text: "Every screen follows the same layout so the journey feels connected." },
      { label: "Typography", text: "[Add project typeface]" },
    ],
    components: [
      { name: "Onboarding screens", purpose: "Introduce the app" },
      { name: "Input fields", purpose: "Login, signup and reset forms" },
      { name: "Verification input", purpose: "Confirm the account" },
      { name: "Buttons", purpose: "Primary and secondary actions" },
    ],
    keyScreens: [
      { title: "Onboarding", text: "First-launch screens that introduce the app." },
      { title: "Login & signup", text: "Authentication forms with a consistent structure." },
      { title: "Verification & reset", text: "Account verification and password reset steps." },
      { title: "Profile & community", text: "Profile setup leading into the community area." },
    ],
    outcome: ["One connected entry journey", "Reusable form components", "Covers recovery paths like password reset"],
  },
  safar: {
    subtitle: "Travel Ticket Booking App",
    overview: [
      "SAFAR is a travel and ticket-booking mobile app that helps people discover destinations and book their trip.",
      "The screens focus on browsing destinations, viewing destination details with ratings and pricing, and moving into booking.",
    ],
    contribution: baseContribution,
    challenge:
      "Make destination browsing feel inspiring and visual while keeping the practical details — rating and price — clear enough to support a booking decision.",
    goals: [
      { title: "Discover places", text: "Browse destinations through visual cards." },
      { title: "Compare details", text: "See ratings and pricing for each destination." },
      { title: "Book a trip", text: "Move from a destination straight into booking." },
    ],
    flow: ["Browse destinations", "Destination details", "Ratings & pricing", "Booking"],
    colors: [
      { name: "Orange", hex: "#F2792B" },
      { name: "Warm light", hex: "#FFF1E6" },
      { name: "Dark text", hex: "#1C1C1E" },
    ],
    visualNotes: [
      { label: "Imagery", text: "Large destination photos lead each card and detail screen." },
      { label: "Accent", text: "Orange highlights key actions like booking." },
      { label: "Typography", text: "[Add project typeface]" },
    ],
    components: [
      { name: "Destination cards", purpose: "Browse places visually" },
      { name: "Rating elements", purpose: "Show destination ratings" },
      { name: "Price labels", purpose: "Show trip pricing" },
      { name: "Booking button", purpose: "Start booking" },
    ],
    keyScreens: [
      { title: "Destination discovery", text: "A browsing screen with visual destination cards." },
      { title: "Destination details", text: "Details with rating and pricing for one destination." },
      { title: "Booking", text: "The step where the traveller books the trip." },
    ],
    outcome: ["Visual, image-led discovery", "Clear price and rating hierarchy", "Direct path from browsing to booking"],
  },
  "food-delivery": {
    subtitle: "Food Delivery Rider Mobile Experience",
    overview: [
      "Food Delivery is a rider-focused mobile app — designed for the delivery partner rather than the customer ordering food.",
      "The screens cover rider login, a rider profile with account information, and a ratings and reviews screen where riders can see feedback on their deliveries.",
    ],
    contribution: baseContribution,
    challenge:
      "Give riders a simple way to sign in and check their profile and ratings, with information laid out clearly enough to read quickly between deliveries.",
    goals: [
      { title: "Sign in", text: "Log in to the rider account." },
      { title: "Check my profile", text: "Review rider and account information." },
      { title: "See my ratings", text: "Read ratings and reviews from deliveries." },
    ],
    flow: ["Rider login", "Rider profile", "Account information", "Ratings & reviews"],
    colors: [
      { name: "Peach", hex: "#F6B38E" },
      { name: "Soft peach", hex: "#FDE8DC" },
      { name: "Dark text", hex: "#26221F" },
    ],
    visualNotes: [
      { label: "Cards", text: "Profile and review information is grouped into cards." },
      { label: "Ratings", text: "Star ratings give riders an at-a-glance view of feedback." },
      { label: "Typography", text: "[Add project typeface]" },
    ],
    components: [
      { name: "Login fields", purpose: "Rider sign-in" },
      { name: "Profile card", purpose: "Rider and account details" },
      { name: "Rating stars", purpose: "Overall rider rating" },
      { name: "Review cards", purpose: "Individual customer reviews" },
    ],
    keyScreens: [
      { title: "Authentication", text: "A simple login screen for riders." },
      { title: "Rider profile", text: "Rider details and account information in one view." },
      { title: "Ratings & reviews", text: "Overall rating plus individual reviews." },
    ],
    outcome: ["Rider-first information hierarchy", "Clear ratings and reviews", "Warm, consistent visual language"],
  },
  "inventory-management": {
    subtitle: "Inventory Management App",
    overview: [
      "Inventory Management is an app for keeping track of products and stock.",
      "The screens include account signup and login, and a product list where the user can review items in their inventory.",
    ],
    contribution: baseContribution,
    challenge:
      "Show product and stock information in a structured list that stays readable, and keep account access simple so users reach their inventory quickly.",
    goals: [
      { title: "Access my account", text: "Sign up or log in." },
      { title: "Review products", text: "See items in the inventory as a structured list." },
      { title: "Keep track of stock", text: "[Add stock-management details from the design]" },
    ],
    flow: ["Sign up / Login", "Product list", "Product details"],
    colors: [
      { name: "Warm beige", hex: "#D9C3A5" },
      { name: "Cream surface", hex: "#F6EFE5" },
      { name: "Dark brown text", hex: "#3A2E24" },
    ],
    visualNotes: [
      { label: "Palette", text: "A warm beige palette gives the product a calm, organised feel." },
      { label: "Lists", text: "Products are laid out as a structured, easy-to-scan list." },
      { label: "Typography", text: "[Add project typeface]" },
    ],
    components: [
      { name: "Product list items", purpose: "Show each inventory item" },
      { name: "Input fields", purpose: "Signup and login forms" },
      { name: "Buttons", purpose: "Primary actions" },
    ],
    keyScreens: [
      { title: "Product list", text: "Inventory items shown in a structured list." },
      { title: "Sign up", text: "An account creation form." },
      { title: "Login", text: "A simple login form." },
    ],
    outcome: ["Structured product overview", "Simple account access", "Warm, consistent visual identity"],
  },
};
