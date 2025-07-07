"use client";

import { useEffect } from "react";
import styles from "./Lightbox.module.scss";
import Image from "next/image";

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    // Блокуємо скрол body коли lightbox відкритий
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.lightbox} onClick={handleBackdropClick}>
      <div className={styles.lightboxContent}>
        {/* Кнопка закриття */}
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* Навігаційні кнопки */}
        {images.length > 1 && (
          <>
            <button
              className={styles.navButton}
              onClick={onPrev}
              style={{ left: "20px" }}
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={onNext}
              style={{ right: "20px" }}
            >
              ›
            </button>
          </>
        )}

        {/* Зображення */}
        <div className={styles.imageContainer}>
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            width={1200}
            height={800}
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

        {/* Інформація про зображення */}
        <div className={styles.imageInfo}>
          <h3 className={styles.imageTitle}>{currentImage.title}</h3>
          <p className={styles.imageCounter}>
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        {/* Мініатюри (тільки якщо зображень більше 1) */}
        {images.length > 1 && (
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.activeThumbnail : ""
                }`}
                onClick={() => {
                  const diff = index - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else if (diff < 0) {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev();
                  }
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  width={60}
                  height={40}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
