import CloudPageTemplate from '@/components/CloudPageTemplate';
import cloudStrategyHero from '@/assets/cloud-strategy-hero.webp';

const InfrastructureAsCode = () => {
  const title = "Infrastructure as Code (IaC)";
  const seoTitle = "Infrastructure as Code Services | IaC Solutions | MangosOrange";
  const tagline = "Manage and provision infrastructure through code for consistent, scalable deployments.";
  const heroImage = cloudStrategyHero;
  
  const description = (
    <>
      <p>
        Revolutionize your infrastructure management with Infrastructure as Code (IaC) solutions 
        that bring version control, automation, and consistency to your cloud resources. Our experts 
        implement IaC practices using Terraform, AWS CloudFormation, Azure ARM templates, and 
        Google Cloud Deployment Manager.
      </p>
      <p>
        Transform manual infrastructure provisioning into automated, repeatable processes that 
        eliminate configuration drift and ensure environment consistency. From development to 
        production, our IaC solutions enable rapid scaling, disaster recovery, and compliance 
        through declarative infrastructure definitions.
      </p>
      <ul>
        <li><strong>Multi-Cloud Support:</strong> Terraform scripts for AWS, Azure, GCP, and hybrid environments</li>
        <li><strong>Version Control:</strong> Git-based infrastructure versioning and change tracking</li>
        <li><strong>Environment Consistency:</strong> Identical infrastructure across dev, staging, and production</li>
        <li><strong>Compliance & Security:</strong> Policy-as-code for security and compliance enforcement</li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "Infrastructure Audit",
      description: "Analyze current infrastructure setup, dependencies, and configuration management practices."
    },
    {
      title: "IaC Strategy Design",
      description: "Design infrastructure architecture using declarative code with modular, reusable components."
    },
    {
      title: "Tool Implementation",
      description: "Set up Terraform, CloudFormation, or other IaC tools with proper state management and workflows."
    },
    {
      title: "Migration Planning",
      description: "Create migration strategy from manual processes to automated infrastructure provisioning."
    },
    {
      title: "Code Development",
      description: "Develop infrastructure code modules with proper testing, validation, and documentation."
    },
    {
      title: "Deployment & Monitoring",
      description: "Deploy IaC solutions with monitoring, alerting, and continuous improvement processes."
    }
  ];

  const benefits = [
    "Consistent infrastructure across all environments",
    "Faster provisioning and scaling of resources",
    "Reduced manual configuration errors",
    "Version-controlled infrastructure changes",
    "Improved disaster recovery capabilities",
    "Cost optimization through resource management",
    "Enhanced security through standardized configurations",
    "Simplified compliance and audit processes"
  ];

  const caseStudies = [
    {
      title: "Multi-Cloud Migration",
      result: "80% reduction in provisioning time",
      description: "Implemented Terraform-based IaC for seamless resource provisioning across AWS and Azure environments."
    },
    {
      title: "Enterprise Compliance Platform",
      result: "100% infrastructure consistency",
      description: "Built policy-as-code framework ensuring regulatory compliance across 50+ microservices infrastructure."
    },
    {
      title: "Startup Scaling Solution",
      result: "90% faster environment setup",
      description: "Created modular IaC templates enabling rapid scaling from 10 to 1000+ servers with zero configuration drift."
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
      canonicalPath="/cloud/infrastructure-as-code"
      serviceType="Infrastructure Management"
    />
  );
};

export default InfrastructureAsCode;