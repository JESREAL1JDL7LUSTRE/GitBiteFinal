import useDeleteCart from "@/utils/Hooks/PostHooks/usePostCartDel";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Heart, Loader2 } from "lucide-react"; // Import a loader icon for visual feedback
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CartDelButtonProps {
  cartId: number; // Accept cart ID as a prop
}

function CartDelButton({ cartId }: CartDelButtonProps) {
  const { deleteCart, loading, error } = useDeleteCart();
  const [open, setOpen] = useState(false); // Controls the dialog visibility

  const nav = useNavigate();

  const handleDelete = async () => {
    await deleteCart(cartId);
    setOpen(false);
    nav(0);
  };

  return (
    <>
      {error && <p className="">{error}</p>} {/* Show error if any */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="rounded-full shadow-md p-3 transition-colors duration-300 bg-white"  data-tooltip="Unadd to Wishlist" disabled={loading}> 
            {loading ? <Loader2 className="" /> : <Heart fill="red" color="red" size={18} />}
          </Button>
        </AlertDialogTrigger> 
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to unadd it from you wishlist?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your cart
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CartDelButton;
