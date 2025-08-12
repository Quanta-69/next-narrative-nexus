// src/components/admin/AddBookForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";

interface BookFormData {
  title: string;
  description: string;
  cover_image_url: string;
  author_id: string;
  category_id: string;
  trope: string;
  status:
    | "DRAFT"
    | "PENDING_REVIEW"
    | "PUBLISHED"
    | "ARCHIVED"
    | "LIMITED_EDITION";
}

export default function AddBookForm() {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    description: "",
    cover_image_url: "",
    author_id: "",
    category_id: "",
    trope: "",
    status: "DRAFT",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("/api/admin/books", formData);
      setSuccess(true);
      // Reset form
      setFormData({
        title: "",
        description: "",
        cover_image_url: "",
        author_id: "",
        category_id: "",
        trope: "",
        status: "DRAFT",
      });
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Book created successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cover_image_url">
            Cover Image URL
          </label>
          <input
            type="text"
            id="cover_image_url"
            name="cover_image_url"
            value={formData.cover_image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="author_id">
            Author ID *
          </label>
          <input
            type="text"
            id="author_id"
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category_id">
            Category ID
          </label>
          <input
            type="text"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="trope">
            Trope
          </label>
          <input
            type="text"
            id="trope"
            name="trope"
            value={formData.trope}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="DRAFT">Draft</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
            <option value="LIMITED_EDITION">Limited Edition</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-secondary)] transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
}
