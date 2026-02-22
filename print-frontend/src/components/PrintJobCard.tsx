import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
// import Dropzone from "shadcn-dropzone";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { FileDropzone } from "./FileDropzone";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { use, useState } from "react";
import { ProfileFields } from "./ProfileFields";
import type { ProfileDTO } from "@print-shop/backend";
import { set } from "zod";

type PrintJobCardProps = {
  index: number;
  profileOptions?: {
    id: number;
    name: string;
  }[];
  isDetail?: boolean;
  isDirtyProfile?: boolean;
  onRemove?: (index: number) => void;
  className?: string;
};

export function PrintJobCard({
  index,
  profileOptions,
  isDetail,
  isDirtyProfile,
  onRemove,
  className,
}: PrintJobCardProps) {
  const [useDetail, setUseDetail] = useState(isDetail ?? false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [profile, setProfile] = useState<Partial<ProfileDTO>>({});

  const applyProfileById = (id: string) => {
    const p = profileOptions?.find((x) => x.id === Number(id));
    if (!p) return;
    setProfile(p);
    setSelectedProfileId(id);
  };
  return (
    <Card className={`w-full max-h-[80vh] max-w-xs gap-2 ${className ?? ""}`}>
      <CardHeader className="shrink-0">
        <CardTitle>Print Job {index}</CardTitle>
        <CardAction
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(index);
          }}
        >
          {/* on hover = red */}
          <X className="text-red-700 hover:text-red-500" />
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-auto flex flex-col gap-2">
        <Label>Printing Profile</Label>
        <Select
          value={selectedProfileId}
          onValueChange={(value) => {
            if (value === "__add__") {
              // add new profile
              console.log("Add new profile");
            } else {
              console.log("Select profile", value);
              setProfile(
                profileOptions?.find((p) => p.id === Number(value)) ?? {},
              );
              setSelectedProfileId(value);
              console.log(profile);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {profileOptions?.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              ))}
              <SelectItem value="__add__">
                <Plus />
              </SelectItem>
              <SelectItem value="__custom__" hidden>
                Custom
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>File to be Printed</Label>
        <FileDropzone />

        <Label>Number of Copies</Label>
        <Input type="number" min="1" defaultValue="" />

        {useDetail && (
          <ProfileFields
            key={selectedProfileId}
            profile={profile}
            onValueChange={(key, value) => {
              const next = { ...profile, [key]: value };
              setProfile(next);
              setSelectedProfileId("__custom__");
            }}
          />
        )}

        <Label>Comments</Label>
        <Textarea placeholder="Leave your comments here" />
      </CardContent>
      <CardFooter className="shrink-0 justify-center">
        {useDetail ? (
          <ChevronUp
            className="hover:text-blue-500"
            onClick={() => setUseDetail(false)}
          />
        ) : (
          <ChevronDown
            className="hover:text-blue-500"
            onClick={() => setUseDetail(true)}
          />
        )}
      </CardFooter>
    </Card>
  );
}
