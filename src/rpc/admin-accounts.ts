"use server";

import {
  mapActiveAccountDtoToDomain,
  mapPendingAccountDtoToDomain,
  type TAdminAccountDecision,
  type TAdminActiveAccount,
  type TAdminPendingAccount,
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
