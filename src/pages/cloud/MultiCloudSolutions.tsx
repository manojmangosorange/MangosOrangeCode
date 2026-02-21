import { useEffect } from "react";
import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const MultiCloudSolutions = () => {
  const title = "Multi-Cloud Solutions";
  const tagline =
    "Strategic multi-cloud architecture for flexibility, resilience, and vendor independence.";
  const description = (
    <>
      <p>
        Maximize flexibility and minimize vendor lock-in with our comprehensive
        multi-cloud strategies. We help you leverage the best services from AWS,
        Azure, and Google Cloud while maintaining consistency, security, and
        operational efficiency across all platforms.
      </p>
      <p>
        Our multi-cloud experts design architectures that optimize for
        performance, cost, and compliance while providing disaster recovery and
        business continuity. Whether you need workload distribution, data
        residency compliance, or best-of-breed service selection, we ensure
        seamless integration and management across multiple cloud providers.
      </p>
      <ul>
        <li>
          <strong>Hybrid Integration:</strong> Seamless connectivity between
          on-premises and multiple clouds
        </li>
        <li>
          <strong>Workload Optimization:</strong> Right-platform placement for
          optimal performance and cost
        </li>
        <li>
          <strong>Unified Management:</strong> Single pane of glass for
          monitoring and operations
        </li>
        <li>
          <strong>Data Strategy:</strong> Cross-cloud data synchronization and
          backup strategies
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Multi-Cloud Assessment",
      description:
        "Evaluate current infrastructure and define multi-cloud strategy and objectives.",
    },
    {
      title: "Platform Selection",
      description:
        "Choose optimal cloud platforms based on workload requirements and business needs.",
    },
    {
      title: "Architecture Design",
      description:
        "Design unified multi-cloud architecture with consistent security and governance.",
    },
    {
      title: "Integration Planning",
      description:
        "Plan seamless integration, data flow, and communication between cloud platforms.",
    },
    {
      title: "Implementation & Migration",
      description:
        "Deploy multi-cloud infrastructure with proper monitoring and management tools.",
    },
    {
      title: "Optimization & Governance",
      description:
        "Ongoing optimization, cost management, and compliance across all platforms.",
    },
  ];

  const benefits = [
    "Vendor independence and flexibility",
    "Optimized cost across multiple providers",
    "Enhanced disaster recovery and redundancy",
    "Best-of-breed service selection",
    "Improved geographic coverage and latency",
    "Regulatory compliance and data sovereignty",
  ];

  const caseStudies = [
    {
      title: "Global Enterprise Platform",
      result: "30% cost optimization",
      description:
        "Implemented multi-cloud strategy across AWS, Azure, and GCP for global operations.",
    },
    {
      title: "Financial Services Compliance",
      result: "100% regulatory compliance",
      description:
        "Built multi-cloud architecture meeting different regional compliance requirements.",
    },
    {
      title: "Media Distribution Network",
      result: "50% performance improvement",
      description:
        "Deployed content delivery across multiple clouds for optimal global performance.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Multi-Cloud Solutions"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/multi-cloud"
    />
  );
};

export default MultiCloudSolutions;
