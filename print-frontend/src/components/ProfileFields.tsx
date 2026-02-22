import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { ProfileDTO } from "@print-shop/backend";

const options = {
  "B&W/Colored Copies": [
    { value: "black-white", label: "Black & White" },
    { value: "color", label: "Color" },
  ],
  "One-Sided or Back-to-Back": [
    { value: "one-sided", label: "One-Sided" },
    { value: "one-sided-collated", label: "One-Sided Collated" },
    {
      value: "one-sided-collated-stapled",
      label: "One-Sided Collated and Stapled",
    },
    { value: "back-to-back", label: "Back-to-Back" },
    { value: "back-to-back-collated", label: "Back-to-Back Collated" },
    {
      value: "back-to-back-collated-stapled",
      label: "Back-to-Back Collated & Stapled",
    },
  ],
  "Paper/Card Stock Color": {
    options: [
      { value: "20#-white", label: "20# White" },
      { value: "20#-blue", label: "20# Blue" },
      { value: "20#-yellow", label: "20# Yellow" },
      { value: "20#-green", label: "20# Green" },
      { value: "20#-pink", label: "20# Pink" },
      { value: "20#-golden-rod", label: "20# Golden Rod" },
      { value: "20#-cream", label: "20# Cream" },
      { value: "20#-cosmic-orange", label: "20# Cosmic Orange" },
      { value: "80#-white", label: "80# White" },
      { value: "80#-blue", label: "80# Blue" },
      { value: "80#-grey", label: "80# Grey" },
      { value: "80#-green", label: "80# Green" },
      { value: "80#-cream", label: "80# Cream" },
      { value: "80#-tan", label: "80# Tan" },
      { value: "80#-yellow", label: "80# Yellow" },
      { value: "100#-white", label: "100# White" },
      { value: "100#-blue", label: "100# Blue" },
      { value: "100#-green", label: "100# Green" },
      { value: "100#-yellow", label: "100# Yellow" },
      { value: "transparency", label: "Transparency" },
      { value: "24#-solar-crest", label: "24# Solar Crest (letterhead only)" },
    ],
  },
  "Paper Size": {
    options: [
      { value: "8.5x11", label: '8.5" x 11"' },
      { value: "8.5x11-3hole", label: '8.5" x 11" (3 hole)' },
      { value: "8.5x14", label: '8.5" x 14"' },
      { value: "11x17", label: '11" x 17"' },
      { value: "other", label: "Other" },
    ],
  },
  "Binding/Folding/Cutting/Gluing": {
    options: [
      { value: "none", label: "None" },
      { value: "half-fold", label: "1/2 Fold" },
      { value: "tri-fold", label: "Tri-Fold" },
      { value: "z-fold", label: '11" x 17" to 8.5" x 11" Z Fold' },
      { value: "booklet-stapled", label: "Booklet Stapled" },
      { value: "booklet-no-staple", label: "Booklet No Staple" },
      { value: "coil-bind", label: "Coil Bind" },
      { value: "cut", label: "Cut" },
      { value: "pad-50s", label: "Pad 50's" },
      { value: "pad-100s", label: "Pad 100's" },
    ],
  },
  "Campus Distribution": {
    options: [
      { value: "deliver-to-department", label: "Deliver to Department" },
      { value: "bookstore", label: "To be Sold in Bookstore" },
      { value: "faculty", label: "Faculty" },
      { value: "staff", label: "Staff" },
      { value: "freshman", label: "Freshman" },
      { value: "sophomores", label: "Sophomores" },
      { value: "juniors", label: "Juniors" },
      { value: "seniors", label: "Seniors" },
      { value: "graduate-students", label: "Graduate Students" },
      { value: "mail-processing-center", label: "Mail Processing Center" },
      { value: "will-pick-up", label: "Will Pick Up" },
    ],
  },
};

// Insert Into PrintingProfiles (uid, name, is_color, double_sizing, paper_color, paper_size, distribution, binding)
// Values (1, 'Test Profile', true, 'one-sided', '20#-white', '8.5x11', 'deliver-to-department', 'none');

export type ProfileFieldsProps = {
  profile: Partial<ProfileDTO>;
  onValueChange?: (field: keyof ProfileDTO, value: any) => void;
  className?: string;
};
export function ProfileFields({
  profile,
  className,
  onValueChange,
}: ProfileFieldsProps) {
  console.log("profile in ProfileFields:", profile);

  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <Label>B&W/Colored Copies</Label>
      <RadioGroup
        defaultValue={profile.is_color ? "color" : "black-white"}
        className="flex justify-center gap-2"
        onValueChange={(value) =>
          onValueChange?.("is_color", value === "color")
        }
      >
        <div className="flex flex-1 items-center gap-3">
          <RadioGroupItem value="black-white" id="black-white" />
          <Label htmlFor="black-white">Black & White</Label>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <RadioGroupItem value="color" id="color" />
          <Label htmlFor="color">Color</Label>
        </div>
      </RadioGroup>

      <Label>One-Sided or Back-to-Back</Label>
      <Select
        defaultValue={profile.double_sizing || undefined}
        onValueChange={(value) => onValueChange?.("double_sizing", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options["One-Sided or Back-to-Back"].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Paper/Card Stock Color</Label>
      <Select
        defaultValue={profile.paper_color || undefined}
        onValueChange={(value) => onValueChange?.("paper_color", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options["Paper/Card Stock Color"].options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Paper Size</Label>
      <Select
        defaultValue={profile.paper_size || undefined}
        onValueChange={(value) => onValueChange?.("paper_size", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options["Paper Size"].options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Binding/Folding/Cutting/Gluing</Label>
      <Select
        defaultValue={profile.binding || undefined}
        onValueChange={(value) => onValueChange?.("binding", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options["Binding/Folding/Cutting/Gluing"].options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label>Campus Distribution</Label>
      <Select
        defaultValue={profile.distribution || undefined}
        onValueChange={(value) => onValueChange?.("distribution", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options["Campus Distribution"].options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
