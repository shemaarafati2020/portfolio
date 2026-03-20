export interface LinkedInCertificate {
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description?: string
  skills?: string[]
  category?: string
}

// Real certificates fetched from LinkedIn profile
// https://www.linkedin.com/in/shema-arafati-h-5baa6b395/details/certifications/
export const manualLinkedInCertificates: LinkedInCertificate[] = [
  {
    name: "Building RAG Apps Using MongoDB",
    issuer: "MongoDB",
    date: "March 2026",
    expiryDate: "January 2036",
    credentialUrl: "https://www.credly.com/badges/3b2b1d03-e9ae-432c-86fe-af693b55e9d1/linked_in_profile",
    description: "Hands-on certification in building Retrieval-Augmented Generation (RAG) applications using MongoDB as the vector store and AI backend.",
    skills: ["MongoDB", "RAG", "AI", "Vector Search"],
    category: "AI & Data"
  },
  {
    name: "Spring Boot 3 Essential Training",
    issuer: "LinkedIn Learning",
    date: "March 2026",
    expiryDate: "November 2036",
    credentialUrl: "https://www.linkedin.com/learning/certificates/65722eace24649fc87a5b514e3d7ee4a2f89c26c6802c91df3fbe45117138d9a/",
    description: "Comprehensive training in Spring Boot 3, covering Spring Framework, Spring MVC, and modern Java application development.",
    skills: ["Spring Boot", "Spring Framework", "Spring MVC", "Java"],
    category: "Backend"
  },
  {
    name: "Introduction to Oracle Cloud Essentials",
    issuer: "LinkedIn Learning",
    date: "March 2026",
    expiryDate: "December 2036",
    credentialUrl: "https://www.linkedin.com/learning/certificates/a4edddf62d156f94750d55333b1fb351d6629c9b447793e874d41b6730745c93/",
    description: "Foundational certification in Oracle Cloud Infrastructure, covering core cloud concepts, services and architecture.",
    skills: ["Oracle Cloud", "Cloud Computing", "Infrastructure"],
    category: "Cloud"
  },
  {
    name: "Building AI-Powered Search with MongoDB Vector Search",
    issuer: "MongoDB",
    date: "March 2026",
    credentialUrl: "https://www.credly.com/badges/1128a817-7dd7-4d92-95ec-39c685fa862d/linked_in_profile",
    description: "Advanced certification in implementing AI-powered semantic search solutions using MongoDB Vector Search and machine learning embeddings.",
    skills: ["MongoDB", "Vector Search", "AI", "Machine Learning"],
    category: "AI & Data"
  },
  {
    name: "MongoDB Indexing Design Fundamentals",
    issuer: "MongoDB",
    date: "March 2026",
    credentialUrl: "https://www.credly.com/badges/ba33bdf8-a970-4351-b29d-9ce4b03b241c/linked_in_profile",
    description: "Expert-level knowledge in MongoDB index design patterns, performance optimization strategies and query planning.",
    skills: ["MongoDB", "Database Indexing", "Performance Optimization"],
    category: "Database"
  },
  {
    name: "CRUD Operations in MongoDB",
    issuer: "MongoDB",
    date: "March 2026",
    expiryDate: "January 2036",
    credentialUrl: "https://www.credly.com/badges/6bcc1d72-5b4d-4a81-aff7-00d791f329ba/linked_in_profile",
    description: "Certification demonstrating proficiency in Create, Read, Update, and Delete operations in MongoDB with best practices.",
    skills: ["MongoDB", "CRUD", "Database Operations"],
    category: "Database"
  },
  {
    name: "Cybersecurity Foundations",
    issuer: "LinkedIn Learning",
    date: "March 2026",
    credentialUrl: "https://www.linkedin.com/learning/certificates/454e99f4974af255c234a4ae660c184000435f606399049755b7915ec588e174/",
    description: "Essential cybersecurity principles, threat detection, network security fundamentals and security best practices.",
    skills: ["Cybersecurity", "Network Security", "Threat Detection"],
    category: "Security"
  },
  {
    name: "MongoDB Schema Design Patterns and Anti-patterns Skill Badge",
    issuer: "MongoDB",
    date: "March 2026",
    expiryDate: "February 2036",
    credentialUrl: "https://www.credly.com/badges/2d1bfa77-8db4-4f61-a4cd-78db1f72d1dc/linked_in_profile",
    description: "Advanced schema design patterns for MongoDB, including best practices for data modeling and common anti-patterns to avoid.",
    skills: ["MongoDB", "Schema Design", "Data Modeling"],
    category: "Database"
  },
  {
    name: "IT Essentials",
    issuer: "Cisco",
    date: "February 2025",
    expiryDate: "January 2036",
    credentialUrl: "https://www.credly.com/badges/5fb0784a-d102-499e-888e-9392fd4dc3f2/linked_in_profile",
    description: "Cisco's comprehensive IT essentials program covering hardware, software, networking fundamentals and troubleshooting.",
    skills: ["IT Support", "Networking", "Hardware", "Troubleshooting"],
    category: "IT & Networking"
  },
  {
    name: "From Relational Model (SQL) to MongoDB's Document Model",
    issuer: "MongoDB",
    date: "March 2026",
    expiryDate: "January 2036",
    credentialUrl: "https://www.credly.com/badges/30d4a9ec-26bd-425d-a169-dcde6f1b34ea/linked_in_profile",
    description: "Certification in migrating and translating relational SQL database concepts to MongoDB's flexible document model.",
    skills: ["MongoDB", "SQL", "Database Migration", "Document Model"],
    category: "Database"
  },
  {
    name: "MongoDB Overview: Core Concepts and Architecture",
    issuer: "MongoDB",
    date: "March 2026",
    expiryDate: "May 2036",
    credentialUrl: "https://www.credly.com/badges/27a9643d-0457-41e9-9da3-086786a51241/linked_in_profile",
    description: "Comprehensive understanding of MongoDB's core architecture, replication, sharding and fundamental database concepts.",
    skills: ["MongoDB", "Database Architecture", "Replication", "Sharding"],
    category: "Database"
  },
  {
    name: "AI Literacy",
    issuer: "IBM",
    date: "January 2026",
    credentialUrl: "https://www.credly.com/badges/2e512926-e749-4b6e-ac18-523a6d73eef5/linked_in_profile",
    description: "IBM's AI Literacy certification covering foundational AI concepts, machine learning, large language models and practical AI applications.",
    skills: ["Artificial Intelligence", "Machine Learning", "LLMs", "AI Ethics"],
    category: "AI & Data"
  },
  {
    name: "Networking Academy Learn-A-Thon 2025",
    issuer: "Cisco",
    date: "July 2025",
    credentialUrl: "https://www.credly.com/badges/9a92d65e-4153-4cb3-bd8f-878bec81b4bd/linked_in_profile",
    description: "Cisco Networking Academy achievement badge for completing a learning marathon covering networking, security and IT fundamentals.",
    skills: ["Networking", "Cisco", "IT Fundamentals"],
    category: "IT & Networking"
  }
]

// Main function that returns real certificate data
export async function fetchLinkedInCertificates(): Promise<LinkedInCertificate[]> {
  // Check if user has custom certificates stored in localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('certificates')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      } catch {}
    }
  }
  // Return real LinkedIn certificates
  return manualLinkedInCertificates
}
