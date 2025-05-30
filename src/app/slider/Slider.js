import { useEffect, useState } from "react";
import Image from "next/image";

export default function Slider({ srcs }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % srcs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [srcs.length]);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg bg-white">
      {srcs.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-80 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === currentIndex}
          />
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {srcs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white/90" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
