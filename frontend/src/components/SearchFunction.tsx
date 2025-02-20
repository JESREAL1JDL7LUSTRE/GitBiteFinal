import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchFunction = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass the query to parent component
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name, recipes, category, or price..."
        value={query}
        onChange={handleSearch}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default SearchFunction;
