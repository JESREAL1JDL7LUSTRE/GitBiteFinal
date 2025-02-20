import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import useFetchDishes from "../../utils/useFetchDishes";
  
  interface CategoryDropdownProps {
    setSearchQuery: (query: string) => void; // Accept setSearchQuery as a prop
  }
  
  const CategoryDropdown = ({ setSearchQuery }: CategoryDropdownProps) => {
    const { dishes, loading, error } = useFetchDishes();
    const categories = Array.from(new Set(dishes?.map((dish) => dish.category_name)));
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 border rounded-md">Category</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select a Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => {
                setSearchQuery(Array.isArray(category) ? category[0] : category); // Ensure it's a string
              }}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CategoryDropdown;
  