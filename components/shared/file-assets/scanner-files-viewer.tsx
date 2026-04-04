"use client";

import React, { Component, ErrorInfo, ReactNode, Suspense, useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Center, Environment, ContactShadows, GizmoHelper, GizmoViewport, Html } from "@react-three/drei";
import { ZoomIn, ZoomOut, RotateCcw, Hand, Rotate3d, AlertTriangle, Download, RefreshCcw, Loader2 } from "lucide-react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
	url: string;
	extension: string;
}

interface ModelProps {
	url: string;
}

// --- 1. REACT ERROR BOUNDARY ---
class ModelErrorBoundary extends Component<{ children: ReactNode; url: string }, { hasError: boolean; errorMsg: string }> {
	constructor(props: { children: ReactNode; url: string }) {
		super(props);
		this.state = { hasError: false, errorMsg: "" };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, errorMsg: error.message };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("3D Model Rendering Error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090B] text-center p-8 z-50">
					<div className="w-20 h-20 rounded-3xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
						<AlertTriangle className="w-10 h-10" />
					</div>
					<h3 className="text-2xl font-bold text-white mb-2">Render Engine Failed</h3>
					<p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-md">
						We could not parse this 3D mesh. The file might be corrupted, or your browser is blocking the binary download.
					</p>
					<div className="flex flex-col sm:flex-row items-center gap-4">
						<Button className="rounded-xl h-12 px-6 bg-primary text-white shadow-premium font-bold hover:bg-primary/90" asChild>
							<a href={this.props.url} download target="_blank" rel="noreferrer">
								<Download className="w-4 h-4 mr-2" /> Download Original File
							</a>
						</Button>
						<Button variant="outline" onClick={() => this.setState({ hasError: false })} className="rounded-xl h-12 px-6 border-white/10 bg-white/5 text-white hover:bg-white/10">
							<RefreshCcw className="w-4 h-4 mr-2" /> Retry
						</Button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

// --- 2. PREMIUM CLINICAL MATERIAL ---
const DentalMaterial = new THREE.MeshStandardMaterial({
	color: "#F8F9FA",
	roughness: 0.3,
	metalness: 0.05,
	side: THREE.DoubleSide,
});

// --- 3. LOADERS ---
function STLModel({ url }: ModelProps) {
	const geometry = useLoader(STLLoader, url);
	return <mesh geometry={geometry} material={DentalMaterial} />;
}

function PLYModel({ url }: ModelProps) {
	const geometry = useLoader(PLYLoader, url);
	return <mesh geometry={geometry} material={DentalMaterial} />;
}

function OBJModel({ url }: ModelProps) {
	const obj = useLoader(OBJLoader, url);
	obj.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.material = DentalMaterial;
		}
	});
	return <primitive object={obj} />;
}

function GLTFModel({ url }: ModelProps) {
	const gltf = useLoader(GLTFLoader, url);
	return <primitive object={gltf.scene} />;
}

function Model({ url, extension }: Props) {
	const ext = extension.toLowerCase();
	if (ext === "stl") return <STLModel url={url} />;
	if (ext === "ply") return <PLYModel url={url} />;
	if (ext === "obj") return <OBJModel url={url} />;
	if (ext === "gltf" || ext === "glb") return <GLTFModel url={url} />;
	throw new Error(`Unsupported 3D format: .${ext}`);
}

// --- 4. LOADING STATE ---
function LoadingMesh() {
	// Ref to animate the wireframe box
	const meshRef = useRef<THREE.Mesh>(null);

	// Add a smooth, continuous rotation to the wireframe box
	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.x += 0.01;
			meshRef.current.rotation.y += 0.02;
		}
	});

	return (
		<group>
			{/* The spinning wireframe cube */}
			<mesh ref={meshRef}>
				<boxGeometry args={[15, 15, 15]} />
				<meshStandardMaterial color="#3B82F6" wireframe transparent opacity={0.3} />
			</mesh>

			{/* Floating HTML UI directly inside the 3D Canvas */}
			<Html center zIndexRange={[100, 0]}>
				<div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl w-64 animate-in zoom-in-95 duration-300">
					<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
						<Loader2 className="w-6 h-6 animate-spin" />
					</div>
					<h3 className="text-sm font-bold text-white tracking-tight mb-1">Parsing CAD Data</h3>
					<p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest text-center">Rendering Mesh...</p>
				</div>
			</Html>
		</group>
	);
}

// --- 5. UI OVERLAY ---
type InteractionMode = "rotate" | "pan";

