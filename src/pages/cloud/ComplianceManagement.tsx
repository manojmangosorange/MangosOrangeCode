import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const ComplianceManagement = () => {
  const title = "Compliance Management";
  const tagline =
    "Comprehensive compliance solutions ensuring regulatory adherence in the cloud.";
  const description = (
    <>
      <p>
        Navigate complex regulatory requirements with our comprehensive
        compliance management services. We help organizations maintain adherence
        to industry standards and regulations including GDPR, HIPAA, SOC 2, ISO
        27001, and PCI DSS while leveraging cloud technologies effectively.
      </p>
      <p>
        Our compliance experts design governance frameworks that automate
        compliance monitoring, maintain audit trails, and ensure continuous
        adherence to regulatory requirements. Whether you're migrating to the
        cloud or enhancing existing compliance posture, we provide the tools and
        processes needed to meet regulatory obligations efficiently.
      </p>
      <ul>
        <li>
          <strong>Regulatory Frameworks:</strong> GDPR, HIPAA, SOC 2, ISO 27001,
          PCI DSS compliance
        </li>
        <li>
          <strong>Automated Monitoring:</strong> Continuous compliance tracking
          and violation detection
        </li>
        <li>
          <strong>Audit Management:</strong> Comprehensive audit trails and
          documentation
        </li>
        <li>
          <strong>Risk Assessment:</strong> Regular compliance risk evaluation
          and mitigation
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Compliance Assessment",
      description:
        "Evaluate current compliance posture and identify gaps against regulatory requirements.",
    },
    {
      title: "Framework Design",
      description:
        "Design compliance framework aligned with applicable regulations and business needs.",
    },
    {
      title: "Policy Implementation",
      description:
        "Implement compliance policies, procedures, and automated monitoring systems.",
    },
    {
      title: "Control Deployment",
      description:
        "Deploy technical controls and governance mechanisms for continuous compliance.",
    },
    {
      title: "Audit Preparation",
      description:
        "Prepare comprehensive documentation and evidence for regulatory audits.",
    },
    {
      title: "Continuous Monitoring",
      description:
        "Ongoing compliance monitoring with regular assessments and updates.",
    },
  ];

  const benefits = [
    "Multi-regulation compliance expertise",
    "Automated compliance monitoring and reporting",
    "Reduced compliance costs and effort",
    "Comprehensive audit trail management",
    "Risk-based compliance approach",
    "Regular compliance health checks",
  ];

  const caseStudies = [
    {
      title: "Healthcare HIPAA Compliance",
      result: "100% audit success",
      description:
        "Implemented comprehensive HIPAA compliance framework for healthcare cloud infrastructure.",
    },
    {
      title: "Financial PCI DSS Compliance",
      result: "Level 1 certification achieved",
      description:
        "Built PCI DSS compliant payment processing infrastructure with automated monitoring.",
    },
    {
      title: "GDPR Implementation",
      result: "Zero compliance violations",
      description:
        "Deployed GDPR compliance framework with data privacy controls and audit capabilities.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Compliance Management Services"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/compliance"
      serviceType="Compliance Consulting"
    />
  );
};

export default ComplianceManagement;
