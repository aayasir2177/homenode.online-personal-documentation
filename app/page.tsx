import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import HomelabArchitecture from '@/components/HomelabArchitecture';
import SkillsMatrix from '@/components/SkillsMatrix';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { PROJECTS } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ProjectsExplorer initialProjects={PROJECTS} />
      <HomelabArchitecture />
      <SkillsMatrix />
      <AboutSection />
      <ContactSection />
    </>
  );
}
