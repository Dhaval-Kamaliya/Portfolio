import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import { Marquee } from "@/components/site/Marquee";
import {
  About,
  Contact,
  Experience,
  Footer,
  Process,
  ResumeCta,
  Services,
  Skills,
  Thinking,
} from "@/components/site/Sections";

const title = "Dhaval Kamaliya — UI/UX Designer";
const description =
  "Portfolio of Dhaval Kamaliya, a UI/UX Designer with 2.5+ years of experience designing intuitive web and mobile experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Marquee
          items={["Wireframing", "Prototyping", "User Flows", "Interaction Design", "Design Systems", "Visual Design"]}
          duration="35s"
        />
        <About />
        <Experience />
        <Process />
        <Skills />
        <Services />
        <Thinking />
        <ResumeCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
