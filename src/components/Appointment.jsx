import React, { useState, useEffect } from "react";
import { Reply, Trash2, Loader } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const Appointment = () => {
  const columns = ["Name", "Email", "Phone", "Message", "Action"];

  // State variables
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // API base URL
  const API_BASE_URL = "http://localhost:4000/api/appointments";

  // Fetch all appointments when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Function to fetch appointments from API
  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/test/all`, {
        userId: user._id,
      });
      console.log("Appointments fetched:", response.data);

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        console.error("API error:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    setDeleteLoading(id);

    try {
      const response = await axios.delete(`${API_BASE_URL}/test/${id}`);

      if (response.data.success) {
        // Remove deleted appointment from state
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      } else {
        console.error("Failed to delete:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <>
      <form className="w-full card-container max-w-[1550px] mx-auto min-h-screen bg-white rounded-xl border border-gray-200 shadow-md mb-8 px-1 py-6 md:p-6">
        {loading && (
          <div className="flex justify-center items-center py-4">
            <Loader size={24} className="animate-spin text-blue-500 mr-2" />
            <span>Loading...</span>
          </div>
        )}
        <div className="overflow-x-auto mt-5 px-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="py-2 px-4 text-center">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0
                ? appointments.map((item) => (
                    <tr key={item._id} className="border-t border-gray-200">
                      <td className="py-2 px-4 text-center">{item.name}</td>
                      <td className="py-2 px-4 text-center">{item.email}</td>
                      <td className="py-2 px-4 text-center">{item.phone}</td>
                      <td className="py-2 px-4 text-center">{item.message}</td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex flex-row items-center justify-center gap-3">
                          <div>
                            <button className="text-blue-600 flex flex-col items-center hover:underline cursor-pointer">
                              <Reply size={18} />
                            </button>
                          </div>
                          |
                          <div>
                            <button
                              onClick={() => handleDelete(item._id)}
                              disabled={deleteLoading === item._id}
                              className="text-red-600 flex flex-col items-center hover:underline cursor-pointer"
                            >
                              {deleteLoading === item._id ? (
                                <Loader size={18} className="animate-spin" />
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : !loading && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default Appointment;
