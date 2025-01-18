import React from "react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center p-24">
    <div className="w-14 h-14 border-8 border-indigo-600 border-t-transparent border-solid rounded-full animate-spin mb-6"></div>
    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center animate-pulse">
      Please wait, we're processing your request.
    </h3>
  </div>
);

export default Loader;
