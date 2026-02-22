import { useAuth } from "@/contexts/auth-context";
import { Label } from "../components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useUser } from "@/hooks/use-user";
import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../components/ui/combo-box"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { useEffect } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FormTextField } from "@/components/FormTextField";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  id: z.number(),
  cid: z.string(),
  first: z.string().min(1, "First name must be at least 1 character"),
  last: z.string().min(1, "Last name must be at least 1 character"),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .nullable(),
  default_did: z.number().nullable(),
  department: z.string().nullable(),
  FOPAL: z.string().min(3, "FOPAL must be at least 3 characters").nullable(),
});

const initialDepartments = [
  "CSSE",
  "Add Department",
] as const


export function MainPage() {
  // Assume user is authenticated for now, will implement auth logic later
  const { auth } = useAuth();
  if (!auth || !auth.id) {
    return (
      <div className="flex h-screen flex-col justify-center items-center">
        <Label className="text-2xl font-bold">Please log in first.</Label>
      </div>
    );
  }
  const uid = auth.id;

  const { useGetUser, useUpdateUser, useUpdateUserProfile } = useUser();

  const userQuery = useGetUser(uid);
  const departmentQuery = useQuery(
    trpc.department.getDepartment.queryOptions(
      { id: userQuery.data?.default_did || 0, uid },
      { enabled: !!userQuery.data?.default_did },
    ),
  );

  // const [formData, setFormData] = useState<
  //   Partial<UserDTO> & { department?: string; FOPAL?: string }
  // >({
  //   first: "",
  //   last: "",
  //   email: "",
  //   phone: "",
  //   default_did: 0,
  //   department: "",
  //   FOPAL: "",
  // });

  const form = useForm({
    defaultValues: {
      first: "",
      last: "",
      email: "",
      phone: null,
      default_did: null,
      department: "",
      FOPAL: "",
    } as z.infer<typeof formSchema>,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // toast("You submitted the following values:", {
      //   description: (
      //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
      //       <code>{JSON.stringify(value, null, 2)}</code>
      //     </pre>
      //   ),
      //   position: "bottom-right",
      //   classNames: {
      //     content: "flex flex-col gap-2",
      //   },
      //   style: {
      //     "--border-radius": "calc(var(--radius)  + 4px)",
      //   } as React.CSSProperties,
      // });
      await useUpdateUserProfile.mutateAsync({
        id: uid,
        data: value,
      });
    },
  });

  useEffect(() => {
    if (!userQuery.data) return;
    form.reset({
      ...userQuery.data,
      department: departmentQuery.isSuccess
        ? departmentQuery.data?.name || ""
        : "",
      FOPAL: departmentQuery.isSuccess ? departmentQuery.data?.FOPAL || "" : "",
    });
  }, [
    departmentQuery.isSuccess,
    departmentQuery.data,
    userQuery.isSuccess,
    userQuery.data,
    form,
  ]);

  useEffect(() => {
    if (!departmentQuery.data) return;
    console.log("updating department value:", departmentQuery.data);
    console.log(form.state.values);
    form.setFieldValue("department", departmentQuery.data.name ?? "");
    form.setFieldValue("FOPAL", departmentQuery.data.FOPAL ?? "");
  }, [departmentQuery.isSuccess, departmentQuery.data, form]);

  const [departments, setDepartments] = useState<string[]>([...initialDepartments])

  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [addDeptOpen, setAddDeptOpen] = useState(false)

  const [newDeptName, setNewDeptName] = useState("")
  const [newDeptFopal, setNewDeptFopal] = useState("")

  const handleDepartmentSelect = (value: string | null) => {
    if (!value) return

    if (value === "Add Department") {
      setAddDeptOpen(true)
      return
    }

    form.setFieldValue("department", value)
  }

  const handleAddDepartment = () => {
    if (!newDeptName || !newDeptFopal) return

    setDepartments((prev) => [
      ...prev.filter((d) => d !== "Add Department"),
      newDeptName,
      "Add Department",
    ])

    setSelectedDepartment(newDeptName)
    setNewDeptName("")
    setNewDeptFopal("")
    setAddDeptOpen(false)
  }

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <Card className="w-full max-w-md gap-2">
        <CardHeader>
          <CardTitle className="text-xl">New Print Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="user-profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-2">
              <form.Field
                name="department"
                children={(field) => (
                  <div className="flex flex-col gap-1">
                    <FieldLabel>Default Department</FieldLabel>

                    <Combobox
                      items={departments}
                      value={field.state.value ?? ""}
                      onValueChange={handleDepartmentSelect}
                    >
                      <ComboboxInput placeholder="Select department" />
                      <ComboboxContent>
                        <ComboboxEmpty>No departments found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    <FieldError>
                      {field.state.meta.errors
                        ?.map((error) =>
                          typeof error === "string" ? error : error?.message
                        )
                        .join(", ")}
                    </FieldError>
                  </div>
                )}
              />
              <form.Field
                name="FOPAL"
                children={(field) => (
                  <FormTextField
                    field={field}
                    label="Default FOPAL"
                    placeholder="Enter your default FOPAL"
                    className="gap-1"
                  />
                )}
              />
              <form.Field
                name="first"
                children={(field) => (
                  <FormTextField
                    field={field}
                    label="First Name *"
                    placeholder="Enter your first name"
                    className="gap-1"
                  />
                )}
              />
              <form.Field
                name="last"
                children={(field) => (
                  <FormTextField
                    field={field}
                    label="Last Name *"
                    placeholder="Enter your last name"
                    className="gap-1"
                  />
                )}
              />
              <form.Field
                name="email"
                children={(field) => (
                  <FormTextField
                    field={field}
                    label="Email *"
                    placeholder="Enter your email"
                    className="gap-1"
                  />
                )}
              />
              <form.Field
                name="phone"
                children={(field) => (
                  <FormTextField
                    field={field}
                    label="Phone"
                    placeholder="Enter your phone number"
                    className="gap-1"
                  />
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
          <Button
            type="submit"
            form="user-profile-form"
            variant="default"
            className=""
          >
            Submit
          </Button>
          <Button variant="outline" className="">
            Cancel
          </Button>
          {useUpdateUserProfile.isSuccess && (
            <p className="text-sm text-green-700">
              Summary saved successfully.
            </p>
          )}
        </CardFooter>
      </Card>
      <Dialog open={addDeptOpen} onOpenChange={setAddDeptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Department Name</Label>
              <Input
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>Department FOPAL</Label>
              <Input
                value={newDeptFopal}
                onChange={(e) => setNewDeptFopal(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setAddDeptOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDepartment}>
              Add Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
