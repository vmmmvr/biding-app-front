import { Auction, NewAuctionType } from '@/interfaces/Auctions';
import { User, UserSignIn } from '@/interfaces/User';
import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const api = axios.create({
  baseURL:API_URL, // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getAuctions = async () : Promise<Auction[]> => {
    const response = await api.get('/auctions');
    return response.data;
  };


export const addNewAuctions = async (data:NewAuctionType) : Promise<Auction> => {
    const response = await api.post('/auctions', {...data});
    return response.data;
  };

export const userSignin = async (data:UserSignIn) : Promise<User> => {
    const response = await api.post('/users', {...data});
    return response.data;
  };

export default api;