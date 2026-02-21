import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const AmazonWebServices = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".fade-up, .slide-in-left, .slide-in-right"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const title = "Amazon Web Services (AWS)";
  const tagline =
    "Comprehensive AWS cloud solutions for scalable and secure infrastructure.";
  const description = (
    <>
      <p>
        Leverage the power of Amazon Web Services with our expert implementation
        and management services. From EC2 and S3 to Lambda and RDS, we help you
        build robust, scalable cloud infrastructure that grows with your
        business.
      </p>
      <p>
        Our AWS-certified professionals design, deploy, and manage cloud
        architectures that optimize performance, security, and cost-efficiency.
        Whether you're migrating existing workloads or building cloud-native
        applications, we ensure your AWS environment follows best practices and
        industry standards.
      </p>
      <ul>
        <li>
          <strong>Compute Services:</strong> EC2, Lambda, ECS, EKS for flexible
          computing power
        </li>
        <li>
          <strong>Storage Solutions:</strong> S3, EBS, EFS for secure and
          scalable data storage
        </li>
        <li>
          <strong>Database Services:</strong> RDS, DynamoDB, ElastiCache for
          reliable data management
        </li>
        <li>
          <strong>Networking:</strong> VPC, CloudFront, Route 53 for secure and
          fast connectivity
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "AWS Assessment",
      description:
        "Evaluate current infrastructure and define AWS migration strategy and requirements.",
    },
    {
      title: "Architecture Design",
      description:
        "Design scalable, secure, and cost-optimized AWS architecture tailored to your needs.",
    },
    {
      title: "Migration Planning",
      description:
        "Create detailed migration plan with timelines, dependencies, and risk mitigation.",
    },
    {
      title: "Implementation",
      description:
        "Deploy AWS services with proper configuration, security, and monitoring setup.",
    },
    {
      title: "Testing & Validation",
      description:
        "Comprehensive testing to ensure performance, security, and functionality.",
    },
    {
      title: "Go-Live & Support",
      description:
        "Smooth transition to production with ongoing monitoring and optimization.",
    },
  ];

  const benefits = [
    "AWS-certified engineers and architects",
    "Cost optimization and right-sizing strategies",
    "High availability and disaster recovery",
    "Enterprise-grade security implementation",
    "Auto-scaling and performance optimization",
    "24/7 monitoring and support services",
  ];

  const caseStudies = [
    {
      title: "E-commerce Platform Migration",
      result: "40% cost reduction",
      description:
        "Migrated legacy e-commerce platform to AWS with improved performance and scalability.",
    },
    {
      title: "Financial Services Data Lake",
      result: "60% faster analytics",
      description:
        "Built secure AWS data lake with real-time analytics for regulatory compliance.",
    },
    {
      title: "Media Streaming Platform",
      result: "99.9% uptime",
      description:
        "Deployed global CDN with auto-scaling for high-traffic video streaming service.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Amazon Web Services (AWS)",
    description:
      "Expert AWS cloud solutions including migration, architecture design, and managed services for scalable infrastructure.",
    serviceType: "Cloud Computing",
    areaServed: "IN",
    provider: { "@type": "Organization", name: "MangosOrange" },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Amazon Web Services (AWS) Solutions"
        description="Expert AWS cloud services including migration, architecture design, and managed services for scalable and secure infrastructure."
        canonical={
          typeof window !== "undefined"
            ? `${window.location.origin}/cloud/aws`
            : "/cloud/aws"
        }
        jsonLd={jsonLd}
      />
      <Header />
      <div className="fade-up">
        <ServicePageLayout
          title={title}
          tagline={tagline}
          heroImage={heroImage}
          description={description}
          steps={steps}
          benefits={benefits}
          caseStudies={caseStudies}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AmazonWebServices;
