import { stellarService } from "../lib/stellar";
import { walletService } from "../lib/wallet";
import { Button } from "@/components/ui/button";
import {
  Project,
  ProjectInit,
  StartupFundingContract,
} from "@/interfaces/funding";

function AddCampaign({ project }: { project: ProjectInit }) {
  const handleCreateProject = async () => {
    const contractClient =
      await stellarService.buildClient<StartupFundingContract>(project.creator);

    const xdr = (await contractClient.create_project(project)).toXDR();
    const signedTx = await walletService.signTransaction(xdr);
    const hashId = await stellarService.submitTransaction(signedTx.signedTxXdr);
  };

  return (
    <Button color="blue" onClick={handleCreateProject}>
      Add Project
    </Button>
  );
}

export default AddCampaign;
