import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import GalleryGrid from "@/components/admin/GalleryGrid";

export const dynamic = "force-dynamic";

export default function AdminGalleryPage() {
  return (
    <AdminLayoutWrapper title="Media Gallery Management">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-slate-455 dark:text-zinc-400 text-sm">
            Upload event and school-campus photos, select category albums, and provide short descriptions. These photos populate the dynamic slide tour on the public website.
          </p>
        </div>
        
        {/* Render interactive grid */}
        <GalleryGrid />
      </div>
    </AdminLayoutWrapper>
  );
}
