import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  user: t.router({
    getUser: publicProcedure.input(z.object({ id: z.number() })).output(z.object({
      id: z.number(),
      cid: z.string(),
      first: z.string(),
      last: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .nullable(),
      default_did: z.number().nullable(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getAllUsers: publicProcedure.output(z.array(z.object({
      id: z.number(),
      cid: z.string(),
      first: z.string(),
      last: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .nullable(),
      default_did: z.number().nullable(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createUser: publicProcedure.input(z.object({
      id: z.number(),
      cid: z.string(),
      first: z.string(),
      last: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .nullable(),
      default_did: z.number().nullable(),
    })).output(z.object({
      id: z.number(),
      cid: z.string(),
      first: z.string(),
      last: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .nullable(),
      default_did: z.number().nullable(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateUser: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        cid: z.string(),
        first: z.string(),
        last: z.string(),
        email: z.string().email(),
        phone: z
          .string()
          .min(10, 'Phone number must be at least 10 digits')
          .max(15, 'Phone number must be at most 15 digits')
          .nullable(),
        default_did: z.number().nullable(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      cid: z.string(),
      first: z.string(),
      last: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .nullable(),
      default_did: z.number().nullable(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateUserProfile: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        cid: z.string(),
        first: z.string(),
        last: z.string(),
        email: z.string().email(),
        phone: z
          .string()
          .min(10, 'Phone number must be at least 10 digits')
          .max(15, 'Phone number must be at most 15 digits')
          .nullable(),
        default_did: z.number().nullable(),
      }).extend({
        department: z.string().nullable(),
        FOPAL: z.string().nullable(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      cid: z.string(),
      first: z.string(),
      last: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits')
        .nullable(),
      default_did: z.number().nullable(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteUser: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  department: t.router({
    getDepartment: publicProcedure.input(z.object({ id: z.number(), uid: z.number() })).output(z.object({
      id: z.number(),
      name: z.string(),
      FOPAL: z.string(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    listDepartments: publicProcedure.input(z.object({ uid: z.number() })).output(z.array(z.object({
      id: z.number(),
      name: z.string(),
      FOPAL: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createDepartment: publicProcedure.input(z.object({
      id: z.number(),
      name: z.string(),
      FOPAL: z.string(),
    })).output(z.object({
      id: z.number(),
      name: z.string(),
      FOPAL: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateDepartment: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        name: z.string(),
        FOPAL: z.string(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      name: z.string(),
      FOPAL: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteDepartment: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  job: t.router({
    getJob: publicProcedure.input(z.object({ id: z.number(), uid: z.number() })).output(z.object({
      id: z.number(),
      pid: z.number(),
      file_name: z.string(),
      file_path: z.string(),
      num_copies: z.number(),
      num_pages: z.number(),
      comment: z.string().optional(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    listJobs: publicProcedure.input(z.object({ uid: z.number() })).output(z.array(z.object({
      id: z.number(),
      pid: z.number(),
      file_name: z.string(),
      file_path: z.string(),
      num_copies: z.number(),
      num_pages: z.number(),
      comment: z.string().optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createJob: publicProcedure.input(z.object({
      id: z.number(),
      pid: z.number(),
      file_name: z.string(),
      file_path: z.string(),
      num_copies: z.number(),
      num_pages: z.number(),
      comment: z.string().optional(),
    })).output(z.object({
      id: z.number(),
      pid: z.number(),
      file_name: z.string(),
      file_path: z.string(),
      num_copies: z.number(),
      num_pages: z.number(),
      comment: z.string().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateJob: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        pid: z.number(),
        file_name: z.string(),
        file_path: z.string(),
        num_copies: z.number(),
        num_pages: z.number(),
        comment: z.string().optional(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      pid: z.number(),
      file_name: z.string(),
      file_path: z.string(),
      num_copies: z.number(),
      num_pages: z.number(),
      comment: z.string().optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteJob: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  order: t.router({
    getOrder: publicProcedure.input(z.object({ id: z.number(), uid: z.number() })).output(z.object({
      id: z.number(),
      department_name: z.string(),
      FOPAL: z.string(),
      date_needed: z.date(),
      time_needed: z.string().nullable(),
      date_submitted: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    listOrders: publicProcedure.input(z.object({ uid: z.number() })).output(z.array(z.object({
      id: z.number(),
      department_name: z.string(),
      FOPAL: z.string(),
      date_needed: z.date(),
      time_needed: z.string().nullable(),
      date_submitted: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createOrder: publicProcedure.input(z.object({
      id: z.number(),
      department_name: z.string(),
      FOPAL: z.string(),
      date_needed: z.date(),
      time_needed: z.string().nullable(),
      date_submitted: z.date(),
    })).output(z.object({
      id: z.number(),
      department_name: z.string(),
      FOPAL: z.string(),
      date_needed: z.date(),
      time_needed: z.string().nullable(),
      date_submitted: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateOrder: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        department_name: z.string(),
        FOPAL: z.string(),
        date_needed: z.date(),
        time_needed: z.string().nullable(),
        date_submitted: z.date(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      department_name: z.string(),
      FOPAL: z.string(),
      date_needed: z.date(),
      time_needed: z.string().nullable(),
      date_submitted: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteOrder: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  template: t.router({
    getTemplate: publicProcedure.input(z.object({ id: z.number(), uid: z.number() })).output(z.object({
      id: z.number(),
      name: z.string(),
      department: z.string(),
      FOPAL: z.string(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    listTemplates: publicProcedure.input(z.object({ uid: z.number() })).output(z.array(z.object({
      id: z.number(),
      name: z.string(),
      department: z.string(),
      FOPAL: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createTemplate: publicProcedure.input(z.object({
      id: z.number(),
      name: z.string(),
      department: z.string(),
      FOPAL: z.string(),
    })).output(z.object({
      id: z.number(),
      name: z.string(),
      department: z.string(),
      FOPAL: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateTemplate: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        name: z.string(),
        department: z.string(),
        FOPAL: z.string(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      name: z.string(),
      department: z.string(),
      FOPAL: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteTemplate: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  profile: t.router({
    getProfile: publicProcedure.input(z.object({ id: z.number(), uid: z.number() })).output(z.object({
      id: z.number(),
      name: z.string(),
      is_color: z.boolean(),
      double_sizing: z.string(),
      paper_color: z.string(),
      paper_size: z.string(),
      distribution: z.string(),
      binding: z.string(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    listProfiles: publicProcedure.input(z.object({ uid: z.number() })).output(z.array(z.object({
      id: z.number(),
      name: z.string(),
      is_color: z.boolean(),
      double_sizing: z.string(),
      paper_color: z.string(),
      paper_size: z.string(),
      distribution: z.string(),
      binding: z.string(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createProfile: publicProcedure.input(z.object({
      id: z.number(),
      name: z.string(),
      is_color: z.boolean(),
      double_sizing: z.string(),
      paper_color: z.string(),
      paper_size: z.string(),
      distribution: z.string(),
      binding: z.string(),
    })).output(z.object({
      id: z.number(),
      name: z.string(),
      is_color: z.boolean(),
      double_sizing: z.string(),
      paper_color: z.string(),
      paper_size: z.string(),
      distribution: z.string(),
      binding: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateProfile: publicProcedure.input(z.object({
      id: z.number(),
      data: z.object({
        id: z.number(),
        name: z.string(),
        is_color: z.boolean(),
        double_sizing: z.string(),
        paper_color: z.string(),
        paper_size: z.string(),
        distribution: z.string(),
        binding: z.string(),
      }).partial(),
    })).output(z.object({
      id: z.number(),
      name: z.string(),
      is_color: z.boolean(),
      double_sizing: z.string(),
      paper_color: z.string(),
      paper_size: z.string(),
      distribution: z.string(),
      binding: z.string(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteProfile: publicProcedure.input(z.object({
      id: z.number(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

