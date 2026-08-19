import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import MilestoneTable from "@/components/admin/MilestoneTable";

export const dynamic = "force-dynamic";

export default function AdminMilestonesPage() {
  return (
    <AdminLayoutWrapper title="Milestones Management">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-slate-455 dark:text-zinc-400 text-sm">
            Configure school legacy stats, pass rates, trophies, and alumni reach displayed on the homepage.
          </p>
        </div>
        
        {/* Render interactive table */}
        <MilestoneTable />
      </div>
    </AdminLayoutWrapper>
  );
}
