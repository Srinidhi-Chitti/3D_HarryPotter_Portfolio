import { } from "../assets/images";
import {
    HPCL,
    Navy,
    contact,
    css,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nodejs,
    react,
    tailwindcss,
    typescript,
    ogs,
    khd,
    ers,
    maraudersmap,
    postpartum,
    python,
    c,
    CN,
    OS,
    DSA,
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },

    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Language",
    },
    {
        imageUrl: c,
        name: "C",
        type: "Language",
    },
    {
        imageUrl: CN,
        name: "Computer Networks",
        type: "Core",
    },
    {
        imageUrl: DSA,
        name: "Data Structures",
        type: "Core",
    },
    {
        imageUrl: OS,
        name: "Operating Systems",
        type: "Core",
    },

];

export const experiences = [
    {
        title: "Summer Trainee/ Intern",
        company_name: "HPCL",
        icon: HPCL,
        iconBg: "#accbe1",
        date: "Jun 02, 2025- July 02, 2025",
        points: [
            "Learned about servers, gaining hands-on experience with enterprise-level server management and virtualization.",
            "Experimented with building personal servers using old phones/laptops; later migrated to VMware-based setups for stability and redundancy.",
            "Developed an Emergency Routing System with chatbot integration to assist HPCL trainees and rescue teams with optimal paths during emergencies. Built this ",
        ],
    },
    {
        title: "Student Intern",
        company_name: "Navy",
        icon: Navy,
        iconBg: "#fbc3bc",
        date: "Dec 17, 2025 - March 31, 2025 ",
        points: [
            "Built an offline GPS tracking system using SIM7600EI GSM and PyQt5 for vehicle tracking.",
            "Enabled GUI features like distance calculation and real-time vehicle status from a base station.",
            "Successfully tested to tracked vehicles with 12.4 km precision without internet.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/Srinidhi-Chitti',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/srinidhichitti/',
    }
];

export const projects = [
    {
        iconUrl: maraudersmap,
        theme: 'btn-back-red',
        name: 'Marauders Map',
        description: 'Integrated Folium and QWebEngineView for dynamic map visualization and character tracking using HP-API to create the simulation of the marauders map in Harry Potter series.',
        link: 'https://github.com/Srinidhi-Chitti/Marauders-Map',
    },
    {
        iconUrl: postpartum,
        theme: 'btn-back-green',
        name: 'Heal-O-Matic postpartum care',
        description: 'Developed an AI-powered website to assist first time new mothers in teir 1 and 2 cities with accurate, empathetic guidance during the postpartum period.',
        link: 'https://heal-o-matic-postpartum-care-website.vercel.app/',
    },
    {
        iconUrl: ogs,
        theme: 'btn-back-blue',
        name: 'Offline GPS System',
        description: 'Designed a secure, internet-independent GPS tracking system using SIM7600EI GSM modules and STM32 microcontrollers, tailored for high-security defense zones. Enabled real-time transmission of latitude and longitude via SMS, bypassing the need for Wi-Fi or internet—critical for classified environments like naval bases. Worked collaboratively with a 4-member team (Rohit, Devesh, Abhiram, and myself) to build and test the system at INS Kalinga.',
        link: 'https://github.com/Srinidhi-Chitti/GPS-Offline-system-for-the-Indian-NAVY',
    },
    {
        iconUrl: ers,
        theme: 'btn-back-pink',
        name: 'Emergency Routing Systems',
        description: 'Developed a web-based Emergency Routing System for a 1053-acre HPCL refinery, enabling real-time access to company policies, safety manuals, and emergency protocols. Designed an interactive hazard routing feature to guide personnel to the nearest safety shelter during critical incidents, integrating location awareness and safety mapping. It can also support the 200+ trainees, allowing new joiners to upload safety documents and ask AI-powered queries; aligned with the Fire & Safety Departments operational needs. Worked together as 3 member team- Hemanth, Saathvic and myself.',
        link: 'https://hpcl-assistant.vercel.app/',
    },
    {
        iconUrl: khd,
        theme: 'btn-back-black',
        name: 'Kuchipudi Hastas detector',
        description: 'In Kuchipudi dance, there are a lot of slokas for dancers to learn. Remembers these slokas along with the hand gestures/signs on top of the meanings of these and lastly the steps are very hard to remember. That is why I created a AI application that gives meanings of the hand gestures you ask in kuchipudi.',
        link: 'https://github.com/Srinidhi-Chitti/Kuchipudi-Hastas-Detector',
    },
];