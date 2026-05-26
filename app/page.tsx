"use client";

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
          className={styles.links}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ ease: [0, -0.005, 0.226, 1], duration: 0.75 }}
        >
          <motion.a
            className={styles.link}
            href="mailto:sam@thesamgordon.com"
            onMouseDown={handleMouseDown}
            initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              ease: [0, -0.005, 0.226, 1],
              duration: 0.75,
              delay: 0.2,
            }}
          >
            <div className={styles.left}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C4C4C4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              </svg>
              <motion.div
                initial={{
                  filter: "blur(0px)",
                  opacity: 1,
                }}
                className={styles.url}
              >
                Contact
              </motion.div>
            </div>
            <div className={styles.right}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: [0, -0.005, 0.226, 1],
                  duration: 0.75,
                  delay: 0.3,
                }}
              >
                sam@thesamgordon.com
              </motion.p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.arrow}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </motion.a>
          <motion.a
            className={styles.link}
            onMouseDown={handleMouseDown}
            href="https://github.com/thesamgordon"
            initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              ease: [0, -0.005, 0.226, 1],
              duration: 0.75,
              delay: 0.3,
            }}
          >
            <div className={styles.left}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="#C4C4C4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                  d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
                />
              </svg>
              <motion.div
                initial={{
                  filter: "blur(0px)",
                  opacity: 1,
                }}
                className={styles.url}
              >
                GitHub
              </motion.div>
            </div>
            <div className={styles.right}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: [0, -0.005, 0.226, 1],
                  duration: 0.75,
                  delay: 0.3,
                }}
              >
                github.com/thesamgordon
              </motion.p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.arrow}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </motion.a>
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
