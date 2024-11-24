import { useState, ChangeEvent, FormEvent } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Layout from "./Layout";

interface PastryForm {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  image: File | null;
  stockQuantity: number;
  preparationTime: number;
  ingredients: string[];
}

const AddPastry = () => {
  const [formData, setFormData] = useState<PastryForm>({
    name: "",
    description: "",
    price: 0,
    category: "",
    subCategory: "",
    image: null,
    stockQuantity: 0,
    preparationTime: 30,
    ingredients: [],
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Categories with their subcategories
  const categoryOptions = {
    cakes: ['birthday', 'wedding', 'custom', 'cupcakes', 'cheesecakes'],
    pastries: ['croissants', 'danishes', 'pies', 'tarts', 'eclairs'],
    cookies: ['chocolate chip', 'sugar', 'shortbread', 'macarons', 'biscotti'],
    bread: ['sourdough', 'baguettes', 'rolls', 'whole wheat', 'rye'],
    other: ['seasonal', 'special', 'gluten-free', 'vegan']
  };

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

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
      subCategory: '', // Reset subcategory when category changes
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate required fields
    if (!formData.name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (!formData.image) {
      setError("Image is required");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Append all fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('subCategory', formData.subCategory);
      formDataToSend.append('preparationTime', formData.preparationTime.toString());
      formDataToSend.append('stockQuantity', formData.stockQuantity.toString());
      
      // Handle ingredients array properly
      if (formData.ingredients.length > 0) {
        formDataToSend.append('ingredients', JSON.stringify(formData.ingredients));
      }
      
      // Append image last
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Log form data for debugging
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const token = localStorage.getItem("auroraAuth");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`,
            // Remove Content-Type header for FormData
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log('Server Response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || "Failed to add pastry");
      }

      setSuccess("Pastry added successfully!");
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        subCategory: "",
        image: null,
        stockQuantity: 0,
        preparationTime: 30,
        ingredients: [],
      });
      setImagePreview("");
    } catch (err) {
      console.error("Error details:", err);
      setError(err instanceof Error ? err.message : "Failed to add pastry");
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
                onChange={handleCategoryChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              >
                <option value="">Select category</option>
                {Object.keys(categoryOptions).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sub Category
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                required
                disabled={!formData.category}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white disabled:bg-gray-100"
              >
                <option value="">Select sub category</option>
                {formData.category &&
                  categoryOptions[formData.category as keyof typeof categoryOptions].map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                required
                min="0"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ingredients (comma-separated)
              </label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients.join(', ')}
                onChange={(e) => 
                  setFormData(prev => ({
                    ...prev,
                    ingredients: e.target.value.split(',').map(item => item.trim())
                  }))
                }
                placeholder="flour, sugar, butter"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
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
                placeholder="Enter price"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
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
