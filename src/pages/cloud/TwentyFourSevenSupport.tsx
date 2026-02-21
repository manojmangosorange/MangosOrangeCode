import CloudPageTemplate from '@/components/CloudPageTemplate';
import cloudStrategyHero from '@/assets/cloud-strategy-hero.webp';

const TwentyFourSevenSupport = () => {
  const title = "24/7 Cloud Support";
  const seoTitle = "24/7 Cloud Support Services | Round-the-Clock Monitoring | MangosOrange";
  const tagline = "Round-the-clock cloud infrastructure monitoring and support for maximum uptime.";
  const heroImage = cloudStrategyHero;
  
  const description = (
    <>
      <p>
        Ensure your cloud infrastructure operates at peak performance with our comprehensive 
        24/7 support services. Our certified cloud engineers provide continuous monitoring, 
        proactive maintenance, and rapid incident response to minimize downtime and optimize 
        your cloud operations.
      </p>
      <p>
        From real-time alerting to automated remediation, our support team leverages advanced 
        monitoring tools and best practices to maintain high availability, security, and 
        performance across your entire cloud ecosystem. We provide multi-tiered support 
        with guaranteed response times and escalation procedures.
      </p>
      <ul>
        <li><strong>Proactive Monitoring:</strong> 24/7 infrastructure monitoring with real-time alerts</li>
        <li><strong>Incident Response:</strong> Rapid response team with guaranteed SLAs</li>
        <li><strong>Performance Optimization:</strong> Continuous tuning for cost and performance</li>
        <li><strong>Security Management:</strong> Round-the-clock security monitoring and threat response</li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Infrastructure Assessment",
      description: "Comprehensive evaluation of current cloud setup, monitoring gaps, and support requirements."
    },
    {
      title: "Monitoring Setup",
      description: "Deploy advanced monitoring tools with custom dashboards, alerts, and automated responses."
    },
    {
      title: "Support Team Integration",
      description: "Onboard dedicated support engineers and establish communication channels and escalation procedures."
    },
    {
      title: "SLA Definition",
      description: "Define service level agreements, response times, and resolution targets based on business needs."
    },
    {
      title: "Runbook Creation",
      description: "Develop comprehensive runbooks for common issues and incident response procedures."
    },
    {
      title: "Continuous Improvement",
      description: "Regular reviews, performance analysis, and optimization recommendations for ongoing enhancement."
    }
  ];

  const benefits = [
    "99.9% uptime guarantee with SLA-backed support",
    "Immediate response to critical incidents",
    "Proactive issue detection and prevention",
    "Cost optimization recommendations",
    "Security monitoring and compliance support",
    "Performance tuning and capacity planning",
    "Detailed reporting and analytics",
    "Expert guidance on cloud best practices"
  ];

  const caseStudies = [
    {
      title: "E-commerce Platform Support",
      result: "99.98% uptime achieved",
      description: "Provided 24/7 monitoring for high-traffic e-commerce platform during peak shopping seasons with zero major incidents."
    },
    {
      title: "Healthcare Cloud Operations",
      result: "50% faster incident resolution",
      description: "Implemented comprehensive monitoring and support for HIPAA-compliant healthcare cloud infrastructure."
    },
    {
      title: "Financial Services Monitoring",
      result: "30% cost reduction",
      description: "Delivered proactive monitoring and optimization resulting in significant cost savings while maintaining performance."
    }
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle={seoTitle}
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/24-7-support"
      serviceType="Cloud Support Services"
    />
  );
};

export default TwentyFourSevenSupport;