import AmbientPointer from '@/components/AmbientPointer';
import ContentDisclosure from '@/components/ContentDisclosure';
import Contact from '@/components/Contact';
import NexusCompany from '@/components/nexus/NexusCompany';
import NexusFooter from '@/components/nexus/NexusFooter';
import { NexusGallery } from '@/components/nexus/NexusGallery';
import NexusHero from '@/components/nexus/NexusHero';
import NexusProfile from '@/components/nexus/NexusProfile';
import { NexusEducation, NexusExperience, NexusJourney } from '@/components/nexus/NexusStory';
import NexusSystems from '@/components/nexus/NexusSystems';
import { NexusVision } from '@/components/nexus/NexusVision';
import { NexusWork } from '@/components/nexus/NexusWork';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AmbientPointer />
      <main id="main-content" className="nx-site">
        <NexusHero />
        <ContentDisclosure page="home" />
        <NexusCompany />
        <NexusProfile />
        <NexusSystems />
        <NexusExperience />
        <NexusEducation />
        <NexusJourney />
        <NexusWork />
        <NexusGallery />
        <NexusVision />
        <Contact />
      </main>
      <NexusFooter />
    </>
  );
}
