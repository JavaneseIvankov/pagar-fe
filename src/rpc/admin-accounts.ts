"use server";

import {
  mapActiveAccountDtoToDomain,
  mapPendingAccountDtoToDomain,
  type TAdminAccountDecision,
  type TAdminActiveAccount,
  type TAdminPendingAccount,
} from "@/types";
import { createServerApiClient } from "./server-api-client";

export async function fetchAdminActiveAccounts(): Promise<
  TAdminActiveAccount[]
> {
  const client = createServerApiClient();
  const dto = await client.getActiveAccounts();

  return dto.data.map(mapActiveAccountDtoToDomain);
}

export async function fetchAdminPendingAccounts(): Promise<
  TAdminPendingAccount[]
> {
  const client = createServerApiClient();
  const dto = await client.getPendingAccounts();

  return dto.data.map(mapPendingAccountDtoToDomain);
}

export async function updateAdminAccountStatus(params: {
  idUser: string;
  status: TAdminAccountDecision;
}) {
  const client = createServerApiClient();
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
}
