import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [editing, setEditing] = useState({});

  // ✅ Current logged-in user ID from localStorage
  const currentUserId = localStorage.getItem('userId') || null;

  // ✅ Fetch item details
  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${id}`);
      setItem(res.data);
      console.log('Fetched item:', res.data);
    } catch (err) {
      console.error('Failed to fetch item', err);
      alert('Failed to load item');
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  // ✅ Handle form changes
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  // ✅ Update item
  const update = async () => {
    try {
      const res = await api.put(`/items/${id}`, editing);
      console.log('Item updated:', res.data);
      setItem(res.data);
      setEditing({});
      alert('Item updated successfully');
    } catch (err) {
      console.error('Failed to update item', err);
      alert(err.response?.data?.msg || 'Update failed');
    }
  };

  if (!item) return <div>Loading...</div>;

  const isFound = item.type === 'Found';
  const isUploader = currentUserId && String(item.uploadedBy) === String(currentUserId);
  console.log('isUploader:', isUploader, 'item.uploadedBy:', item.uploadedBy, 'currentUserId:', currentUserId);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">{item.itemName}</h2>

      <p><span className="font-bold">Type:</span> {item.type}</p>
      <p><span className="font-bold">Location:</span> {isFound ? item.foundLocation : item.lostLocation}</p>
      <p>
        <span className="font-bold">{isFound ? 'Found at:' : 'Lost at:'}</span>{' '}
        {isFound
          ? new Date(item.foundDateTime).toLocaleString()
          : new Date(item.lostDateTime).toLocaleString()}
      </p>
      <p>
        <span className="font-bold">{isFound ? 'Holder:' : 'Contact:'}</span>{' '}
        {isFound ? item.currentHolder || 'Unknown' : item.contact || 'Unknown'}
      </p>

      <p><span className="font-bold">Status:</span> {item.status}</p>


      <div className="mt-4 space-y-4">
        {/* Editable holder field for Found items */}
        {isFound && (
          <div>
            <input
              name="currentHolder"
              value={editing.currentHolder ?? item.currentHolder ?? ''}
              onChange={handleChange}
              disabled={!isUploader}
              className={`w-full p-2 border rounded ${!isUploader ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="New holder"
            />
            {!isUploader && (
              <p className="text-sm text-red-500 mt-1">Please Login Again to edit your</p>
            )}
          </div>
        )}

        {/* Status dropdown */}
        <div>
          <select
            name="status"
            value={editing.status ?? item.status}
            onChange={handleChange}
            disabled={!isUploader}
            className={`w-full p-2 border rounded ${!isUploader ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            {isFound ? (
              <>
                <option value="In possession">In possession</option>
                <option value="Returned">Returned</option>
              </>
            ) : (
              <>
                <option value="Still lost">Still lost</option>
                <option value="Recovered">Recovered</option>
              </>
            )}
          </select>
          {!isUploader && (
  <p className="text-sm text-red-500 mt-1">Please Login Again to edit your Uploads</p>
)}

        </div>

        {/* Save button only for uploader */}
        {isUploader && (
          <button onClick={update} className="w-full bg-green-600 text-white p-2 rounded">
            Save updates
          </button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-bold">Change log</h3>
        <ul className="list-disc pl-5">
          {item.changeLog?.map((ch, i) => (
            <li key={i}>
              {new Date(ch.at).toLocaleString()} - {ch.by} - {ch.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
