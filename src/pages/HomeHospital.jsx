import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/apiservice";
import { FaShare, FaArrowLeft } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const HomeHospital = () => {
  const { hospitalId } = useParams();
  const [hospitalData, setHospitalData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/hospital/${hospitalId}`);
        if (res.ok) {
          const data = await res.json();
          setHospitalData(data);
        } else {
          setError("Failed to fetch hospital data");
        }
      } catch (error) {
        setError("Error fetching hospital data");
      }
    };

    fetchHospitalData();
  }, [hospitalId]);

  const shareHospital = () => {
    const deepLink = `${window.location.origin}/hospital/${hospitalId}`;
    if (navigator.share) {
      navigator.share({
        title: "Check out this hospital",
        text: "I found this hospital and thought you might be interested.",
        url: deepLink,
      });
    } else {
      alert(`Shareable URL: ${deepLink}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<>
    <Helmet>
        <title>HomeHospital - Sahaya Disaster Management</title>
        <meta name="description" content="Sahaya, your reliable partner in disaster management. Discover tools and strategies for effective disaster management solutions." />
        <meta name="keywords" content="disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya, disaster management, emergency shelters, hospitals, safety tips, volunteer, Sahaya,first aid, preparedness in disaster management, disaster management solutions, about disaster management, prevention of disaster management, emergency recovery plan, disaster management and response, disaster management includes, disaster management planning, managing natural disasters, national disaster management authority upsc, national disaster management plan 2019, national institute for disaster management, types disaster management, earthquake, floods, high, heavy, natural disasters, severity, cyclone, tornado, wildfire, evacuate, heavy rainfall" />
        <meta name="author" content="Sahaya Team" />
        <meta property="og:title" content="Sahaya Disaster Management" />
        <meta property="og:description" content="Explore tools and strategies to safeguard and empower during crises." />
      </Helmet>
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={18} />
        </button>
        <button
          className="text-green-600 hover:text-green-800"
          onClick={shareHospital}
        >
          <FaShare size={18} />
        </button>
      </div>
      <ToastContainer />
      <div className="rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {hospitalData && hospitalData.name}
        </h1>
        {hospitalData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={hospitalData.photoUrl}
                alt="Hospital Photo"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="text-gray-700">
              <p className="mb-4 text-499663">
                <span className="font-semibold">Area:</span> {hospitalData.area}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">City:</span> {hospitalData.city}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">Address:</span>{" "}
                {hospitalData.address}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">Pincode:</span>{" "}
                {hospitalData.pincode}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">Contact Number:</span>{" "}
                {hospitalData.contact_number}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">Specialties:</span>{" "}
                {hospitalData.specialties.join(", ")}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">Beds:</span> {hospitalData.beds}
              </p>
              <p className="mb-4 text-499663">
                <span className="font-semibold">Emergency Services:</span>{" "}
                {hospitalData.emergency_services
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default HomeHospital;
