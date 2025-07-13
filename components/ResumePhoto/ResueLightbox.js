"use client";

import { useEffect } from "react";
import styles from "./ResumeLightbox.module.scss";
import Image from "next/image";

export default function ResumeLightbox({ imageSrc, imageAlt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Блокуємо скрол body коли lightbox відкритий
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "resume.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.lightbox} onClick={handleBackdropClick}>
      <div className={styles.lightboxContent}>
        {/* Кнопка закриття */}
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* Кнопка завантаження */}
        <button className={styles.downloadButton} onClick={handleDownload}>
          ⬇
        </button>

        {/* Зображення */}
        <div className={styles.imageContainer}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={1200}
            height={1600}
            className={styles.image}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
            priority
          />
        </div>

        {/* Інформація */}
        <div className={styles.imageInfo}>
          <h3 className={styles.imageTitle}>Resume</h3>
          <p className={styles.imageDescription}>
            Click and drag to move • Scroll to zoom
          </p>
        </div>
      </div>
    </div>
  );
}
