import { useEffect, useState } from "react";

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchFunction = ({ searchQuery, onSearch }: SearchProps) => {
  const [query, setQuery] = useState(searchQuery); // Initialize with searchQuery

  useEffect(() => {
    setQuery(searchQuery); // Update input field when searchQuery changes
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass query to parent component
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name, recipes, category, or price..."
        value={query}
        onChange={handleSearch}
        className="border p-2 rounded w-full"
        onClick={() => onSearch(query)}
      />
    </div>
  );
};

export default SearchFunction;
