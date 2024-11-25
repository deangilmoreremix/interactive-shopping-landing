import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3DProps {
  environment: string;
  model?: string;
  onCameraUpdate?: (position: { x: number; y: number; z: number }) => void;
}

export default function Scene3D({ environment, model, onCameraUpdate }: Scene3DProps) {
  const { camera, gl } = useThree();
  const groupRef = useRef<THREE.Group>();
  const targetRotation = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousTouch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const handleMouseDown = () => {
      isDragging.current = true;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging.current) return;

      targetRotation.current.y += event.movementX * 0.005;
      targetRotation.current.x += event.movementY * 0.005;
    };

    const handleTouchStart = (event: TouchEvent) => {
      isDragging.current = true;
      const touch = event.touches[0];
      previousTouch.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging.current) return;

      const touch = event.touches[0];
      const movementX = touch.clientX - previousTouch.current.x;
      const movementY = touch.clientY - previousTouch.current.y;

      targetRotation.current.y += movementX * 0.005;
      targetRotation.current.x += movementY * 0.005;

      previousTouch.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [camera, gl]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.1;
    }

    if (onCameraUpdate) {
      onCameraUpdate({
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      });
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Environment preset={environment as any} />
      
      <group ref={groupRef}>
        {model ? (
          <Model url={model} />
        ) : (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        )}
      </group>
    </>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}