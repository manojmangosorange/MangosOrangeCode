import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const BackupSolutions = () => {
  const title = "Backup Solutions";
  const tagline =
    "Reliable cloud backup and data protection strategies for business continuity.";
  const description = (
    <>
      <p>
        Protect your critical business data with our comprehensive cloud backup
        solutions. We design and implement automated backup strategies that
        ensure your data is secure, accessible, and recoverable across multiple
        cloud platforms and on-premises environments.
      </p>
      <p>
        Our backup solutions provide multi-tier protection with automated
        scheduling, version control, and rapid recovery capabilities. Whether
        you need database backups, file system protection, or complete
        application recovery, we ensure your data is protected against hardware
        failures, cyber threats, and human error.
      </p>
      <ul>
        <li>
          <strong>Automated Backup:</strong> Scheduled backups with intelligent
          compression and deduplication
        </li>
        <li>
          <strong>Multi-Tier Storage:</strong> Cost-optimized storage across
          hot, warm, and cold tiers
        </li>
        <li>
          <strong>Point-in-Time Recovery:</strong> Granular recovery options
          with minimal downtime
        </li>
        <li>
          <strong>Cross-Platform Support:</strong> Unified backup across cloud
          and on-premises systems
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Backup Assessment",
      description:
        "Evaluate current backup strategies and identify critical data protection requirements.",
    },
    {
      title: "Strategy Design",
      description:
        "Design comprehensive backup strategy with RTO/RPO objectives and compliance needs.",
    },
    {
      title: "Infrastructure Setup",
      description:
        "Configure backup infrastructure with appropriate storage tiers and retention policies.",
    },
    {
      title: "Automation Implementation",
      description:
        "Deploy automated backup processes with monitoring and alerting capabilities.",
    },
    {
      title: "Testing & Validation",
      description:
        "Regular backup testing and disaster recovery drills to ensure recoverability.",
    },
    {
      title: "Monitoring & Optimization",
      description:
        "Ongoing monitoring with optimization for performance and cost efficiency.",
    },
  ];

  const benefits = [
    "Automated backup scheduling and management",
    "Multi-cloud and hybrid backup capabilities",
    "Cost-optimized storage with intelligent tiering",
    "Rapid recovery with minimal downtime",
    "Compliance with data retention requirements",
    "24/7 monitoring and support",
  ];

  const caseStudies = [
    {
      title: "Enterprise Data Protection",
      result: "15-minute recovery time",
      description:
        "Implemented enterprise-wide backup solution with rapid recovery capabilities.",
    },
    {
      title: "Database Backup Automation",
      result: "99.99% backup success rate",
      description:
        "Automated database backup solution with point-in-time recovery for financial services.",
    },
    {
      title: "Multi-Site Backup Strategy",
      result: "40% storage cost reduction",
      description:
        "Optimized backup strategy across multiple locations with intelligent storage tiering.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Cloud Backup Solutions"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/backup"
      serviceType="Data Protection"
    />
  );
};

export default BackupSolutions;
