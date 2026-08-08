import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayoutWrapper({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-light via-white to-accent-light/30 dark:from-zinc-950 dark:via-slate-900 dark:to-zinc-950 text-slate-800 dark:text-zinc-150 font-sans relative overflow-hidden">
      {/* Decorative blurred background shapes matching website */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Permanent Sidebar on Desktop */}
      <AdminSidebar />
      
      {/* Content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative bg-transparent">
        <AdminHeader title={title} />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
