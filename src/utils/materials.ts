export type MaterialConfig = {
  color: string;
  metalness: number;
  roughness: number;
  map?: string;          // diffuse/color texture
  roughnessMap?: string; // roughness variation
  normalMap?: string;    // surface grain depth
};

// --- Glass materials (new) ---
export type GlassMaterialConfig = {
  color: string;
  transmission: number;  // 1 = fully see-through, 0 = opaque
  opacity: number;
  roughness: number;
  metalness: number;
  thickness: number;     // refraction depth
  ior: number;           // index of refraction (glass = ~1.5)
  transparent: true;
};

export const materialConfigs: Record<string, MaterialConfig> = {
  "Stainless Steel": { color: "#a8a9ad", metalness: 1,   roughness: 0.25 },
  "Brushed Aluminum": { color: "#b5b8b1", metalness: 1,  roughness: 0.4  },
  "Matte Black":      { color: "#1a1a1a", metalness: 0.2, roughness: 0.9 },
  "Metal Base":       { color: "#4f4f4f", metalness: 0.8, roughness: 0.1  },
  "Gold":             { color: "#d4af37", metalness: 1,   roughness: 0.15 },
  "Rose Gold":        { color: "#b76e79", metalness: 1,   roughness: 0.2  },
  "Gunmetal":         { color: "#2f353b", metalness: 1,   roughness: 0.35 },

   // Woods — with texture paths (put your textures in /public/textures/)
  "Walnut": {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.85,
    map:          "/textures/wood/walnut_diffuse.jpg",
    roughnessMap: "/textures/wood/walnut_roughness.jpg",
    normalMap:    "/textures/wood/walnut_normal.jpg",
  },
  "Oak": {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.8,
    map:          "/textures/wood/oak_diffuse.jpg",
    roughnessMap: "/textures/wood/oak_roughness.jpg",
    normalMap:    "/textures/wood/oak_normal.jpg",
  },
  "Ash": {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.75,
    map:          "/textures/wood/ash_diffuse.jpg",
    roughnessMap: "/textures/wood/ash_roughness.jpg",
    normalMap:    "/textures/wood/ash_normal.jpg",
  },
  "Mahogany": {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.8,
    map:          "/textures/wood/mahogany_diffuse.jpg",
    roughnessMap: "/textures/wood/mahogany_roughness.jpg",
    normalMap:    "/textures/wood/mahogany_normal.jpg",
  },
  "Pine": {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.7,
    map:          "/textures/wood/pine_diffuse.jpg",
    roughnessMap: "/textures/wood/pine_roughness.jpg",
    normalMap:    "/textures/wood/pine_normal.jpg",
  },
  "Ebony": {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.65,
    map:          "/textures/wood/ebony_diffuse.jpg",
    roughnessMap: "/textures/wood/ebony_roughness.jpg",
    normalMap:    "/textures/wood/ebony_normal.jpg",
  },
};

export const glassMaterialConfigs: Record<string, GlassMaterialConfig> = {
  "Clear": {
    color: "#ffffff",
    transmission: 1,
    opacity: 1,
    roughness: 0,
    metalness: 0,
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
  },
  "Frosted": {
    color: "#e8edf0",
    transmission: 0.85,
    opacity: 0.9,
    roughness: 0.5,
    metalness: 0,
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
  },
  "Smoked": {
    color: "#2a2a2a",
    transmission: 0.6,
    opacity: 0.75,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
  },
  "Bronze Tint": {
    color: "#8b6914",
    transmission: 0.7,
    opacity: 0.8,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
  },
  "Black": {
    color: "#0a0a0a",
    transmission: 0.3,
    opacity: 0.85,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
  },
  "Ultra Clear": {
    color: "#f0f8ff",
    transmission: 1,
    opacity: 1,
    roughness: 0,
    metalness: 0,
    thickness: 0.3,
    ior: 1.45,
    transparent: true,
  },
};