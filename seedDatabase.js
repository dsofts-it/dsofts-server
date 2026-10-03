import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import PortfolioProject from './models/PortfolioProject.js';
import Service from './models/Service.js';
import Job from './models/Job.js';
import CaseStudy from './models/CaseStudy.js';
import BlogPost from './models/BlogPost.js';
import Testimonial from './models/Testimonial.js';
import CompanySetting from './models/CompanySetting.js';

dotenv.config();

const users = [
  {
    name: 'Rohan Dede',
    email: 'rohan@dsofts.in',
    password: 'Rohan123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  }
];

const portfolioProjects = [
  {
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Modern e-commerce solution with payment integration and admin dashboard',
    fullDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring product management, shopping cart, payment integration, order tracking, and an admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'AWS'],
    clientName: 'Global Retail Solutions',
    clientRating: 4.9,
    completedAt: new Date('2025-01-15'),
    isFeatured: true
  },
  {
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Secure mobile banking application with biometric authentication',
    fullDescription: 'A state-of-the-art mobile banking solution featuring biometric authentication, real-time transaction processing, bill payments, fund transfers, and security controls.',
    techStack: ['Flutter', 'Node.js', 'PostgreSQL', 'Firebase'],
    clientName: 'FinTech Innovations',
    clientRating: 4.9,
    completedAt: new Date('2024-12-01'),
    isFeatured: true
  },
  {
    title: 'Healthcare Management System',
    slug: 'healthcare-management-system',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Complete hospital management system with patient records and scheduling',
    fullDescription: 'An integrated healthcare management system that streamlines patient registration, appointment scheduling, electronic health records (EHR), and billing.',
    techStack: ['React', 'Express', 'MongoDB', 'Docker'],
    clientName: 'City Care Health',
    clientRating: 4.8,
    completedAt: new Date('2024-11-20'),
    isFeatured: true
  }
];

const services = [
  {
    title: 'Web Development',
    description: 'Custom, high-performance web applications engineered with modern technologies like React, Node.js, and Cloud services for optimal speed and scalability.',
    startingPrice: 2500,
    features: [
      'Responsive & Mobile-First UI/UX',
      'REST API & GraphQL Integration',
      'Database Architecture & Optimization',
      'Secure Auth & Role-Based Access',
      'Cloud Deployment (AWS/Azure/GCP)',
      'SEO & Performance Tuning'
    ],
    isPopular: true
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform native-feel iOS and Android mobile apps using Flutter and React Native to deliver fluid user experiences and reliable offline-first architecture.',
    startingPrice: 3500,
    features: [
      'iOS & Android Cross-Platform Apps',
      'Flutter & Dart Architecture',
      'Push Notifications & Telemetry',
      'In-App Payments & Subscriptions',
      'App Store & Play Store Publishing'
    ],
    isPopular: true
  },
  {
    title: 'Full Stack Development',
    description: 'Complete end-to-end product development covering frontend UI design, robust backend REST APIs, scalable database schemas, and microservice integration.',
    startingPrice: 4000,
    features: [
      'Frontend Architecture (React, Next.js)',
      'Backend Microservices (Node.js, Express, Java)',
      'Database Engineering (MongoDB, PostgreSQL, MySQL)',
      'CI/CD Pipeline Setup & DevOps'
    ],
    isPopular: true
  },
  {
    title: 'Custom Software & CRM',
    description: 'Tailored enterprise software, custom dashboards, inventory tracking, and CRM systems built specifically around your core business operations.',
    startingPrice: 3000,
    features: [
      'Automated Workflow Pipelines',
      'Real-time Analytics Dashboards',
      'Role-based Enterprise Access',
      'Legacy System API Bridges'
    ],
    isPopular: false
  },
  {
    title: 'AI-Powered Solutions',
    description: 'Integrating intelligent AI agents, machine learning automation, and natural language query tools directly into your web and mobile platforms.',
    startingPrice: 4500,
    features: [
      'Custom AI Workflow Integration',
      'LLM API Integration & Fine-tuning',
      'Automated Customer Service Agents',
      'Predictive Analytics Dashboards'
    ],
    isPopular: false
  }
];