interface OverlayControlsProps {
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
	mode: InteractionMode;
	onModeChange: (mode: InteractionMode) => void;
}

function OverlayControls({ onZoomIn, onZoomOut, onReset, mode, onModeChange }: OverlayControlsProps) {
	return (
		<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl z-10 animate-in slide-in-from-bottom-4 duration-500">
			<div className="flex items-center gap-1 pr-3 border-r border-white/10 mr-1.5">
				<button
					title="Rotate Tool (Left Click/One Finger)"
					onClick={() => onModeChange("rotate")}
					className={cn(
						"w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
						mode === "rotate" ? "bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-zinc-400 hover:text-white hover:bg-white/10",
					)}
				>
					<Rotate3d className="w-5 h-5" />
				</button>
				<button
					title="Pan Tool (Left Click/One Finger)"
					onClick={() => onModeChange("pan")}
					className={cn(
						"w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
						mode === "pan" ? "bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-zinc-400 hover:text-white hover:bg-white/10",
					)}
				>
					<Hand className="w-5 h-5" />
				</button>
			</div>
			<button title="Zoom In" onClick={onZoomIn} className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
				<ZoomIn className="w-5 h-5" />
			</button>
			<button title="Zoom Out" onClick={onZoomOut} className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
				<ZoomOut className="w-5 h-5" />
			</button>
			<div className="w-px h-6 bg-white/10 mx-1.5" />
			<button
				title="Reset Camera View"
				onClick={onReset}
				className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-destructive/80 transition-colors group"
			>
				<RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-300" />
			</button>
		</div>
	);
}

// --- 6. MAIN VIEWER COMPONENT ---
export function ScannerFilesViewer({ url, extension }: Props) {
	const orbitRef = useRef<OrbitControlsImpl>(null);
	const [mode, setMode] = useState<InteractionMode>("rotate");

	const handleZoomIn = useCallback(() => {
		const controls = orbitRef.current;
		if (!controls || !controls.object) return;
		const camera = controls.object as THREE.PerspectiveCamera;
		camera.position.multiplyScalar(0.7);
		controls.update();
	}, []);

	const handleZoomOut = useCallback(() => {
		const controls = orbitRef.current;
		if (!controls || !controls.object) return;
		const camera = controls.object as THREE.PerspectiveCamera;
		camera.position.multiplyScalar(1.3);
		controls.update();
	}, []);

	const handleReset = useCallback(() => {
		const controls = orbitRef.current;
		if (!controls) return;
		controls.reset();
	}, []);

	return (
		<div className="relative w-full h-full bg-linear-to-b from-[#1a1a1a] to-[#09090B]">
			<ModelErrorBoundary url={url}>
				<Canvas camera={{ position: [0, 0, 100], fov: 35, near: 0.1, far: 5000 }} gl={{ antialias: true, preserveDrawingBuffer: true }}>
					<ambientLight intensity={0.4} />
					<directionalLight position={[20, 20, 20]} intensity={1.5} castShadow />
					<directionalLight position={[-20, -20, -10]} intensity={0.5} />

					<Environment preset="city" />

					{/* --- THE NEW CAD VIEW CUBE --- */}
					{/* alignment sets it to top-right, margin pushes it away from the absolute edges */}
					<GizmoHelper alignment="top-right" margin={[60, 60]}>
						<GizmoViewport
							axisColors={["#EF4444", "#10B981", "#3B82F6"]} // Red(X), Green(Y), Blue(Z)
							labelColor="#FFFFFF"
							hideNegativeAxes // Keeps the UI clean and professional
						/>
					</GizmoHelper>

					<Suspense fallback={<LoadingMesh />}>
						<Center scale={1.5}>
							<Model url={url} extension={extension} />
						</Center>
						<ContactShadows resolution={1024} scale={50} blur={2} opacity={0.4} far={10} color="#000000" position={[0, -15, 0]} />
					</Suspense>

					<OrbitControls
						ref={orbitRef}
						makeDefault
						mouseButtons={
							mode === "rotate"
								? { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
								: { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE }
						}
						touches={mode === "rotate" ? { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN } : { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN }}
						enableZoom={true}
						minDistance={1}
						maxDistance={2000}
						enableDamping
						dampingFactor={0.05}
					/>
				</Canvas>
			</ModelErrorBoundary>

			<OverlayControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} mode={mode} onModeChange={setMode} />

			<div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 pointer-events-none hidden sm:block">
				<p className="text-[11px] font-bold text-zinc-300 tracking-wider uppercase flex items-center gap-2">
					<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
					3D CAD Engine Active
				</p>
			</div>
		</div>
	);
}
