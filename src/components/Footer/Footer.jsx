import React from "react";

function FunnyFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12 px-6">
      <div className="text-center space-y-6">
        {/* Logo Section */}
        <div>
          <img
            src="/src/assets/Images/logo-removebg-preview.png"
            alt="Project Logo"
            className="w-20 h-20 mx-auto"
          />
          <p className="text-sm mt-2">Gifs Overflow™</p>
        </div>

        <p className="text-xs">
          © {new Date().getFullYear()} Your Gifs Overflow. All rights ignored,
          just like our bug reports. 🛠️
        </p>
      </div>
    </footer>
  );
}

export default FunnyFooter;
