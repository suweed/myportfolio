import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export const Background = () => {
    const material = useRef();
    const color = useRef({
        color: "#010111",
        transparent: true,
        opacity: 0.24
    });
    const data = useScroll();
    const tl = useRef();

    useFrame(() => {
        tl.current.progress(data.scroll.current);
        material.current.color = new THREE.Color(color.current.color);
    })

    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.to(color.current, {
            color: "#0a0653",
            transparent: true,
            opacity: 0.24
        });
        tl.current.to(color.current, {
            color: "#0d00ff",
            transparent: true,
            opacity: 0.24
        });
        tl.current.to(color.current, {
            color: "#381fa7ff",
            transparent: true,
            opacity: 0.54
        });
        tl.current.to(color.current, {
            color: "#160342",
            transparent: true,
            opacity: 0.24
        });
    }, [])
    
    return (<group>
        <Sphere args={[30, 30, 30, 30]}>
            <meshBasicMaterial ref={material} side={THREE.BackSide} toneMapped={false} transparent opacity={0.24} />
        </Sphere>
    </group>);
}