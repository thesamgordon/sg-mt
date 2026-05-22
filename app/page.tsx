"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ ease: [0, -0.005, 0.226, 1], duration: 0.75 }}
          >
            Sam Gordon
          </motion.h1>
          <motion.p
            className={styles.date}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ ease: [0, -0.005, 0.226, 1], duration: 0.75 }}
          >
            May 21, 2026
          </motion.p>
        </div>
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
        <div className={styles.links}>
          <motion.div
            className={styles.link}
            initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              ease: [0, -0.005, 0.226, 1],
              duration: 0.75,
              delay: 0.2,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            </svg>
            <a className={styles.url} href="mailto:sam@thesamgordon.com">
              sam@thesamgordon.com
            </a>
          </motion.div>
          <motion.div
            className={styles.link}
            initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              ease: [0, -0.005, 0.226, 1],
              duration: 0.75,
              delay: 0.3,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 192 192"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
              />
            </svg>
            <a className={styles.url} href="https://github.com/thesamgordon">
              https://github.com/thesamgordon
            </a>
          </motion.div>
        </div>
      </div>
      <motion.div
        className={styles.backgroundContainer}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, -0.005, 0.226, 1], duration: 3, delay: 0.5 }}
      >
        <Image
          src="/gradient-raw.png"
          alt="Gradient background"
          loading="eager"
          fill
          className={styles.background}
        />
        <div className={styles.grain} />
      </motion.div>
    </div>
  );
}
