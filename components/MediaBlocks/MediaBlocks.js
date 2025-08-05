"use client";

import { useState, useEffect } from "react";
import styles from "./MediaBlocks.module.scss";
import Image from "next/image";
import Lightbox from "./Lightbox";

const Carousel = ({ items, title, type, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Дублюємо елементи для інфініті скролу
  const extendedItems = [...items, ...items, ...items];
  const startIndex = items.length;

  useEffect(() => {
    setCurrentIndex(startIndex);

    // Визначаємо кількість елементів на екрані залежно від розміру
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
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
    if (currentIndex >= startIndex + items.length) {
      setCurrentIndex(startIndex);
    } else if (currentIndex < startIndex) {
      setCurrentIndex(startIndex + items.length - 1);
    }
  };

  const slideWidth = 100 / itemsPerView;

  return (
    <div className={styles.carouselSection}>
      <h3 className={styles.carouselTitle}>{title}</h3>
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
            {extendedItems.map((item, index) => (
              <div
                key={index}
                className={styles.carouselSlide}
                style={{ minWidth: `${slideWidth}%` }}
              >
                <div className={styles.slideContent}>
                  {type === "video" ? (
                    <div className={styles.videoWrapper}>
                      <video
                        className={styles.video}
                        controls
                        poster={item.poster}
                        preload="metadata"
                        onError={(e) => {
                          console.error("Video failed to load:", item.src);
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      >
                        <source src={item.src} type="video/mp4" />
                        <source
                          src={item.src.replace(".mp4", ".webm")}
                          type="video/webm"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <div
                        className={styles.videoFallback}
                        style={{ display: "none" }}
                      >
                        <div className={styles.videoError}>
                          <div className={styles.errorIcon}>📹</div>
                          <div className={styles.errorText}>
                            Video not available
                          </div>
                          <div className={styles.errorSubtext}>
                            {item.title}
                          </div>
                        </div>
                      </div>
                      <div className={styles.mediaTitle}>{item.title}</div>
                    </div>
                  ) : (
                    <div className={styles.imageWrapper}>
                      <div
                        className={styles.imageContainer}
                        onClick={() =>
                          onImageClick &&
                          onImageClick(item, index % items.length)
                        }
                      >
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={item.width || 300}
                          height={item.height || 200}
                          className={styles.image}
                        />
                        <div className={styles.imageOverlay}>
                          <div className={styles.zoomIcon}>🔍</div>
                        </div>
                      </div>
                      <div className={styles.mediaTitle}>{item.title}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
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

      <div className={styles.indicators}>
        {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                Math.floor((currentIndex - startIndex) / itemsPerView) === index
                  ? styles.activeIndicator
                  : ""
              }`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(startIndex + index * itemsPerView);
                }
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default function MediaBlocks() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Відео файли з папки /videos/
  const videoItems = [
    {
      src: "/videos/7.mp4",
      poster: "/images/projects/7poster.jpg",
      title: "Project Demo 1",
    },
    {
      src: "/videos/8.mp4",
      poster: "/images/projects/8poster.jpg",
      title: "Project Demo 2",
    },
    {
      src: "/videos/9.mp4",
      poster: "/images/projects/9poster.jpg",
      title: "Project Demo 3",
    },
    {
      src: "/videos/10.mp4",
      poster: "/images/projects/10poster.jpg",
      title: "Project Demo 4",
    },
    {
      src: "/videos/11.mp4",
      poster: "/images/projects/11poster.jpg",
      title: "Project Demo 5",
    },
    {
      src: "/videos/12.mp4",
      poster: "/images/projects/12poster.jpg",
      title: "Project Demo 6",
    },
    {
      src: "/videos/13.mp4",
      poster: "/images/projects/13poster.jpg",
      title: "Project Demo 7",
    },
    {
      src: "/videos/14.mp4",
      poster: "/images/projects/14poster.jpg",
      title: "Project Demo 9",
    },
    {
      src: "/videos/15.mp4",
      poster: "/images/projects/15poster.jpg",
      title: "Project Demo 10",
    },
    {
      src: "/videos/16.mp4",
      poster: "/images/projects/16poster.jpg",
      title: "Project Demo 11",
    },
    {
      src: "/videos/17.mp4",
      poster: "/images/projects/17poster.jpg",
      title: "Project Demo 12",
    },
  ];

  // Зображення проектів з папки /images/projects/
  const projectImages = [
    {
      src: "/images/projects/18.jpg",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/19.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/20.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/21.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/22.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/23.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/24.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/25.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/26.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/27.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/28.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/29.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/30.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/31.png",
      title: "creo",
      width: 400,
      height: 300,
    },
    {
      src: "/images/projects/33.png",
      title: "creo",
      width: 400,
      height: 300,
    },
  ];

  // Дизайн роботи з папки /images/design/
  const designImages = [
    {
      src: "/images/design/Screenshot1.png",
      title: "proof",
      width: 400,
      height: 300,
    },
    {
      src: "/images/design/Screenshot2.png",
      title: "proof",
      width: 400,
      height: 300,
    },
    {
      src: "/images/design/Screenshot3.png",
      title: "proof",
      width: 400,
      height: 300,
    },
    {
      src: "/images/design/Screenshot4.png",
      title: "proof",
      width: 400,
      height: 300,
    },
    {
      src: "/images/design/Screenshot5.png",
      title: "proof",
      width: 400,
      height: 300,
    },
    {
      src: "/images/design/Screenshot6.png",
      title: "proof",
      width: 400,
      height: 300,
    },
    {
      src: "/images/design/Screenshot7.png",
      title: "proof",
      width: 400,
      height: 300,
    },
  ];

  const handleImageClick = (clickedImage, clickedIndex, imageArray) => {
    setLightboxImages(imageArray);
    setLightboxIndex(clickedIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
    );
  };

  return (
    <section className={styles.mediaSection}>
      <Carousel items={videoItems} title="Video creo" type="video" />
      <Carousel
        items={projectImages}
        title="Foto Creo"
        type="image"
        onImageClick={(image, index) =>
          handleImageClick(image, index, projectImages)
        }
      />
      <Carousel
        items={designImages}
        title="Proof of work"
        type="image"
        onImageClick={(image, index) =>
          handleImageClick(image, index, designImages)
        }
      />

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}
