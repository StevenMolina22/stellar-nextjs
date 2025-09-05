"use client";
import AddCampaign from "@/components/AddCampaign";
import AddProject from "@/components/AddProject";

export default function Home() {
  const project = {
    creator: process.env.NEXT_PUBLIC_ADMIN!,
    project_hash: process.env.NEXT_PUBLIC_ADMIN!,
    milestones: [
      {
        goal: 1000000000,
        definition_hash: "",
      },
    ],
  };
  const campaign = {
    creator: process.env.NEXT_PUBLIC_ADMIN!,
    goal: 10000000,
    min_donation: 1000000,
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AddProject project={project} />
      </main>
    </div>
  );
}
