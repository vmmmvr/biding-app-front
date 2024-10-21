"use client";
import { Button, Card, CardBody } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";
import { missingProperties } from "@/utils";
import AddAuctionModal from "@/components/AddAuctionModal";
import { useEffect, useState } from "react";
import { useAddNewAuctionMutation, useGetAuctionsQuery } from "@/services/auctions.sevice";
import { isNowBetween, timeLeft } from "@/utils/dates";
import { NewAuctionType } from "@/interfaces/Auctions";
import BidNowModal from "@/components/BidNowModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(!isModalOpen);


  const [isBidNowModalOpen, setIsBidNowModalOpen] = useState(false);
  const [selectedAuctionId, setSelectedAuctionId] =  useState<number | null>(null);

  const openBidModal = (auctionId: number) => {
    setSelectedAuctionId(auctionId);
    setIsBidNowModalOpen(true);
  };

  const { data,refetch: allAuctionsRefresh } = useGetAuctionsQuery();
  const auctions = data;

  const { mutateAsync: addNewAuction, data: addAuctionDate } = useAddNewAuctionMutation();

  const handleAddAuction = (auctionData: NewAuctionType) => {
    addNewAuction(auctionData);
    console.log("New Auction Data:", auctionData);
  };

  useEffect(() => {
   if(addAuctionDate) {
    allAuctionsRefresh()
   }
  }, [addAuctionDate])
  

  useAuth();



  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-start gap-10 py-20">
      <div>
        <Button onClick={handleOpen} className="bg-indigo-500" {...missingProperties}>
          New Auction
        </Button>
      </div>
     

      {/* Responsive Grid for Auction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {auctions?.map((auction) => (
          <Card key={auction.uid} {...missingProperties} className="w-full h-full">
            <CardBody {...missingProperties} className="flex flex-col w-ful h-full gap-2 bg-indigo-200 rounded-xl">
              <div>
                <span className="text-xl font-medium text-indigo-500">{auction.itemName}</span>
              </div>
              <div>
                <span>Current Price: </span>
                <span className="font-medium">{auction.price}</span>
              </div>
              <div>
                <span>Auction Start: </span> <span>{timeLeft(auction.auctionStart)}</span>
              </div>
              <div>
                <span>Auction Ends: </span> <span>{timeLeft(auction.auctionEnd)}</span>
              </div>
              <div>
                <span>Bids: </span> <span>{auction.bids?.length}</span>
              </div>
              <Button
                {...missingProperties}
                onClick={() => openBidModal(auction.id)}
                disabled={!auction.open}
                className="bg-indigo-500"
              >
                Bid Now
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <AddAuctionModal isOpen={isModalOpen} onClose={handleOpen} onSubmit={handleAddAuction} />
      {selectedAuctionId && <BidNowModal
        isOpen={isBidNowModalOpen}
        onClose={() => (allAuctionsRefresh(),setIsBidNowModalOpen(false))}
        auctionId={selectedAuctionId}
      />}
    </div>
  );
}
