'use client';

import Layout from '@/components/landing/layout';
import HeroSection from '@/components/landing/Section/HeroSection';
import PrimarySection from '@/components/landing/Section/PrimarySection';
import SecondarySection from '@/components/landing/Section/SecondarySection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PrimarySection />
      <SecondarySection />
    </Layout>
  );
}
