import { addToCartApi, deleteCartApi } from "@/api/CartApi"
import {useMutation, useQueryClient} from "@tanstack/react-query"
const useMutationCart = () => {
    const useMutationCartAdd = () => {
        return useMutation ({
            mutationFn: ({dishId}: {dishId: number}) => addToCartApi(dishId),
            onSuccess(data){
                console.log(`success ${data}`)
            }
        })
    }

    const useMutationCartDel = () => {
      const queryClient = useQueryClient();
      return useMutation ({
        mutationFn: (cartId: number) => deleteCartApi(cartId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['cart'] }); // Refresh the cart query
        },
      })
    }
  return {
    useMutationCartAdd,
    useMutationCartDel
  }
}

export default useMutationCart
