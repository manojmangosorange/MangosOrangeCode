import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const DisasterRecovery = () => {
  const title = "Disaster Recovery";
  const tagline =
    "Comprehensive disaster recovery planning for business continuity and resilience.";
  const description = (
    <>
      <p>
        Ensure business continuity with our comprehensive disaster recovery
        solutions. We design and implement robust DR strategies that minimize
        downtime, protect critical data, and enable rapid recovery from natural
        disasters, cyber attacks, and system failures.
      </p>
      <p>
        Our disaster recovery experts create multi-tier recovery plans with
        automated failover, regular testing, and clear recovery procedures.
        Whether you need hot standby systems, cold recovery sites, or
        cloud-based DR solutions, we ensure your business can continue operating
        even during the most challenging circumstances.
      </p>
      <ul>
        <li>
          <strong>Business Impact Analysis:</strong> Comprehensive assessment of
          critical systems and recovery priorities
        </li>
        <li>
          <strong>Recovery Planning:</strong> Detailed procedures for different
          disaster scenarios
        </li>
        <li>
          <strong>Automated Failover:</strong> Seamless transition to backup
          systems with minimal downtime
        </li>
        <li>
          <strong>Regular Testing:</strong> Scheduled DR drills and plan
          validation exercises
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Risk Assessment",
      description:
        "Identify potential threats and vulnerabilities affecting business operations.",
    },
    {
      title: "Business Impact Analysis",
      description:
        "Analyze critical systems and determine recovery time and point objectives.",
    },
    {
      title: "DR Strategy Design",
      description:
        "Design comprehensive disaster recovery strategy with multiple recovery options.",
    },
    {
      title: "Implementation & Setup",
      description:
        "Deploy DR infrastructure with automated processes and monitoring systems.",
    },
    {
      title: "Testing & Validation",
      description:
        "Regular DR testing and plan validation to ensure effectiveness and compliance.",
    },
    {
      title: "Maintenance & Updates",
      description:
        "Ongoing plan maintenance with updates based on business and technology changes.",
    },
  ];

  const benefits = [
    "Minimized business downtime and data loss",
    "Automated failover and recovery processes",
    "Compliance with regulatory requirements",
    "Regular testing and plan validation",
    "Multi-tier recovery options",
    "24/7 monitoring and support",
  ];

  const caseStudies = [
    {
      title: "Banking DR Implementation",
      result: "30-second failover time",
      description:
        "Implemented hot standby DR solution for critical banking operations with automated failover.",
    },
    {
      title: "Healthcare System Recovery",
      result: "99.99% uptime achieved",
      description:
        "Built comprehensive DR strategy for healthcare systems with patient data protection.",
    },
    {
      title: "E-commerce Platform DR",
      result: "Zero revenue loss during incidents",
      description:
        "Deployed multi-region DR solution ensuring continuous e-commerce operations.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Disaster Recovery Services"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/disaster-recovery"
      serviceType="Business Continuity"
    />
  );
};

export default DisasterRecovery;
