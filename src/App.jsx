import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Interface } from "./components/interface/Interface";
import { ScrollManager } from "./components/interface/ScrollManager";
import { Menu } from "./components/interface/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";
import { Ships } from "./components/items/Ships";

function App() {
  const [ section, setSection ] = useState(0);
  const [started, setStarted] = useState(false);
  const [ menuOpened, setMenuOpened ] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
        {/* SHIPS */}
        <Ships section={section} />

        <LoadingScreen started={started} setStarted={setStarted} />
        <MotionConfig transition={{
        ...framerMotionConfig
        }}>
            <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
                <ScrollControls pages={4} damping={0.1} >
                    <ScrollManager section={section} onSectionChange={setSection} />
                    <Scroll>
                        <Suspense>
                            {started && (
                                <Experience section={section} menuOpened={menuOpened} />
                            )}
                        </Suspense>
                    </Scroll>
                    <Scroll html >
                        {started && <Interface section={section} setSection={setSection} menuOpened={menuOpened} />}
                    </Scroll>
                </ScrollControls>
                </Canvas>
            <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
        <Cursor />
        </MotionConfig>
        <Leva hidden />
    </>
  );
}

export default App
