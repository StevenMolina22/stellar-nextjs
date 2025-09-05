"use client";
import { stellarService } from "../lib/stellar";
import { walletService } from "../lib/wallet";
import type {
  CrowdfundingContract,
  CampaignInit,
} from "../interfaces/crowdfunding";
import { Button } from "@/components/ui/button";

function AddCampaign({ campaign }: { campaign: CampaignInit }) {
  const handleCreateCampaign = async () => {
    const contractClient =
      await stellarService.buildClient<CrowdfundingContract>(campaign.creator);

    const xdr = (await contractClient.create_project(campaign)).toXDR();
    const signedTx = await walletService.signTransaction(xdr);
    const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr);
  };

  return (
    <Button color="blue" onClick={handleCreateCampaign}>
      Add Campaign
    </Button>
  );
}

export default AddCampaign;