const jobs = [
  {
    title: 'Full Stack Developer',
    slug: 'full-stack-developer',
    department: 'Engineering',
    location: 'Remote / Pune, India',
    workType: 'Full-time',
    experience: '2-4 Years',
    salary: 'Competitive Salary + Performance Bonuses',
    description: 'We are looking for a passionate Full Stack Developer to build modern web applications using React, Node.js, Express, and MongoDB/PostgreSQL.',
    responsibilities: [
      'Develop scalable, responsive web applications using React and Node.js',
      'Design clean RESTful API endpoints and integrate third-party services',
      'Collaborate with UI/UX designers to translate Figma wireframes into code',
      'Participate in code reviews, automated testing, and technical documentation'
    ],
    requirements: [
      'Strong proficiency in JavaScript (ES6+), React.js, and Node.js',
      'Experience with MongoDB, PostgreSQL, or MySQL',
      'Solid understanding of Git version control and RESTful API principles',
      'Excellent problem-solving and communication skills'
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'Git'],
    benefits: ['Flexible remote work', 'Performance bonuses', 'Health insurance', 'Learning & Certification stipends'],
    status: 'Published'
  },
  {
    title: 'React Frontend Developer',
    slug: 'react-frontend-developer',
    department: 'Frontend Engineering',
    location: 'Remote / Hybrid',
    workType: 'Full-time',
    experience: '1-3 Years',
    salary: 'Industry Competitive',
    description: 'Join our dynamic engineering team to build sleek, lightning-fast UI components and high-conversion client web apps.',
    responsibilities: [
      'Craft high-performance, reusable React components with clean state management',
      'Optimize web pages for maximum speed, responsiveness, and web accessibility',
      'Integrate backend REST APIs seamlessly with proper error boundaries'
    ],
    requirements: [
      'Proficiency in React 18/19, JavaScript, HTML5, CSS3, and Tailwind CSS',
      'Familiarity with state management (Context API, Redux/Zustand)',
      'Experience with Vite, Webpack, and modern build tooling'
    ],
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'REST API'],
    benefits: ['Flexible hours', 'Latest hardware equipment', 'Continuous career growth'],
    status: 'Published'
  },
  {
    title: 'Flutter Mobile Developer',
    slug: 'flutter-mobile-developer',
    department: 'Mobile Engineering',
    location: 'Remote / Pune',
    workType: 'Full-time',
    experience: '2-5 Years',
    salary: 'Competitive Salary',
    description: 'We are seeking an experienced Flutter developer to build high-grade cross-platform mobile apps for iOS and Android.',
    responsibilities: [
      'Architect and develop Flutter applications with Dart',
      'Integrate native iOS/Android packages, Firebase services, and payment gateways',
      'Publish mobile apps to Google Play Store and Apple App Store'
    ],
    requirements: [
      'Proven experience building and publishing Flutter apps',
      'Strong knowledge of Dart, Bloc/Provider/Riverpod state management',
      'Understanding of REST APIs and JSON data handling'
    ],
    skills: ['Flutter', 'Dart', 'Firebase', 'REST API', 'App Store Publishing'],
    benefits: ['Remote workspace allowance', 'Annual team retreats', 'Flexible vacation policy'],
    status: 'Published'
  }
];

