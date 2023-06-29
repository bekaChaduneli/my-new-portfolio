import Link from "next/link";
import React from "react";
import styles from "./header.module.scss";
import { MapPin } from "lucide-react";
import { useTypingText } from "@/hooks/useTypingText";
export default function Header() {
    const { word } = useTypingText(
        [
            "Next",
            "Typescript",
            "React",
            "Javascript",
            "NodeJs",
            "Prisma",
            "Mysql",
            "Tailwind",
            "Three",
            "Scss",
            "Styled components",
            "Chakra",
            "Gsap",
            "",
            "Jquery",
            "Html",
            "Css",
        ],
        130,
        20
    );
    return (
        <div className={styles.Header}>
            <h1 className={styles.Header__Headline}>Hi I'm Beka</h1>
            <h2 className={styles.Header__Text}>Full Stack Developer</h2>
            <h1 className={styles.Header__Skills}>
                I Love{" "}
                <span className={styles.Header__SkillsValue}>{word}</span>
            </h1>
            <div className={styles.Header__Location}>
                <MapPin className={styles.Header__LocationIcon} /> Tbilisi,
                Georgia
            </div>
            <div className={styles.Header__ButtonsWrapper}>
                <Link className={styles.Header__Button} href="/about">
                    About me
                </Link>
                <Link className={styles.Header__Button} href="#">
                    Resume
                </Link>
            </div>
        </div>
    );
}