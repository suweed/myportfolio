import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Image, Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { animate, useMotionValue } from "framer-motion";
import { atom, useAtom } from "jotai";

export const projects = [
    {
        title: "IOFractal",
        url: "https://twitter.com/iofractal",
        image: "/projects/iofractal.jpg",
        description: "Consultora en tecnología 2012 - 2014"
    },
    {
        title: "Fábrica de Cine",
        url: "https://fabricadecine.com/",
        image: "/projects/fabricadecine.jpg",
        description: "Proyecto Freelance 2014-2015"
    },
    {
        title: "Retop",
        url: "https://retop.com.mx/",
        image: "/projects/retop.jpg",
        description: "Proyecto Freelance 2022"
    },
    {
        title: "Pengo",
        url: "https://www.pengostores.com/",
        image: "/projects/pengo.jpg",
        description: "Consultora e-commerce 2015-2018"
    },
    {
        title: "Gandhi",
        url: "https://www.gandhi.com.mx/",
        image: "/projects/gandhi.jpg",
        description: "Dentro de pengo 2015-2018"
    },
    {
        title: "Coca-Cola",
        url: "https://www.coca-colaentuhogar.com/",
        image: "/projects/coca.jpg",
        description: "Dentro de pengo 2015-2017"
    },
    {
        title: "Qbo",
        url: "https://www.qbo.tech/",
        image: "/projects/qbo.jpg",
        description: "Consultora e-commerce 2017-2019"
    },
    {
        title: "Palacio de Hierro",
        url: "https://www.elpalaciodehierro.com/",
        image: "/projects/palaciohierro.jpg",
        description: "Dentro de Qbo 2017-2019"
    },
    {
        title: "Ilusión",
        url: "https://www.ilusion.com/",
        image: "/projects/ilusion.jpg",
        description: "Dentro de Qbo 2017-2019"
    },
    {
        title: "Gaia Design",
        url: "https://www.gaiadesign.com.mx/",
        image: "/projects/gaia.jpg",
        description: "Muebleria de diseño 2019-Actualidad"
    }
];

const Project = (props) => {
    const { project, highlighted } = props;
    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.4);
    }, [highlighted]);

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    })

    return (
        <group {...props}>
            <mesh
                position-z={-0.001}
                onClick={() => window.open(project.url, "_blank")}
                ref={background}
            >
                <planeGeometry args={[4.2, 4]} />
                <meshBasicMaterial color="black" transparent opacity={0.4} />
            </mesh>
            <Image
                scale={[3.5, 2.6, 1]}
                url={project.image}
                toneMapped={false}
                position-y={0.5}
            />
            <Text
                maxWidth={2}
                anchorX={"left"}
                anchorY={"top"}
                fontSize={0.2}
                position={[-1.7, -1.5, 0]}
            >
                {project.title.toUpperCase()}
            </Text>
            <Text
                maxWidth={2}
                anchorX="left"
                anchorY="top"
                fontSize={0.12}
                position={[-1.7, -1.15, 0]}
            >
                {project.description}
            </Text>
        </group>
    );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));
export const Projects = () => {
    const { viewport } = useThree();
    const [ currentProject ] = useAtom(currentProjectAtom);
    const isMobile = window.innerWidth < 768;

    return (
        <group position-x={ isMobile ? -1 : 0 } position-y={isMobile ? -viewport.height * 2 : -viewport.height * 2.014 }>
             {
                projects.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 2.5, 0, -3]}
                        animate={{
                            x: 0 + (index - currentProject) * 4.5,
                            y: currentProject == index ? 0 : -0.4,
                            z: currentProject == index ? -2 : -3,
                            rotateX: currentProject == index ? 0 : -Math.PI / 3,
                            rotateZ: currentProject == index ? 0 : -0.1 * Math.PI
                        }}
                    >
                        <Project project={project} highlighted={index === currentProject} />
                    </motion.group>
                ))
            }
        </group>
    );
};