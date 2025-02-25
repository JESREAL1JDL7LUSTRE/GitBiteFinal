import useDeleteCart from "@/utils/Hooks/PostHooks/usePostCartDel";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import a loader icon for visual feedback
import { useNavigate } from "react-router-dom";

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
      {error && <p className="text-red-500">{error}</p>} {/* Show error if any */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Delete Cart"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
