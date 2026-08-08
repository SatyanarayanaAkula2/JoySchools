import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import FacultyTable from "@/components/admin/FacultyTable";

export const dynamic = "force-dynamic";

export default function AdminFacultyPage() {
  return (
    <AdminLayoutWrapper title="Faculty Directory Management">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-slate-455 dark:text-zinc-400 text-sm">
            Configure, add, or delete profiles for school faculty members and teachers. These profiles are automatically displayed under the Mentors/Faculty section on the public website.
          </p>
        </div>
        
        {/* Render interactive table */}
        <FacultyTable />
      </div>
    </AdminLayoutWrapper>
  );
}
