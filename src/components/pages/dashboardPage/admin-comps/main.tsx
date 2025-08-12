// src/app/admin/add-book/page.tsx
import AddBookForm from "./AddBookForm";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <AddBookForm />
      </div>
    </div>
  );
}
