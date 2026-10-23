import React, { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import FeaturesBar from '../components/FeaturesBar';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedProductsSection from '../components/FeaturedProductsSection';
import FestivalsSection from '../components/FestivalsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';
import StoreGallerySection from '../components/StoreGallerySection';
import WhatsAppCommunityBanner from '../components/WhatsAppCommunityBanner';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" role="main">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Features Bar */}
      <FeaturesBar />

      {/* 3. Browse by Category */}
      <CategoriesSection />

      {/* 4. Best-Selling Products */}
      <FeaturedProductsSection />

      {/* 5. Shop by Festival */}
      <FestivalsSection />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Customer Testimonials */}
      <TestimonialsSection />

      {/* 8. Store Gallery */}
      <StoreGallerySection />

      {/* 9. WhatsApp Community Section */}
      <WhatsAppCommunityBanner />
    </main>
  );
}
