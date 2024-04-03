'use client';
// import SectionHeaders from "@/components/layout/SectionHeaders";
// import MenuItem from "@/components/menu/MenuItem";
// import {useEffect, useState} from "react";
// import LoadingSpinner from "../LoadingSpinner .js";

// export default function MenuPage() {
//   const [categories, setCategories] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); 

//   useEffect(() => {
//     fetch('/api/categories').then(res => {
//       res.json().then(categories => setCategories(categories))
//     });
//     fetch('/api/menu-items').then(res => {
//       res.json().then(menuItems => setMenuItems(menuItems));
//       setIsLoading(false)
//     });
//   }, []);
//   return (
//     <section className="mt-8">
//       {isLoading && (
//         <LoadingSpinner />
//         )}
//       {categories?.length > 0 && categories.map(c => (
//         <div key={c._id}>
//           <div className="text-center">
//             <SectionHeaders mainHeader={c.name} />
//           </div>
//           <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
//             {menuItems.filter(item => item.category === c._id).map(item => (
//               <MenuItem key={item._id} {...item} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

// import SectionHeaders from "@/components/layout/SectionHeaders";
// import MenuItem from "@/components/menu/MenuItem";
// import { useEffect, useState } from "react";
// import LoadingSpinner from "../LoadingSpinner .js";

// export default function MenuPage() {
//   const [categories, setCategories] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetch('/api/categories').then(res => {
//       res.json().then(categories => setCategories(categories))
//     });
//     fetch('/api/menu-items').then(res => {
//       res.json().then(menuItems => {
//         setMenuItems(menuItems);
//         setIsLoading(false);
//       });
//     });
//   }, []);

//   // Function to filter menu items based on the search query
//   const filteredMenuItems = menuItems.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Event handler to update the search query state
//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   return (
//     <section className="mt-8">
//       {isLoading && (
//         <LoadingSpinner />
//       )}
//       {/* Search bar */}
//       <div className="flex justify-center mb-4">
//         <input
//           type="text"
//           placeholder="Search menu items..."
//           className="border border-gray-300 rounded-md px-4 py-2"
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//       </div>
//       {categories?.length > 0 && categories.map(c => (
//         <div key={c._id}>
//           <div className="text-center">
//             <SectionHeaders mainHeader={c.name} />
//           </div>
//           <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
//             {/* Render filtered menu items */}
//             {filteredMenuItems .filter(item => item.category === c._id) .map(item => (
//                 <MenuItem key={item._id} {...item} />
//               ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner .js";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => setCategories(categories))
    });
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
        setIsLoading(false);
      });
    });
  }, []);

  // Function to filter menu items based on the search query
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to filter categories based on whether they contain matching menu items
  const filteredCategories = categories.filter(category =>
    filteredMenuItems.some(item => item.category === category._id)
  );

  // Event handler to update the search query state
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="mt-8">
      {isLoading && (
        <LoadingSpinner />
      )}
      {/* Search bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search menu items..."
          className="border border-gray-300 rounded-md px-4 py-2"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      {/* Render filtered categories and their matching menu items */}
      {filteredCategories.map(category => (
        <div key={category._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={category.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {/* Render matching menu items for the current category */}
            {filteredMenuItems
              .filter(item => item.category === category._id)
              .map(item => (
                <MenuItem key={item._id} {...item} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
