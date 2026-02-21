import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const CloudSecurity = () => {
  const title = "Cloud Security";
  const tagline =
    "Comprehensive cloud security solutions protecting your digital assets.";
  const description = (
    <>
      <p>
        Secure your cloud infrastructure with our comprehensive security
        solutions. We implement multi-layered security strategies that protect
        your data, applications, and infrastructure across all major cloud
        platforms while ensuring compliance with industry standards and
        regulatory requirements.
      </p>
      <p>
        Our cloud security experts design and implement robust security
        architectures that include identity management, network security, data
        encryption, and threat detection. From security assessments to 24/7
        monitoring, we provide end-to-end protection for your cloud environments
        while maintaining operational efficiency.
      </p>
      <ul>
        <li>
          <strong>Identity & Access Management:</strong> Zero-trust architecture
          and privileged access controls
        </li>
        <li>
          <strong>Data Protection:</strong> Encryption at rest and in transit
          with key management
        </li>
        <li>
          <strong>Network Security:</strong> Firewalls, VPNs, and
          micro-segmentation strategies
        </li>
        <li>
          <strong>Threat Detection:</strong> AI-powered monitoring and incident
          response
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Security Assessment",
      description:
        "Comprehensive evaluation of current security posture and vulnerability identification.",
    },
    {
      title: "Security Architecture",
      description:
        "Design multi-layered security architecture aligned with compliance requirements.",
    },
    {
      title: "Implementation Planning",
      description:
        "Develop phased implementation plan with minimal business disruption.",
    },
    {
      title: "Security Deployment",
      description:
        "Deploy security controls, monitoring tools, and incident response procedures.",
    },
    {
      title: "Testing & Validation",
      description:
        "Penetration testing and security validation to ensure effectiveness.",
    },
    {
      title: "Monitoring & Support",
      description:
        "24/7 security monitoring with proactive threat detection and response.",
    },
  ];

  const benefits = [
    "Multi-cloud security expertise",
    "Compliance with industry standards (SOC2, ISO 27001)",
    "Zero-trust architecture implementation",
    "AI-powered threat detection and response",
    "24/7 security operations center (SOC)",
    "Regular security assessments and updates",
  ];

  const caseStudies = [
    {
      title: "Financial Services Security",
      result: "99.9% threat detection accuracy",
      description:
        "Implemented comprehensive cloud security for banking infrastructure with real-time monitoring.",
    },
    {
      title: "Healthcare Data Protection",
      result: "HIPAA compliance achieved",
      description:
        "Deployed end-to-end encryption and access controls for healthcare data in the cloud.",
    },
    {
      title: "E-commerce Platform Security",
      result: "Zero security incidents",
      description:
        "Built robust security architecture protecting customer data and payment processing.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Cloud Security Services"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/security"
      serviceType="Cybersecurity"
    />
  );
};

export default CloudSecurity;
