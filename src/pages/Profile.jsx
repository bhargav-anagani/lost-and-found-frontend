import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { FaBoxOpen } from 'react-icons/fa';

export default function Profile() {
  const [items, setItems] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const [user, setUser] = useState({ name: '', email: '' });
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get('/items/me');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (item) => {
    if (!["Returned", "Recovered"].includes(item.status)) {
      alert("Item is not returned or recovered yet. Cannot delete.");
      return;
    }

    const ok = window.confirm('Delete this item? This action cannot be undone.');
    if (!ok) return;

    try {
      setDeletingId(item._id);
      await api.delete(`/items/${item._id}`);
      setItems(prev => prev.filter(it => it._id !== item._id));
      setDeletingId(null);
      alert('Item deleted successfully');
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setDeletingId(null);
      alert(err?.response?.data?.message || 'Delete failed: ' + err);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* User Info */}
      <div className="mb-6 bg-gray-100 p-4 rounded shadow max-w-md sm:max-w-full">
        <h2 className="text-xl sm:text-2xl font-bold font-serif break-words">Name: {user.name || 'Your Name'}</h2>
        <h2 className="text-gray-700 text-sm sm:text-base break-words">Email: {user.email || 'your.email@example.com'}</h2>
      </div>

      {/* Uploads Section */}
      {items.length > 0 ? (
        <>
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-white font-serif">Your uploads:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(it => (
              <div
                key={it._id}
                className="bg-white p-4 sm:p-5 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-xl sm:text-2xl mb-2 sm:mb-3 font-serif">{it.itemName}</h3>
                  <p className="text-sm sm:text-base mb-1"><span className="font-bold">Status:</span> {it.status}</p>
                  {it.type === 'Found' ? (
                    <p className="text-sm sm:text-base mb-1">
                      <span className="font-bold">Found at:</span> {it.foundDateTime || 'N/A'}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base mb-1">
                      <span className="font-bold">Lost at:</span> {it.lostDateTime || 'N/A'}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-3">
                  <Link
                    to={`/items/${it._id}`}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:opacity-90 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(it)}
                    disabled={deletingId === it._id}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:opacity-90"
                  >
                    {deletingId === it._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // No uploads placeholder
        <div className="flex flex-col items-center justify-center mt-6 text-center">
          <FaBoxOpen className="text-gray-400 text-5xl mb-3" />
          <p className="text-white text-xl font-semibold font-serif">No uploads yet</p>
          <p className="text-gray-400 mt-1 text-sm">Start by uploading a lost or found item</p>
          <Link
            to="/upload"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Upload Now
          </Link>
        </div>
      )}
    </div>
  );
}
