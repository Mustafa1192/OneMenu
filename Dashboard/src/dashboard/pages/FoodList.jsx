// /////////////////////////////////////////////////////////This is working 
// import React, { useState, useEffect } from "react";

// const ProductTable = () => {
//   const [menus, setMenus] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const JSON_API_ENDPOINT = "http://localhost:5000/api/products/menus";
//   const SAVE_API_ENDPOINT = "http://localhost:5000/api/products/selected-items";

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

//   const handleAddItem = (item) => {
//     setSelectedItems((prev) => [...prev, item]);
//   };

//   const handleRemoveItem = (itemId) => {
//     setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
//   };

//   const saveChanges = async () => {
//     try {
//       const response = await fetch(SAVE_API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ selectedItems }),
//       });

//       if (response.ok) {
//         console.log("Saved items successfully");
//         alert("Selected items saved successfully!");
//       } else {
//         console.error("Error saving items");
//         alert("Failed to save items!");
//       }
//     } catch (err) {
//       console.error("Error saving items:", err);
//       alert("Failed to save items!");
//     }
//   };

//   const renderMenuSection = (menuName, items) => (
//     <div className="mb-8" key={menuName}>
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
//           {items.map((item) => (
//             <tr key={item.id} className="hover:bg-gray-100">
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

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

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

// import React, { useState, useEffect } from "react";

// const ProductTable = () => {
//   const [menus, setMenus] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [editingItem, setEditingItem] = useState(null); // Track the item being edited
//   const [editFormData, setEditFormData] = useState({});

//   const JSON_API_ENDPOINT = "http://localhost:5000/api/products/menus";
//   const SAVE_API_ENDPOINT = "http://localhost:5000/api/products/selected-items";
//   const UPDATE_API_ENDPOINT = "http://localhost:5000/api/products/update-item";

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

//   const handleAddItem = (item) => {
//     setSelectedItems((prev) => [...prev, item]);
//   };

//   const handleRemoveItem = (itemId) => {
//     setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
//   };

//   const saveChanges = async () => {
//     try {
//       const response = await fetch(SAVE_API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ selectedItems }),
//       });

//       if (response.ok) {
//         alert("Selected items saved successfully!");
//       } else {
//         alert("Failed to save items!");
//       }
//     } catch (err) {
//       console.error("Error saving items:", err);
//       alert("Failed to save items!");
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item.id);
//     setEditFormData(item);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleEditSave = async () => {
//     try {
//       const response = await fetch(UPDATE_API_ENDPOINT, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editFormData),
//       });
  
//       if (response.ok) {
//         alert("Item updated successfully!");
//         setEditingItem(null);
//         setMenus((prev) => {
//           // Use map to create a new menu object for updating
//           const updatedMenus = { ...prev };
//           Object.entries(updatedMenus).forEach(([menuName, items]) => {
//             updatedMenus[menuName] = items.map((item) =>
//               item.id === editFormData.id ? { ...item, ...editFormData } : item
//             );
//           });
//           return updatedMenus;  // Return the new object to preserve immutability
//         });
//       } else {
//         alert("Failed to update item!");
//       }
//     } catch (err) {
//       console.error("Error updating item:", err);
//       alert("Failed to update item!");
//     }
//   };

//   const renderMenuSection = (menuName, items) => (
//     <div className="mb-8" key={menuName}>
//       <h2 className="text-xl font-semibold mb-2">{menuName}</h2>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="border border-gray-300 p-2">Image</th>
//             <th className="border border-gray-300 p-2">Title</th>
//             <th className="border border-gray-300 p-2">Price</th>
//             <th className="border border-gray-300 p-2">Rating</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id} className="hover:bg-gray-100">
//               {editingItem === item.id ? (
//                 <>
//                   <td className="border border-gray-300 p-2">
//                     <input
//                       name="image"
//                       value={editFormData.image}
//                       onChange={handleEditChange}
//                       className="w-full"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <input
//                       name="title"
//                       value={editFormData.title}
//                       onChange={handleEditChange}
//                       className="w-full"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <input
//                       name="price"
//                       type="number"
//                       value={editFormData.price}
//                       onChange={handleEditChange}
//                       className="w-full"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <input
//                       name="rating"
//                       type="number"
//                       value={editFormData.rating}
//                       onChange={handleEditChange}
//                       className="w-full"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//                       onClick={handleEditSave}
//                     >
//                       Save
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td className="border border-gray-300 p-2">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2">{item.title}</td>
//                   <td className="border border-gray-300 p-2">₹{item.price}</td>
//                   <td className="border border-gray-300 p-2">{item.rating}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
//                       onClick={() => handleEdit(item)}
//                     >
//                       ✏️ Edit
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

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
