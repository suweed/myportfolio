import { Sparkles } from "@react-three/drei";

export function SceneParticles(props) {
    const { size, color, speed } = props;
    
    return <>
        <Sparkles  count={3} scale={[1, 1, 1]}
            color={color} size={size} speed={speed} noise={0.1}
            />
    </>
}