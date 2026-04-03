"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Props {
	url: string;
	extension: string;
}

interface ModelProps {
	url: string;
}

function STLModel({ url }: ModelProps) {
	const geometry = useLoader(STLLoader, url);
	return (
		<mesh geometry={geometry}>
			<meshStandardMaterial color="#d1d5db" metalness={0.3} roughness={0.6} />
		</mesh>
	);
}

function PLYModel({ url }: ModelProps) {
	const geometry = useLoader(PLYLoader, url);
	return (
		<mesh geometry={geometry}>
			<meshStandardMaterial color="#d1d5db" metalness={0.3} roughness={0.6} />
		</mesh>
	);
}

function OBJModel({ url }: ModelProps) {
	const obj = useLoader(OBJLoader, url);
	return <primitive object={obj} />;
}

function GLTFModel({ url }: ModelProps) {
	const gltf = useLoader(GLTFLoader, url);
	return <primitive object={gltf.scene} />;
}

function Model({ url, extension }: { url: string; extension: string }) {
	const ext = extension.toLowerCase();

	if (ext === "stl") return <STLModel url={url} />;
	if (ext === "ply") return <PLYModel url={url} />;
	if (ext === "obj") return <OBJModel url={url} />;
	if (ext === "gltf" || ext === "glb") return <GLTFModel url={url} />;

	return null;
}
export function ScannerFilesViewer({ url, extension }: Props) {
	return (
		<div className="w-full h-full">
			<Canvas camera={{ position: [0, 0, 120], fov: 45 }}>
				<ambientLight intensity={0.6} />
				<directionalLight position={[10, 10, 10]} />

				<Model url={url} extension={extension} />

				<OrbitControls enablePan enableZoom enableRotate />
			</Canvas>
		</div>
	);
}
