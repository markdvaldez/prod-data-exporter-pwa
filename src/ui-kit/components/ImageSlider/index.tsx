'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './ImageSlider.module.css'

type Slide = {
  src: string
  alt: string
  title?: string
  description?: string
}

type ImageSliderProps = {
  slides: Slide[]
  autoPlayIntervalMs?: number
}

export default function ImageSlider({
  slides,
  autoPlayIntervalMs = 6000,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length)
    }, autoPlayIntervalMs)

    return () => clearInterval(interval)
  }, [slides.length, autoPlayIntervalMs])

  if (!slides || slides.length === 0) {
    return null
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className={styles.sliderRoot}>
      <div className={styles.imageWrapper}>
        <Image
          key={currentSlide.src}
          src={currentSlide.src}
          alt={currentSlide.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`${styles.image} ${styles.fadeIn}`}
        />
        <div className={styles.overlayGradient} />
      </div>

      <div
        key={currentIndex}
        className={`${styles.content} ${styles.fadeUp}`}
      >
        {currentSlide.title && (
          <h2 className={styles.title}>{currentSlide.title}</h2>
        )}
        {currentSlide.description && (
          <p className={styles.description}>{currentSlide.description}</p>
        )}

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === currentIndex
                  ? `${styles.dot} ${styles.dotActive}`
                  : styles.dot
              }
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}