

import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewAuctions, getAuctions } from "./api";
import { NewAuctionType } from "@/interfaces/Auctions";


export const useGetAuctionsQuery = () => {
    return useQuery({
        queryKey: ['getAuctions'],
        queryFn: () => getAuctions(), 
        staleTime: Infinity, 
        retry: false,
      });
  };


  export const useAddNewAuctionMutation = () => {
    return useMutation({
      mutationFn: (data: NewAuctionType) => addNewAuctions(data),
      mutationKey: ["addNewAuctions"],
      onSuccess: (data) => {
        console.log("addNewAuctions successful", data);
      },
      onError: (error: any) => {
        console.error('addNewAuctions failed:', error.response?.data);
      },
    });
  };
