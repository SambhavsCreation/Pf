"use client"
import {Canvas, useThree} from "@react-three/fiber";
import {Suspense} from "react";
import RotatingSphere from "@/components/RotatingSphere";

export default function Scene() {
    return (
        <Canvas>
            <directionalLight position={[0, 8, 0]} intensite={4} />
            <Suspense fallback={null}>
                <RotatingSphere></RotatingSphere>
            </Suspense>
        </Canvas>
    )
}