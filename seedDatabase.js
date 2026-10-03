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
    password: 'Rohan@123',
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
    title: 'Dhondge Hospital Platform',
    slug: 'dhondge-hospital',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'A clean, responsive hospital website designed to simplify patient access, showcase medical services, and improve digital presence.',
    fullDescription: 'Complete hospital management and patient consultation suite. Features doctor availability schedules, appointment booking, medical department showcase, emergency contact telemetry, and patient inquiry management.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'AWS'],
    clientName: 'Dr. Meena Dhondge',
    clientRating: 5,
    completedAt: new Date('2025-02-10'),
    isFeatured: true
  },
  {
    title: 'Aniket Hospital Care Management',
    slug: 'aniket-hospital',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'A modern and user-friendly hospital website designed to streamline patient interactions, appointment booking, and service accessibility.',
    fullDescription: 'Comprehensive healthcare portal offering seamless online OPD registration, electronic health record lookups, emergency ward tracking, and interactive doctor schedules.',
    techStack: ['React', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    clientName: 'Shubham Bande',
    clientRating: 5,
    completedAt: new Date('2025-01-20'),
    isFeatured: true
  },
  {
    title: 'Soar Task – Finance Dashboard UI',
    slug: 'soar-task-finance-dashboard-ui',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'A modern, responsive finance dashboard UI built to visualize account balances, transactions, and spending insights.',
    fullDescription: 'Real-time financial telemetry dashboard with interactive charts, multi-currency wallet management, transaction categorization, exportable CSV/PDF statements, and encrypted card management.',
    techStack: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Node.js'],
    clientName: 'Soar Company',
    clientRating: 4.9,
    completedAt: new Date('2024-12-15'),
    isFeatured: true
  },
  {
    title: 'PassMan – Encrypted Password Manager',
    slug: 'passman',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'A secure password manager web app built to store, manage, and access credentials easily with advanced local encryption.',
    fullDescription: 'Zero-knowledge client-side AES-256 encrypted password management suite with automatic password strength audit, secure generator, and biometric unlock compatibility.',
    techStack: ['React', 'Web Crypto API', 'Node.js', 'MongoDB'],
    clientName: 'Harry Tech',
    clientRating: 4.8,
    completedAt: new Date('2024-11-28'),
    isFeatured: true
  },
  {
    title: 'MLM Network Referral Engine',
    slug: 'mlm-referral-engine',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Multi-level marketing backoffice platform with interactive genealogy tree and real-time payout telemetry.',
    fullDescription: 'Custom binary and matrix MLM platform featuring automated commission calculations, e-wallet payout processing, member downline tracking, and real-time genealogy visualization.',
    techStack: ['React', 'Node.js', 'MongoDB', 'D3.js', 'Tailwind CSS'],
    clientName: 'Global Referral Corp',
    clientRating: 5,
    completedAt: new Date('2025-02-01'),
    isFeatured: true
  },
  {
    title: 'EdTech Online Examination Portal',
    slug: 'edtech-online-examination-portal',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=80',
    bannerImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    shortDescription: 'Interactive online testing and learning management system for schools and institutes.',
    fullDescription: 'Scalable examination portal with live proctoring telemetry, automatic grading, student performance analytics, course material distribution, and parent report cards.',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io'],
    clientName: 'EduVedic Institute',
    clientRating: 5,
    completedAt: new Date('2025-01-05'),
    isFeatured: false
  }
];

