import { useParts } from "@/components/kit/codeModel";
import * as THREE from "three";

function createLeafShape(R = 1.1, r = 0.42) {
  const shape = new THREE.Shape();
  shape.moveTo(-R, 0);
  shape.absarc(0, 0, R, Math.PI, Math.PI * 1.5, false);
  shape.lineTo(0, -r);
  shape.absarc(0, 0, r, Math.PI * 1.5, Math.PI, true);
  shape.lineTo(-R, 0);
  return shape;
}

export default function VeyroLogo3D() {
  const parts = useParts(() => {
    const leafShape = createLeafShape(1.15, 0.44);
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 6,
      curveSegments: 32,
    };

    const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    leafGeo.center();

    const pineMaterial = new THREE.MeshPhysicalMaterial({
      name: "pine",
      color: "#183126",
      metalness: 0.35,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });

    const sageMaterial = new THREE.MeshPhysicalMaterial({
      name: "sage",
      color: "#A7B9A5",
      metalness: 0.25,
      roughness: 0.25,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
    });

    const creamMaterial = new THREE.MeshPhysicalMaterial({
      name: "cream",
      color: "#F6F5F0",
      metalness: 0.15,
      roughness: 0.28,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
    });

    const coreGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.32, 32);

    return {
      leafGeo,
      coreGeo,
      pineMaterial,
      sageMaterial,
      creamMaterial,
    };
  }, []);

  return (
    <group name="veyro-logo-3d">
      <group name="part-leaves">
        {/* Top-Left Quadrant */}
        <mesh
          geometry={parts.leafGeo}
          material={parts.pineMaterial}
          rotation={[0, 0, 0]}
          position={[-0.08, 0.08, 0.05]}
        />
        {/* Top-Right Quadrant */}
        <mesh
          geometry={parts.leafGeo}
          material={parts.sageMaterial}
          rotation={[0, 0, -Math.PI / 2]}
          position={[0.08, 0.08, -0.05]}
        />
        {/* Bottom-Right Quadrant */}
        <mesh
          geometry={parts.leafGeo}
          material={parts.pineMaterial}
          rotation={[0, 0, Math.PI]}
          position={[0.08, -0.08, 0.05]}
        />
        {/* Bottom-Left Quadrant */}
        <mesh
          geometry={parts.leafGeo}
          material={parts.sageMaterial}
          rotation={[0, 0, Math.PI / 2]}
          position={[-0.08, -0.08, -0.05]}
        />
      </group>

      <group name="part-core">
        <mesh
          geometry={parts.coreGeo}
          material={parts.creamMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}
