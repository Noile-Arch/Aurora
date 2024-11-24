import { useState, ChangeEvent, FormEvent } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Layout from "./Layout";

interface PastryForm {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File | null;
  isAvailable: boolean;
  preparationTime: number;
}

const AddPastry = () => {
  const [formData, setFormData] = useState<PastryForm>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: null,
    isAvailable: true,
    preparationTime: 30,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const categories = [
    "Cakes",
    "Cookies",
    "Pastries",
    "Breads",
    "Desserts",
    "Muffins",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('preparationTime', formData.preparationTime.toString());
      formDataToSend.append('isAvailable', formData.isAvailable.toString());
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const token = localStorage.getItem("auroraAuth");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add pastry");
      }

      setSuccess("Pastry added successfully!");
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: null,
        isAvailable: true,
        preparationTime: 30,
      });
      setImagePreview("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add pastry");
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl p-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add New Pastry
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 w-48 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center">
                  <MdCloudUpload size={48} className="text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orimary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orimary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (KSH)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orimary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleInputChange}
                required
                min="1"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orimary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orimary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
            />
          </div>

          {/* Stock Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isAvailable: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-purple-500 bg-white"
            />
            <label className="ml-2 text-sm text-gray-700">Is Available</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2 text-white hover:bg-chocolate focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-chocolate"
          >
            {loading ? "Adding..." : "Add Pastry"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPastry;
