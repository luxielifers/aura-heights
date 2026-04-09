export const galleryCategories = ["Exterior", "Interior", "Terrace", "Layouts"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

const exteriorImages = [
  "/images/gallery/exterior/exteriorview.png",
  "/images/gallery/exterior/fullbuildingevening.jpg",
  "/images/gallery/exterior/outside.jpg",
  "/images/gallery/exterior/outsideentrance.jpg",
  "/images/gallery/exterior/outsidegarden.jpg",
  "/images/gallery/exterior/exteriorgateview.jpg",
];

const interiorImages = [
  "/images/gallery/Interior/livingarea.jpg",
  "/images/gallery/Interior/kitchen.jpg",
  "/images/gallery/Interior/hall.jpg",
  "/images/gallery/Interior/diningarea.jpg",
  "/images/gallery/Interior/bedroom1.jpg",
  "/images/gallery/Interior/balcony.jpg",
];

const layoutImages = [
  "/images/sunmap.jpg",
  "/images/layouts/sitemap.png",
  "/images/layouts/floorplan_2bhk_L.jpg",
  "/images/layouts/floorplan_2bhk_R.jpg",
  "/images/layouts/floorplan_3bhk_L_horizontal.jpg",
  "/images/layouts/floorplan_3bhk_L_vertical.jpg",
  "/images/layouts/floorplan_3bhk_R.jpg",
];

export const layoutImageTitles: string[] = [
  "Sun Map",
  "Project Sitemap",
  "2 BHK Layout - Left Wing",
  "2 BHK Layout - Right Wing",
  "3 BHK Layout - Left Wing (Horizontal)",
  "3 BHK Layout - Left Wing (Vertical)",
  "3 BHK Layout - Right Wing",
];

export const homeGalleryImages: string[] = [
  exteriorImages[1],
  exteriorImages[2],
  interiorImages[0],
  interiorImages[1],
  exteriorImages[4],
  interiorImages[2],
  exteriorImages[5],
];

export const galleryImagesByCategory: Record<GalleryCategory, string[]> = {
  Exterior: exteriorImages,
  Interior: interiorImages,
  Terrace: [exteriorImages[4], exteriorImages[5], exteriorImages[1]],
  Layouts: layoutImages,
};
