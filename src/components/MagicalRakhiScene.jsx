import {
    useFrame,
} from "@react-three/fiber";

import {
    useGLTF,
} from "@react-three/drei";

import {
    useMemo,
    useRef,
    useState,
} from "react";

import * as THREE from "three";

/* =========================================
   TIMING
========================================= */

const TIMING = {
    threadAppear: 0.8,
    sisterMove: 2.0,
    transformation: 3.3,
    wrap: 4.8,
    knot: 6.0,
    glow: 6.8,
    explosion: 7.5,
    text: 8.2,
};

/* =========================================
   SISTER HAND
========================================= */

function SisterHandGLB({
    progress,
}) {
    const { scene } = useGLTF(
        "/models/sister-hand.glb"
    );

    const group = useRef(null);

    useFrame(() => {
        if (!group.current) return;

        const targetX =
            progress >= 2
                ? -1.15
                : -3.1;

        group.current.position.x =
            THREE.MathUtils.lerp(
                group.current.position.x,
                targetX,
                0.05
            );
    });

    return (
        <primitive
            ref={group}
            object={scene.clone()}
            scale={1.2}
        />
    );
}

function BrotherHandGLB() {
    const { scene } = useGLTF(
        "/models/brother-hand.glb"
    );

    return (
        <primitive
            object={scene.clone()}
            position={[
                1.3,
                -0.25,
                0,
            ]}
            scale={1.2}
        />
    );
}

function SisterHand({
    progress,
}) {
    const group = useRef(null);

    useFrame(() => {
        if (!group.current) return;

        const targetX = THREE.MathUtils.lerp(
            -3.2,
            -1.75,
            Math.min(progress / 2, 1)
        );

        group.current.position.x =
            THREE.MathUtils.lerp(
                group.current.position.x,
                targetX,
                0.055
            );

        group.current.position.y =
            Math.sin(progress * 1.4) *
            0.04;

        group.current.rotation.z =
            THREE.MathUtils.lerp(
                group.current.rotation.z,
                -0.08,
                0.04
            );
    });

    return (
        <group
            ref={group}
            scale={0.78}
        >
            {/* Palm */}
            <mesh scale={[0.85, 1.2, 0.5]}>
                <sphereGeometry
                    args={[0.65, 32, 32]}
                />

                <meshStandardMaterial
                    color="#b9795f"
                    roughness={0.7}
                />
            </mesh>

            {/* Index finger */}
            <mesh
                position={[
                    0.15,
                    0.95,
                    0,
                ]}
                rotation={[
                    0,
                    0,
                    -0.15,
                ]}
            >
                <capsuleGeometry
                    args={[
                        0.14,
                        0.75,
                        8,
                        16,
                    ]}
                />

                <meshStandardMaterial
                    color="#bd8066"
                    roughness={0.68}
                />
            </mesh>

            {/* Thumb */}
            <mesh
                position={[
                    0.52,
                    0.25,
                    0,
                ]}
                rotation={[
                    0,
                    0,
                    -0.8,
                ]}
            >
                <capsuleGeometry
                    args={[
                        0.14,
                        0.55,
                        8,
                        16,
                    ]}
                />

                <meshStandardMaterial
                    color="#bd8066"
                    roughness={0.68}
                />
            </mesh>

            {/* Bangles */}
            {[-0.8, -0.92, -1.04].map(
                (y, index) => (
                    <mesh
                        key={index}
                        position={[
                            0,
                            y,
                            0,
                        ]}
                        rotation={[
                            Math.PI / 2,
                            0,
                            0,
                        ]}
                    >
                        <torusGeometry
                            args={[
                                0.45,
                                0.035,
                                12,
                                40,
                            ]}
                        />

                        <meshStandardMaterial
                            color="#d59a32"
                            metalness={0.9}
                            roughness={0.2}
                        />
                    </mesh>
                )
            )}
        </group>
    );
}

/* =========================================
   BROTHER WRIST
========================================= */

function BrotherWrist() {
    return (
        <group
            position={[
                1.75,
                -0.95,
                0.42,
            ]}
            rotation={[
                0,
                0,
                -0.12,
            ]}
            scale={0.72}
        >
            {/* Forearm */}
            <mesh
                scale={[
                    1.0,
                    2.2,
                    0.58,
                ]}
            >
                <capsuleGeometry
                    args={[
                        0.5,
                        1,
                        12,
                        24,
                    ]}
                />

                <meshStandardMaterial
                    color="#a96852"
                    roughness={0.8}
                />
            </mesh>

            {/* Hand */}
            <mesh
                position={[
                    0,
                    1.35,
                    0,
                ]}
                scale={[
                    0.82,
                    1.0,
                    0.55,
                ]}
            >
                <sphereGeometry
                    args={[
                        0.65,
                        32,
                        32,
                    ]}
                />

                <meshStandardMaterial
                    color="#a96852"
                    roughness={0.8}
                />
            </mesh>
        </group>
    );
}

/* =========================================
   GOLDEN THREAD
========================================= */

