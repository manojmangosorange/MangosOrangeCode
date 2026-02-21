import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const LegacyModernization = () => {
  const title = "Legacy Modernization";
  const tagline =
    "Transform legacy systems into modern, cloud-native applications.";
  const description = (
    <>
      <p>
        Breathe new life into your legacy applications with our comprehensive
        modernization services. We help you transform outdated systems into
        modern, scalable, and maintainable applications that leverage cloud
        technologies, microservices architecture, and contemporary development
        practices.
      </p>
      <p>
        Our modernization approach balances business continuity with
        technological advancement. Whether through replatforming, refactoring,
        or complete rebuilds, we ensure your legacy systems evolve to meet
        current business needs while maintaining data integrity and operational
        stability throughout the transformation process.
      </p>
      <ul>
        <li>
          <strong>Application Assessment:</strong> Detailed analysis of legacy
          application architecture and dependencies
        </li>
        <li>
          <strong>Modernization Strategy:</strong> Rehost, replatform, refactor,
          or rebuild approaches
        </li>
        <li>
          <strong>Cloud Migration:</strong> Seamless transition to cloud-native
          architecture
        </li>
        <li>
          <strong>API Integration:</strong> Modern APIs and microservices for
          enhanced flexibility
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Legacy Assessment",
      description:
        "Comprehensive analysis of existing applications, architecture, and business requirements.",
    },
    {
      title: "Modernization Strategy",
      description:
        "Define optimal modernization approach based on technical and business factors.",
    },
    {
      title: "Architecture Design",
      description:
        "Design modern, scalable architecture with cloud-native principles and best practices.",
    },
    {
      title: "Phased Implementation",
      description:
        "Execute modernization in phases to minimize business disruption and risk.",
    },
    {
      title: "Testing & Validation",
      description:
        "Comprehensive testing to ensure functionality, performance, and data integrity.",
    },
    {
      title: "Deployment & Support",
      description:
        "Production deployment with ongoing support and optimization services.",
    },
  ];

  const benefits = [
    "Reduced maintenance costs and technical debt",
    "Improved performance and scalability",
    "Enhanced security and compliance",
    "Modern user experience and interfaces",
    "Cloud-native architecture benefits",
    "Faster time-to-market for new features",
  ];

  const caseStudies = [
    {
      title: "Banking System Modernization",
      result: "70% performance improvement",
      description:
        "Modernized legacy core banking system with microservices and cloud architecture.",
    },
    {
      title: "ERP System Transformation",
      result: "50% maintenance cost reduction",
      description:
        "Migrated monolithic ERP to cloud-native architecture with modern APIs.",
    },
    {
      title: "Insurance Platform Upgrade",
      result: "3x faster deployment cycles",
      description:
        "Transformed legacy insurance platform to modern DevOps and CI/CD practices.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Legacy Application Modernization Services"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/legacy-modernization"
      serviceType="Software Development"
    />
  );
};

export default LegacyModernization;
