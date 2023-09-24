import { Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export function Words(props) {
    const { text, color, size, rotateY, AxY, AxZ, AxX } = props;
    
    return (
        <>
            <motion.group
                animate={{
                    x: AxX,
                    y: AxY,
                    z: AxZ,
                    rotateY: rotateY
                }}
            >
                <Text3D
                    font={"/fonts/Pixelated.json"}
                    size={size}
                    height={0.065}
                    curveSegments={12}
                >
                    {text}
                    <meshStandardMaterial color={color}  emissive={color} />
                </Text3D>
            </motion.group>
        </>
    );
}