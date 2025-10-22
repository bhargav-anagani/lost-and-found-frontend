import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');

  const fetchItems = async () => {
    const res = await api.get('/items', { params: { q } });
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <div>
      <div className="flex mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search item name" className="p-2 border rounded mr-2" />
        <button onClick={fetchItems} className="p-2 bg-blue-600 text-white rounded">Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => <ItemCard key={it._id} item={it} />)}
      </div>
    </div>
  );
}
