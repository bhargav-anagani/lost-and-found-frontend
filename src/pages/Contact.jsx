import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center">
  <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
  <p className="mb-6 text-gray-700 text-lg">
    Feel free to reach out to us via social media or email.
  </p>

      <div className="flex justify-center space-x-6 text-3xl">
        <a
          href="https://www.linkedin.com/in/bhargav-gopi-anagani-374461251/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:bhargavgopi05@gmail.com"
          className="text-red-600 hover:text-red-800"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.instagram.com/_bhargav_anagani?igsh=MTJ6ZnIwN3Bwb3d1OA=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}