const services = [
  {
    title: 'Custom Web & Software Development',
    description: 'Tailored, high-performance web applications engineered with modern technologies (React, Node.js, Next.js) tailored for all business fields.',
    startingPrice: 25000,
    features: [
      'Responsive & Mobile-First UI/UX',
      'RESTful & GraphQL API Integration',
      'Custom Database Schemas & Optimization',
      'Secure Auth & Role-Based Access Control',
      'Cloud Deployment (AWS/Azure/Render)',
      'High Performance & SEO Optimization'
    ],
    isPopular: true
  },
  {
    title: 'Mobile App Development (iOS & Android)',
    description: 'Cross-platform native-feel mobile applications for iOS and Android using Flutter and React Native, tailored for Healthcare, Education, MLM, Finance, and Enterprise.',
    startingPrice: 35000,
    features: [
      'iOS & Android Cross-Platform Apps',
      'Flutter & React Native Architecture',
      'Real-time Push Notifications & Biometrics',
      'In-App Payment Gateway Integrations',
      'App Store & Google Play Store Publishing'
    ],
    isPopular: true
  },
  {
    title: 'Healthcare & Telemedicine Systems',
    description: 'HIPAA-compliant healthcare platforms, electronic health records (EHR), patient portals, appointment scheduling, and telemedicine video consultation apps.',
    startingPrice: 45000,
    features: [
      'Patient Registration & EHR Records',
      'Doctor Appointment & Video Consultations',
      'Lab & Prescription Management',
      'HIPAA & Health Data Privacy Standards',
      'Billing & Medical Insurance Integration'
    ],
    isPopular: true
  },
  {
    title: 'EdTech & Education Management Systems',
    description: 'Comprehensive Learning Management Systems (LMS), school management platforms, student portals, online examination systems, and interactive educational apps.',
    startingPrice: 30000,
    features: [
      'Student & Teacher Management Portals',
      'Live Online Classes & Video Streaming',
      'Course Catalog & Online Assessments',
      'Fee Collection & Attendance Telemetry',
      'Parent Communication Mobile Apps'
    ],
    isPopular: false
  },
  {
    title: 'MLM Systems & Network Marketing Software',
    description: 'Custom Multi-Level Marketing (MLM) software supporting Binary, Matrix, Generation, and Unilevel plans with automated payout calculators and genealogy trees.',
    startingPrice: 38000,
    features: [
      'Binary, Matrix, Unilevel & Custom MLM Plans',
      'Real-time Interactive Genealogy Trees',
      'Automated Payout & Commission Engine',
      'E-Wallet & Crypto/UPI Payment Gateway',
      'Member Backoffice & Admin Control Panel'
    ],
    isPopular: true
  },
  {
    title: 'FinTech & Finance Management Solutions',
    description: 'Secure financial software, payment gateway aggregators, micro-finance tracking, accounting dashboards, and banking mobile applications.',
    startingPrice: 42000,
    features: [
      'Multi-Currency Payment Gateways',
      'Biometric Security & Encryption',
      'Automated Ledger & Invoicing Systems',
      'Loan Management & Interest Calculators',
      'Real-time Financial Telemetry Dashboards'
    ],
    isPopular: true
  },
  {
    title: 'Enterprise CRM & ERP Systems',
    description: 'Fully customized CRM and ERP systems designed around your unique business workflows, lead tracking, inventory management, and automated sales pipelines.',
    startingPrice: 32000,
    features: [
      'Sales Pipeline & Lead Tracking',
      'Automated Business Workflow Engines',
      'Inventory & Supply Chain Telemetry',
      'Granular Role-based Employee Access',
      'Custom Analytics & Exportable Reports'
    ],
    isPopular: false
  },
  {
    title: 'AI & Smart Automation Solutions',
    description: 'Custom AI integration, intelligent chatbots, predictive analytics, process automation, and machine learning models for growing businesses.',
    startingPrice: 40000,
    features: [
      'AI Customer Support Chatbots',
      'Automated Document Processing',
      'Predictive Business Analytics',
      'Custom LLM & API Integrations'
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
  },
  {
    title: 'Fresher Flutter Developer Intern',
    slug: 'fresher-flutter-developer-intern',
    department: 'Engineering',
    location: 'Remote / Pune, India',
    workType: 'Full-time',
    experience: 'Fresher / 0-1 Year',
    salary: 'Stipend + Pre-Placement Offer (PPO)',
    description: 'Kickstart your career as a Flutter Developer Intern working on live mobile app development projects.',
    responsibilities: [
      'Assist senior mobile developers in building UI screens using Flutter & Dart',
      'Implement API integrations and resolve bug tickets',
      'Learn best mobile architecture practices'
    ],
    requirements: [
      'Basic understanding of Flutter and Dart programming',
      'Knowledge of OOPs concepts and REST APIs',
      'Eagerness to learn and build real-world products'
    ],
    skills: ['Flutter', 'Dart', 'Git', 'REST API'],
    benefits: ['Mentorship from tech leads', 'Job offer upon successful internship completion', 'Certificate'],
    status: 'Published'
  }
];

const caseStudies = [
  {
    title: 'Scalable Healthcare & Patient Consultation Portal',
    slug: 'scalable-healthcare-patient-portal',
    client: 'Dhondge & Aniket Hospitals',
    industry: 'Healthcare Technology',
    summary: 'Building a zero-downtime medical portal with online OPD booking, electronic doctor availability telemetry, and emergency services.',
    problem: 'Patients faced long wait times for appointments and difficult phone registration processes.',
    solution: 'Engineered a modern React web application with Node.js REST API microservices, real-time doctor schedule syncing, and automated SMS alerts.',
    challenges: [
      'Ensuring data privacy and compliance for patient records.',
      'Providing an intuitive user interface for users of all age groups.'
    ],
    keyFeatures: [
      'Instant online OPD appointment booking',
      'Real-time doctor telemetry & department schedules',
      'Mobile-optimized emergency response button'
    ],
    developmentProcess: [
      '01 Discovery & Hospital Workflow Audit',
      '02 Wireframing & Accessible UI Design',
      '03 React & Node.js Development',
      '04 Security Audit & HIPAA Data Privacy Checks',
      '05 Production Launch & Staff Training'
    ],
    outcome: 'Reduced patient wait times by 70%, increased digital appointment bookings by 300%, and achieved 5/5 star ratings from hospital management.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'AWS'],
    bannerImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80',
    isFeatured: true
  },
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
  },
  {
    title: 'Building Modern Healthcare & Telemedicine Apps: Security & Compliance',
    slug: 'building-modern-healthcare-telemedicine-apps',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'A comprehensive technical guide to building HIPAA-compliant electronic health records and real-time doctor consultation suites.',
    content: `Healthcare digital transformation requires strict security protocols, low-latency video streaming, and accessible UI design.

### Key Technical Pillars:
1. **Encrypted EHR Storage**: Patient records must be encrypted at rest and in transit (AES-256 / TLS 1.3).
2. **WebRTC Video Consultations**: Peer-to-peer WebRTC streams for seamless doctor-patient consultations.
3. **Role-Based Access Control**: Granular permissions ensuring only authorized medical staff view patient charts.

DSofts IT Services specializes in engineering bespoke healthcare software tailored for hospitals and clinics.`,
    author: 'DSofts HealthTech Team',
    category: 'Healthcare Tech',
    tags: ['Healthcare', 'Telemedicine', 'React', 'Security'],
    readTime: '5 min read',
    status: 'Published'
  }
];

const testimonials = [
  {
    clientName: 'Dr. Meena Dhondge',
    role: 'Medical Director',
    company: 'Dhondge Hospital',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    content: 'DSofts IT Services designed a clean, highly functional hospital website that simplified patient scheduling and elevated our digital presence tremendously.',
    rating: 5,
    isFeatured: true
  },
  {
    clientName: 'Shubham Bande',
    role: 'Administrator',
    company: 'Aniket Hospital',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    content: 'The DSofts team engineered a seamless OPD booking and patient telemetry portal. Excellent communication, speed, and technical quality.',
    rating: 5,
    isFeatured: true
  },
  {
    clientName: 'Alex Turner',
    role: 'CTO',
    company: 'FinTech Innovations',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    content: 'DSofts transformed our mobile banking concept into a flawless live application in record time. Their technical craftsmanship and dedication to performance were outstanding.',
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
