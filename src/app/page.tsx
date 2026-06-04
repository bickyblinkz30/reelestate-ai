import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import FeaturesGrid from '@/components/FeaturesGrid'
import StatsSection from '@/components/StatsSection'
import PricingSection from '@/components/PricingSection'
import WaitlistCTA from '@/components/WaitlistCTA'
import FooterSection from '@/components/FooterSection'

export default function LandingPage() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <StatsSection />
      <PricingSection />
      <WaitlistCTA />
      <FooterSection />
    </main>
  )
}
