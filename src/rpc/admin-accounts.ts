"use server";

import {
  mapActiveAccountDtoToDomain,
  mapPendingAccountDtoToDomain,
  mapRegisterDtoToDomain,
  type TAdminAccountDecision,
  type TAdminActiveAccount,
  type TAdminCreateManagedAccountInput,
  type TAdminPendingAccount,
  type TAuthRegistrationResult,
} from "@/types";
import { createServerRpc } from "./server-rpc";

export const fetchAdminActiveAccounts = createServerRpc(
  {
    operation: "fetchAdminActiveAccounts",
  },
  async ({ client }): Promise<TAdminActiveAccount[]> => {
    const dto = await client.getActiveAccounts();

    return dto.data.map(mapActiveAccountDtoToDomain);
  },
);

export const fetchAdminPendingAccounts = createServerRpc(
  {
    operation: "fetchAdminPendingAccounts",
  },
  async ({ client }): Promise<TAdminPendingAccount[]> => {
    const dto = await client.getPendingAccounts();

    return dto.data.map(mapPendingAccountDtoToDomain);
  },
);

export const updateAdminAccountStatus = createServerRpc(
  {
    operation: "updateAdminAccountStatus",
  },
  async (
    { client },
    params: {
      idUser: string;
      status: TAdminAccountDecision;
    },
  ) => {
    const dto = await client.updateAccountStatus({
      params: {
        id_user: params.idUser,
      },
      body: {
        status: params.status,
      },
    });

    return {
      accountStatus: dto.data.account_status,
      id: dto.data.id_user,
    };
  },
);

export const createAdminManagedAccount = createServerRpc(
  {
    operation: "createAdminManagedAccount",
  },
  async (
    { client },
    input: TAdminCreateManagedAccountInput,
  ): Promise<TAuthRegistrationResult> => {
    if (input.role === "SCHOOL") {
      const dto = await client.registerSchool({
        body: {
          email: input.email,
          password: input.password,
          registration_code: input.registrationCode,
          school_address: input.schoolAddress,
          school_name: input.schoolName,
          username: input.username,
        },
      });

      return mapRegisterDtoToDomain(dto);
    }

    const dto = await client.registerSppg({
      body: {
        bgn_code: input.bgnCode,
        email: input.email,
        password: input.password,
        sppg_address: input.sppgAddress,
        sppg_name: input.sppgName,
        username: input.username,
      },
    });

    return mapRegisterDtoToDomain(dto);
  },
);
