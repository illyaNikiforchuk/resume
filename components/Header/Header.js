"use client";

import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header({
  language,
  setLanguage,
  name,
  title,
  description,
}) {
  return (
    <header className={styles.header}>
      {/* Відео фон */}
      <div className={styles.videoBackground}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/backgrounds/main-background.jpg" // Fallback зображення
        >
          <source
            src="/images/backgrounds/header-background.mp4"
            type="video/mp4"
          />
          <source
            src="/images/backgrounds/header-background.webm"
            type="video/webm"
          />
          {/* Fallback для браузерів що не підтримують відео */}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.container}>
        <div className={styles.photoSection}>
          <div className={styles.photoWrapper}>
            <Image
              src="/images/profile/profile-photo.png"
              alt="Profile Photo"
              width={250}
              height={250}
              className={styles.photo}
            />
          </div>

          <div className={styles.languageToggle}>
            <button
              className={`${styles.langBtn} ${
                language === "en" ? styles.active : ""
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              className={`${styles.langBtn} ${
                language === "uk" ? styles.active : ""
              }`}
              onClick={() => setLanguage("uk")}
            >
              УК
            </button>
          </div>
        </div>

        <div className={styles.intro}>
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </header>
  );
}
