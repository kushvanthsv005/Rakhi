import {
    Canvas,
} from "@react-three/fiber";

import {
    performanceSettings,
} from "../utils/performanceSettings";

import {
    Environment,
} from "@react-three/drei";

import {
    EffectComposer,
    Bloom,
} from "@react-three/postprocessing";

import * as THREE from "three";

import Rakhi3D from "./Rakhi3D";
import ParticleBackground from "./ParticleBackground";
import { config } from "../config";

function EnvironmentScene() {
    return (
        <>
            <ambientLight
                intensity={0.35}
            />

            <pointLight
                position={[
                    -4,
                    3,
                    4,
                ]}
                intensity={12}
                distance={12}
                color="#e7b65d"
            />

            <pointLight
                position={[
                    4,
                    -2,
                    3,
                ]}
                intensity={8}
                distance={10}
                color="#a9475a"
            />

            <ParticleBackground
                count={
                    performanceSettings.particles
                }
            />

            <Environment
                preset="night"
                environmentIntensity={0.35}
            />

            <EffectComposer>
                <Bloom
                    intensity={0.8}
                    luminanceThreshold={0.65}
                    luminanceSmoothing={0.8}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
}

function Main3DEnvironment() {
    return (
        <div className="main-3d-environment">
            <Canvas
                dpr={performanceSettings.pixelRatio}
                gl={{
                    antialias: true,
                    dpr:
                        performanceSettings.pixelRatio,
                }}
            >
                <EnvironmentScene />
            </Canvas>
        </div>
    );
}

export default Main3DEnvironment;