'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

useGLTF.preload("/EarthOutline2.glb");

export default function RotatingSphere(props) {
    const group = useRef(null);
    const { nodes, materials, animations, scene } = useGLTF("/EarthOutline2.glb");

    // Add rotation logic
    useFrame(() => {
        if (group.current) {
            group.current.rotation.y += 0.0001; // Rotate around the Y-axis
        }
    });

    return (
        <group ref={group} scale={[3, 3, 3]}> {/* Scale increased */}
            <primitive object={scene} />
        </group>
    );
}