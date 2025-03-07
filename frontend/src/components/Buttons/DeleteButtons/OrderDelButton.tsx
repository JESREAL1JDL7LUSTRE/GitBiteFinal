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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; // Import a loader icon for visual feedback
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "@/api/OrderApi";

interface CartDelButtonProps {
  OrderId: number; // Accept cart ID as a prop
}

function CartDelButton({ OrderId }: CartDelButtonProps) {
  const [open, setOpen] = useState(false); // Controls the dialog visibility
  const [error] = useState<string | null>(null); // Track error messages
  const [loading] = useState(false); // Track loading state

  const nav = useNavigate();

  const handleDelete = async () => {
    await deleteOrder(OrderId);
    setOpen(false);
    nav(0);
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>} {/* Show error if any */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="rounded-md p-2 shadow-sm border bg-white text-red-500"
           >
            <Trash2 className="w-5 h-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to delete this order history?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your Order
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
