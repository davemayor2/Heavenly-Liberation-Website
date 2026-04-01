import HeroFrame from "@/components/home/HeroFrame";
import InfiniTicker from "@/components/home/InfiniTicker";
import WelcomeSection from "@/components/home/WelcomeSection";
import IntroVideo from "@/components/home/IntroVideo";
import MissionSection from "@/components/home/MissionSection";
import FindYourPlace from "@/components/home/FindYourPlace";
import LatestSermons from "@/components/home/LatestSermons";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import CTABanner from "@/components/home/CTABanner";
import JoinUsSection from "@/components/home/JoinUsSection";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main>
      {/* HeroFrame contains the integrated sticky navbar + full-bleed hero */}
      <HeroFrame />
      <InfiniTicker />
      <WelcomeSection />
      <IntroVideo />
      <MissionSection />
      <FindYourPlace />
      <LatestSermons />
      <UpcomingEvents />
      <CTABanner />
      <JoinUsSection />
      <Footer />
    </main>
  );
}
