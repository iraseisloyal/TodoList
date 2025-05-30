import React, { useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    "Welcome",
    "Dashboard",
    "Tasks",
    "People",
    "Reports",
    "Billing",
    "Integrations"
  ];

  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item}
            className={`py-2 px-4 cursor-pointer rounded ${activeItem === item ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;