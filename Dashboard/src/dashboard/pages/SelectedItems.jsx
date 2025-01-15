import React, { useState, useEffect } from "react";

const ListedItems = () => {
  const [listedItems, setListedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FETCH_LISTED_ITEMS_ENDPOINT = "http://localhost:5000/api/products/selected-menus";

  useEffect(() => {
    const fetchListedItems = async () => {
      try {
        const response = await fetch(FETCH_LISTED_ITEMS_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch listed items data");
        }
        const data = await response.json();
        setListedItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching listed items:", err);
        setError("Failed to load listed items data");
        setLoading(false);
      }
    };

    fetchListedItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listed Items</h1>
      {listedItems.length > 0 ? (
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
            {listedItems.map((item, index) => (
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
      ) : (
        <p>No items have been listed yet.</p>
      )}
    </div>
  );
};

export default ListedItems;
