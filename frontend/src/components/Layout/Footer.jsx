import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl font-semibold lg:leading-normal mb-6 md:mb-0 md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> to get the latest{" "}
          <br className="hidden sm:block" />
          news, events, and offers!
        </h1>
        <div className="flex flex-col sm:flex-row w-full md:w-auto">
          <input
            type="email"
            required
            placeholder="Enter your email..."
            className="text-gray-800 bg-white sm:w-72 w-full sm:mr-3 mb-4 sm:mb-0 py-2.5 rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#56d879] transition-all duration-300"
          />
          <button className="bg-[#56d879] hover:bg-[#49c46d] text-black font-medium px-5 py-2.5 rounded-md w-full sm:w-auto transition-all duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