function GoldenThread({
    progress,
    transformed,
}) {
    const ref =
        useRef(null);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(
                    -2.2,
                    0.45,
                    0.25
                ),

                new THREE.Vector3(
                    -1.4,
                    0.95,
                    0.2
                ),

                new THREE.Vector3(
                    -0.4,
                    0.15,
                    0.15
                ),

                new THREE.Vector3(
                    0.7,
                    -0.15,
                    0.15
                ),

                new THREE.Vector3(
                    1.75,
                    -0.95,
                    0.15
                ),
            ]
        );
    }, []);

    const points = curve.getPoints(120);

    const geometry =
        useMemo(() => {
            return new THREE.BufferGeometry().setFromPoints(
                points
            );
        }, [points]);

    useFrame((state) => {
        if (!ref.current) return;

        const time =
            state.clock.elapsedTime;

        ref.current.material.opacity =
            0.75 +
            Math.sin(time * 4) *
            0.2;

        if (transformed) {
            ref.current.scale.setScalar(
                1 +
                Math.sin(time * 5) *
                0.05
            );
        }
    });

    if (progress < 0.6) {
        return null;
    }

    return (
        <line
            ref={ref}
            geometry={geometry}
        >
            <lineBasicMaterial
                color="#ffd76a"
                transparent
                opacity={0.95}
                linewidth={3}
            />
        </line>
    );
}

/* =========================================
   RAKHI
========================================= */

function Rakhi({
    progress,
}) {
    const group =
        useRef(null);

    const visible =
        progress >=
        TIMING.transformation;

    useFrame((state) => {
        if (!group.current) return;

        const time =
            state.clock.elapsedTime;

        group.current.rotation.z =
            -0.15 +
            Math.sin(time * 1.4) *
            0.25;

        if (
            progress >=
            TIMING.glow
        ) {
            group.current.scale.setScalar(
                1 +
                Math.sin(time * 4) *
                0.08
            );
        }
    });

    if (!visible) {
        return null;
    }

    const wrapProgress =
        THREE.MathUtils.clamp(
            (progress -
                TIMING.transformation) /
            (TIMING.wrap -
                TIMING.transformation),
            0,
            1
        );

    return (
        <group
            ref={group}
            position={[
                1.25,
                -0.95,
                0.48,
            ]}
        >
            {/* Wrapping thread */}
            <mesh
                rotation={[
                    Math.PI / 20,
                    0,
                    0,
                ]}
                scale={[
                    0.9 +
                    wrapProgress *
                    0.2,
                    1,
                    1,
                ]}
            >
                <torusGeometry
                    args={[
                        0.65,
                        0.035,
                        16,
                        64,
                    ]}
                />

                <meshStandardMaterial
                    color="#e5a52f"
                    emissive="#efc777"
                    emissiveIntensity={
                        progress >= TIMING.glow
                            ? 1
                            : 0.25
                    }
                    metalness={0.9}
                    roughness={0.18}
                />
            </mesh>

            {/* Rakhi center */}
            <mesh
                rotation={[
                    Math.PI / 40,
                    250,
                    250,
                ]}
                position={[
                    0,
                    0,
                    0.25,
                ]}
            >
                <cylinderGeometry
                    args={[
                        0.36,
                        0.36,
                        0.13,
                        32,
                    ]}
                />

                <meshStandardMaterial
                    color="#d79a27"
                    metalness={0.95}
                    roughness={0.15}
                    emissive="#9d5615"
                    emissiveIntensity={
                        progress >= TIMING.glow
                            ? 0.7
                            : 0.1
                    }
                />
            </mesh>

            {/* Center stone */}
            <mesh
                position={[
                    0,
                    0,
                    0.45,
                ]}
            >
                <sphereGeometry
                    args={[
                        0.12,
                        24,
                        24,
                    ]}
                />

                <meshStandardMaterial
                    color="#9b2938"
                    metalness={0.65}
                    roughness={0.15}
                    emissive="#ff304d"
                    emissiveIntensity={
                        progress >= TIMING.glow
                            ? 0.8
                            : 0.2
                    }
                />
            </mesh>

            {/* Decorative gems */}
            {[
                [0.45, 0, 0.14],
                [-0.45, 0, 0.14],
                [0, 0.45, 0.14],
                [0, -0.45, 0.14],
            ].map(
                (position, index) => (
                    <mesh
                        key={index}
                        position={position}
                    >
                        <sphereGeometry
                            args={[
                                0.055,
                                16,
                                16,
                            ]}
                        />

                        <meshStandardMaterial
                            color="#efc777"
                            metalness={0.9}
                            roughness={0.12}
                        />
                    </mesh>
                )
            )}

            {/* Knot */}
            {progress >= TIMING.knot && (
                <group>
                    <mesh
                        position={[
                            -0.48,
                            0,
                            0,
                        ]}
                        rotation={[
                            0,
                            0,
                            0.35,
                        ]}
                    >
                        <capsuleGeometry
                            args={[
                                0.035,
                                0.42,
                                8,
                                16,
                            ]}
                        />

                        <meshStandardMaterial
                            color="#9e2837"
                            roughness={0.5}
                        />
                    </mesh>

                    <mesh
                        position={[
                            0.55,
                            0,
                            0,
                        ]}
                        rotation={[
                            0,
                            0,
                            -0.35,
                        ]}
                    >
                        <capsuleGeometry
                            args={[
                                0.035,
                                0.42,
                                8,
                                16,
                            ]}
                        />

                        <meshStandardMaterial
                            color="#9e2837"
                            roughness={0.5}
                        />
                    </mesh>
                </group>
            )}
        </group>
    );
}

