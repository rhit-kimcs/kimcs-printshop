import { useAuth } from "@/contexts/auth-context";
import { Label } from "../components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useUser } from "@/hooks/use-user";
import { useDepartment } from "@/hooks/use-department";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FormTextField } from "@/components/FormTextField";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combo-box";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

export function UserPage() {
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
  const { useListDepartments, useAddDepartment } = useDepartment();

  const userQuery = useGetUser(uid);
  const listDepartmentsQuery = useListDepartments(uid);
  const addDepartmentMutation = useAddDepartment();

  const departments = useMemo(() => {
    const names = listDepartmentsQuery.data?.map((d) => d.name) ?? [];
    return [...names, "Add Department"];
  }, [listDepartmentsQuery.data]);

  const [addDeptOpen, setAddDeptOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptFopal, setNewDeptFopal] = useState("");

  const handleDepartmentSelect = (value: string | null) => {
    if (value == null) return;
    if (value === "Add Department") {
      setAddDeptOpen(true);
      return;
    }
    form.setFieldValue("department", value);
    const dept = listDepartmentsQuery.data?.find((d) => d.name === value);
    if (dept) {
      form.setFieldValue("default_did", dept.id);
      form.setFieldValue("FOPAL", dept.FOPAL);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDeptName.trim() || !newDeptFopal.trim()) return;
    try {
      const added = (await (
        addDepartmentMutation.mutateAsync as unknown as (
          input: { uid: number; name: string; FOPAL: string }
        ) => Promise<{ id: number; name: string; FOPAL: string }>
      )({
        uid,
        name: newDeptName.trim(),
        FOPAL: newDeptFopal.trim(),
      })) as { id: number; name: string; FOPAL: string };
      await listDepartmentsQuery.refetch();
      form.setFieldValue("department", added.name);
      form.setFieldValue("default_did", added.id);
      form.setFieldValue("FOPAL", added.FOPAL);
      setNewDeptName("");
      setNewDeptFopal("");
      setAddDeptOpen(false);
    } catch (err) {
      console.error("Failed to add department:", err);
    }
  };

  const isConnectionError =
    userQuery.isError &&
    (userQuery.error?.message?.includes("fetch") ||
      userQuery.error?.message?.includes("CONNECTION_REFUSED") ||
      userQuery.error?.message?.toLowerCase().includes("connection"));

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
      await useUpdateUserProfile.mutateAsync({
        id: uid,
        data: value,
      });
    },
  });

  // Sync form from server only once per user (or when user id changes). Do not
  // run while the Add Department dialog is open so we never clear the form when
  // the user opens the dialog.
  const lastSyncedUserIdRef = useRef<number | null>(null);
  useEffect(() => {
    if (addDeptOpen) return;
    const data = userQuery.data;
    if (!data?.id) return;
    if (lastSyncedUserIdRef.current === data.id) return;
    lastSyncedUserIdRef.current = data.id;
    const userData = data as typeof data & {
      department?: string | null;
      FOPAL?: string | null;
    };
    form.reset({
      ...userData,
      department: userData.department ?? "",
      FOPAL: userData.FOPAL ?? "",
    });
  }, [userQuery.data, addDeptOpen]);

  // useEffect(() => {
  //   if (!departmentQuery.data) return;
  //   console.log("updating department value:", departmentQuery.data);
  //   console.log(form.state.values);
  //   form.setFieldValue("department", departmentQuery.data.name ?? "");
  //   form.setFieldValue("FOPAL", departmentQuery.data.FOPAL ?? "");
  // }, [departmentQuery.isSuccess, departmentQuery.data, form]);

  // Only show loading on initial load when we have no data yet. Once we have
  // user data, keep showing the form even while refetching, so the form never
  // unmounts and clears when e.g. the Add Department dialog is opened.
  if (userQuery.isLoading && !userQuery.data) {
    return (
      <div className="flex h-full flex-col justify-center items-center">
        <Label className="text-lg">Loading user information…</Label>
      </div>
    );
  }

  if (userQuery.isError) {
    return (
      <div className="flex h-full flex-col justify-center items-center gap-4">
        <Card className="w-full max-w-md gap-2">
          <CardHeader>
            <CardTitle className="text-xl text-destructive">Could not load user</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground text-sm">
              {isConnectionError
                ? "The app could not reach the backend. Make sure the backend is running (e.g. run `pnpm dev` from the project root so both frontend and backend start)."
                : userQuery.error?.message ?? "Something went wrong loading your profile."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => userQuery.refetch()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <Card className="w-full max-w-md gap-2">
        <CardHeader>
          <CardTitle className="text-xl">User Info</CardTitle>
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
                          {departments.map((item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          ))}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    <FieldError>
                      {field.state.meta.errors
                        ?.map((e) =>
                          typeof e === "string" ? e : (e as { message?: string })?.message
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
            <DialogDescription>
              Enter the department name and FOPAL to add a new department for your account.
            </DialogDescription>
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
            <Button
              onClick={handleAddDepartment}
              disabled={addDepartmentMutation.isPending || !newDeptName.trim() || !newDeptFopal.trim()}
            >
              {addDepartmentMutation.isPending ? "Adding…" : "Add Department"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
