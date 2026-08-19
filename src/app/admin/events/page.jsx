import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import EventTable from "@/components/admin/EventTable";

export const dynamic = "force-dynamic";

export default function AdminEventsPage() {
  return (
    <AdminLayoutWrapper title="Holistic Development Programs">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-slate-455 dark:text-zinc-400 text-sm">
            Publish and manage holistic development activities, clubs, sports meets, exhibitions, and school celebrations.
          </p>
        </div>
        
        {/* Render interactive table */}
        <EventTable />
      </div>
    </AdminLayoutWrapper>
  );
}
