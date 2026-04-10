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

export type LayoutGalleryItem = {
  src: string;
  title: string;
};

export type LayoutGalleryGroup = {
  id: string;
  title: string;
  items: LayoutGalleryItem[];
};

export const layoutReferenceMaps: LayoutGalleryItem[] = [
  { src: "/images/sunmap.jpg", title: "Sun Map" },
  { src: "/images/layouts/sitemap.png", title: "Site Map" },
];

// Keep this grouped structure as the source of truth for layouts.
export const layoutGalleryGroups: LayoutGalleryGroup[] = [
  {
    id: "2bhk-l1-r1",
    title: "2BHK L1 - R1",
    items: [
      { src: "/images/layouts/2bhks/2bhk_L1.jpg", title: "2BHK L1" },
      { src: "/images/layouts/2bhks/2BHK_R1.jpg", title: "2BHK R1" },
      { src: "/images/layouts/2bhks/floorplan_2bhk_L.jpg", title: "2BHK L1 Floor Plan" },
      { src: "/images/layouts/2bhks/floorplan_2bhk_R.jpg", title: "2BHK R1 Floor Plan" },
    ],
  },
  {
    id: "3bhk-l3-r3",
    title: "3BHK L3 - R3",
    items: [
      { src: "/images/layouts/3bhk/3BHK_l3.jpg", title: "3BHK L3" },
      { src: "/images/layouts/3bhk/3bhk_R3.jpg", title: "3BHK R3" },
      { src: "/images/layouts/3bhk/floorplan_3bhk_L_vertical.jpg", title: "3BHK L3 Floor Plan" },
    ],
  },
  {
    id: "3bhkplus-l2-r2",
    title: "3BHK+ L2 - R2",
    items: [
      { src: "/images/layouts/3bhkplus/3bhk_L2.jpg", title: "3BHK+ L2" },
      { src: "/images/layouts/3bhkplus/3bhk_R2.jpg", title: "3BHK+ R2" },
      { src: "/images/layouts/3bhkplus/floorplan_3bhk_L_horizontal.jpg", title: "3BHK+ L2 Floor Plan" },
      { src: "/images/layouts/3bhkplus/floorplan_3bhk_R.jpg", title: "3BHK+ R2 Floor Plan" },
    ],
  },
];

export const layoutGallerySections: LayoutGalleryGroup[] = [
  ...layoutGalleryGroups,
  {
    id: "maps",
    title: "Sun & Site Maps",
    items: layoutReferenceMaps,
  },
];

export const layoutGalleryItems: LayoutGalleryItem[] = layoutGallerySections.flatMap((section) => section.items);
const layoutImages = layoutGalleryItems.map((item) => item.src);

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
