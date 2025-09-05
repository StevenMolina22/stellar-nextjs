import type { ClientOptions } from "@stellar/stellar-sdk/contract";

export interface Campaign {
  creator: string;
  goal: number;
  min_donation: number;
  total_raised: number;
  supporters: number;
}

export interface CampaignInit {
  creator: string;
  goal: number;
  min_donation: number;
}

export interface BaseContractClient {
  readonly options: ClientOptions;
  toXDR(): string;
}

export interface CrowdfundingContract extends BaseContractClient {
  create_project: ({
    creator,
    goal,
    min_donation,
  }: {
    creator: string;
    goal: number;
    min_donation: number;
  }) => Promise<this>;
  create_campaign: ({
    creator,
    goal,
    min_donation,
  }: {
    creator: string;
    goal: number;
    min_donation: number;
  }) => Promise<this>;
  get_campaign: ({
    campaign_address,
  }: {
    campaign_address: string;
  }) => Promise<Campaign>;
  contribute: ({
    contributor,
    campaign_address,
    amount,
  }: {
    contributor: string;
    campaign_address: string;
    amount: number;
  }) => Promise<this>;
  withdraw: ({ creator }: { creator: string }) => Promise<this>;
  refund: ({
    contributor,
    campaign_address,
  }: {
    contributor: string;
    campaign_address: string;
  }) => Promise<this>;
}
