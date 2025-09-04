import useModal from "../hooks/useModal";
import Modal from "./Modal";
import { stellarService } from "../lib/stellar";
import { walletService } from "../lib/wallet";
import type { ICampaign, ICrowdfundingContract } from "../interfaces/interface";
import { useProvider } from "../providers/Provider";
import { Button } from "@/components/ui/button";

function AddCampaign() {
  const { currentAccount, setCampaigns, setHashId } = useProvider();
  const { showModal, openModal, closeModal } = useModal();

  const handleCreateCampaign = async () => {
    const creator: string =
      "GDT26YDR47N3AC2RHMXPW65TM754XTMHTSE7RKSOP6W4NTOAFDERMWT3";
    const goal: number = 10000000;
    const minDonation: number = 1000000;
    const contractClient =
      await stellarService.buildClient<ICrowdfundingContract>(currentAccount);

    const xdr = (
      await contractClient.create_campaign({
        creator,
        goal,
        min_donation: minDonation,
      })
    ).toXDR();

    const signedTx = await walletService.signTransaction(xdr);

    const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr);

    const newCampaign: ICampaign = {
      creator,
      goal,
      min_donation: minDonation,
      total_raised: 0,
      supporters: 0,
    };

    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    setHashId(hashId);
    closeModal();
  };

  return (
    <div className="mb-4 flex justify-end">
      <Button color="blue" onClick={handleCreateCampaign}>
        Add Campaign
      </Button>
    </div>
  );
}

export default AddCampaign;
