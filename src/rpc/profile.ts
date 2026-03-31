"use server";

import z from "zod/v3";
import { admins, publicUsers, schools } from "@/mock-data";
import { delayedValue } from "@/lib/utils";
import {
  mapSppgProfileDtoToDomain,
  type TAdminProfile,
  type TCurrentProfile,
  type TSppgProfile,
} from "@/types";
import { createServerApiClient } from "./server-api-client";

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

const currentPublicProfileRole: CurrentProfileMock["role"] = "PUBLIC";

function buildCurrentProfileMock(): CurrentProfileMock {
  if (currentPublicProfileRole === "SCHOOL") {
    const school = schools[0];

    return {
      role: "SCHOOL",
      id: school?.id ?? "user-school-001",
      username: school?.username ?? "school-1",
      schoolId: school?.schoolId ?? "SCH-MLG-001",
      schoolName: school?.schoolName ?? "Sekolah",
      address: school?.address ?? "",
      displayName: school?.schoolName ?? "Sekolah",
      email: "sekolah@pagar.app",
    };
  }

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

export async function fetchCurrentProfile(): Promise<TCurrentProfile> {
  const rawData = await delayedValue(buildCurrentProfileMock(), 300);

  return currentProfileSchema.parse(rawData);
}

export async function fetchCurrentSppgProfile(): Promise<TSppgProfile> {
  const client = createServerApiClient();
  const dto = await client.getSppgProfile();

  return currentSppgProfileSchema.parse(mapSppgProfileDtoToDomain(dto.data));
}

export async function fetchCurrentAdminProfile(): Promise<TAdminProfile> {
  const rawData = await delayedValue(buildCurrentAdminProfileMock(), 300);

  return currentAdminProfileSchema.parse(rawData);
}
