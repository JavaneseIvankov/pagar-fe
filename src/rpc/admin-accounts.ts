import { delayedValue } from "@/lib/utils";
import {
  getActiveAccountsSuccessResponseSchema,
  getPendingAccountsSuccessResponseSchema,
  mapActiveAccountDtoToDomain,
  mapPendingAccountDtoToDomain,
  updateAccountStatusBodySchema,
  updateAccountStatusParamsSchema,
  updateAccountStatusSuccessResponseSchema,
  type TAdminAccountDecision,
  type TAdminActiveAccount,
  type TAdminPendingAccount,
} from "@/types";
import {
  buildActiveAccountsResponse,
  buildPendingAccountsResponse,
  updateMockAccountStatus,
} from "./mock-backend";

export async function fetchAdminActiveAccounts(): Promise<
  TAdminActiveAccount[]
> {
  const rawData = await delayedValue(buildActiveAccountsResponse(), 300);
  const dto = getActiveAccountsSuccessResponseSchema.parse(rawData);

  return dto.data.map(mapActiveAccountDtoToDomain);
}

export async function fetchAdminPendingAccounts(): Promise<
  TAdminPendingAccount[]
> {
  const rawData = await delayedValue(buildPendingAccountsResponse(), 300);
  const dto = getPendingAccountsSuccessResponseSchema.parse(rawData);

  return dto.data.map(mapPendingAccountDtoToDomain);
}

export async function updateAdminAccountStatus(params: {
  idUser: string;
  status: TAdminAccountDecision;
}) {
  const parsedParams = updateAccountStatusParamsSchema.parse({
    id_user: params.idUser,
  });
  const parsedBody = updateAccountStatusBodySchema.parse({
    status: params.status,
  });

  await delayedValue(null, 300);

  const rawData = updateMockAccountStatus({
    idUser: parsedParams.id_user,
    status: parsedBody.status,
  });

  const dto = updateAccountStatusSuccessResponseSchema.parse(rawData);

  return dto;
}
