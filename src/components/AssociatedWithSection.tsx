import React, { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const partnersData = [
  { 
    name: "AWS Partner", 
    logo: "/lovable-uploads/01d957b7-bc44-4bb4-a246-84ca4d1fd887.webp",
    alt: "AWS Partner Badge"
  },
  { 
    name: "Microsoft Partner", 
    logo: "/lovable-uploads/fdb84287-eccc-4577-8949-46977930e543.webp",
    alt: "Microsoft Partner Logo"
  },
  { 
    name: "Google Partner", 
    logo: "/lovable-uploads/e52188a9-7b2e-4c43-bc35-70e60beaaf82.webp",
    alt: "Google Premier Partner Badge"
  },
  { 
    name: "HP", 
    logo: "/lovable-uploads/fd833830-5daa-4781-9f25-190d72df51bc.webp",
    alt: "HP Logo"
  },
  { 
    name: "Acer", 
    logo: "/lovable-uploads/01a2af85-69cc-4374-a2d0-dc11631b0ac8.webp",
    alt: "Acer Authorized Reseller Logo"
  },
  { 
    name: "Redington", 
    logo: "/lovable-uploads/482f5bd6-b4cb-412c-8e9c-0830e3668957.webp",
    alt: "Redington Seamless Partnerships Logo"
  },
  { 
    name: "Fortinet", 
    logo: "/lovable-uploads/86611a82-04e8-4d65-80a2-e66c5ca623fe.webp",
    alt: "Fortinet Logo"
  },
  { 
    name: "Canon", 
    logo: "/lovable-uploads/c31df73f-5355-4e8e-bdcc-0f4074af8850.webp",
    alt: "Canon Logo"
  },
  { 
    name: "ASUS", 
    logo: "/lovable-uploads/8a726fde-f018-4a20-b22b-f4b732945ec3.webp",
    alt: "ASUS Logo - Inspiring Innovation Persistent Perfection"
  },
];

const AssociatedWithSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  // Drag to scroll functionality
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      slider.style.cursor = 'grabbing';
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
      setIsPaused(true);
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      slider.style.cursor = 'grab';
      setIsPaused(false);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      slider.style.cursor = 'grab';
      setIsPaused(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 2;
      slider.scrollLeft = scrollLeft.current - walk;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
      setIsPaused(true);
    };

    const onTouchEnd = () => {
      isDragging.current = false;
      setIsPaused(false);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 2;
      slider.scrollLeft = scrollLeft.current - walk;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("touchstart", onTouchStart);
    slider.addEventListener("touchend", onTouchEnd);
    slider.addEventListener("touchmove", onTouchMove);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchend", onTouchEnd);
      slider.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Calculate sections and track scroll position
  useEffect(() => {
    const updateSections = () => {
      const container = scrollRef.current;
      if (!container) return;

      const cardWidth = 256; // w-64 = 256px
      const gap = 24; // gap-6 = 24px
      const containerWidth = container.offsetWidth;
      const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));
      const totalCards = partnersData.length;
      const sections = Math.ceil(totalCards / cardsPerView);
      setTotalSections(sections);
    };

    const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;

      const cardWidth = 256;
      const gap = 24;
      const scrollPosition = container.scrollLeft;
      const sectionWidth = (cardWidth + gap) * Math.floor(container.offsetWidth / (cardWidth + gap));
      const currentSec = Math.round(scrollPosition / sectionWidth);
      setCurrentSection(Math.min(currentSec, totalSections - 1));
    };

    updateSections();
    window.addEventListener('resize', updateSections);
    
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', updateSections);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [totalSections]);


  // Navigate to specific section
  const navigateToSection = (sectionIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 256;
    const gap = 24;
    const cardsPerView = Math.floor(container.offsetWidth / (cardWidth + gap));
    const targetScrollLeft = sectionIndex * cardsPerView * (cardWidth + gap);
    
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    setCurrentSection(sectionIndex);
  };

  

  return (
    <section 
      ref={sectionRef}
      className={`py-16 lg:py-24 bg-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Partners With
          </h3>
          <div className={`w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-6 rounded-full transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`} />
          <p className={`text-muted-foreground max-w-2xl mx-auto text-lg transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Proud to be partners and associates with industry leaders and technology giants 
            who share our commitment to excellence and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {partnersData.map((partner, index) => (
            <div
              key={partner.name}
              className={`relative bg-card rounded-xl border-2 border-border/50 transition-all duration-500 hover:scale-105 hover:shadow-xl group overflow-hidden p-6 h-32 ${
                isVisible ? 'animate-fade-in' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center justify-center h-full relative z-10">
                <div className={`flex items-center justify-center ${
                  [ 'Microsoft Partner', 'HP'].includes(partner.name) ? 'h-[140px]' : 'h-16'
                }`}>
                  <img 
                    src={partner.logo} 
                    alt={partner.alt}
                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Optional subtitle */}
        <div className={`text-center transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <p className="text-sm text-muted-foreground">
            Building tomorrow's solutions with today's most trusted technology partners
          </p>
        </div>
      </div>
    </section>
  );
};

export default AssociatedWithSection;