// import React, { useState, useEffect } from "react";
// // import data from "../"

// const ProductTable = () => {
//   const [foods, setFoods] = useState([]); // State to store food data
//   const [loading, setLoading] = useState(true); // State to track loading
//   const [error, setError] = useState(null); // State to handle errors

//   const JSON_API_ENDPOINT = "http://localhost:5000/api/products/fooditems"; // Backend endpoint

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const response = await fetch(JSON_API_ENDPOINT); // Fetch data from the backend
//         if (!response.ok) {
//           throw new Error("Failed to fetch food data");
//         }
//         const data = await response.json(); // Parse the JSON response
//         setFoods(data); // Set the data
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load food data");
//         setLoading(false);
//       }
//     };
  
//     fetchFoods();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel - Product Inventory</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="border border-gray-300 p-2">Image</th>
//               <th className="border border-gray-300 p-2">Tittle</th>
//               <th className="border border-gray-300 p-2">Description</th>
//               <th className="border border-gray-300 p-2">Price</th>
//               {/* <th className="border border-gray-300 p-2">Type</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {foods.map((food, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 p-2">
//                   <img
//                     src={food.image}
//                     alt={food.name}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                 </td>
//                 <td className="border border-gray-300 p-2">{food.title}</td>
//                 <td className="border border-gray-300 p-2 text-sm text-gray-600">
//                   {food.name || "N/A"}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-lg font-semibold">
//                   ₹{food.price}
//                 </td>
//                 {/* <td className="border border-gray-300 p-2">{food.type || "N/A"}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;

// //////////////////////////////////////////////////////////For fetching all the items of all collection menus
// import React, { useState, useEffect } from "react";

// const ProductTable = () => {
//   const [menus, setMenus] = useState({}); // State to store menus data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const JSON_API_ENDPOINT = "http://localhost:5000/api/products/menus";

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const response = await fetch(JSON_API_ENDPOINT);
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu data");
//         }
//         const data = await response.json();
//         setMenus(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching menu data:", err);
//         setError("Failed to load menu data");
//         setLoading(false);
//       }
//     };

//     fetchMenus();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const renderMenuSection = (menuName, items) => (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-2">{menuName}</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 p-2">Image</th>
//             <th className="border border-gray-300 p-2">Title</th>
//             <th className="border border-gray-300 p-2">Price</th>
//             <th className="border border-gray-300 p-2">Rating</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-100">
//               <td className="border border-gray-300 p-2">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//               </td>
//               <td className="border border-gray-300 p-2">{item.title}</td>
//               <td className="border border-gray-300 p-2">₹{item.price}</td>
//               <td className="border border-gray-300 p-2">{item.rating}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel - Product Inventory</h1>
//       {Object.entries(menus).map(([menuName, items]) =>
//         renderMenuSection(menuName, items)
//       )}
//     </div>
//   );
// };

// export default ProductTable;







// ////////////////////////////////////////////////////////////With add and remove button 
// import React, { useState, useEffect } from "react";

// const ProductTable = () => {
//   const [menus, setMenus] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]); // Track selected items

//   const JSON_API_ENDPOINT = "http://localhost:5000/api/products/menus";

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const response = await fetch(JSON_API_ENDPOINT);
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu data");
//         }
//         const data = await response.json();
//         setMenus(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching menu data:", err);
//         setError("Failed to load menu data");
//         setLoading(false);
//       }
//     };

//     fetchMenus();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Handle add/remove actions
//   const handleAddItem = (item) => {
//     setSelectedItems((prev) => [...prev, item]);
//   };

//   const handleRemoveItem = (itemId) => {
//     setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
//   };

//   const saveChanges = () => {
//     // Send selected items to backend or save in local storage
//     console.log("Saved items:", selectedItems);
//   };

//   const renderMenuSection = (menuName, items) => (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-2">{menuName}</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 p-2">Image</th>
//             <th className="border border-gray-300 p-2">Title</th>
//             <th className="border border-gray-300 p-2">Price</th>
//             <th className="border border-gray-300 p-2">Rating</th>
//             <th className="border border-gray-300 p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-100">
//               <td className="border border-gray-300 p-2">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//               </td>
//               <td className="border border-gray-300 p-2">{item.title}</td>
//               <td className="border border-gray-300 p-2">₹{item.price}</td>
//               <td className="border border-gray-300 p-2">{item.rating}</td>
//               <td className="border border-gray-300 p-2">
//                 {selectedItems.find((i) => i.id === item.id) ? (
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
//                     onClick={() => handleRemoveItem(item.id)}
//                   >
//                     ❎ Remove
//                   </button>
//                 ) : (
//                   <button
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
//                     onClick={() => handleAddItem(item)}
//                   >
//                     ✅ Add
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel - Product Inventory</h1>
//       {Object.entries(menus).map(([menuName, items]) =>
//         renderMenuSection(menuName, items)
//       )}
//       <button
//         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         onClick={saveChanges}
//       >
//         Save Changes
//       </button>
//     </div>
//   );
// };

// export default ProductTable;


import React, { useState, useEffect } from "react";

const ProductTable = () => {
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const JSON_API_ENDPOINT = "http://localhost:5000/api/products/menus";
  const SAVE_API_ENDPOINT = "http://localhost:5000/api/products/selected-items";

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

  const handleAddItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(SAVE_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedItems }),
      });

      if (response.ok) {
        console.log("Saved items successfully");
        alert("Selected items saved successfully!");
      } else {
        console.error("Error saving items");
        alert("Failed to save items!");
      }
    } catch (err) {
      console.error("Error saving items:", err);
      alert("Failed to save items!");
    }
  };

  const renderMenuSection = (menuName, items) => (
    <div className="mb-8" key={menuName}>
      <h2 className="text-xl font-semibold mb-2">{menuName}</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Rating</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
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
              <td className="border border-gray-300 p-2">
                {selectedItems.find((i) => i.id === item.id) ? (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ❎ Remove
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={() => handleAddItem(item)}
                  >
                    ✅ Add
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Product Inventory</h1>
      {Object.entries(menus).map(([menuName, items]) =>
        renderMenuSection(menuName, items)
      )}
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={saveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProductTable;
