import type { ClientOptions } from "@stellar/stellar-sdk/contract";

export interface BaseContractClient {
  readonly options: ClientOptions;
  toXDR(): string;
}

// === StartupFunding Contract Types ===
export enum ProjectState {
  Pending = "Pending",
  Active = "Active",
  Completed = "Completed",
  Failed = "Failed",
}

export enum MilestoneState {
  Locked = "Locked",
  Funding = "Funding",
  AwaitingValidation = "AwaitingValidation",
  Successful = "Successful",
  Failed = "Failed",
}

export interface MilestoneInit {
  goal: number; // i128 in Rust maps to number in TypeScript
  definition_hash: string;
}

export interface Milestone {
  sequence: number; // u32
  state: MilestoneState;
  goal: number; // i128
  total_raised: number; // i128
  deadline: number; // u64
  definition_hash: string;
  proof_hash?: string; // Option<String>
}

export interface Project {
  id: number; // u64
  creator: string; // Address
  state: ProjectState;
  offchain_hash: string;
  milestone_count: number; // u32
  current_milestone: number; // u32
}

export interface ProjectInit {
  creator: string;
  project_hash: string;
  milestones: MilestoneInit[];
}

export interface StartupFundingContract extends BaseContractClient {
  // === Phase 2: Project & Milestone Lifecycle ===
  create_project: ({
    creator,
    project_hash,
    milestones,
  }: {
    creator: string;
    project_hash: string;
    milestones: MilestoneInit[];
  }) => Promise<this>; // Returns project_id (u64)

  validate_project: ({
    admin,
    project_id,
    approved,
  }: {
    admin: string;
    project_id: number;
    approved: boolean;
  }) => Promise<this>;

  submit_proof: ({
    creator,
    project_id,
    proof_hash,
  }: {
    creator: string;
    project_id: number;
    proof_hash: string;
  }) => Promise<this>;

  get_project: ({ project_id }: { project_id: number }) => Promise<Project>;

  get_milestone: ({
    project_id,
    sequence,
  }: {
    project_id: number;
    sequence: number;
  }) => Promise<Milestone>;

  // === Phase 3: Core Financial Logic ===
  invest: ({
    investor,
    project_id,
    amount,
  }: {
    investor: string;
    project_id: number;
    amount: number;
  }) => Promise<this>;

  release_milestone_funds: ({
    creator,
    project_id,
    milestone_sequence,
  }: {
    creator: string;
    project_id: number;
    milestone_sequence: number;
  }) => Promise<this>;

  refund_milestone_investment: ({
    investor,
    project_id,
    milestone_sequence,
  }: {
    investor: string;
    project_id: number;
    milestone_sequence: number;
  }) => Promise<this>;

  check_milestone_deadline: ({
    project_id,
    milestone_sequence,
  }: {
    project_id: number;
    milestone_sequence: number;
  }) => Promise<this>;

  // === Phase 4: State Transition & Automation ===
  validate_project_milestone: ({
    admin,
    project_id,
    approved,
  }: {
    admin: string;
    project_id: number;
    approved: boolean;
  }) => Promise<this>;
}
