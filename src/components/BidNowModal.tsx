// components/BidNowModal.js
"use client";

import { useState, useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import io from "socket.io-client";
import { missingProperties } from "@/utils";
import { User } from "@/interfaces/User";
import { Bid } from "@/interfaces/Bids";

// Replace with your actual Socket.IO server URL and namespace
const socket = io("http://localhost:1200/auctions");

const BidNowModal = ({ isOpen, onClose, auctionId }: { isOpen: boolean, onClose: () => void, auctionId: number}) => {
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState<Bid[]>([]);

  // Connect to Socket.IO and listen for new bids
  useEffect(() => {
    if (isOpen) {
      socket.emit("joinAuction", auctionId);

      socket.on("joinedAuction", ({message, bids:commingBids}) => {
      setBids(commingBids);
       
      });

      socket.on("newBid", ({message, newBid}: {message: string, newBid: Bid}) => {
        setBids((prevBids) => [...prevBids, newBid]);
      });
    }

    // Cleanup when modal is closed or unmounted
    return () => {
      socket.emit("leaveAuction", auctionId);
      socket.off("newBid");
    };
  }, [isOpen, auctionId]);

  const handleBid = () => {
    const cachedUser = localStorage.getItem("user");
   if(cachedUser) {
    const {id} = JSON.parse(cachedUser) as User
    const bidData = {
      userId:id ,
      auctionId,
      amount: parseFloat(bidAmount),
    };
    socket.emit("placeBid", bidData);
    setBidAmount(""); 
   }
  // Reset the bid amount
  };
console.log({bids});

  return (
    <Dialog {...missingProperties} open={isOpen} handler={onClose} size="md">
      <DialogHeader {...missingProperties}>Place Your Bid <small className="text-red-400 mx-2">Your bid must be bigger than the latest one!</small></DialogHeader>
      <DialogBody {...missingProperties} divider>
        <div className="space-y-4">
          <Input
            crossOrigin={undefined} label="Bid Amount"
            type="number"
            min="0"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            {...missingProperties}          />
          <div>
            <h3 className="text-lg font-medium">Recent Bids:</h3>
            <ul className="list-disc ml-5">
              {bids.map((bid, index) => (
                <li key={index}>
                  <strong>User {bid.userId}</strong>: ${bid.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogBody>
      <DialogFooter {...missingProperties}>
        <Button  {...missingProperties} className='bg-red-400 capitalize mr-2'onClick={onClose} >
          Cancel
        </Button>
        <Button {...missingProperties} className='bg-indigo-500 capitalize' onClick={handleBid}>
          Add Auction
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default BidNowModal;
