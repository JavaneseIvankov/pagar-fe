"use server";

import z from "zod/v3";
import { getAuthSession, requireCurrentRole } from "@/lib/auth/server";
import {
  mapAdminProfileDtoToDomain,
  mapPublicProfileDtoToDomain,
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
      const dto = await client.getPublicProfile();

      return parse(
        currentProfileSchema,
        mapPublicProfileDtoToDomain(dto.data, {
          userId: session.user.id,
        }) satisfies CurrentProfileMock,
        "public-profile",
      );
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
  async ({ client, parse }): Promise<TAdminProfile> => {
    const session = await requireCurrentRole(
      ["ADMIN"],
      "Profil admin hanya tersedia untuk akun admin.",
    );
    const dto = await client.getAdminProfile();

    return parse(
      currentAdminProfileSchema,
      mapAdminProfileDtoToDomain(dto.data, {
        userId: session.user.id,
      }),
      "admin-profile",
    );
  },
);

export type UpdateCurrentSchoolProfileInput = {
  address: string;
  schoolName: string;
};

export type UpdateCurrentSppgProfileInput = {
  address: string;
  sppgName: string;
};

export type UpdateCurrentAdminProfileInput = {
  email: string;
  name: string;
  password?: string;
  username: string;
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

export const updateCurrentSppgProfile = createServerRpc(
  {
    operation: "updateCurrentSppgProfile",
  },
  async (
    { client },
    input: UpdateCurrentSppgProfileInput,
  ): Promise<{ message: string }> => {
    await requireCurrentRole(
      ["SPPG"],
      "Pembaruan profil SPPG hanya tersedia untuk akun SPPG.",
    );

    const dto = await client.updateSppgProfile({
      body: {
        sppg_name: input.sppgName,
        sppg_address: input.address,
      },
    });

    return {
      message: dto.message,
    };
  },
);

export const updateCurrentAdminProfile = createServerRpc(
  {
    operation: "updateCurrentAdminProfile",
  },
  async (
    { client },
    input: UpdateCurrentAdminProfileInput,
  ): Promise<{ message: string }> => {
    await requireCurrentRole(
      ["ADMIN"],
      "Pembaruan profil admin hanya tersedia untuk akun admin.",
    );

    const dto = await client.updateProfile({
      body: {
        name: input.name,
        username: input.username,
        email: input.email,
        password: input.password,
      },
    });

    return {
      message: dto.message,
    };
  },
);
