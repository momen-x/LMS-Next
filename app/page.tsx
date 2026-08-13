
import CtaSection from "./_modules/landing/views/cta-section";
import FeaturedCourses from "./_modules/landing/views/featured-courses";
import HeroSection from "./_modules/landing/views/hero-section";
import WhyChooseUs from "./_modules/landing/views/why-choose-us";

export default function Home() {
  return (
     <main>
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <CtaSection />
    </main>
  );
}
