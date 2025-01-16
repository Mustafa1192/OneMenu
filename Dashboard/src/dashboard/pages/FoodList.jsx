import React, { useState, useEffect } from "react";

const ProductTable = () => {
  const [menus, setMenus] = useState({}); // State to store menus data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const JSON_API_ENDPOINT = "http://localhost:5000/products/menuss";

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(JSON_API_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        setMenus(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        setError("Failed to load menu data");
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const renderMenuSection = (menuName, items) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{menuName}</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="border border-gray-300 p-2">{item.title}</td>
              <td className="border border-gray-300 p-2">₹{item.price}</td>
              <td className="border border-gray-300 p-2">{item.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Product Inventory</h1>
      {Object.entries(menus).map(([menuName, items]) =>
        renderMenuSection(menuName, items)
      )}
    </div>
  );
};

export default ProductTable;
