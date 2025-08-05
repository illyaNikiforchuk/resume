"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MediaPlayer.module.scss";
import Image from "next/image";

export default function MediaPlayer({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentItem = items[currentIndex];

  // Функція для визначення типу файлу
  const getFileType = (src) => {
    if (!src) return "image";
    const extension = src.split(".").pop().toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg", "avi", "mov"];
    return videoExtensions.includes(extension) ? "video" : "image";
  };

  const currentType = getFileType(currentItem?.src);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          console.log("ESC pressed - closing MediaPlayer");
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
        case " ":
        case "Space":
          if (currentType === "video") {
            e.preventDefault();
            const video = document.querySelector(`.${styles.video}`);
            if (video) {
              if (video.paused) {
                video.play();
                setIsVideoPlaying(true);
              } else {
                video.pause();
                setIsVideoPlaying(false);
              }
            }
          }
          break;
      }
    };

    // Блокуємо скрол body коли player відкритий
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    document.addEventListener("keydown", handleKeyDown);

    console.log("MediaPlayer opened with item:", currentItem?.title);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
      document.body.style.height = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev, currentType, currentItem, mounted]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log("Backdrop clicked - closing MediaPlayer");
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    console.log("Close button clicked");
    onClose();
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoError = (e) => {
    console.error("MediaPlayer video failed to load:", currentItem.src);
    e.target.style.display = "none";
    const fallback = e.target.parentNode.querySelector(
      `.${styles.videoFallback}`
    );
    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  if (!mounted) return null;

  const mediaPlayerContent = (
    <div className={styles.mediaPlayer} onClick={handleBackdropClick}>
      {/* ВЕЛИКИЙ ЧЕРВОНИЙ ХРЕСТИК - ЗАВЖДИ ЗВЕРХУ */}
      <button
        className={styles.closeButton}
        onClick={handleCloseClick}
        title="Закрити (ESC)"
      >
        ✕
      </button>

      <div className={styles.playerContent}>
        {/* Навігаційні кнопки */}
        {items.length > 1 && (
          <>
            <button
              className={styles.navButton}
              onClick={onPrev}
              style={{ left: "20px" }}
              title="Попередній (←)"
            >
              ‹
            </button>
            <button
              className={styles.navButton}
              onClick={onNext}
              style={{ right: "20px" }}
              title="Наступний (→)"
            >
              ›
            </button>
          </>
        )}

        {/* Медіа контент - ЦЕНТРОВАНИЙ */}
        <div className={styles.mediaContainer}>
          {currentType === "video" ? (
            <div className={styles.videoWrapper}>
              <video
                className={styles.video}
                controls
                poster={currentItem.poster}
                preload="metadata"
                playsInline
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onError={handleVideoError}
                onLoadStart={() =>
                  console.log("MediaPlayer video loading:", currentItem.src)
                }
                onCanPlay={() =>
                  console.log("MediaPlayer video ready:", currentItem.src)
                }
                autoPlay={false}
              >
                <source src={currentItem.src} type="video/mp4" />
                <source
                  src={currentItem.src?.replace(".mp4", ".webm")}
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
              <div className={styles.videoFallback} style={{ display: "none" }}>
                <div className={styles.videoError}>
                  <div className={styles.errorIcon}>🎬</div>
                  <div className={styles.errorText}>Video not available</div>
                  <div className={styles.errorSubtext}>{currentItem.title}</div>
                  <div className={styles.errorPath}>
                    Path: {currentItem.src}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Image
              src={currentItem.src || "/placeholder.svg"}
              alt={currentItem.title}
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
              onError={(e) => {
                console.error(
                  "MediaPlayer image failed to load:",
                  currentItem.src
                );
              }}
            />
          )}
        </div>

        {/* Інформація про медіа */}
        <div className={styles.mediaInfo}>
          <h3 className={styles.mediaTitle}>{currentItem.title}</h3>
          <p className={styles.mediaCounter}>
            {currentIndex + 1} / {items.length}
          </p>
          {currentType === "video" && (
            <p className={styles.videoControls}>
              Space - Play/Pause • ← → - Navigate • ESC - Close
            </p>
          )}
        </div>

        {/* Мініатюри (тільки якщо елементів більше 1) */}
        {items.length > 1 && (
          <div className={styles.thumbnails}>
            {items.map((item, index) => {
              const itemType = getFileType(item.src);
              return (
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
                  {itemType === "video" ? (
                    <div className={styles.thumbnailVideo}>
                      <Image
                        src={item.poster || "/placeholder.svg"}
                        alt={item.title}
                        width={60}
                        height={40}
                        className={styles.thumbnailImage}
                      />
                      <div className={styles.playIndicator}>▶</div>
                    </div>
                  ) : (
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      width={60}
                      height={40}
                      className={styles.thumbnailImage}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // Рендеримо MediaPlayer прямо в body через Portal
  return createPortal(mediaPlayerContent, document.body);
}
