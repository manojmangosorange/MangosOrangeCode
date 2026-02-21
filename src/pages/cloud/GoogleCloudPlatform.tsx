import { useEffect } from "react";
import CloudPageTemplate from "@/components/CloudPageTemplate";
import heroImage from "@/assets/cloud-strategy-hero.webp";

const GoogleCloudPlatform = () => {
  const title = "Google Cloud Platform (GCP)";
  const tagline =
    "Advanced GCP solutions powered by Google's cutting-edge technology and AI.";
  const description = (
    <>
      <p>
        Leverage Google's world-class infrastructure and AI capabilities with
        our comprehensive GCP services. From Compute Engine and Cloud Storage to
        BigQuery and TensorFlow, we help you build intelligent, scalable
        applications using Google's proven technology stack.
      </p>
      <p>
        Our GCP-certified professionals excel in data analytics, machine
        learning, and containerized applications. Whether you're processing big
        data, building AI-driven solutions, or modernizing applications with
        Kubernetes, GCP provides the advanced tools and global infrastructure to
        accelerate your digital transformation.
      </p>
      <ul>
        <li>
          <strong>Compute:</strong> Compute Engine, App Engine, Google
          Kubernetes Engine (GKE)
        </li>
        <li>
          <strong>Data & Analytics:</strong> BigQuery, Cloud SQL, Dataflow for
          advanced analytics
        </li>
        <li>
          <strong>AI & ML:</strong> TensorFlow, AutoML, Vertex AI for
          intelligent applications
        </li>
        <li>
          <strong>Developer Tools:</strong> Cloud Build, Cloud Functions,
          Firebase for rapid development
        </li>
      </ul>
    </>
  );

  const steps = [
    {
      title: "GCP Discovery",
      description:
        "Assess current infrastructure and identify GCP opportunities for optimization.",
    },
    {
      title: "Cloud Architecture",
      description:
        "Design GCP-native architecture leveraging advanced analytics and AI capabilities.",
    },
    {
      title: "Migration Planning",
      description:
        "Create comprehensive migration strategy with data and application modernization.",
    },
    {
      title: "GCP Implementation",
      description:
        "Deploy GCP services with security, monitoring, and governance best practices.",
    },
    {
      title: "Data & AI Integration",
      description:
        "Implement advanced analytics, ML models, and AI-driven insights.",
    },
    {
      title: "Optimization & Scaling",
      description:
        "Continuous optimization for performance, cost, and scalability.",
    },
  ];

  const benefits = [
    "Google-certified cloud architects",
    "Advanced data analytics and BigQuery expertise",
    "AI and machine learning integration",
    "Kubernetes and containerization specialists",
    "Global network infrastructure",
    "Sustainable and carbon-neutral cloud computing",
  ];

  const caseStudies = [
    {
      title: "Retail Analytics Platform",
      result: "10x faster insights",
      description:
        "Built real-time analytics platform using BigQuery and ML for customer behavior analysis.",
    },
    {
      title: "Gaming Infrastructure",
      result: "Global 20ms latency",
      description:
        "Deployed scalable gaming infrastructure with GKE and global load balancing.",
    },
    {
      title: "AI-Powered Logistics",
      result: "25% route optimization",
      description:
        "Implemented ML-driven route optimization using Google AI and mapping services.",
    },
  ];

  return (
    <CloudPageTemplate
      title={title}
      seoTitle="Google Cloud Platform (GCP) Solutions"
      tagline={tagline}
      heroImage={heroImage}
      description={description}
      steps={steps}
      benefits={benefits}
      caseStudies={caseStudies}
      canonicalPath="/cloud/gcp"
    />
  );
};

export default GoogleCloudPlatform;
