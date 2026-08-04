import { Landing } from "@/components/landing/Landing";

/**
 * BSTS is a single-page experience: one landing page with tabbed sections
 * (Overview, Services, How we work, About) and the technology assessment
 * inline. Deep links land on tabs via URL hash, e.g. /#assessment.
 */
export default function HomePage() {
  return <Landing />;
}
