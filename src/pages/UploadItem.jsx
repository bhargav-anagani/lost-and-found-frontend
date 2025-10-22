import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import defaultLogo from '../assets/logo.jpg'; // ✅ your placeholder image

export default function UploadItem() {
  const [form, setForm] = useState({ 
    itemName: '', 
    foundLocation: '', 
    foundDateTime: '', 
    currentHolder: '', 
    lostLocation: '', 
    lostDateTime: '', 
    contact: '', 
    type: 'Found'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultLogo); // ✅ default image
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) setErrors({ ...errors, [name]: false });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(defaultLogo);
    }
    if (errors.image) setErrors({ ...errors, image: false });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    let missingFields = [];
    let newErrors = {};

    if (!form.itemName.trim()) { missingFields.push('Item Name'); newErrors.itemName = true; }

    if (form.type === 'Found') {
      if (!form.foundLocation.trim()) { missingFields.push('Found Location'); newErrors.foundLocation = true; }
      if (!form.foundDateTime.trim()) { missingFields.push('Found Date & Time'); newErrors.foundDateTime = true; }
      if (!form.currentHolder.trim()) { missingFields.push('Holder Details'); newErrors.currentHolder = true; }
    } else {
      if (!form.lostLocation.trim()) { missingFields.push('Lost Location'); newErrors.lostLocation = true; }
      if (!form.lostDateTime.trim()) { missingFields.push('Lost Date & Time'); newErrors.lostDateTime = true; }
      if (!form.contact.trim()) { missingFields.push('Contact Details'); newErrors.contact = true; }
    }

    if (!image) { 
      missingFields.push('Item Image'); 
      newErrors.image = true; 
    }

    if (missingFields.length > 0) {
      setMessage(`Please fill the following fields: ${missingFields.join(', ')}`);
      setErrors(newErrors);
      return;
    }

    setMessage('');
    setErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append('image', image);

      await api.post('/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/');
    } catch (err) {
      setMessage('Error uploading item: ' + err);
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) => {
    return `w-full p-2 border rounded ${
      submitAttempted && errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Item</h2>

      {message && <p className="mb-3 text-red-600">{message}</p>}

      <form onSubmit={submit} className="space-y-3">
        <select 
          name="type" 
          value={form.type} 
          onChange={handle} 
          className={inputClass('type')}
        >
          <option value="Found">Found</option>
          <option value="Lost">Lost</option>
        </select>

        <input 
          name="itemName" 
          placeholder="Item name" 
          value={form.itemName} 
          onChange={handle} 
          className={inputClass('itemName')} 
        />

        {form.type === 'Found' ? (
          <>
            <input 
              name="foundLocation" 
              placeholder="Found location" 
              value={form.foundLocation} 
              onChange={handle} 
              className={inputClass('foundLocation')} 
            />
            <input 
              type="datetime-local" 
              name="foundDateTime" 
              value={form.foundDateTime} 
              onChange={handle} 
              className={inputClass('foundDateTime')} 
            />
            <input 
              name="currentHolder" 
              placeholder="Holder Details (Email/ContactNo)" 
              value={form.currentHolder} 
              onChange={handle} 
              className={inputClass('currentHolder')} 
            />
          </>
        ) : (
          <>
            <input 
              name="lostLocation" 
              placeholder="Lost location" 
              value={form.lostLocation} 
              onChange={handle} 
              className={inputClass('lostLocation')} 
            />
            <input 
              type="datetime-local" 
              name="lostDateTime" 
              value={form.lostDateTime} 
              onChange={handle} 
              className={inputClass('lostDateTime')} 
            />
            <input 
              name="contact" 
              placeholder="Your Contact Details" 
              value={form.contact} 
              onChange={handle} 
              className={inputClass('contact')} 
            />
          </>
        )}

        {/* Image Preview */}
        <img 
          src={imagePreview} 
          alt="Preview" 
          className="w-32 h-32 object-cover mb-2 rounded border"
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImage} 
          className={inputClass('image')} 
        />

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white p-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
