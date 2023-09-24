import { motion } from "framer-motion";
import React from "react";

export const Ships = (props) => {
    const { section } = props;

    let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    let height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    const isDesktop = window.innerWidth >= 1025 && window.innerWidth < 1300;
    const isDesktopLarge = window.innerWidth >= 1300;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 769;
    const isMobile = window.innerWidth <= 768;

    let s1x0 = 0;
    let s1x1 = 0;
    let s1x2 = 0;
    let s1x3 = 0;

    let s2x0 = 0;
    let s2x1 = 0;
    let s2x2 = 0;
    let s2x3 = 0;

    let px0 = 0;
    let px1 = 0;
    let px2 = 0;
    let px3 = 0;

    if (isDesktop) {
        s1x0 = 2.3;
        s1x1 = 8;
        s1x2 = 2;
        s1x3 = 2;
        s2x0 = 3;
        s2x1 = 4.5;
        s2x2 = 3.3;
        s2x3 = 4.3;
    } else if (isDesktopLarge) {
        s1x0 = 2.3;
        s1x1 = 15;
        s1x2 = 2;
        s1x3 = 2;
        s2x0 = 3;
        s2x1 = 4.5;
        s2x2 = 4.3;
        s2x3 = 4.3;
    } else if (isTablet) {
        s1x0 = 2.3;
        s1x1 = 6;
        s1x2 = 2;
        s1x3 = 2;
        s2x0 = 3;
        s2x1 = 4.5;
        s2x2 = 4.3;
        s2x3 = 4.3;
    } else if (isMobile) {
        s1x0 = 2.3;
        s1x1 = 5;
        s1x2 = 2;
        s1x3 = 2;
        s2x0 = 3;
        s2x1 = 4.5;
        s2x2 = 4.3;
        s2x3 = 4.3;
        px0 = 0;
        px1 = 25;
        px2 = 0;
        px3 = 0;
    }

    return (
        <>
            <motion.img
                animate={"" + section}
                variants={{
                    0: {
                        x: -Math.PI / s1x0 * window.innerWidth,
                        y: Math.PI / 3.5 * window.innerHeight,
                        rotateY: 180,
                        opacity: 1,
                        transition: {
                            duration: 3,
                        }
                    },
                    1: {
                        x: -Math.PI / s1x1 * width,
                        y: Math.PI / 30 * height,
                        rotateY: 180,
                        opacity: 0.5,
                        transition: {
                            duration: 1
                        }
                    },
                    2: {
                        x: Math.PI / s1x2 - width,
                        y: -Math.PI / 6 * window.innerHeight,
                        rotateY: 180,
                        transition: {
                            duration: 1
                        }
                    },
                    3: {
                        x: Math.PI / s1x3 - width,
                        y: -Math.PI / 6 * window.innerHeight,
                        opacity: 0,
                    }
                }}
                className='fixed'
                src="public/images/ship1.png"
            />
            <motion.img
                animate={"" + section}
                variants={{
                    0: {
                        x: Math.PI / s2x0 * width,
                        y: Math.PI / 13 * window.innerWidth,
                        z: 0,
                        transition: {
                            duration: 1
                        }
                    },
                    1: {
                        x: Math.PI / s2x1 * width,
                        y: Math.PI / 30 * window.innerHeight,
                        z: 0,
                        opacity: 1,
                        transition: {
                            duration: 1
                        }
                    },
                    2: {
                        x: Math.PI / s2x2 * window.innerWidth,
                        y: -Math.PI / 6 * window.innerHeight,
                        transition: {
                            duration: 1
                        }
                    },
                    3: {
                        x: Math.PI / s2x3 * window.innerWidth,
                        y: -Math.PI / 6 * window.innerHeight,
                        opacity: 0,
                    }
                }}
                className='fixed'
                src="public/images/ship1.png"
            />
        </>
    );
}