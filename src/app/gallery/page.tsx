import { Suspense } from "react";
import { GalleryContent } from "./GalleryContent";

function GalleryFallback() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center pt-32">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-bronze border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted font-josefin">Loading gallery...</p>
      </div>
    </div>
  );
}

export default function FullGallery() {
  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryContent />
    </Suspense>
  );
}
