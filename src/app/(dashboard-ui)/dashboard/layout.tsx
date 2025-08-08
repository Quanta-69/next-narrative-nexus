// This layout will be the one handling the styles and passing the parallel routes as props
export default function dashboardLayout({
    children,
    stats,
    revenue,
}: {
        children: React.ReactNode;
        stats: React.ReactNode;
        revenue: React.ReactNode;
    }) {
    return (
        <>
        <html lang="en">
            <body>{children}</body>
        </html>
        </>
    )
}