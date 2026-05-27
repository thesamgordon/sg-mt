import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./Link.module.scss";

interface LinkProps {
  children: React.ReactNode;
  href: string;
  popup?: boolean;
  width?: string;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  onMouseUp?: React.MouseEventHandler<HTMLElement>;
}

export default function Link({
  children,
  href,
  popup = true,
  width = "260px",
  onMouseDown,
  onMouseUp,
}: LinkProps) {
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);

  const safeName = href
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();
  const localPreviewImage = `/previews/external/${safeName}.png`;

  const handleTouchStart = () => {
    touchTimeout.current = setTimeout(() => {
      setShowMobilePopup(true);
    }, 400);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }

    if (showMobilePopup) {
      e.preventDefault();
      setShowMobilePopup(false);
    }
  };

  return (
    <div
      className={`${styles.linkWrapper} ${showMobilePopup ? styles.forceShow : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {children}
      </a>
      {popup && (
        <button
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          className={styles.popupPreview}
          onClick={(e) => {
            e.preventDefault();
            window.open(href, "_blank");
          }}
          style={{
            width,
          }}
        >
          <Image
            height="1000"
            width="1000"
            src={localPreviewImage}
            alt="Site layout preview"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className={styles.description}>
            <p className={styles.url}>{href}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C4C4C4"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.arrow}
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
