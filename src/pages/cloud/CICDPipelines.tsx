import CloudPageTemplate from '@/components/CloudPageTemplate';
import cloudStrategyHero from '@/assets/cloud-strategy-hero.webp';

const CICDPipelines = () => {
  const title = "CI/CD Pipelines";
  const seoTitle = "CI/CD Pipeline Services | DevOps Automation | MangosOrange";
  const tagline = "Automate your software delivery with robust CI/CD pipeline solutions.";
  const heroImage = cloudStrategyHero;
  
  const description = (
    <>
      <p>
        Transform your software development lifecycle with automated CI/CD pipelines that ensure 
        faster, more reliable deployments. Our DevOps experts design and implement continuous 
        integration and deployment workflows that reduce manual errors and accelerate time-to-market.
      </p>
      <p>
        From code commit to production deployment, we build comprehensive automation pipelines 
        using industry-leading tools like Jenkins, GitLab CI, GitHub Actions, and AWS CodePipeline. 
        Our solutions include automated testing, code quality checks, security scanning, and 
        deployment orchestration across multiple environments.
      </p>
      <ul>
        <li><strong>Continuous Integration:</strong> Automated build, test, and code quality validation</li>
        <li><strong>Continuous Deployment:</strong> Seamless deployment to staging and production environments</li>
        <li><strong>Infrastructure as Code:</strong> Version-controlled infrastructure provisioning</li>
        <li><strong>Monitoring & Alerts:</strong> Real-time pipeline monitoring and failure notifications</li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Current State Analysis",
      description: "Assess existing development workflows, tools, and deployment processes to identify optimization opportunities."
    },
    {
      title: "Pipeline Design",
      description: "Design CI/CD architecture with branching strategies, testing stages, and deployment workflows."
    },
    {
      title: "Tool Selection",
      description: "Choose optimal CI/CD tools based on technology stack, team size, and organizational requirements."
    },
    {
      title: "Implementation",
      description: "Set up automated pipelines with build, test, security scanning, and deployment stages."
    },
    {
      title: "Testing & Validation",
      description: "Thoroughly test pipeline functionality, rollback procedures, and performance metrics."
    },
    {
      title: "Team Training",
      description: "Train development teams on pipeline usage, troubleshooting, and best practices."
    }
  ];

  const benefits = [
    "Faster release cycles with automated deployments",
    "Reduced manual errors and improved code quality",
    "Consistent deployment processes across environments",
    "Early detection of bugs through automated testing",
    "Rollback capabilities for quick issue resolution",
    "Enhanced collaboration between development and operations teams",
    "Increased developer productivity and focus on feature development",
    "Compliance and audit trail for all deployments"
  ];

  const caseStudies = [
    {
      title: "E-commerce Platform Automation",
      result: "75% faster deployment",
      description: "Implemented GitLab CI/CD pipeline reducing deployment time from 4 hours to 1 hour with zero-downtime deployments."
    },
    {
      title: "Financial Services DevOps",
      result: "90% reduction in deployment errors",
      description: "Built comprehensive Jenkins pipeline with automated testing and compliance checks for regulatory requirements."
    },
    {
      title: "SaaS Application Pipeline",
      result: "300% increase in release frequency",
      description: "Designed multi-environment CI/CD workflow enabling daily releases with automated rollback capabilities."
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
      canonicalPath="/cloud/cicd-pipelines"
      serviceType="DevOps Services"
    />
  );
};

export default CICDPipelines;