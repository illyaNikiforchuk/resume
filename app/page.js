"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import Header from "../components/Header/Header";
import InfoSection from "../components/InfoSection/InfoSection";
import MediaBlocks from "../components/MediaBlocks/MediaBlocks";
import Footer from "../components/Footer/Footer";
import TextBlock from "../components/TextBlock/TextBlock";
import ResumePhoto from "../components/ResumePhoto/ResumePhoto";
import CaseStudy from "../components/CaseStuddy/CaseStudy";

const translations = {
  en: {
    name: "Illya Nikiforchuk",
    title: "media buyer / frontend developer",
    description:
      "I have over 3.5 years of experience as a developer of modern web applications (React, Next.js). I'm now fully focused on media buying. My technical background gives me a strong advantage over most media buyers: I have a deeper understanding of analytics, traffic optimization, and A/B testing. Thanks to my frontend experience, I can evaluate and improve landing pages — spotting technical and UX issues that an average buyer would overlook. This allows me to scale campaigns with greater efficiency.",
    experience: {
      title: "Experience",
      items: [
        "Freelance Media Buyer (Student) at Arbitrage UP",
        "FRONTEND DEVELOPER  Developer at lead Ax (2024-2025)",
        "FRONTEND DEVELOPER  at CLIMATOP Spain (2023-2024)",
        "FRONTEND DEVELOPER at Build Alliance Group (2021-2023)",
      ],
    },
    skills: {
      title: "Skills",
      items: [
        "Campaign Analytics",
        "Facebook Ads (Meta)",
        "Gambling  E-commerce Vertical Expertise",
        "Creative Testing",
        "Affiliate Network Collaboration",
        "Canva",
        "VN",
        "frontend devlopment",
      ],
    },
    caseStudy: {
      title: "Bangladesh Offer",
      subtitle:
        "Two launches — one at the beginning of training, the other at the end",
      description:
        "During the first launch, I tested around 10 ad campaigns with different funnels, which later gave me a significant advantage. I now have a clear understanding of what works, how to effectively test creatives, and which metrics to focus on when analyzing campaigns.",
      metrics: [
        { value: "9.89%>10.34%", label: "CR-TO-REG" },
        { value: "1.65%>4.93", label: "CR-TO-DEP" },
        { value: "16.67%>47.62", label: "CR-REG-TO-DEP" },
        { value: "-72%>+83%", label: "ROI" },
      ],
      creativesTitle: "Creative Assets Used",
      creatives: [
        {
          src: "/videos/case-study/demo1.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo2.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo3.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo4.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo5.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo6.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo7.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo8.mp4",
          title: "Design",
        },
        {
          src: "/videos/case-study/demo9.mp4",
          title: "Design",
        },

        {
          src: "/videos/case-study/demo2.mp4",
          poster: "/images/case-study/video2-poster.jpg",
          title: "Design",
        },
        {
          src: "/images/case-study/creative4.jpg",
          title: "Design",
        },
      ],
      photos: [
        {
          src: "/videos/case-study/before.png",
          title: "Before",
        },
        {
          src: "/videos/case-study/after.png",
          title: "After ",
        },
      ],
    },
    education: {
      title: "Education",
      items: [
        "Arbitrage up gambling fb (2025)",
        "Genius Space Target fb (2025)",
        "IT Step Academy React FRONTEND DEVELOPER(2020 - 2021)",
      ],
    },
    contact: {
      title: "Contact",
      email: "nikiforchukillya@gmail.com",
      phone: "+380967550094",
      location: "Spain",
      tg: "@illya202",
    },
    textBlock: {
      title: "About My Work",
      content:
        "At the moment, I’ve launched three advertising campaigns targeting Liberia, Argentina, and Bangladesh. Each campaign involved dozens of tests, creative variations, and optimization approaches. I continue to test actively, analyze results, and build hands-on experience to achieve maximum performance.My background in web development, video editing skills, and experience with tools like Canva give me a strong advantage — I can independently build and refine full funnels and quickly adapt to new challenges.I’d be happy to contribute to your team and grow together. Please note that the information on this landing page might be outdated — I’m happy to provide the latest updates upon request.",
    },
    resumePhoto: {
      title: "My Resume",
      downloadBtn: "Download Image",
      viewBtn: "View Full Size",
      description: "View my complete resume",
    },
  },

  uk: {
    name: "Нікіфорчук Ілля",
    title: "media buyer / frontend developer",
    description:
      "Маю понад 3.5 роки досвіду як розробник сучасних вебзастосунків (React, Next.js). Зараз повністю зосереджений на медіабаїнгу. Мій технічний бекграунд дає мені суттєві переваги над більшістю медіабаєрів: я глибше розумію аналітику, краще працюю з трафіком та A/B тестуванням. Завдяки досвіду у фронтенді, я вмію оцінювати та покращувати лендінги: бачу технічні й UX-помилки там, де пересічний байер їх просто не помітить. Це дозволяє мені масштабуватись з більшою ефективністю.",
    experience: {
      title: "Досвід роботи",
      items: [
        "Freelance Media Buyer (Student) at Arbitrage UP",
        "FRONTEND DEVELOPER  Developer at lead Ax (2024-2025)",
        "FRONTEND DEVELOPER  at CLIMATOP Spain (2023-2024)",
        "FRONTEND DEVELOPER at Build Alliance Group (2021-2023)",
      ],
    },
    skills: {
      title: "Навички",
      items: [
        "Campaign Analytics",
        "Facebook Ads (Meta)",
        "Gambling  E-commerce Vertical Expertise",
        "Creative Testing",
        "Affiliate Network Collaboration",
        "Canva",
        "VN",
        "frontend devlopment",
      ],
    },
    caseStudy: {
      title: "Офер Бангладеш",
      subtitle: "Два запуски перший на початку навчання другий у кінці  ",
      description:
        "Під час першого запуску було протестовано близько 10 рекламних кампаній із різними зв’язками, що в майбутньому дало мені вагому перевагу.Я вже маю чітке розуміння того, що працює, як ефективно тестувати креативи та на які показники слід звертати увагу під час аналізу кампаній.",
      metrics: [
        { value: "9.89%>10.34%", label: "CR-TO-REG" },
        { value: "1.65%>4.93", label: "CR-TO-DEP" },
        { value: "16.67%>47.62", label: "CR-REG-TO-DEP" },
        { value: "-72%>+83%", label: "ROI" },
      ],
      creativesTitle: "Використані креативи",
      creatives: [
        {
          src: "/videos/case-study/demo3.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo2.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo1.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo4.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo5.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo6.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo7.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo8.mp4",
          title: "Дизайн",
        },
        {
          src: "/videos/case-study/demo9.mp4",
          title: "Дизайн",
        },
      ],

      photos: [
        {
          src: "/videos/case-study/before.png",
          title: "До ",
        },
        {
          src: "/videos/case-study/after.png",
          title: "Після ",
        },
      ],
    },

    education: {
      title: "Освіта",
      items: [
        "Arbitrage up gambling fb (2025)",
        "Genius Space Target fb (2025)",
        "IT Step Academy React FRONTEND DEVELOPER(2020 - 2021)",
      ],
    },
    contact: {
      title: "Контакти",
      email: "nikiforchukillya@gmail.com",
      phone: "+380967550094",
      location: "Іспанія",
      tg: "@illya202",
    },
    textBlock: {
      title: "Про мою роботу",
      content:
        "На даний момент я запустив три рекламні кампанії на такі гео, як Ліберія, Аргентина та Бангладеш. У рамках кожної з них провів десятки тестів, варіацій креативів і підходів до оптимізації. Продовжую активно тестувати, аналізувати результати та «набивати руку» для досягнення максимальної ефективності.Мій досвід у розробці сайтів, навички монтажу відео та робота з інструментами на кшталт Canva дають мені велику перевагу — я можу самостійно створювати повноцінні зв'язки та швидко адаптуватися до нових викликів.Буду радий зробити свій внесок у вашу команду та зростати разом із вами.Інформація, представлена на цьому лендингу, може бути вже неактуальною, тож із радістю надам оновлену — за запитом.",
    },
    resumePhoto: {
      title: "Моє резюме",
      downloadBtn: "Завантажити зображення",
      viewBtn: "Переглянути повний розмір",
      description: "Переглянути моє повне резюме",
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState("uk");
  const t = translations[language];

  return (
    <div className={styles.container}>
      <Header
        language={language}
        setLanguage={setLanguage}
        name={t.name}
        title={t.title}
        description={t.description}
      />
      <ResumePhoto resumePhoto={t.resumePhoto} />
      <main className={styles.main}>
        <InfoSection
          experience={t.experience}
          skills={t.skills}
          education={t.education}
        />
        <CaseStudy caseStudy={t.caseStudy} />

        <MediaBlocks />
        <TextBlock title={t.textBlock.title} content={t.textBlock.content} />
      </main>

      <Footer contact={t.contact} />
    </div>
  );
}
