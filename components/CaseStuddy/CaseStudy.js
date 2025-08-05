"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CaseStudy.module.scss";
import Image from "next/image";
import MediaPlayer from "./MadiaPlayer";

const CreativesCarousel = ({ creatives, title, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [playingVideos, setPlayingVideos] = useState(new Set());

  // Функція для визначення типу файлу
  const getFileType = (src) => {
    if (!src) return "image";
    const extension = src.split(".").pop().toLowerCase();
    const videoExtensions = ["mp4", "webm", "ogg", "avi", "mov"];
    return videoExtensions.includes(extension) ? "video" : "image";
  };

  // Дублюємо елементи для інфініті скролу
  const extendedItems = [...creatives, ...creatives, ...creatives];
  const startIndex = creatives.length;

  useEffect(() => {
    setCurrentIndex(startIndex);

    // Визначаємо кількість елементів на екрані залежно від розміру
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [startIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= startIndex + creatives.length) {
      setCurrentIndex(startIndex);
    } else if (currentIndex < startIndex) {
      setCurrentIndex(startIndex + creatives.length - 1);
    }
  };

  const handleVideoToggle = (item, slideElement, index) => {
    const videoElement = slideElement.querySelector("video");
    if (videoElement) {
      const videoId = `${item.src}-${index}`;

      if (videoElement.paused) {
        // Запускаємо відео зі звуком
        videoElement.muted = false;
        videoElement
          .play()
          .then(() => {
            console.log("Video started playing:", item.title);
            setPlayingVideos((prev) => new Set([...prev, videoId]));
          })
          .catch((error) => {
            console.error("Failed to play video:", error);
            // Якщо не вдалося зі звуком, спробуємо без звуку
            videoElement.muted = true;
            videoElement.play().then(() => {
              setPlayingVideos((prev) => new Set([...prev, videoId]));
            });
          });
      } else {
        // Зупиняємо відео
        videoElement.pause();
        setPlayingVideos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(videoId);
          return newSet;
        });
      }
    }
  };

  const slideWidth = 100 / itemsPerView;

  return (
    <div className={styles.creativesSection}>
      <h4 className={styles.creativesTitle}>{title}</h4>
      <div className={styles.carouselContainer}>
        <button
          className={styles.carouselBtn}
          onClick={prevSlide}
          disabled={isTransitioning}
        >
          ‹
        </button>

        <div className={styles.carouselWrapper}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * slideWidth}%)`,
              transition: isTransitioning
                ? "transform 0.5s ease-in-out"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedItems.map((item, index) => {
              const fileType = getFileType(item.src);
              const videoId = `${item.src}-${index}`;
              const isPlaying = playingVideos.has(videoId);
              const originalIndex = index % creatives.length; // Оригінальний індекс в масиві

              return (
                <div
                  key={index}
                  className={styles.carouselSlide}
                  style={{ minWidth: `${slideWidth}%` }}
                >
                  <div className={styles.slideContent}>
                    <div className={styles.mediaWrapper}>
                      {fileType === "video" ? (
                        <>
                          <video
                            className={styles.media}
                            poster={item.poster}
                            preload="metadata"
                            playsInline
                            muted={!isPlaying} // Динамічно керуємо muted
                            loop
                            onPlay={() => {
                              console.log("Video play event:", item.title);
                              setPlayingVideos(
                                (prev) => new Set([...prev, videoId])
                              );
                            }}
                            onPause={() => {
                              console.log("Video pause event:", item.title);
                              setPlayingVideos((prev) => {
                                const newSet = new Set(prev);
                                newSet.delete(videoId);
                                return newSet;
                              });
                            }}
                          >
                            <source src={item.src} type="video/mp4" />
                            <source
                              src={item.src?.replace(".mp4", ".webm")}
                              type="video/webm"
                            />
                            Your browser does not support the video tag.
                          </video>

                          {/* Кастомні контроли поверх відео - ТІЛЬКИ PLAY/PAUSE */}
                          <div className={styles.videoControls}>
                            <button
                              className={styles.playButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(
                                  "Play button clicked for:",
                                  item.title
                                );
                                handleVideoToggle(
                                  item,
                                  e.currentTarget.closest(
                                    `.${styles.slideContent}`
                                  ),
                                  index
                                );
                              }}
                            >
                              {isPlaying ? "⏸" : "▶"}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={
                              item.src ||
                              "/placeholder.svg?height=200&width=300&query=creative asset"
                            }
                            alt={item.title}
                            width={300}
                            height={200}
                            className={styles.media}
                          />

                          {/* Кнопка збільшення для зображень */}
                          <div className={styles.imageControls}>
                            <button
                              className={styles.zoomButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(
                                  "Zoom button clicked for:",
                                  item.title
                                );
                                onItemClick(item, "zoom", originalIndex);
                              }}
                            >
                              🔍
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.itemTitle}>{item.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={styles.carouselBtn}
          onClick={nextSlide}
          disabled={isTransitioning}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default function CaseStudy({ caseStudy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mediaPlayerOpen, setMediaPlayerOpen] = useState(false);
  const [mediaPlayerItems, setMediaPlayerItems] = useState([]);
  const [mediaPlayerIndex, setMediaPlayerIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Функція для визначення розміру блоку на основі контенту
  const getMetricSize = (metric) => {
    const valueLength = metric.value.length;
    const labelLength = metric.label.length;
    const totalLength = valueLength + labelLength;

    // Спеціальна обробка для дуже довгих значень
    if (valueLength > 12 || labelLength > 15 || totalLength > 30)
      return "extraLarge";
    if (totalLength > 25) return "large";
    if (totalLength > 15) return "medium";
    return "small";
  };

  // Функція для форматування довгих значень
  const formatMetricValue = (value) => {
    // Якщо значення містить ">" - розбиваємо на два рядки
    if (value.includes(">")) {
      const parts = value.split(">");
      return (
        <div className={styles.multiLineValue}>
          <div className={styles.valueLine}>{parts[0]}</div>
          <div className={styles.valueArrow}>↓</div>
          <div className={styles.valueLine}>{parts[1]}</div>
        </div>
      );
    }

    // Якщо значення дуже довге - розбиваємо по пробілах або символах
    if (value.length > 8) {
      return <div className={styles.longValue}>{value}</div>;
    }

    return value;
  };

  // Функція для форматування довгих підписів
  const formatMetricLabel = (label) => {
    // Скорочення для поширених фраз
    const abbreviations = {
      "reg to dep": "Reg→Dep",
      "registration to deposit": "Reg→Dep",
      "conversion rate": "Conversion",
      "user satisfaction": "Satisfaction",
      "performance improvement": "Performance",
    };

    const lowerLabel = label.toLowerCase();
    for (const [full, short] of Object.entries(abbreviations)) {
      if (lowerLabel.includes(full)) {
        return short;
      }
    }

    return label;
  };

  // ВИПРАВЛЕНА ФУНКЦІЯ ДЛЯ ФОТО
  const handleImageClick = (photo, photoIndex) => {
    console.log("🖼️ Photo clicked:", photo.title, "Index:", photoIndex);
    console.log("📋 Available photos:", caseStudy.photos);

    // Відкриваємо MediaPlayer з фото секції
    setMediaPlayerItems(caseStudy.photos);
    setMediaPlayerIndex(photoIndex);
    setMediaPlayerOpen(true);

    console.log("✅ MediaPlayer opened for photos");
  };

  const handleCreativeClick = (
    creative,
    action = "default",
    originalIndex = 0
  ) => {
    console.log(
      "🎨 Creative clicked:",
      creative.title,
      "Action:",
      action,
      "Original Index:",
      originalIndex
    );

    if (action === "zoom") {
      // Відкриваємо MediaPlayer з креативів
      console.log("🔍 Opening creative in MediaPlayer");
      setMediaPlayerItems(caseStudy.creatives);
      setMediaPlayerIndex(originalIndex);
      setMediaPlayerOpen(true);
    }
  };

  const closeMediaPlayer = () => {
    console.log("❌ Closing MediaPlayer");
    setMediaPlayerOpen(false);
    setMediaPlayerItems([]);
    setMediaPlayerIndex(0);
  };

  const nextMediaItem = () => {
    const newIndex = (mediaPlayerIndex + 1) % mediaPlayerItems.length;
    console.log("➡️ Next media item:", newIndex);
    setMediaPlayerIndex(newIndex);
  };

  const prevMediaItem = () => {
    const newIndex =
      (mediaPlayerIndex - 1 + mediaPlayerItems.length) %
      mediaPlayerItems.length;
    console.log("⬅️ Previous media item:", newIndex);
    setMediaPlayerIndex(newIndex);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`${styles.caseStudy} ${isVisible ? styles.visible : ""}`}
      >
        <div className={styles.backgroundImage}></div>
        <div className={styles.overlay}></div>

        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.label}>{caseStudy.title}</span>
              <h2 className={styles.title}>{caseStudy.subtitle}</h2>
              <p className={styles.description}>{caseStudy.description}</p>
              <div className={styles.duration}>{caseStudy.duration}</div>
            </div>

            <div className={styles.metrics}>
              {caseStudy.metrics.map((metric, index) => {
                const sizeClass = getMetricSize(metric);
                const formattedValue = formatMetricValue(metric.value);
                const formattedLabel = formatMetricLabel(metric.label);

                return (
                  <div
                    key={index}
                    className={`${styles.metric} ${
                      styles[
                        `metric${
                          sizeClass.charAt(0).toUpperCase() + sizeClass.slice(1)
                        }`
                      ]
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.metricValue}>{formattedValue}</div>
                    <div className={styles.metricLabel}>{formattedLabel}</div>
                  </div>
                );
              })}
            </div>

            <CreativesCarousel
              creatives={caseStudy.creatives}
              title={caseStudy.creativesTitle}
              onItemClick={handleCreativeClick}
            />

            {/* ВИПРАВЛЕНА ФОТО СЕКЦІЯ */}
            <div className={styles.photosSection}>
              <div className={styles.photosGrid}>
                {caseStudy.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={styles.photoCard}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => {
                      console.log(
                        "🖱️ Photo card clicked:",
                        photo.title,
                        "Index:",
                        index
                      );
                      handleImageClick(photo, index);
                    }}
                  >
                    <div className={styles.photoWrapper}>
                      <Image
                        src={
                          photo.src ||
                          "/placeholder.svg?height=300&width=400&query=project screenshot"
                        }
                        alt={photo.title}
                        width={400}
                        height={300}
                        className={styles.photo}
                      />
                      <div className={styles.photoOverlay}>
                        <div className={styles.zoomIcon}>🔍</div>
                        <div className={styles.overlayText}>
                          Click to view fullscreen
                        </div>
                      </div>
                    </div>
                    <div className={styles.photoInfo}>
                      <h5 className={styles.photoTitle}>{photo.title}</h5>
                      <p className={styles.photoDescription}>
                        {photo.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.decorativeElements}>
            <div
              className={styles.floatingElement}
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className={styles.floatingElement}
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className={styles.floatingElement}
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </section>

      {/* МЕДІА ПЛЕЄР ЧЕРЕЗ REACT PORTAL - ПОЗА ВСІМА КОНТЕЙНЕРАМИ */}
      {mediaPlayerOpen && mediaPlayerItems.length > 0 && (
        <>
          {console.log("🎬 Rendering MediaPlayer with:", {
            itemsCount: mediaPlayerItems.length,
            currentIndex: mediaPlayerIndex,
            currentItem: mediaPlayerItems[mediaPlayerIndex],
          })}
          <MediaPlayer
            items={mediaPlayerItems}
            currentIndex={mediaPlayerIndex}
            onClose={closeMediaPlayer}
            onNext={nextMediaItem}
            onPrev={prevMediaItem}
          />
        </>
      )}
    </>
  );
}
