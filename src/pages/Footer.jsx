

import { useState } from "react";

// SVG icons as React components
const EditIcon = () => (
  <svg className="w-10 h-10 text-blue-500 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-8 h-10 text-red-500 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a2 2 0 0 1 2 2v2H8V5a2 2 0 0 1 2-2z" />
  </svg>
);

export default function DashboardForm() {
  const [form, setForm] = useState({
    title: "",
    faq: "",
    career: "",
    address: "",
    email: "",
    weekday: "",
    saturday: "",
    terms: "",
    phone: "",
    privacy: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto my-16 p-8 border rounded-xl shadow-lg bg-white">
    <div className="flex flex-col items-center py-16">
      <form className="w-full max-w-4xl space-y-4">
        {/* File Input */}

        <div className="w-1/2 border rounded p-2 ">
         <input
            type="file"
            className="file:mr-2 file:py-1 file:px-3 file:border file:rounded file:bg-gray-100 file:text-gray-700 text-sm focus:outline-none"
        />
        </div>

        {/* Title Row */}
        <div className="flex items-end gap-2 w-3/4">
          <div className="flex-1">
            <label className="font-semibold block mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="border rounded px-3 py-2 w-full"
              placeholder="Laser Skin Discover a sanctuary of beauty and relaxatio"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="border rounded px-4 py-2 h-10 mt-6 ml-2"
          >
            + Add
          </button>
          <button type="button" className="ml-4 mt-6">
            <EditIcon />
          </button>
          <button type="button" className="ml-2 mt-6">
            <DeleteIcon />
          </button>
        </div>

        {/* Description and Contact */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Discription</label>
            <input
              type="text"
              name="faq"
              className="border rounded px-3 py-2 w-full mb-2"
              placeholder="FAQ"
              value={form.faq}
              onChange={handleChange}
            />
            <input
              type="text"
              name="career"
              className="border rounded px-3 py-2 w-full"
              placeholder="Career"
              value={form.career}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              className="border rounded px-3 py-2 w-full mb-2 mt-6"
              placeholder="90 St Johns Brooklyn, NY, United States"
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              className="border rounded px-3 py-2 w-full"
              placeholder="contact.louisvillebeautysalon@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="weekday"
              className="border rounded px-3 py-2 w-full mb-2"
              placeholder="Monday – Friday: 8am – 6pm EST"
              value={form.weekday}
              onChange={handleChange}
            />
            <input
              type="text"
              name="saturday"
              className="border rounded px-3 py-2 w-full mb-2"
              placeholder="Saturday: 9am – 5pm EST"
              value={form.saturday}
              onChange={handleChange}
            />
            <input
              type="text"
              name="terms"
              className="border rounded px-3 py-2 w-full"
              placeholder="Terms of Use"
              value={form.terms}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="phone"
              className="border rounded px-3 py-2 w-full mb-2"
              placeholder="Phone: (+01)888.999.77"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="privacy"
              className="border rounded px-3 py-2 w-full mb-2"
              placeholder="Privacy Policy"
              value={form.privacy}
              onChange={handleChange}
            />
            <div className="flex gap-2 border rounded p-1.5">
            
               <input
                type="file"
                className="file:mr-2 file:py-1 file:px-3 file:border file:rounded file:bg-gray-100 file:text-gray-700 text-sm"
                />
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded mt-4 font-semibold"
        >
          Publish
        </button>
      </form>
    </div>
    </div>
  );
}

