import React, { useEffect } from 'react';
import { Hero } from '@/components/home/index';
import { UserProfile } from '@/types/data';

interface HomeProps {
  personalData: UserProfile;
  welcomeText: string;
  setNavbarWelcomeText: (text: string) => void;
}

export default function Home({ personalData, welcomeText, setNavbarWelcomeText }: HomeProps) {
  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);
  
  return (
    <div className="h-full w-full">
      <Hero personalData={personalData} />
    </div>
  );
} 