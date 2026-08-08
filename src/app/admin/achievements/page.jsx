import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import AchievementTable from "@/components/admin/AchievementTable";

export const dynamic = "force-dynamic";

export default function AdminAchievementsPage() {
  return (
    <AdminLayoutWrapper title="School Achievements & Milestones">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-slate-455 dark:text-zinc-400 text-sm">
            Record and display academic accolades, sports victories, environmental awards, and co-curricular achievements. These display on the home landing page milestones section.
          </p>
        </div>
        
        {/* Render interactive table */}
        <AchievementTable />
      </div>
    </AdminLayoutWrapper>
  );
}
