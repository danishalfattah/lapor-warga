import Hero from '@/components/landing/Hero';
import TheReel from '@/components/landing/TheReel';
import Statistics from '@/components/landing/Statistics';
import Leaderboard from '@/components/landing/Leaderboard';
import Features from '@/components/landing/Features';
import CallToAction from '@/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TheReel />
      <Statistics />
      <Leaderboard />
      <Features />
      <CallToAction />
    </main>
  );
}
