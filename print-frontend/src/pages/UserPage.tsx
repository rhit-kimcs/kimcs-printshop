import { useAuth } from "@/contexts/auth-context";
import { Label } from "../components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useUser } from "@/hooks/use-user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const userQuery = useGetUser(uid);



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

  useEffect(() => {
    if (!userQuery.data) return;
    console.log("Updating user info,", userQuery.data);
    const data = userQuery.data as typeof userQuery.data & {
      department?: string | null;
      FOPAL?: string | null;
    };
    form.reset({
      ...data,
      department: data.department ?? "",
      FOPAL: data.FOPAL ?? "",
    });
  }, [userQuery.isSuccess, userQuery.data, form]);

  // useEffect(() => {
  //   if (!departmentQuery.data) return;
  //   console.log("updating department value:", departmentQuery.data);
  //   console.log(form.state.values);
  //   form.setFieldValue("department", departmentQuery.data.name ?? "");
  //   form.setFieldValue("FOPAL", departmentQuery.data.FOPAL ?? "");
  // }, [departmentQuery.isSuccess, departmentQuery.data, form]);

  

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
                  <FormTextField
                    field={field}
                    label="Default Department"
                    placeholder="Enter your default department"
                    className="gap-1"
                  />
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
    </div>
  );
}
