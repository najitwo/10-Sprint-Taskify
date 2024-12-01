'use client';

import Layout from '@/components/landing/layout';
import HeroSection from '@/components/landing/Section/HeroSection';
import PrimarySection from '@/components/landing/Section/PrimarySection';
import SecondarySection from '@/components/landing/Section/SecondarySection';
import { useState, useEffect } from 'react';

export default function Home() {
  const [inView, setInView] = useState<{ [key: string]: boolean }>({
    primary: false,
    secondary: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const { id } = entry.target;
            setInView((prev) => ({
              ...prev,
              [id]: !entry.isIntersecting,
            }));
          });
        },
        { threshold: 0.5 }
      );

      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <Layout>
      <HeroSection />
      <PrimarySection inView={inView.primary} />
      <SecondarySection inView={inView.secondary} />
    </Layout>
  );
}
