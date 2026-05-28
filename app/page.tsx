"use client";

import Link from "@/components/Link";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./page.module.scss";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export default function Home() {
  const backgroundControls = useAnimationControls();
  const grainControls = useAnimationControls();

  useEffect(() => {
    grainControls.start({
      opacity: 0.2,
      transition: { ease: [0, -0.005, 0.226, 1], duration: 3, delay: 0.4 },
    });
  }, [grainControls]);

  useEffect(() => {
    backgroundControls.start({
      y: 0,
      opacity: 1,
      transition: { ease: [0, -0.005, 0.226, 1], duration: 3, delay: 0.8 },
    });
  }, [backgroundControls]);

  function handleMouseDown() {
    backgroundControls.start({
      y: -40,
      transition: { ease: [0, -0.005, 0.226, 1], duration: 0.8, delay: 0 },
    });
  }

  function handleMouseUp() {
    backgroundControls.start({
      y: 0,
      transition: { ease: [0, -0.005, 0.226, 1], duration: 0.8, delay: 0 },
    });
  }

  return (
    <div className={styles.page} onMouseUp={handleMouseUp}>
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ ease: [0, -0.005, 0.226, 1], duration: 0.75 }}
        >
          <motion.h1 className={styles.title}>Sam Gordon</motion.h1>
          <motion.p
            className={styles.date}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ ease: [0, -0.005, 0.226, 1], duration: 0.75 }}
          >
            May 21, 2026
          </motion.p>
        </motion.div>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            ease: [0, -0.005, 0.226, 1],
            duration: 0.75,
            delay: 0.1,
          }}
        >
          As a theater enthusiast and a passionate developer, I work to create
          technology that enhances the performing arts and everyday life.
        </motion.p>
        <motion.div
          className={styles.description}
          initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            ease: [0, -0.005, 0.226, 1],
            duration: 0.75,
            delay: 0.2,
          }}
        >
          I&apos;m currently working on{" "}
          <Link
            href="https://github.com/thesamgordon/fohs"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            width="280px"
          >
            FOHS
          </Link>
          , front-of-house display software for theatrical performances and{" "}
          <Link
            width="220px"
            href="https://ldg.sh/about"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            Ledger
          </Link>
          , a fast, efficient, lightweight file storage platform.
        </motion.div>
        <motion.div
          className={styles.description}
          initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            ease: [0, -0.005, 0.226, 1],
            duration: 0.75,
            delay: 0.3,
          }}
        >
          You can find my work on{" "}
          <Link
            width="220px"
            href="https://github.com/thesamgordon"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            GitHub
          </Link>{" "}
          or reach out to me directly over{" "}
          <Link
            href="mailto:sam@thesamgordon.com"
            popup={false}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            email
          </Link>
          .
        </motion.div>
      </div>

      <motion.div
        className={styles.backgroundContainer}
        initial={{ y: 400, opacity: 0 }}
        animate={backgroundControls}
      >
        <Image
          src="/gradient-raw.webp"
          alt="Gradient background"
          loading="eager"
          fill
          className={styles.background}
        />
      </motion.div>
      <motion.div
        className={styles.grain}
        initial={{ opacity: 0 }}
        animate={grainControls}
      />
    </div>
  );
}
