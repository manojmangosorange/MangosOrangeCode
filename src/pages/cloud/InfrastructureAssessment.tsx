import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const InfrastructureAssessment = () => {
  const title = "Infrastructure Assessment";
  const tagline =
    "Comprehensive infrastructure evaluation for cloud readiness and optimization.";
  const description = (
    <>
      <p>
        Get a complete picture of your IT infrastructure with our thorough
        assessment services. We evaluate your current systems, applications, and
        processes to identify cloud migration opportunities, security gaps, and
        optimization potential across your entire technology stack.
      </p>
      <p>
        Our infrastructure assessment provides detailed insights into
        performance bottlenecks, cost optimization opportunities, and
        modernization pathways. Whether you're planning a cloud migration,
        digital transformation, or simply optimizing existing infrastructure,
        our assessment delivers actionable recommendations backed by industry
        best practices.
      </p>
      <ul>
        <li>
          <strong>Current State Analysis:</strong> Detailed inventory and
          performance assessment
        </li>
        <li>
          <strong>Cloud Readiness:</strong> Application and workload migration
          suitability evaluation
        </li>
        <li>
          <strong>Security Review:</strong> Vulnerability assessment and
          compliance gap analysis
        </li>
        <li>
          <strong>Cost Analysis:</strong> TCO modeling and optimization
          recommendations
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Discovery & Inventory",
      description:
        "Comprehensive discovery of all infrastructure components, applications, and dependencies.",
    },
    {
      title: "Performance Analysis",
      description:
        "Analyze system performance, capacity utilization, and bottlenecks.",
    },
    {
      title: "Security Assessment",
      description:
        "Evaluate security posture, vulnerabilities, and compliance requirements.",
    },
    {
      title: "Cloud Readiness Evaluation",
      description:
        "Assess migration suitability and modernization opportunities for each workload.",
    },
    {
      title: "Cost & ROI Analysis",
      description:
        "Calculate current costs and projected savings from optimization or migration.",
    },
    {
      title: "Roadmap & Recommendations",
      description:
        "Deliver detailed roadmap with prioritized recommendations and implementation plan.",
    },
  ];

  const benefits = [
    "Complete infrastructure visibility",
    "Data-driven migration decisions",
    "Security and compliance insights",
    "Cost optimization opportunities",
    "Detailed implementation roadmap",
    "Risk mitigation strategies",
  ];

  const caseStudies = [
    {
      title: "Manufacturing Infrastructure Audit",
      result: "40% cost reduction identified",
      description:
        "Comprehensive assessment revealed optimization opportunities and cloud migration strategy.",
    },
    {
      title: "Healthcare System Review",
      result: "HIPAA compliance roadmap",
      description:
        "Security assessment and compliance gap analysis with remediation recommendations.",
    },
    {
      title: "Financial Services Modernization",
      result: "60% performance improvement plan",
      description:
        "Legacy system assessment with modernization strategy and cloud migration roadmap.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Infrastructure Assessment Services"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/infrastructure-assessment"
      serviceType="IT Consulting"
    />
  );
};

export default InfrastructureAssessment;
