"use server";

import z from "zod/v3";
import { admins, publicUsers } from "@/mock-data";
import { getAuthSession, requireCurrentRole } from "@/lib/auth/server";
import { delayedValue } from "@/lib/utils";
import {
  mapSchoolProfileDtoToDomain,
  mapSppgProfileDtoToDomain,
  type TAdminProfile,
  type TCurrentProfile,
  type TSppgProfile,
} from "@/types";
import { createServerRpc } from "./server-rpc";

// TODO: Replace with actual API mock or call (once shape is established)
const currentProfileSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal("PUBLIC"),
    id: z.string(),
    username: z.string(),
    displayName: z.string(),
    email: z.string().email(),
  }),
  z.object({
    role: z.literal("SCHOOL"),
    id: z.string(),
    username: z.string(),
    schoolId: z.string(),
    schoolName: z.string(),
    address: z.string(),
    displayName: z.string(),
    email: z.string().email(),
  }),
]);

const currentSppgProfileSchema = z.object({
  role: z.literal("SPPG"),
  id: z.string(),
  username: z.string(),
  sppgId: z.string(),
  sppgName: z.string(),
  address: z.string(),
  description: z.string(),
  email: z.string().email(),
  location: z.string(),
  registrationCode: z.string(),
  accountStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

const currentAdminProfileSchema = z.object({
  role: z.literal("ADMIN"),
  id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  accessDetails: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    }),
  ),
});

type CurrentProfileMock = z.infer<typeof currentProfileSchema>;
type CurrentAdminProfileMock = z.infer<typeof currentAdminProfileSchema>;

function buildCurrentPublicProfileMock(): CurrentProfileMock {
  const publicUser = publicUsers[0];

  return {
    role: "PUBLIC",
    id: publicUser?.id ?? "user-public-001",
    username: publicUser?.username ?? "pengguna",
    displayName: "Pengguna Publik",
    email: "warga@pagar.app",
  };
}

function buildCurrentAdminProfileMock(): CurrentAdminProfileMock {
  const admin = admins[0];

  return {
    role: "ADMIN",
    id: admin?.id ?? "user-admin-001",
    username: admin?.username ?? "admin",
    name: "Admin Pagar",
    email: "admin@pagar.app",
    accessDetails: [
      {
        id: "manage-sppg",
        label: "Mengelola Vendor SPPG",
      },
      {
        id: "manage-accounts",
        label: "Mengelola Akun",
      },
      {
        id: "monitor-data",
        label: "Memantau Data",
      },
    ],
  };
}

export const fetchCurrentProfile = createServerRpc(
  {
    operation: "fetchCurrentProfile",
  },
  async ({ client, parse }): Promise<TCurrentProfile> => {
    const session = await getAuthSession();

    if (session?.user.role === "SCHOOL") {
      const dto = await client.getSchoolProfile();

      return parse(
        currentProfileSchema,
        mapSchoolProfileDtoToDomain(dto.data, {
          username: session.user.username,
        }),
        "school-profile",
      );
    }

    if (session?.user.role === "PUBLIC") {
      const rawData = await delayedValue(buildCurrentPublicProfileMock(), 300);

      return parse(currentProfileSchema, rawData, "public-profile");
    }

    if (!session) {
      throw new Error("Sesi profil tidak ditemukan.");
    }

    throw new Error("Profil saat ini hanya tersedia untuk publik dan sekolah.");
  },
);

export const fetchCurrentSppgProfile = createServerRpc(
  {
    operation: "fetchCurrentSppgProfile",
  },
  async ({ client, parse }): Promise<TSppgProfile> => {
    const dto = await client.getSppgProfile();

    return parse(
      currentSppgProfileSchema,
      mapSppgProfileDtoToDomain(dto.data),
      "response",
    );
  },
);

export const fetchCurrentAdminProfile = createServerRpc(
  {
    operation: "fetchCurrentAdminProfile",
  },
  async ({ parse }): Promise<TAdminProfile> => {
    const rawData = await delayedValue(buildCurrentAdminProfileMock(), 300);

    return parse(currentAdminProfileSchema, rawData, "mock-response");
  },
);

export type UpdateCurrentSchoolProfileInput = {
  address: string;
  schoolName: string;
};

export const updateCurrentSchoolProfile = createServerRpc(
  {
    operation: "updateCurrentSchoolProfile",
  },
  async (
    { client, parse },
    input: UpdateCurrentSchoolProfileInput,
  ): Promise<TCurrentProfile> => {
    const session = await requireCurrentRole(
      ["SCHOOL"],
      "Pembaruan profil sekolah hanya tersedia untuk akun sekolah.",
    );

    const dto = await client.updateSchoolProfile({
      body: {
        school_address: input.address,
        school_name: input.schoolName,
      },
    });

    return parse(
      currentProfileSchema,
      mapSchoolProfileDtoToDomain(dto.data, {
        username: session.user.username,
      }),
      "updated-school-profile",
    );
  },
);
