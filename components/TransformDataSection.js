import { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaChartLine, FaBullseye, FaChartPie, FaBroom } from 'react-icons/fa';

const services = [
  {
    title: 'Customer Analytics',
    image: '/GettyImages-2170384534-1.webp',
    icon: <FaChartLine className="w-6 h-6 text-white" />,
    link: '/services/customer-analytics',
  },
  {
    title: 'Marketing Analytics',
    image: '/GettyImages-2065938875-1.webp',
    icon: <FaBullseye className="w-6 h-6 text-white" />,
    link: '/services/marketing-analytics',
  },
  {
    title: 'Data Visualization',
    image: '/gettyimages-1848417745-1024x1024-1.webp',
    icon: <FaChartPie className="w-6 h-6 text-white" />,
    link: '/services/data-visualization',
  },
  {
    title: 'Data Cleaning',
    image: '/GettyImages-1215205229-1.webp',
    icon: <FaBroom className="w-6 h-6 text-white" />,
    link: '/services/data-cleaning-services',
  },
];

export default function TransformDataSection() {
  return (
    <section className="bg-[#FAF9F6] py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <span className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-100 text-xs font-semibold tracking-widest text-gray-700">ANALYTICS SERVICES</span>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-black">Transform Data into Actionable Insights with</span><br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-400 bg-clip-text text-transparent">AI-Powered Smarter Marketing</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full mb-10">
          {services.map((service, idx) => (
            <a
              key={service.title}
              href={service.link}
              className="relative flex flex-col rounded-3xl overflow-hidden shadow-lg group transition-all duration-300 bg-white hover:bg-red-600"
              style={{ minHeight: 420 }}
            >
              {/* Service Image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-80 object-cover object-center"
              />
              {/* Red Icon */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center z-10">
                {service.icon}
              </div>
              {/* Card Content */}
              <div className="flex items-center justify-between px-4 py-3 bg-white group-hover:bg-red-600 transition-all duration-300">
                <div className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">{service.title}</div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-black transition-all duration-300">
                  <FaArrowRight className="text-black group-hover:text-white text-lg transition-colors duration-300" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <button className="mt-4 px-8 py-3 rounded-full bg-red-600 text-white font-semibold text-lg shadow-lg hover:bg-red-700 transition">All Services</button>
      </div>
    </section>
  );
}