const caseStudies = [
  {
    title: 'Scalable FinTech Mobile Banking Portal',
    slug: 'fintech-mobile-banking-portal',
    client: 'FinTech Innovations Ltd.',
    industry: 'Financial Technology',
    summary: 'Building a zero-downtime mobile banking suite with biometric authentication and instantaneous money transfers.',
    problem: 'The legacy banking portal suffered from slow response times (3s+) and frequent drop-offs during biometric verification.',
    solution: 'Engineered a modern Flutter cross-platform mobile app paired with an Express/Node.js microservice architecture and PostgreSQL caching layer.',
    challenges: [
      'Ensuring end-to-end banking compliance and encryption standards.',
      'Achieving under 200ms latency for real-time peer-to-peer fund transfers.'
    ],
    keyFeatures: [
      'Biometric fingerprint and FaceID quick login',
      'Real-time balance telemetry & push alerts',
      'Instant QR-code payment scanning'
    ],
    developmentProcess: [
      '01 Discovery & Security Compliance Audit',
      '02 Wireframing & UX Prototyping',
      '03 Microservice API & Flutter Development',
      '04 Penetration Testing & Load Testing',
      '05 App Store Launch & Continuous Monitoring'
    ],
    outcome: 'Improved mobile response times by 85%, boosted customer satisfaction rating to 4.9/5, and handled over $10M in transaction volume seamlessly.',
    techStack: ['Flutter', 'Dart', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    bannerImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80',
    isFeatured: true
  }
];

const blogPosts = [
  {
    title: 'Why React 19 and Vite are the Ideal Stack for Modern Web Development',
    slug: 'react-19-vite-modern-web-development',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Discover how React 19 Actions, Server Components, and Vite speed up build pipelines and transform frontend developer productivity.',
    content: `Building web applications in 2026 requires speed, simplicity, and rock-solid developer experience. 

### The Evolution of Frontend Tooling
Vite has established itself as the modern standard for frontend asset bundling, delivering instantaneous Hot Module Replacement (HMR) and ultra-fast build times. When combined with React 19's enhancements—such as automatic memoization, improved Form Actions, and streamlined async state handling—developers gain an unmatched toolkit.

### Key Advantages:
1. **Instant Cold Start**: Powered by native ES modules during development.
2. **Simplified State Management**: Built-in async transitions reduce boilerplate.
3. **Optimized Production Bundles**: Rollup-powered tree-shaking yields lightweight asset bundles.

At **DSofts IT Services**, we leverage this modern technology stack to deliver ultra-fast, SEO-optimized web applications for our clients worldwide.`,
    author: 'DSofts Engineering Team',
    category: 'Web Development',
    tags: ['React', 'Vite', 'Frontend', 'JavaScript'],
    readTime: '4 min read',
    status: 'Published'
  },
  {
    title: 'Architecting Scalable Microservices with Node.js and Express',
    slug: 'scalable-microservices-nodejs-express',
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Best practices for organizing Express servers, database connection pooling, error middleware, and modular API design.',
    content: `Scaling a Node.js backend from a monolith into clean, modular microservices requires structured architecture and disciplined standards.

### Architectural Best Practices:
- **Clean Controller & Service Layer Separation**: Keep routing thin and isolate business logic.
- **Robust Error Handling**: Centralized error middleware prevents silent process crashes.
- **Connection Management**: Reusing Mongoose/PostgreSQL connection pools ensures high throughput under heavy load.

By adhering to these principles, DSofts ensures client systems handle peak traffic smoothly with 99.9% uptime.`,
    author: 'Rohan Dede',
    category: 'Backend & Cloud',
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    readTime: '6 min read',
    status: 'Published'
  }
];

const testimonials = [
  {
    clientName: 'Alex Turner',
    role: 'CTO',
    company: 'FinTech Innovations',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    content: 'DSofts transformed our mobile banking concept into a flawless live application in record time. Their technical craftsmanship, transparent communication, and dedication to performance were outstanding.',
    rating: 5,
    isFeatured: true
  },
  {
    clientName: 'Sarah Jenkins',
    role: 'Founder & CEO',
    company: 'Global Retail Solutions',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    content: 'Working with DSofts IT Services was a smooth and rewarding experience. They engineered a high-converting e-commerce portal that scaled our sales seamlessly.',
    rating: 5,
    isFeatured: true
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    await User.deleteMany({});
    await PortfolioProject.deleteMany({});
    await Service.deleteMany({});
    await Job.deleteMany({});
    await CaseStudy.deleteMany({});
    await BlogPost.deleteMany({});
    await Testimonial.deleteMany({});
    await CompanySetting.deleteMany({});

    console.log('🗑️  Existing data cleared\n');

    for (const userData of users) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      await User.create({
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role
      });
    }
    console.log(`✅ Seeded ${users.length} users`);

    await PortfolioProject.insertMany(portfolioProjects);
    console.log(`✅ Seeded ${portfolioProjects.length} portfolio projects`);

    await Service.insertMany(services);
    console.log(`✅ Seeded ${services.length} services`);

    await Job.insertMany(jobs);
    console.log(`✅ Seeded ${jobs.length} jobs`);

    await CaseStudy.insertMany(caseStudies);
    console.log(`✅ Seeded ${caseStudies.length} case studies`);

    await BlogPost.insertMany(blogPosts);
    console.log(`✅ Seeded ${blogPosts.length} blog posts`);

    await Testimonial.insertMany(testimonials);
    console.log(`✅ Seeded ${testimonials.length} testimonials`);

    await CompanySetting.create({});
    console.log('✅ Seeded company settings');

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

const main = async () => {
  await connectDB();
  await seedDatabase();
  mongoose.connection.close();
};

main();
