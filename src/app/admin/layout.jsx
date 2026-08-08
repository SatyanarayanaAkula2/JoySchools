export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout min-h-screen bg-gray-50 dark:bg-zinc-900 text-foreground">
      {children}
    </div>
  );
}
