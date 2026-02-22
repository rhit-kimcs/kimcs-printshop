import { FileDropzone } from "@/components/FileDropzone";
import { PrintJobCard } from "@/components/PrintJobCard";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import type { JobDTO } from "@print-shop/backend";
import { Plus } from "lucide-react";
import { useState } from "react";

export function OrderPage() {
  const { useListProfiles } = useProfile();
  const { data: profiles } = useListProfiles(1);
  console.log(profiles);
  const [jobs, setJobs] = useState<Partial<JobDTO>[]>([{}, {}, {}, {}]);
  console.log(profiles);
  return (
    <div className="flex h-full justify-center items-center gap-4 m-4 overflow-x-auto overscroll-contain">
      {jobs.map((job, index) => (
        <PrintJobCard
          index={index + 1}
          profileOptions={profiles}
          onRemove={(index) => {
            setJobs(jobs.filter((_, i) => i !== index - 1));
          }}
          className="shrink-0"
        />
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="h-20 w-20"
        onClick={() => setJobs([...jobs, {}])}
      >
        <Plus className="size-10" />
      </Button>
    </div>
  );
}
