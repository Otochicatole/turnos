"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion } from "framer-motion";

export default function ThreeDModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Escena
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // Control de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false; // Deshabilitar el zoom

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Geometría de la "V" corta en 3D
    const vShape = new THREE.Shape();
    vShape.moveTo(-1, 1);
    vShape.lineTo(0, -1);
    vShape.lineTo(1, 1);
    vShape.lineTo(0.5, 1);
    vShape.lineTo(0, 0);
    vShape.lineTo(-0.5, 1);
    vShape.lineTo(-1, 1);

    const extrudeSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const geometry = new THREE.ExtrudeGeometry(vShape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const vMesh = new THREE.Mesh(geometry, material);
    vMesh.castShadow = true;
    vMesh.receiveShadow = true;
    scene.add(vMesh);

    // Centrar la "V"
    vMesh.position.set(0, 0, 0);

    // Seguir el cursor
    const onMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      vMesh.rotation.y = mouseX * 0.5; // Aumenta el factor de rotación
      vMesh.rotation.x = -mouseY * 0.5; // Aumenta el factor de rotación
    };
    window.addEventListener("mousemove", onMouseMove);

    // Ajustar tamaño del renderizador y la cámara al cambiar el tamaño del contenedor
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <>
      <motion.div
        ref={mountRef}
        className="w-full h-[50vh] md:h-[400px] overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
}
