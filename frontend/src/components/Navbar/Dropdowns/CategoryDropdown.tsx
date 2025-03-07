import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import useFetchCategory from "@/utils/Hooks/Tanstack/Dish/useQueryCategory";
import { useNavigate } from "react-router-dom";
  
  interface CategoryDropdownProps {
    setSearchQuery: (query: string) => void; // Accept setSearchQuery as a prop
  }
  
  const CategoryDropdown = ({ setSearchQuery }: CategoryDropdownProps) => {
    const { data: category, isLoading:loading, error } = useFetchCategory();
    const categories = Array.from(new Set(category?.map((category) => category.name)));
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="">Category</DropdownMenuTrigger>
        <DropdownMenuContent id="category-dropdown">
          <DropdownMenuLabel>Select a Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSearchQuery("")}>
            All
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="h-52 overflow-y-auto">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => {
                setSearchQuery(Array.isArray(category) ? category[0] : category);
                navigate("/");
              }}
            >
              {category}
            </DropdownMenuItem>
          ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CategoryDropdown;
  