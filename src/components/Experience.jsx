import { useScroll, Stars, Sparkles } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Myroom } from "./room/Myroom";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Projects } from "./Projects";
import { Background } from "./Background";
import { Buny } from "./items/Buny";
import { Spherebot } from "./items/Spherebot";
import { SceneParticles } from "./SceneParticles";

export const Experience = (props) => {
    const { menuOpened } = props;
    const { viewport } = useThree();
    const data = useScroll();

    const isMobile = window.innerWidth < 768;
    const responsiveRatio = viewport.width / 12;
    const officeScaleRatio = Math.max(0.7, Math.min(0.9 * responsiveRatio, 0.9));

    const [ section, setSection ] = useState(0);

    const cameraPositionX = useMotionValue();
    const cameraLookAtX = useMotionValue();
    const cameraPositionZ = useMotionValue();
    const cameraLookAtZ = useMotionValue();

    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -1 : 1, {
            ...framerMotionConfig
        });

        animate(cameraLookAtX, menuOpened ? 2 : -1, {
            ...framerMotionConfig
       });

        // animate(cameraPositionZ, menuOpened ? 10 : 9, {
        //     ...framerMotionConfig
        // });
        // animate(cameraLookAtZ, menuOpened ? 3 : -1, {
        //     ...framerMotionConfig
        // });
    }, [menuOpened]);

    const characterContainerAboutRef = useRef();
    const [ characterAnimation, setCharacterAnimation ] = useState("Typing");

    useEffect(() => {
        setCharacterAnimation("Falling");

        setTimeout(() => {
            setCharacterAnimation(section === 0 ? "Typing" : "Standing");
        }, 900)
    }, [section])

    const characterGroup = useRef();

    useFrame((state) => {
        let curSection = Math.floor(data.scroll.current * data.pages);

        if (curSection > 3) {
            curSection = 3;
        }

        if (curSection !== section) {
            setSection(curSection);
        }
        
        state.camera.position.x = cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0, 0);

        // state.camera.position.z = cameraPositionZ.get();
        // state.camera.lookAt(cameraLookAtZ.get(), 0, 0);

        //acomodar avatar sobre la silla
        if (section === 0) {
            characterContainerAboutRef.current.getWorldPosition(characterGroup.current.position);
        }
        
        /*const position = new THREE.Vector3();
        console.log([position.x, position.y, position.z]);
        
        const quaternion = new THREE.Quaternion();
        characterContainerAboutRef.current.getWorldQuaternion(quaternion);
        const euler = new THREE.Euler();
        euler.setFromQuaternion(quaternion, "XYZ");
        console.log([euler.x, euler.y, euler.z]);*/
    });

    return (
        <>
            <ambientLight intensity={5} />
            <Background />
            {/* AVATAR */}
            <motion.group
                ref={characterGroup}
                rotation={[-3.141592653589793, 0.8043981633974482, 3.141592653589793]}
                scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
                animate={"" + section}
                transition={{
                    duration: 0.7
                }}
                variants={{
                    0: {
                        x: -0.3080013288158834,
                        y: 0.0522,
                        z: 3.009545941546018,
                        scaleX: officeScaleRatio,
                        scaleY: officeScaleRatio,
                        scaleZ: officeScaleRatio
                    },
                    1: {
                        y: isMobile ? -viewport.height : -viewport.height - 0.4,
                        x: isMobile ? 0.33 : 0.2,
                        z: isMobile ? 4 : 2,
                        rotateX: -0.22,
                        rotateY: isMobile ? Math.PI / 3.5 : 0.1,
                        rotateZ: 0.055,
                        scaleX: isMobile ? 1.5 : 1.4,
                        scaleY: isMobile ? 1.5 : 1.4,
                        scaleZ: isMobile ? 1.5 : 1.4,
                        transition: {
                            duration: 1,
                            rotateZ: 50
                        }
                    },
                    2: {
                        y: isMobile ? -viewport.height * 2.1 + 0.5 : -viewport.height * 2  + 0.5,
                        x: isMobile ? -1.5 : -1,
                        z: isMobile ? 2 : 4,
                        rotateX: 0,
                        rotateY: Math.PI / 2,
                        rotateZ: 0,
                        scaleX: 1,
                        scaleY: 1,
                        scaleZ: 1
                    },
                    3: {
                        y: -viewport.height * 2.845,
                        x: 0.5,
                        z: 6.4,
                        rotateX: 0,
                        rotateY: -Math.PI / 9,
                        rotateZ: 0,
                        scaleX: 1,
                        scaleY: 1,
                        scaleZ: 1
                    }
                }}
            >
                <Avatar animation={characterAnimation} wireframe={section === 1} />
            </motion.group>
            {/* ROOM */}
            <motion.group
                position={[isMobile ? 0.3 : 1.5 * officeScaleRatio, isMobile ? -viewport.height / 6 : 2, 3]}
                scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
                rotation-y={-Math.PI / 4}
                animate={{
                    y: isMobile ? 0 : 0,
                }}
                transition={{
                    duration: 0.8
                }}
            >
                <Myroom section={section} />
                <group
                    ref={characterContainerAboutRef}
                    name="Empty"
                    position={[-1.413, 0.058, 1.428]}
                    rotation={[-Math.PI, 0.019, -Math.PI]}
                >
                </group>
            </motion.group>
            {/* ROBOTS */}
            <motion.group
                scale={0.2}
                animate={"" + section}
                variants={{
                    0: {
                        y: -8,
                        x: 13,
                        z: -10,
                        rotateY:  0,
                        scale: 0,
                        speed: 1
                    },
                    1: {
                        y: isMobile ? -8 : -6.4,
                        x: isMobile ? -5 : -3,
                        z: isMobile ? -5 : -3,
                        rotateY: 1,
                        scale: 0.6
                    }
                }}
                transition={{
                    duration: 1
                }}
            >
                <Buny section={section} timeWait={4000} />
                <motion.group
                    animate={"" + section}
                    variants={{
                        0: {
                            scale: 0,
                        },
                        1: {
                            x: -4.4,
                            y: 1,
                            z: 9,
                            scale: 3.5,
                            transition: {
                                duration: 1,
                                ease: [0.17, 0.67, 0.83, 0.67],
                            }
                        }
                    }}
                >
                    <SceneParticles size={section !== 1 ? 0 : 60} color={"#ffee00"} speed={3} />
                </motion.group>
            </motion.group>
            <motion.group
                animate={"" + section}
                variants={{
                    0: {
                        x: -10,
                        y: -10,
                        z: -7,
                        scale: 0,
                        rotateY: 2,
                    },
                    1: {
                        x: isMobile ? 0 : 1.5,
                        y: -6.8,
                        z: 0.8,
                        scale: 0.6,
                        rotateY: -1.3,
                    }
                }}
                transition={{
                    duration: 1
                }}
            >
                <Spherebot section={section} timeWait={5000} />
                <motion.group
                    animate={"" + section}
                    variants={{
                        0: {
                            scale: 0,
                        },
                        1: {
                            x: 3,
                            y: 1,
                            z: 2.6,
                            scale: 3,
                            transition: {
                                duration: 1,
                                ease: [0.17, 0.67, 0.83, 0.67],
                            }
                        }
                    }}
                >
                    <SceneParticles size={section !== 1 ? 0 : 60} color={"#09cae4"} speed={5} />
                </motion.group>
            </motion.group>
            {/* PROJECTS */}
            <Projects />
            <Sparkles
                color={"#153ef7"}
                count={100}
                noise={2}
                opacity={1}
                size={[1, 3, 5]}
                speed={0.5}
                scale={8}
                position={[0, -2, 4]}
            />
            <Sparkles
                color="#9902a7"
                count={100}
                noise={2}
                opacity={1}
                size={[2, 4, 6]}
                speed={0.5}
                scale={9}
                position={[0, -11, 4]}
            />
            <Stars
                radius={30}
                depth={60}
                count={3000}
                factor={4}
                saturation={1}
                fade={true}
                speed={4}
            />
        </>
    );
};