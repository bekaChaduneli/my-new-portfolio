"use client";

import FramerText from "@/components/framerText/FramerText";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import MyImage from "../../../public/images/laptop.png";
import styles from "./mainProjects.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function MainProjects({ data }) {
  const [cursorText, setCursorText] = useState("");
  const [hovered, setHovered] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [RealLink, setRealLink] = useState("");
  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  let mouseXPosition = 0;
  let mouseYPosition = 0;

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX;
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY;
  }

  const variants = {
    default: {
      opacity: 1,
      height: 0,
      width: 0,
      fontSize: "16px",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    contact: {
      opacity: 1,
      height: 200,
      width: 400,
      backgroundColor: "transparent",
      color: "transparent",
      fontSize: "32px",
      x: mouseXPosition - 48,
      y: mouseYPosition - 48,
    },
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };
  function contactEnter(event) {
    setCursorText("gsagas");
    setCursorVariant("contact");
  }

  function contactLeave(event) {
    setCursorText("");
    setCursorVariant("default");
  }
  const sliderRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      gsap.registerPlugin(ScrollTrigger);
      const linkElements = document.querySelectorAll(".trigger");
      linkElements?.forEach((linkElement) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: linkElement,
            start: "40% bottom",
            end: "180% bottom",
            scrub: 1,
            markers: false,
          },
        });

        tl.to(linkElement, {
          opacity: 1,
          duration: 1,
        });
      });
      gsap.to(".wrapper", {
        opacity: 1,
        duration: 2,
      });
    }
  }, [data]);

  return (
    <div ref={ref} className={`${styles.ProjectsWrapper} wrapper`}>
      <div className={styles.ProjectsHeadlines}>
        <h1 className={styles.ProjectsHeadlines__Text}>Project name</h1>
        <h1 className={styles.ProjectsHeadlines__Tools}>Project tools</h1>
        <h1 className={styles.ProjectsHeadlines__Date}>Project date</h1>
      </div>
      {data?.projects.map((project, index) => {
        return (
          project.best && (
            <div
              key={index}
              className="link"
              onMouseEnter={() => {
                setRealLink(project.name);
                setHovered(project.id);
              }}
              onMouseLeave={() => {
                setRealLink("");
                setHovered("");
              }}
            >
              <Link
                className={`${styles.Link} trigger`}
                key={project.id}
                ref={sliderRef}
                href={`/projects/${project.id}`}
              >
                <motion.div
                  variants={variants}
                  className={styles.circle}
                  animate={cursorVariant}
                  transition={spring}
                >
                  {RealLink === project.name && (
                    <figure
                      className={styles.LaptopWrapper}
                      style={{
                        transform: `${
                          RealLink
                            ? "scale(1) translate(-35%, -80%)"
                            : "scale(0) translate(-35%, -80%)"
                        } `,
                      }}
                    >
                      <Image
                        src={MyImage}
                        width="300"
                        alt="Laptop"
                        height="192"
                        className={styles.Laptop}
                      />
                      {project.videoLink ? (
                        <video
                          src={require(`../../assets/videos/${project.videoLink}.mp4`)}
                          className={styles.LaptopBackground}
                          autoPlay
                          loop
                          muted
                        />
                      ) : (
                        <img
                          className={styles.LaptopBackground}
                          id={`image-${index}`}
                          alt="project background"
                          src={`/images/${project.image[0]}`}
                        />
                      )}

                      <h1>{RealLink}</h1>
                    </figure>
                  )}
                </motion.div>
                {hovered === project.id ? (
                  <div
                    onMouseEnter={contactEnter}
                    onMouseLeave={contactLeave}
                    className={styles.HoveredProject}
                  >
                    <FramerText baseVelocity={-1.5}>
                      <span className={styles.Text}>Click to see more</span>
                    </FramerText>
                    <FramerText baseVelocity={1.5}>
                      <span className={styles.Text}> Click to see more </span>
                    </FramerText>
                  </div>
                ) : (
                  <div
                    onMouseEnter={contactEnter}
                    onMouseLeave={contactLeave}
                    className={styles.Project}
                  >
                    <h1 className={styles.Project__Name}>{project.name}</h1>
                    <div className={styles.Project__Tools}>
                      {project?.tools?.map((tool, index) => (
                        <img
                          key={index}
                          alt="tool"
                          className={styles.Project__Tool}
                          src={`/images${tool}`}
                        />
                      ))}
                    </div>
                    <h2 className={styles.Project__Date}>{project.date}</h2>
                  </div>
                )}
              </Link>
            </div>
          )
        );
      })}
    </div>
  );
}
