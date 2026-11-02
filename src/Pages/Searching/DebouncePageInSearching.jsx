import axios from "axios";
import { useEffect, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export const Component = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Request sent for:", debouncedQuery);
        const { data } = await axios.get(
          "https://dummyjson.com/products/search",
          { params: { q: debouncedQuery } }
        );
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="p-4">
      <input
        className="border border-gray-300 rounded-md p-2"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <h1 className="text-2xl font-bold my-4">Debounced Search</h1>
      <p className="text-gray-700">Search Query: {query}</p>
      <p className="text-gray-700">Debounced Query: {debouncedQuery}</p>

      {loading && <p>Loading...</p>}

      <ul className="mt-4">
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      {!loading && debouncedQuery && products.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
};