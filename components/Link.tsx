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

  const handlePopupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(href, "_blank");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.open(href, "_blank");
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
        <>
          <div
            className={styles.spacer}
            style={{
              width: width,
            }}
          ></div>
          <div
            role="button"
            tabIndex={0}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className={styles.popupPreview}
            onClick={handlePopupClick}
            onKeyDown={handleKeyDown}
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
          </div>
        </>
      )}
    </div>
  );
}
