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
    link: '/services/data-cleaning',
    highlight: true,
  },
];

export default function TransformDataSection() {
  return (
    <section className="bg-[#FAF9F6] py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <button className="px-4 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold mb-8">SERVICES</button>
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-700 text-center mb-12">Transform Data into Actionable Insights with <br />AI-Powered Smarter Marketing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full mb-10">
          {services.map((service, idx) => (
            <a
              key={service.title}
              href={service.link}
              className={`relative flex flex-col rounded-3xl overflow-hidden shadow-lg group transition-all duration-300 ${service.highlight ? 'bg-red-600' : 'bg-white'}`}
              style={{ minHeight: 420 }}
            >
              {/* Service Image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover object-center"
              />
              {/* Red Icon */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center z-10">
                {service.icon}
              </div>
              {/* Card Content */}
              <div className={`flex-1 flex flex-col justify-end p-6 ${service.highlight ? 'bg-red-600' : 'bg-white'}`}>
                <div className={`text-lg font-semibold mb-2 ${service.highlight ? 'text-white' : 'text-gray-900'}`}>{service.title}</div>
                <div className="flex items-center justify-between">
                  <span></span>
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${service.highlight ? 'bg-black' : 'bg-gray-100'} transition-all duration-200`}>
                    <FaArrowRight className={`${service.highlight ? 'text-white' : 'text-black'} text-lg`} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <button className="mt-4 px-8 py-3 rounded-full bg-red-600 text-white font-semibold text-lg shadow-lg hover:bg-red-700 transition">All Services</button>
      </div>
    </section>
  );
}
