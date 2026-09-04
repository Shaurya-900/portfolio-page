"use client";

import Image from "next/image";
import useInView from "./useInView";

/**
 * A press photograph that "develops" as it enters view: it arrives
 * over-exposed and out of focus, then settles into the printed page.
 */
export default function PressPhoto({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const { ref, cls } = useInView<HTMLDivElement>("-80px");
  return (
    <figure className="border border-ink/60">
      <div ref={ref} className={`develop ${cls}`}>
        <div className="press-photo">
          <Image
            src={src}
            alt={alt}
            width={1280}
            height={720}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[16/9] object-cover object-top"
          />
        </div>
      </div>
      <figcaption className="dept border-t border-ink/60 px-2.5 py-2 text-soft">{caption}</figcaption>
    </figure>
  );
}
