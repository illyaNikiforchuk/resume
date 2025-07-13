"use client";

import { useState } from "react";
import styles from "./ResumePhoto.module.scss";
import Image from "next/image";
import Lightbox from "./ResueLightbox";

export default function ResumePhoto({ resumePhoto }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    // Створюємо посилання для завантаження
    const link = document.createElement("a");
    link.href = "/resume/resume-image.jpg";
    link.download = "resume.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleView = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className={styles.resumeSection}>
      <div className={styles.container}>
        <div className={styles.resumeCard}>
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper} onClick={handleView}>
              <Image
                src="/resume/resume-image.jpg"
                alt="Resume"
                width={300}
                height={400}
                className={styles.resumeImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.zoomIcon}>🔍</div>
                <span className={styles.overlayText}>Click to enlarge</span>
              </div>
            </div>
            <div className={styles.decorativeElements}>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
            </div>
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>{resumePhoto.title}</h2>
            <p className={styles.description}>{resumePhoto.description}</p>

            <div className={styles.buttonGroup}>
              <button
                className={styles.downloadBtn}
                onClick={handleDownload}
                disabled={isLoading}
              >
                <span className={styles.btnIcon}>⬇</span>
                {isLoading ? "Loading..." : resumePhoto.downloadBtn}
              </button>

              <button className={styles.viewBtn} onClick={handleView}>
                <span className={styles.btnIcon}>👁</span>
                {resumePhoto.viewBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          imageSrc="/resume/resume-image.jpg"
          imageAlt="Resume"
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
