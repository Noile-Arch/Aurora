import { useState, useEffect } from 'react';
import { MdClose, MdCloudUpload } from 'react-icons/md';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  stockQuantity: number;
  image: string;
  preparationTime: number;
  ingredients: string[];
}

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditProductModal = ({ product, isOpen, onClose, onUpdate }: EditProductModalProps) => {
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);

  const categoryOptions = {
    cakes: ['birthday', 'wedding', 'custom', 'cupcakes', 'cheesecakes'],
    pastries: ['croissants', 'danishes', 'pies', 'tarts', 'eclairs'],
    cookies: ['chocolate chip', 'sugar', 'shortbread', 'macarons', 'biscotti'],
    bread: ['sourdough', 'baguettes', 'rolls', 'whole wheat', 'rye'],
    other: ['seasonal', 'special', 'gluten-free', 'vegan']
  };

  useEffect(() => {
    if (product) {
      setFormData(product);
      setImagePreview(product.image);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auroraAuth');
      if (!token) throw new Error('No auth token found');

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'image') {
          formDataToSend.append(key, value?.toString() || '');
        }
      });

      if (newImage) {
        formDataToSend.append('image', newImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${product?._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, '')}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) throw new Error('Failed to update product');

      onUpdate();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <MdClose size={24} />
        </button>

        <h2 className="mb-4 text-xl font-bold">Edit Product</h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 bg-white">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 bg-white">
                Category
              </label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-white"
                required
              >
                <option value="">Select Category</option>
                {Object.keys(categoryOptions).map(category => (
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
                value={formData.subCategory || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-white"
                required
              >
                <option value="">Select Sub Category</option>
                {formData.category &&
                  categoryOptions[formData.category as keyof typeof categoryOptions].map(sub => (
                    <option key={sub} value={sub}>
                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
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
                value={formData.stockQuantity || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 bg-white">
                Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                )}
                <label className="flex cursor-pointer items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <MdCloudUpload className="mr-2" size={20} />
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-chocolate"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
