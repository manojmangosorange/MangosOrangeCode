import { useEffect } from "react";
import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const MicrosoftAzure = () => {
  const title = "Microsoft Azure";
  const tagline =
    "Enterprise-grade Azure solutions for digital transformation and hybrid cloud.";
  const description = (
    <>
      <p>
        Harness the full potential of Microsoft Azure with our comprehensive
        cloud services. From Azure Virtual Machines and Storage to AI and
        Machine Learning services, we deliver enterprise-grade solutions that
        integrate seamlessly with your existing Microsoft ecosystem.
      </p>
      <p>
        Our Azure-certified experts help you leverage hybrid cloud capabilities,
        advanced analytics, and cutting-edge AI services to drive digital
        transformation. Whether you're running Windows workloads or building
        modern applications, Azure provides the scalability and reliability your
        business needs.
      </p>
      <ul>
        <li>
          <strong>Compute:</strong> Virtual Machines, App Services, Azure
          Kubernetes Service
        </li>
        <li>
          <strong>Storage:</strong> Blob Storage, File Storage, Disk Storage
          with high availability
        </li>
        <li>
          <strong>AI & Analytics:</strong> Cognitive Services, Machine Learning,
          Power BI integration
        </li>
        <li>
          <strong>Hybrid Solutions:</strong> Azure Arc, Azure Stack for seamless
          hybrid deployment
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Azure Readiness Assessment",
      description:
        "Evaluate infrastructure and applications for Azure migration and optimization.",
    },
    {
      title: "Solution Architecture",
      description:
        "Design Azure architecture with hybrid cloud integration and security best practices.",
    },
    {
      title: "Migration Strategy",
      description:
        "Develop phased migration approach with minimal business disruption.",
    },
    {
      title: "Azure Deployment",
      description:
        "Implement Azure services with proper governance, security, and compliance.",
    },
    {
      title: "Integration & Testing",
      description:
        "Integrate with existing systems and conduct thorough testing and validation.",
    },
    {
      title: "Optimization & Support",
      description:
        "Ongoing monitoring, optimization, and support for maximum ROI.",
    },
  ];

  const benefits = [
    "Microsoft-certified Azure professionals",
    "Seamless Office 365 and Microsoft ecosystem integration",
    "Advanced security and compliance features",
    "Hybrid cloud capabilities with Azure Arc",
    "AI and machine learning integration",
    "Cost management and optimization tools",
  ];

  const caseStudies = [
    {
      title: "Healthcare Data Platform",
      result: "HIPAA compliance achieved",
      description:
        "Built secure Azure-based healthcare data platform with advanced analytics and compliance.",
    },
    {
      title: "Manufacturing IoT Solution",
      result: "30% efficiency gain",
      description:
        "Deployed Azure IoT and AI services for predictive maintenance and optimization.",
    },
    {
      title: "Financial Services Migration",
      result: "50% infrastructure cost savings",
      description:
        "Migrated critical financial applications to Azure with enhanced security and performance.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Microsoft Azure Solutions"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/azure"
    />
  );
};

export default MicrosoftAzure;