/* =========================================
   PARTICLE EXPLOSION 
========================================= */

function ExplosionParticles({
    progress,
}) {
    const ref =
        useRef(null);

    const count = 900;

    const positions =
        useMemo(() => {
            const array =
                new Float32Array(
                    count * 3
                );

            for (
                let i = 0;
                i < count;
                i++
            ) {
                const i3 = i * 3;

                const theta =
                    Math.random() *
                    Math.PI *
                    2;

                const phi =
                    Math.acos(
                        2 *
                        Math.random() -
                        1
                    );

                const radius =
                    0.3 +
                    Math.random() *
                    2.8;

                array[i3] =
                    Math.sin(phi) *
                    Math.cos(theta) *
                    radius;

                array[i3 + 1] =
                    Math.sin(phi) *
                    Math.sin(theta) *
                    radius;

                array[i3 + 2] =
                    Math.cos(phi) *
                    radius;
            }

            return array;
        }, []);

    useFrame((state) => {
        if (!ref.current) return;

        const explosion =
            THREE.MathUtils.clamp(
                (progress -
                    TIMING.explosion) /
                1.5,
                0,
                1
            );

        ref.current.rotation.y =
            state.clock.elapsedTime *
            0.25;

        ref.current.scale.setScalar(
            explosion
        );

        ref.current.material.opacity =
            explosion *
            0.85;
    });

    if (
        progress <
        TIMING.explosion
    ) {
        return null;
    }

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#efc777"
                size={0.032}
                transparent
                opacity={1}
                depthWrite={false}
                depthTest={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* =========================================
   PARTICLE TEXT
========================================= */

function ParticleText({
    progress,
}) {
    const ref =
        useRef(null);

    const points =
        useMemo(() => {
            const canvas =
                document.createElement(
                    "canvas"
                );

            canvas.width = 900;
            canvas.height = 220;

            const ctx =
                canvas.getContext(
                    "2d"
                );

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.fillStyle = "white";

            ctx.font =
                "bold 68px serif";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.fillText(
                "Happy Raksha Bandhan ❤️",
                450,
                90
            );

            ctx.font =
                "bold 72px serif";

            ctx.fillText(
                "♥",
                450,
                165
            );

            const imageData =
                ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

            const result = [];

            for (
                let y = 0;
                y < canvas.height;
                y += 5
            ) {
                for (
                    let x = 0;
                    x < canvas.width;
                    x += 5
                ) {
                    const index =
                        (y *
                            canvas.width +
                            x) *
                        4;

                    if (
                        imageData.data[
                        index + 3
                        ] > 100
                    ) {
                        result.push([
                            (x - 450) /
                            110,

                            -(y - 110) /
                            110,

                            0,
                        ]);
                    }
                }
            }

            return new Float32Array(
                result.flat()
            );
        }, []);

    const visible =
        progress >=
        TIMING.text;

    useFrame((state) => {
        if (!ref.current) return;

        const opacity =
            THREE.MathUtils.clamp(
                (progress -
                    TIMING.text) /
                1.5,
                0,
                1
            );

        ref.current.material.opacity =
            opacity;

        ref.current.rotation.z =
            Math.sin(
                state.clock.elapsedTime
            ) *
            0.01;
    });

    if (!visible) {
        return null;
    }

    return (
        <points
            ref={ref}
            position={[
                0,
                -2.05,
                1.5,
            ]}
            scale={0.62}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={
                        points.length / 3
                    }
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#efc777"
                size={0.055}
                transparent
                depthWrite={false}
                blending={
                    THREE.AdditiveBlending
                }
            />
        </points>
    );
}

/* =========================================
   MAIN SCENE
========================================= */

function MagicalRakhiScene({
    active,
    onComplete,
}) {
    const startTime =
        useRef(null);

    const [
        progress,
        setProgress,
    ] = useState(0);

    const completedRef =
        useRef(false);

    useFrame((state) => {
        if (!active) {
            startTime.current = null;
            setProgress(0);
            return;
        }

        if (!startTime.current) {
            startTime.current =
                state.clock.elapsedTime;
        }

        const elapsed =
            state.clock.elapsedTime -
            startTime.current;

        setProgress(elapsed);

        if (
            elapsed >= 9 &&
            !completedRef.current
        ) {
            completedRef.current = true;

            onComplete?.();
        }
    });

    return (
        <group>
            <SisterHandGLB
                progress={progress}
            />

            <BrotherHandGLB />

            <GoldenThread
                progress={progress}
                transformed={
                    progress >=
                    TIMING.transformation
                }
            />

            <Rakhi
                progress={progress}
            />

            <ExplosionParticles
                progress={progress}
            />

            <ParticleText
                progress={progress}
            />
        </group>
    );
}

export default MagicalRakhiScene;