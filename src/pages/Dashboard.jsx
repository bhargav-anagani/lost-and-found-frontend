import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import api from '../api/api';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [searched, setSearched] = useState(false); // tracks if a search was performed
  const [allItems, setAllItems] = useState([]); // store all items fetched from backend

  // Fetch all items on mount
  const fetchItems = async () => {
    const res = await api.get('/items');
    setAllItems(res.data);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSearch = (query) => {
    setSearched(true);
    if (!query.trim()) {
      setItems(allItems);
      return;
    }

    // Setup Fuse.js
    const fuse = new Fuse(allItems, {
      keys: ['itemName'],
      threshold: 0.4,
      ignoreLocation: true,
    });

    // Split query into words
    const words = query.trim().split(/\s+/);
    let results = [];

    words.forEach(word => {
      results = results.concat(fuse.search(word).map(r => r.item));
    });

    // Remove duplicates
    const uniqueResults = Array.from(new Set(results.map(i => i._id)))
      .map(id => results.find(i => i._id === id));

    setItems(uniqueResults);
  };

  const handleClear = () => {
    setQ('');           // clear input
    setSearched(false); // reset search state
    setItems(allItems); // restore all items
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
        <button onClick={() => handleSearch(q)} className="p-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        {items.map((it) => <ItemCard key={it._id} item={it} />)} 
        {searched && items.length === 0 && ( <p className="col-span-full text-red-500 font-semibold">No results found</p> )} 
      </div>
    </div>
  );
}
