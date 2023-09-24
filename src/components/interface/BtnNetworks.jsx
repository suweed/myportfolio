import { motion } from "framer-motion";
import React from "react";

export const BtnNetworks = (props) => {
    const { section } = props;

    let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    let height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    const isDesktop = window.innerWidth >= 1025 && window.innerWidth < 1300;
    const isDesktopLarge = window.innerWidth >= 1300;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 768;
    const isMobile = window.innerWidth <= 768;

    let x2 = 0;
    let x3 = 0;
    let y3  = 0;
    
    if (isDesktopLarge) {
        x2 = Math.PI / 2.5 * width;
        x3 = Math.PI / 4.5 * width;
        y3 = Math.PI / -20 * height;
    } else if (isDesktop) {
        x3 = Math.PI / 3 * width;
    } else if (isTablet) {
        x3 = Math.PI / 4 * width;
        y3 = Math.PI / -20 * height;
    } else if (isMobile) {
        x3 = Math.PI / 10.5 * width;
        y3 = Math.PI / 120 * height;
    }
    
    return (
        <div>
            <motion.div
                animate={"" + section}
                variants={{
                    0: {
                        x: -1000,
                        y: -100,
                    },
                    1: {
                        x: -1000,
                        y: -100,
                    },
                    2: {
                        x: x2,
                        y: -100,
                    },
                    3: {
                        x: x3,
                        y: y3,
                    }
                }}
                transition={{
                    duration: 1,
                }}
            >
                <ul>
                    <li cursor-class="arrow">
                        <a href="http://linkedin.com/in/gsuskr2o" target="_blank">
                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                            <span>Linked In </span>
                        </a>
                    </li>
                    <li cursor-class="arrow">
                        <a href="https://twitter.com/dRsUgAr1221" target="_blank">
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                            <span class="btn-net-twitt">Twitter</span>
                        </a>
                    </li>
                    <li cursor-class="arrow">
                        <a href="https://wa.me/5540137688" target="_blank">
                            <i class="fa fa-whatsapp" aria-hidden="true"></i>
                            <span>Whatsapp</span>
                        </a>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}