import z from "zod/v3";
import { admins, publicUsers, schools, sppgs } from "@/mock-data";
import { delayedValue } from "@/lib/utils";
import type { TAdminProfile, TCurrentProfile, TSppgProfile } from "@/types";

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
type CurrentSppgProfileMock = z.infer<typeof currentSppgProfileSchema>;
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

function buildCurrentSppgProfileMock(): CurrentSppgProfileMock {
  const sppg = sppgs[0];

  return {
    role: "SPPG",
    id: sppg?.id ?? "user-sppg-001",
    username: sppg?.username ?? "sppg-1",
    sppgId: sppg?.sppgId ?? "SPPG-MLG-001",
    sppgName: sppg?.sppgName ?? "SPPG",
    address: sppg?.address ?? "",
    description:
      "Penyedia nutrisi presisi tersertifikasi untuk program kesehatan nasional dengan fokus pada transparansi rantai pasok.",
    email: "sppg@pagar.app",
    location: "Kota Malang, Kec. Kedungkandang",
    registrationCode: "REG-SPPG-001",
    accountStatus: "APPROVED",
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
  const rawData = await delayedValue(buildCurrentSppgProfileMock(), 300);

  return currentSppgProfileSchema.parse(rawData);
}

export async function fetchCurrentAdminProfile(): Promise<TAdminProfile> {
  const rawData = await delayedValue(buildCurrentAdminProfileMock(), 300);

  return currentAdminProfileSchema.parse(rawData);
}
