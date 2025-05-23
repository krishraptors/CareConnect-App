// A vibrant MVP React frontend for the "Compassionate Helper" app
// Updated with a colorful UI using a blend of blue and magenta shades and dashboard layout like Ola's homepage

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-r from-blue-100 to-pink-100 min-h-screen flex flex-col justify-between">
        <header className="bg-gradient-to-r from-blue-600 to-pink-600 text-white px-10 py-6 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">CareConnect</h1>
          <nav className="flex justify-center gap-10">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md hover:bg-blue-200 hover:text-white transition duration-300 ease-in-out border-2 border-blue-500"
            >
              🏠 Home
            </Link>
            <Link
              to="/request"
              className="px-8 py-4 bg-white text-pink-600 font-bold rounded-xl shadow-md hover:bg-pink-200 hover:text-white transition duration-300 ease-in-out border-2 border-pink-500"
            >
              🚨 Request Help
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-md hover:bg-purple-200 hover:text-white transition duration-300 ease-in-out border-2 border-purple-500"
            >
              🙋 Become a Helper
            </Link>
          </nav>
        </header>

        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request" element={<RequestHelp />} />
            <Route path="/signup" element={<HelperSignup />} />
          </Routes>
        </main>

        <footer className="bg-gradient-to-r from-blue-600 to-pink-600 text-white text-center py-4 mt-10">
          <p>
            Contact Support:{" "}
            <a href="mailto:support@careconnect.com" className="underline">
              support@careconnect.com
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to CareConnect
      </h1>
      <p className="text-xl text-gray-800 mb-8 max-w-xl mx-auto">
        Find compassionate helpers nearby for emergencies, illness, or emotional
        support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="24/7 Help"
          description="Get immediate support during emergencies."
          icon="🚑"
        />
        <FeatureCard
          title="Verified Helpers"
          description="All helpers are 18+ and vetted for safety."
          icon="✔️"
        />
        <FeatureCard
          title="Emotional Support"
          description="Talk to someone who truly cares."
          icon="💬"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow hover:shadow-lg transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-600 mb-1">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function RequestHelp() {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => alert("Error getting location")
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Request Help</h2>
      <button
        onClick={getLocation}
        className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg"
      >
        Get My Location
      </button>
      {location && (
        <div className="mt-4 text-gray-800">
          <p>
            <strong>Latitude:</strong> {location.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {location.lng}
          </p>
          <div className="mt-4">
            <iframe
              title="User Location Map"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${location.lat},${location.lng}&zoom=14`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

function HelperSignup() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(age) < 18) {
      alert("You must be at least 18 years old to become a helper.");
      return;
    }
    alert(`Thank you, ${name}, for signing up as a helper!`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white bg-opacity-90 p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-semibold text-blue-600">Become a Helper</h2>
      <div className="flex flex-col">
        <label className="text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-pink-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-blue-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg"
      >
        Submit
      </button>
    </form>
  );
}

export default App;
