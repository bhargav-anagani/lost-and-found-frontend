import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [searched, setSearched] = useState(false); // tracks if a search was performed

  const fetchItems = async (query = '') => {
    setSearched(true);
    const res = await api.get('/items', { params: { q: query } });
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleClear = () => {
    setQ('');           // clear input
    setSearched(false); // reset search state
    fetchItems();       // fetch all items
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search item name"
          className="p-2 border rounded mr-2"
        />
        {q && (
          <button onClick={handleClear} className="p-2 border rounded mr-2 bg-white">
            ✖
          </button>
        )}
        <button onClick={() => fetchItems(q)} className="p-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => <ItemCard key={it._id} item={it} />)}
        {searched && items.length === 0 && (
          <p className="col-span-full text-red-500 font-semibold">No results found</p>
        )}
      </div>
    </div>
  );
}
