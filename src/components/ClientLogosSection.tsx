import { useRef, useEffect, useCallback, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clientData = [
  { name: "Enterprise Solutions", logo: "/client/client0.1.webp" },
  { name: "Tech Corp", logo: "/client/client0.2.webp" },
  { name: "Innovation Labs", logo: "/client/client0.3.webp" },
  { name: "Digital Works", logo: "/client/client0.4.webp" },
  { name: "Future Systems", logo: "/client/client0.5.webp" },
  { name: "Global Tech", logo: "/client/client1.webp" },
  { name: "Smart Solutions", logo: "/client/client2.webp" },
  { name: "Cloud Partners", logo: "/client/client3.webp" },
  { name: "Data Dynamics", logo: "/client/client4.webp" },
  { name: "AI Innovations", logo: "/client/client5.webp" },
  { name: "Cyber Security", logo: "/client/client6.webp" },
  { name: "Mobile First", logo: "/client/client7.webp" },
  { name: "Web Excellence", logo: "/client/client8.webp" },
  { name: "Software Studios", logo: "/client/client9.webp" },
  { name: "Platform Pro", logo: "/client/client10.webp" },
  { name: "Digital Edge", logo: "/client/client11.webp" },
  { name: "Tech Bridge", logo: "/client/client12.webp" },
  { name: "Code Craft", logo: "/client/client13.webp" },
  { name: "System Logic", logo: "/client/client14.webp" },
  { name: "Network Plus", logo: "/client/client15.webp" },
  { name: "App Masters", logo: "/client/client16.webp" },
  { name: "DevOps Pro", logo: "/client/client17.webp" },
  { name: "Quality First", logo: "/client/client18.webp" },
  { name: "Scale Up", logo: "/client/client19.webp" },
  { name: "Performance Labs", logo: "/client/client20.webp" },
  { name: "Agile Works", logo: "/client/client21.webp" },
  { name: "Innovation Hub", logo: "/client/client22.webp" },
  { name: "Growth Partners", logo: "/client/client23.webp" },
  { name: "Success Labs", logo: "/client/client24.webp" },
  { name: "Progress Tech", logo: "/client/client25.webp" },
  { name: "Advanced Systems", logo: "/client/client26.webp" },
  { name: "Elite Solutions", logo: "/client/client27.webp" },
  { name: "Premier Tech", logo: "/client/client28.webp" },
  { name: "Excellence Corp", logo: "/client/client29.webp" },
  { name: "Superior Labs", logo: "/client/client30.webp" },
  { name: "Ultimate Solutions", logo: "/client/client31.webp" },
  { name: "Peak Performance", logo: "/client/client32.webp" },
  { name: "Top Tier Tech", logo: "/client/client33.webp" },
  { name: "Master Systems", logo: "/client/client34.webp" },
  { name: "Expert Solutions", logo: "/client/client35.webp" },
  { name: "Professional Tech", logo: "/client/client36.webp" },
  { name: "Strategic Partners", logo: "/client/client37.webp" },
  { name: "Enterprise Plus", logo: "/client/client38.webp" },
  { name: "Business Solutions", logo: "/client/client39.webp" },
  { name: "Corporate Tech", logo: "/client/client40.webp" },
  { name: "Industry Leaders", logo: "/client/client41.webp" },
  { name: "Market Leaders", logo: "/client/client42.webp" },
];





const ClientLogosSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Create duplicated client data for seamless infinite scroll
  const infiniteClientData = [...clientData, ...clientData, ...clientData];

  const pauseAnimation = useCallback(() => {
    const slider = scrollRef.current;
    if (slider) {
      slider.style.animationPlayState = "paused";
    }
  }, []);

  const resumeAnimation = useCallback(() => {
    const slider = scrollRef.current;
    if (slider && !isDragging) {
      slider.style.animationPlayState = "running";
    }
  }, [isDragging]);

  const handleStart = useCallback((clientX: number) => {
    const slider = scrollRef.current;
    if (!slider) return;

    setIsDragging(true);
    pauseAnimation();
    slider.style.cursor = "grabbing";
    setStartX(clientX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  }, [pauseAnimation]);

  const handleEnd = useCallback(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    setIsDragging(false);
    resumeAnimation();
    slider.style.cursor = "grab";
  }, [resumeAnimation]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const slider = scrollRef.current;
    if (!slider) return;

    const x = clientX - slider.offsetLeft;
    const walk = (x - startX) * 3; // Increased sensitivity for smoother dragging
    const newScrollLeft = scrollLeft - walk;
    
    console.log("Moving - clientX:", clientX, "walk:", walk, "newScrollLeft:", newScrollLeft);
    
    // Direct assignment for immediate response
    slider.scrollLeft = newScrollLeft;
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      console.log("Mouse down", e.pageX);
      handleStart(e.pageX);
    };

    const onMouseLeave = () => handleEnd();
    const onMouseUp = () => handleEnd();

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      console.log("Mouse move", e.pageX, "isDragging:", isDragging);
      handleMove(e.pageX);
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      console.log("Touch start", e.touches[0].pageX);
      handleStart(e.touches[0].pageX);
    };

    const onTouchEnd = () => {
      console.log("Touch end");
      handleEnd();
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      console.log("Touch move", e.touches[0].pageX);
      handleMove(e.touches[0].pageX);
    };

    // Wheel event for horizontal scrolling
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      pauseAnimation();
      const scrollSpeed = 3;
      
      console.log("Wheel scroll - deltaY:", e.deltaY, "current scrollLeft:", slider.scrollLeft);
      
      // Direct assignment for immediate response
      slider.scrollLeft += e.deltaY * scrollSpeed;
      
      // Resume animation after a delay
      setTimeout(resumeAnimation, 1500);
    };

    // Hover events to pause/resume animation
    const onMouseEnter = () => pauseAnimation();
    const onMouseLeaveContainer = () => {
      if (!isDragging) resumeAnimation();
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("touchstart", onTouchStart, { passive: false });
    slider.addEventListener("touchend", onTouchEnd);
    slider.addEventListener("touchmove", onTouchMove, { passive: false });
    slider.addEventListener("wheel", onWheel, { passive: false });
    slider.addEventListener("mouseenter", onMouseEnter);
    slider.addEventListener("mouseleave", onMouseLeaveContainer);

    // Prevent text selection and drag
    slider.addEventListener("selectstart", (e) => e.preventDefault());
    slider.addEventListener("dragstart", (e) => e.preventDefault());

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchend", onTouchEnd);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("wheel", onWheel);
      slider.removeEventListener("mouseenter", onMouseEnter);
      slider.removeEventListener("mouseleave", onMouseLeaveContainer);
      slider.removeEventListener("selectstart", (e) => e.preventDefault());
      slider.removeEventListener("dragstart", (e) => e.preventDefault());
    };
  }, [handleStart, handleEnd, handleMove, isDragging, pauseAnimation, resumeAnimation]);

  return (
    <section
      ref={sectionRef}
      className={`py-16 lg:py-24 bg-muted/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            Trusted by Leading Companies
          </h3>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-6 rounded-full transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />
          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-lg transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            From innovative startups to Fortune 500 enterprises, organizations worldwide
            trust us to deliver exceptional technology solutions and talent.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div 
            ref={scrollRef}
            className="flex gap-8 cursor-grab active:cursor-grabbing select-none animate-scroll-smooth overflow-x-auto [&::-webkit-scrollbar]:hidden user-select-none touch-pan-x overscroll-x-contain"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              touchAction: "pan-x",
              WebkitOverflowScrolling: "touch",
              width: "200%", // Make container wider than viewport to enable scrolling
            }}
          >
            {infiniteClientData.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-card rounded-xl border border-border/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/30 group overflow-hidden pointer-events-none"
                draggable={false}
              >
                <div className="flex items-center justify-center h-full p-4">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`} 
                    className="max-w-20 max-h-20 md:max-w-24 md:max-h-24 lg:max-w-28 lg:max-h-28 object-contain opacity-90 contrast-110 brightness-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:scale-110 transition-all duration-300 ease-out filter"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default ClientLogosSection;