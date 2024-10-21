// components/AddAuctionModal.js
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import { missingProperties } from '@/utils';
import { NewAuctionType } from '@/interfaces/Auctions';

const AddAuctionModal = ({ isOpen, onClose, onSubmit }: {isOpen: boolean, onClose: () => void, onSubmit: (auctionData: NewAuctionType) => void}) => {
  const [auctionData, setAuctionData] = useState<NewAuctionType>({
    itemName: '',
    auctionStart: null,
    auctionEnd: null,
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setAuctionData({ ...auctionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(auctionData);
    setAuctionData({ itemName: '', auctionStart: null, auctionEnd: null }); // Reset the form
    onClose(); // Close the modal
  };
  
  return (
    <Dialog  {...missingProperties} open={isOpen} handler={onClose} size="sm">
      <DialogHeader  {...missingProperties}>Add New Auction</DialogHeader>
      <DialogBody  {...missingProperties} divider>
        <div className="space-y-4">
          <Input
                  crossOrigin={undefined} {...missingProperties}
                  label="Item Name"
                  name="itemName"
                  value={auctionData.itemName}
                  onChange={handleChange}          />
          <Input
              crossOrigin={undefined} {...missingProperties}
            type="date"
            label="Auction Start"
            name="auctionStart"
            value={auctionData.auctionStart ? auctionData?.auctionStart.toString().substring(0, 10) : ''}
            onChange={handleChange}
          />
          <Input
              crossOrigin={undefined} {...missingProperties}
            type="date"
            label="Auction End"
            name="auctionEnd"
            value={auctionData.auctionEnd  ? auctionData?.auctionEnd.toString().substring(0, 10) : ''}
            onChange={handleChange}
          />
        </div>
      </DialogBody>
      <DialogFooter {...missingProperties}>
        <Button  {...missingProperties} className='bg-red-400 capitalize mr-2'onClick={onClose} >
          Cancel
        </Button>
        <Button {...missingProperties} className='bg-indigo-500 capitalize' onClick={handleSubmit}>
          Add Auction
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddAuctionModal;
