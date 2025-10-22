import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="p-8 text-left text-gray-100">
      {/* Heading */}
      <h1 className="font-serif text-4xl font-extrabold mb-8 text-white">
        About Lost &amp; Found
      </h1>

      {/* Intro */}
      <p className="text-xl mb-8 max-w-4xl leading-relaxed">
        Lost &amp; Found is a community-driven platform built to help people
        reconnect with misplaced items quickly and securely. Whether you’ve lost
        something valuable or found an item that belongs to someone else, our
        platform makes it easy to share and recover belongings in a safe and
        supportive way.
      </p>

      {/* Why we built this */}
      <h2 className="text-3xl font-bold mb-4 text-indigo-400">
        Why Lost &amp; Found?
      </h2>
      <ul className="list-disc list-inside text-xl space-y-3 mb-10">
        <li>Simple reporting system for lost and found items.</li>
        <li>Browse and search reports with ease.</li>
        <li>Privacy-first approach — your details stay safe.</li>
        <li>Helps students, professionals, and communities stay connected.</li>
      </ul>

      {/* Mission */}
      <h2 className="text-3xl font-bold mb-4 text-indigo-400">Our Mission</h2>
      <ol className="list-decimal list-inside text-xl space-y-3 mb-10">
        <li>Reduce the stress of losing valuable items.</li>
        <li>Create a trustworthy space for item recovery.</li>
        <li>Encourage community support and responsibility.</li>
      </ol>

      {/* How to Use */}
      <h2 className="text-3xl font-bold mb-4 text-indigo-400">How to Use</h2>
      <ol className="list-decimal list-inside text-xl space-y-3 mb-10">
        <li>
          <span className="font-semibold">Register or Login</span> — create an
          account to access the platform.
        </li>
        <li>
          <span className="font-semibold">Upload an Item</span> — if you found
          something, submit details like name, location, and time.
        </li>
        <li>
          <span className="font-semibold">Search Dashboard</span> — browse
          reported lost and found items in your community.
        </li>
        <li>
          <span className="font-semibold">Connect Securely</span> — reach out to
          the rightful owner or finder through safe channels.
        </li>
        <li>
          <span className="font-semibold">Update Your Profile</span> — manage
          your posts and keep track of recovered items.
        </li>
      </ol>

      {/* Team */}
      <h2 className="text-3xl font-bold mb-4 text-indigo-400">Team</h2>
      <p className="text-xl mb-10 leading-relaxed">
        <span className="font-semibold">Bhargav Gopi Anagani</span> — Founder
        &amp; Developer
        <br />
        <span className="text-gray-300">
          Passionate about building tools that solve real-world problems and
          make everyday life easier.
        </span>
      </p>

      {/* Contact Button */}
      <Link
        to="/contact"
        className="inline-block px-6 py-3 text-xl font-medium bg-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition"
      >
        Contact Us
      </Link>
    </div>
  );
}
