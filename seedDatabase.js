import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import PortfolioProject from './models/PortfolioProject.js';
import Service from './models/Service.js';

// Load environment variables
dotenv.config();

// Sample data
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
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c',
    bannerImageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
    shortDescription: 'Modern e-commerce solution with payment integration and admin dashboard',
    fullDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring product management, shopping cart, payment integration with Stripe, order tracking, and a powerful admin dashboard. The platform handles thousands of transactions daily with 99.9% uptime and includes features like inventory management, customer analytics, and automated email notifications.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis'],
    clientName: 'ABC Corporation',
    clientRating: 4.8,
    completedAt: new Date('2025-01-15'),
    isFeatured: true
  },
  {
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
    bannerImageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f',
    shortDescription: 'Secure mobile banking application with biometric authentication',
    fullDescription: 'A state-of-the-art mobile banking solution featuring biometric authentication, real-time transaction processing, bill payments, fund transfers, and investment tracking. Built with React Native for cross-platform compatibility, the app includes advanced security features like end-to-end encryption, fraud detection, and multi-factor authentication.',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Firebase'],
    clientName: 'XYZ Bank',
    clientRating: 4.9,
    completedAt: new Date('2024-12-01'),
    isFeatured: true
  },
  {
    title: 'Healthcare Management System',
    slug: 'healthcare-management-system',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    bannerImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
    shortDescription: 'Complete hospital management system with patient records and appointment scheduling',
    fullDescription: 'An integrated healthcare management system that streamlines hospital operations including patient registration, appointment scheduling, electronic health records (EHR), billing, pharmacy management, and doctor-patient communication. The system supports HIPAA compliance and includes role-based access control for different healthcare professionals.',
    techStack: ['Vue.js', 'Express', 'MongoDB', 'Socket.io', 'Docker'],
    clientName: 'City Hospital',
    clientRating: 4.7,
    completedAt: new Date('2024-11-20'),
    isFeatured: false
  },
  {
    title: 'Real Estate Portal',
    slug: 'real-estate-portal',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    bannerImageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716',
    shortDescription: 'Property listing and management platform with virtual tours',
    fullDescription: 'A comprehensive real estate platform featuring property listings, advanced search filters, virtual 360° tours, mortgage calculators, and agent management. The platform includes a CRM for real estate agents, automated email campaigns, and integration with popular property databases. Built with modern web technologies for optimal performance.',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Cloudinary', 'Google Maps API'],
    clientName: 'Prime Properties',
    clientRating: 4.6,
    completedAt: new Date('2024-10-10'),
    isFeatured: false
  },
  {
    title: 'Learning Management System',
    slug: 'learning-management-system',
    thumbnailImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    bannerImageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    shortDescription: 'Online education platform with live classes and course management',
    fullDescription: 'A feature-rich learning management system (LMS) that enables online education with live video classes, course creation, assignment submission, grading, discussion forums, and progress tracking. The platform supports multiple instructors, student enrollment management, certificates, and integrates with popular payment gateways for course purchases.',
    techStack: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'AWS S3'],
    clientName: 'EduTech Solutions',
    clientRating: 4.8,
    completedAt: new Date('2024-09-15'),
    isFeatured: true
  }
];

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'End-to-end web application development with modern technologies. We build scalable, secure, and performant web applications tailored to your business needs using the latest frameworks and best practices.',
    startingPrice: 2500,
    features: [
      'Responsive UI/UX Design',
      'RESTful API Development',
      'Database Design & Integration',
      'Authentication & Authorization',
      'Cloud Deployment (AWS/Azure/GCP)',
      'Performance Optimization',
      '3 Months Free Support'
    ],
    isPopular: true
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile app development for iOS and Android. We create beautiful, fast, and user-friendly mobile applications that engage your users and drive business growth.',
    startingPrice: 3500,
    features: [
      'iOS & Android Development',
      'Cross-platform with React Native/Flutter',
      'App Store & Play Store Deployment',
      'Push Notifications',
      'In-app Purchases',
      'Offline Functionality',
      '6 Months Support'
    ],
    isPopular: true
  },
  {
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platform development with payment integration, inventory management, and analytics. Turn your business online with our robust e-commerce solutions.',
    startingPrice: 4000,
    features: [
      'Product Catalog Management',
      'Shopping Cart & Checkout',
      'Payment Gateway Integration',
      'Order Management System',
      'Inventory Tracking',
      'Customer Analytics',
      'SEO Optimization'
    ],
    isPopular: true
  },
  {
    title: 'Custom CRM Development',
    description: 'Tailored Customer Relationship Management systems to streamline your sales, marketing, and customer service processes. Boost productivity and customer satisfaction.',
    startingPrice: 3000,
    features: [
      'Contact Management',
      'Sales Pipeline Tracking',
      'Email Integration',
      'Reporting & Analytics',
      'Task Automation',
      'Multi-user Access',
      'Custom Workflows'
    ],
    isPopular: false
  },
  {
    title: 'API Development & Integration',
    description: 'Design and develop robust RESTful APIs and integrate third-party services into your applications. We ensure secure, scalable, and well-documented APIs.',
    startingPrice: 1500,
    features: [
      'RESTful API Design',
      'API Documentation',
      'Third-party Integrations',
      'Authentication & Security',
      'Rate Limiting',
      'API Testing',
      'Ongoing Maintenance'
    ],
    isPopular: false
  },
  {
    title: 'Cloud Migration & DevOps',
    description: 'Migrate your applications to the cloud and implement DevOps practices for continuous integration and deployment. Improve scalability, reliability, and reduce costs.',
    startingPrice: 2000,
    features: [
      'Cloud Architecture Design',
      'AWS/Azure/GCP Migration',
      'CI/CD Pipeline Setup',
      'Docker & Kubernetes',
      'Monitoring & Logging',
      'Auto-scaling Configuration',
      'Security Best Practices'
    ],
    isPopular: false
  }
];

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await PortfolioProject.deleteMany({});
    await Service.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create users
    console.log('👤 Creating users...');
    const createdUsers = [];
    for (const userData of users) {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        passwordHash,
        role: userData.role
      });
      createdUsers.push(user);
      console.log(`   ✓ Created ${userData.role}: ${userData.email}`);
    }
    console.log(`✅ Created ${createdUsers.length} users\n`);

    // Create portfolio projects
    console.log('📁 Creating portfolio projects...');
    const createdProjects = await PortfolioProject.insertMany(portfolioProjects);
    createdProjects.forEach(project => {
      console.log(`   ✓ Created project: ${project.title}`);
    });
    console.log(`✅ Created ${createdProjects.length} portfolio projects\n`);

    // Create services
    console.log('🛠️  Creating services...');
    const createdServices = await Service.insertMany(services);
    createdServices.forEach(service => {
      console.log(`   ✓ Created service: ${service.title}`);
    });
    console.log(`✅ Created ${createdServices.length} services\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Portfolio Projects: ${createdProjects.length}`);
    console.log(`   - Services: ${createdServices.length}`);
    console.log('\n👤 Login Credentials:');
    console.log('   Admin:');
    console.log('     Email: rohan@dsofts.in');
    console.log('     Password: Rohan123');
    console.log('   User:');
    console.log('     Email: john@example.com');
    console.log('     Password: password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await seedDatabase();
  mongoose.connection.close();
  console.log('\n🔌 Database connection closed');
};

main();
