export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="dashboard-layout">
      {/* Shared sidebar that changes based on role */}
      <main>
        {children} {/* This is the actual page content */}
      </main>
    </div>
  );
}
