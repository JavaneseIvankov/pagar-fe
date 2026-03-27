import { z } from "zod/v3";
import { delayedValue } from "@/lib/utils";
import {
  loginBodySchema,
  loginErrorResponseSchema,
  loginSuccessResponseSchema,
  mapLoginDtoToDomain,
  mapRegisterDtoToDomain,
  registerBodySchema,
  registerErrorResponseSchema,
  registerSuccessResponseSchema,
  type TAccountStatus,
  type TAuthRegistrationResult,
  type TAuthSession,
  type TRole,
} from "@/types";

type AuthUserRecord = {
  accountStatus: TAccountStatus;
  bgnCode: string | null;
  idUser: string;
  password: string;
  registrationCode: string | null;
  role: TRole;
  username: string;
};

const authUserRecordSchema = z.object({
  idUser: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["ADMIN", "PUBLIC", "SCHOOL", "SPPG"]),
  registrationCode: z.string().nullable(),
  bgnCode: z.string().nullable(),
  accountStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

const authUserDatabaseSchema = z.array(authUserRecordSchema);

const INITIAL_AUTH_USERS: AuthUserRecord[] = [
  {
    idUser: "00000000-0000-4000-8000-000000000901",
    username: "admin.pagar",
    password: "Admin123",
    role: "ADMIN",
    registrationCode: null,
    bgnCode: null,
    accountStatus: "APPROVED",
  },
  {
    idUser: "00000000-0000-4000-8000-000000000902",
    username: "warga.malang",
    password: "Public123",
    role: "PUBLIC",
    registrationCode: null,
    bgnCode: null,
    accountStatus: "APPROVED",
  },
  {
    idUser: "00000000-0000-4000-8000-000000000903",
    username: "sdn-kauman-1",
    password: "School123",
    role: "SCHOOL",
    registrationCode: "REG-SCH-001",
    bgnCode: null,
    accountStatus: "APPROVED",
  },
  {
    idUser: "00000000-0000-4000-8000-000000000904",
    username: "sppg-berkah-nutrisi",
    password: "Sppg1234",
    role: "SPPG",
    registrationCode: null,
    bgnCode: "BGN-SPPG-001",
    accountStatus: "APPROVED",
  },
];

let fallbackAuthUserDatabase = [...INITIAL_AUTH_USERS];

function createAuthError(message: string) {
  const dto = loginErrorResponseSchema.parse({
    status: "error",
    message,
  });

  return new Error(dto.message);
}

function createUserId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `00000000-0000-4000-8000-${String(Date.now()).padStart(12, "0").slice(-12)}`;
}

function readAuthUserDatabase() {
  return authUserDatabaseSchema.parse(fallbackAuthUserDatabase);
}

function writeAuthUserDatabase(records: AuthUserRecord[]) {
  fallbackAuthUserDatabase = records;
}

export async function loginUser(input: {
  password: string;
  username: string;
}): Promise<TAuthSession> {
  const body = loginBodySchema.parse(input);
  const records = readAuthUserDatabase();
  const userRecord = records.find(
    (record) => record.username === body.username,
  );

  if (!userRecord || userRecord.password !== body.password) {
    throw createAuthError("Username atau kata sandi tidak valid.");
  }

  if (userRecord.accountStatus === "PENDING") {
    throw createAuthError("Akun Anda masih menunggu persetujuan admin.");
  }

  if (userRecord.accountStatus === "REJECTED") {
    throw createAuthError("Akun Anda ditolak. Hubungi admin untuk bantuan.");
  }

  const rawData = await delayedValue(
    {
      status: "success" as const,
      message: "Login berhasil.",
      data: {
        token: `mock-token-${userRecord.idUser}`,
        user: {
          id_user: userRecord.idUser,
          username: userRecord.username,
          role: userRecord.role,
        },
      },
    },
    300,
  );
  const dto = loginSuccessResponseSchema.parse(rawData);

  return mapLoginDtoToDomain(dto.data);
}

export async function registerUser(input: {
  bgnCode?: string;
  password: string;
  registrationCode?: string;
  role: TRole;
  username: string;
}): Promise<TAuthRegistrationResult> {
  const body = registerBodySchema.parse({
    username: input.username,
    password: input.password,
    role: input.role,
    registration_code: input.registrationCode,
    bgn_code: input.bgnCode,
  });
  const records = readAuthUserDatabase();

  if (records.some((record) => record.username === body.username)) {
    const errorDto = registerErrorResponseSchema.parse({
      status: "error",
      message: "Username sudah digunakan.",
    });

    throw new Error(errorDto.message);
  }

  const accountStatus: TAccountStatus =
    body.role === "PUBLIC" ? "APPROVED" : "PENDING";

  const nextRecord: AuthUserRecord = {
    idUser: createUserId(),
    username: body.username,
    password: body.password,
    role: body.role,
    registrationCode: body.registration_code ?? null,
    bgnCode: body.bgn_code ?? null,
    accountStatus,
  };

  writeAuthUserDatabase([...records, nextRecord]);

  const rawData = await delayedValue(
    {
      status: "success" as const,
      message:
        accountStatus === "APPROVED"
          ? "Akun berhasil dibuat. Silakan masuk."
          : "Pendaftaran berhasil dikirim dan menunggu persetujuan admin.",
      data: {
        id_user: nextRecord.idUser,
        username: nextRecord.username,
        role: nextRecord.role,
        account_status: nextRecord.accountStatus,
      },
    },
    300,
  );
  const dto = registerSuccessResponseSchema.parse(rawData);

  return mapRegisterDtoToDomain(dto);
}
