import React, { useState } from 'react';

export const ProfileOverlay = ({ onSave }: { onSave: (data: any) => void }) => {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...form, hasCompletedProfile: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold">Complete Your Profile</h2>
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};
