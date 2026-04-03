import { z } from "zod/v3";

const isValidDateOnly = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const emptyStringToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const dateOnlySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(isValidDateOnly, {
    message: "Invalid date",
  });
const uuidSchema = z.string().uuid();
const numericStringSchema = z.string().regex(/^-?\d+$/);
const moneyResponseSchema = z.union([z.number().int(), numericStringSchema]);
const successStatusSchema = z.literal("success");
const errorStatusSchema = z.literal("error");
const timestampFields = {
  createdAt: z.string(),
  updatedAt: z.string(),
};

const successDataEnvelope = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    status: successStatusSchema,
    data,
  });

const successDataMetaEnvelope = <
  T extends z.ZodTypeAny,
  M extends z.ZodTypeAny,
>(
  data: T,
  meta: M,
) =>
  z.object({
    status: successStatusSchema,
    data,
    meta,
  });

const paginatedSuccessDataEnvelope = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    status: successStatusSchema,
    totalItems: z.number().int(),
    totalPages: z.number().int(),
    currentPage: z.number().int(),
    data,
  });

const successMessageDataEnvelope = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    status: successStatusSchema,
    message: z.string(),
    data,
  });

const fieldErrorSchema = z.object({}).catchall(z.string());

const statusErrorResponseSchema = z
  .object({
    status: errorStatusSchema,
    message: z.string(),
    errors: z
      .union([z.array(z.string()), z.array(fieldErrorSchema)])
      .optional(),
    stack: z.string().optional(),
  })
  .passthrough();

const messageOnlyErrorSchema = z.object({
  message: z.string(),
  error: z.string().optional(),
});

const authHeaderSchema = z.object({
  authorization: z.string().regex(/^Bearer\s+\S+$/),
});

const emptyObjectSchema = z.object({});
const roleSchema = z.enum(["ADMIN", "PUBLIC", "SCHOOL", "SPPG"]);
const accountStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
const reviewStatusSchema = z.enum(["MENUNGGU", "INVESTIGASI", "SELESAI"]);
const schoolOrSppgRoleSchema = z.enum(["SPPG", "SCHOOL"]);
const accountDecisionSchema = z.enum(["APPROVED", "REJECTED"]);
const reviewRatingSchema = z.coerce.number().int().min(1).max(5);
const requiredNumberInputSchema = z.preprocess(
  emptyStringToUndefined,
  z.coerce.number(),
);
const requiredPositiveIntInputSchema = z.preprocess(
  emptyStringToUndefined,
  z.coerce.number().int().positive(),
);

const attachmentEntitySchema = z.object({
  id_attachment: uuidSchema,
  entity_type: z.string(),
  id_entity: uuidSchema,
  file_url: z.string(),
  file_type: z.string().nullish(),
  file_size: z.number().int().nullish(),
  file_category: z.string().nullish(),
});

const budgetEntitySchema = z.object({
  id_budget: uuidSchema,
  id_daily_report: uuidSchema,
  item_name: z.string(),
  item_price: z.union([z.number().int(), numericStringSchema]),
});

const dailyReportEntitySchema = z.object({
  id_daily_report: uuidSchema,
  id_sppg: uuidSchema,
  date_report: z.string(),
  menu_name: z.string(),
  meal_time: z.string().nullish(),
  total_portion: z.number().int().nullish(),
  menu_description: z.string().nullish(),
  total_expense: z.number().int(),
  energy: z.number().nullish(),
  protein: z.number().nullish(),
  fat: z.number().nullish(),
  carbohydrate: z.number().nullish(),
});

const reviewEntitySchema = z.object({
  id_review: uuidSchema,
  id_sppg: uuidSchema,
  id_school: uuidSchema.nullish(),
  id_user: uuidSchema,
  is_anonymous: z.boolean().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  rating_score: z.number().int().min(1).max(5).nullish(),
  status_review: reviewStatusSchema,
});

const schoolEntitySchema = z.object({
  id_school: uuidSchema,
  id_user: uuidSchema,
  school_name: z.string(),
  school_address: z.string().nullish(),
});

const sppgEntitySchema = z.object({
  id_sppg: uuidSchema,
  id_user: uuidSchema,
  sppg_name: z.string(),
  sppg_address: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
  monthly_budget: z.number().int(),
});

const userEntitySchema = z.object({
  id_user: uuidSchema,
  role: roleSchema,
  name: z.string().nullish(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  registration_code: z.string().nullish(),
  bgn_code: z.string().nullish(),
  account_status: accountStatusSchema,
});

const uploadMimeTypeSchema = z.enum(["image/jpeg", "image/png", "image/webp"]);
const uploadAttachmentFileSchema = z
  .object({
    fieldname: z.literal("attachments").optional(),
    mimetype: uploadMimeTypeSchema,
    size: z
      .number()
      .int()
      .max(3 * 1024 * 1024),
    originalname: z.string().optional(),
    filename: z.string().optional(),
    path: z.string().optional(),
  })
  .passthrough();

const attachmentsFilesSchema = z
  .array(uploadAttachmentFileSchema)
  .max(2)
  .optional();

const userPublicDataSchema = userEntitySchema.pick({
  id_user: true,
  username: true,
  role: true,
});

const loginUserDataSchema = userPublicDataSchema.extend({
  email: z.string().email(),
});

const pendingAccountItemSchema = z.object({
  id_user: uuidSchema,
  username: z.string(),
  email: z.string().email(),
  role: schoolOrSppgRoleSchema,
  registration_code: z.string().nullish(),
  bgn_code: z.string().nullish(),
  createdAt: z.string(),
});

const activeAccountItemSchema = z.object({
  id_user: uuidSchema,
  username: z.string(),
  email: z.string().email(),
  role: schoolOrSppgRoleSchema,
  registration_code: z.string().nullish(),
  bgn_code: z.string().nullish(),
  createdAt: z.string(),
});

const sppgListItemSchema = sppgEntitySchema.pick({
  id_sppg: true,
  sppg_name: true,
  sppg_address: true,
});

const schoolNameOnlySchema = z.object({
  school_name: z.string(),
});

const sppgNameOnlySchema = z.object({
  sppg_name: z.string(),
});

const sppgNameAddressSchema = z.object({
  sppg_name: z.string(),
  sppg_address: z.string().nullish(),
});

const attachmentUrlOnlySchema = z.object({
  file_url: z.string(),
});

const attachmentUrlWithTypeSchema = z.object({
  file_url: z.string(),
  file_type: z.string().nullish(),
});

const reviewRecordSchema = reviewEntitySchema.extend(timestampFields);
const createReviewRecordSchema = reviewRecordSchema.extend({
  id_school: uuidSchema.nullish(),
  is_anonymous: z.boolean().nullish(),
  rating_score: z
    .union([z.number().int().min(1).max(5), numericStringSchema])
    .nullish(),
});
const budgetRecordSchema = budgetEntitySchema
  .extend({
    item_price: moneyResponseSchema,
  })
  .extend(timestampFields);
const attachmentRecordSchema = attachmentEntitySchema.extend(timestampFields);
const dailyReportRecordSchema = dailyReportEntitySchema
  .extend({
    date_report: dateOnlySchema,
  })
  .extend(timestampFields);

const schoolProfileDataSchema = schoolEntitySchema.extend(timestampFields);
const adminProfileDataSchema = z.object({
  name: z.string().nullish(),
  username: z.string(),
  email: z.string().email(),
  role: z.literal("ADMIN"),
});
const publicProfileDataSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

const sppgProfileDataSchema = sppgEntitySchema.extend(timestampFields).extend({
  user: z.object({
    username: z.string(),
    email: z.string().email(),
    account_status: accountStatusSchema,
    bgn_code: z.string().nullish(),
  }),
});

const adminSppgItemSchema = sppgEntitySchema.extend(timestampFields).extend({
  user: z.object({
    account_status: accountStatusSchema,
  }),
});

const adminSchoolItemSchema = schoolEntitySchema
  .extend(timestampFields)
  .extend({
    user: z.object({
      account_status: accountStatusSchema,
    }),
  });

const publicDashboardReviewItemSchema = reviewRecordSchema.extend({
  school: schoolNameOnlySchema.nullish(),
  sppg: sppgNameOnlySchema.nullish(),
  attachments: z.array(attachmentUrlOnlySchema),
  author_name: z.string(),
  display_author: z.string(),
  school_name: z.string(),
});

const schoolDashboardReviewItemSchema = reviewRecordSchema.extend({
  school: schoolNameOnlySchema.nullish(),
  attachments: z.array(attachmentUrlOnlySchema),
  author_name: z.string(),
  display_author: z.string(),
  school_name: z.string(),
});

const dailyReportWithSppgSchema = dailyReportRecordSchema.extend({
  sppg: sppgNameAddressSchema,
});

const dailyReportWithBudgetAndAttachmentSchema = dailyReportRecordSchema.extend(
  {
    budgets: z.array(budgetRecordSchema),
    attachments: z.array(attachmentRecordSchema),
  },
);

const dailyReportForDashboardSchema = dailyReportRecordSchema.extend({
  sppg: sppgNameAddressSchema,
  attachments: z.array(attachmentUrlOnlySchema),
});

const publicDailyReportDetailSchema = dailyReportRecordSchema.extend({
  sppg: sppgNameAddressSchema,
  attachments: z.array(attachmentUrlWithTypeSchema),
});

const sppgReviewDetailSchema = z.object({
  id_review: uuidSchema,
  pelapor: z.string(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  rating_score: z
    .union([z.number().int().min(1).max(5), numericStringSchema])
    .nullish(),
  createdAt: z.string(),
  attachments: z.array(attachmentUrlOnlySchema),
});

const budgetInputItemSchema = z.object({
  item_name: z.string().min(1),
  item_price: z.coerce
    .number()
    .int()
    .refine((value) => value !== 0),
});

const dailyReportBudgetsInputSchema = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}, z.array(budgetInputItemSchema).nonempty());

const dashboardRecentReportSchema = z.object({
  id_daily_report: uuidSchema,
  menu_name: z.string(),
  date_report: dateOnlySchema,
});

const schoolPaginationMetaSchema = z.object({
  totalItems: z.number().int(),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
  limit: z.number().int(),
});

const reportPaginationSchema = z.object({
  totalItems: z.number().int(),
  totalPages: z.number().int(),
  currentPage: z.number().int(),
});

const sppgDashboardDataSchema = z.object({
  sppg_name: z.string(),
  widgets: z.object({
    status_hari_ini: z.enum(["SELESAI", "BELUM"]),
    rata_rata_kalori: z.number(),
    sisa_anggaran: z.number().nullish(),
    total_laporan_masyarakat: z.number().int(),
  }),
  riwayat_laporan: z.array(dashboardRecentReportSchema),
  laporan_masyarakat: z.array(
    reviewRecordSchema.extend({
      school: schoolNameOnlySchema.nullish(),
      attachments: z.array(attachmentUrlOnlySchema),
    }),
  ),
});

const adminDashboardDataSchema = z.object({
  statistics: z.object({
    totalReports: z.number().int(),
    totalSppg: z.number().int(),
    totalSchool: z.number().int(),
    totalPublic: z.number().int(),
  }),
  recent_complaints: z.array(
    reviewRecordSchema.extend({
      user: z.object({
        username: z.string(),
      }),
    }),
  ),
  vendor_warnings: z.array(
    z.object({
      nama_vendor: z.string(),
      rating: z.number(),
      jumlah_laporan: z.number().int(),
    }),
  ),
});

const periodicReportsDataSchema = z.object({
  period: z.object({
    start_date: dateOnlySchema,
    end_date: dateOnlySchema,
  }),
  total_budget_spent: z.number(),
  pagination: reportPaginationSchema,
  reports: z.array(
    dailyReportRecordSchema.extend({
      budgets: z.array(budgetRecordSchema),
    }),
  ),
});

const monthlyBudgetResponseDataSchema = z.object({
  sppg_name: z.string(),
  monthly_budget: z.number().int(),
});

export const protectedHeadersSchema = authHeaderSchema;
export const jsonEndpointParamsSchema = emptyObjectSchema;
export const jsonEndpointQuerySchema = emptyObjectSchema;
export const paginatedListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});
export const searchablePaginatedListQuerySchema =
  paginatedListQuerySchema.extend({
    search: z.string().optional(),
  });
export const schoolPaginatedListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
export const schoolSearchablePaginatedListQuerySchema =
  schoolPaginatedListQuerySchema.extend({
    search: z.string().optional(),
  });

export const registerPublicBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerPublicSuccessResponseSchema = successMessageDataEnvelope(
  z.object({
    id_user: uuidSchema,
    username: z.string(),
    role: z.literal("PUBLIC"),
  }),
);
export const registerPublicErrorResponseSchema = statusErrorResponseSchema;

export const registerSchoolBodySchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  school_name: z.string().min(1),
  school_address: z.string().min(1),
  registration_code: z.string().optional(),
});

export const registerSchoolSuccessResponseSchema = successMessageDataEnvelope(
  z.object({
    id_user: uuidSchema,
    username: z.string(),
    role: z.literal("SCHOOL"),
  }),
);
export const registerSchoolErrorResponseSchema = statusErrorResponseSchema;

export const registerSppgBodySchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  sppg_name: z.string().min(1),
  sppg_address: z.string().min(1),
  bgn_code: z.string().optional(),
});

export const registerSppgSuccessResponseSchema = successMessageDataEnvelope(
  z.object({
    id_user: uuidSchema,
    username: z.string(),
    role: z.literal("SPPG"),
  }),
);
export const registerSppgErrorResponseSchema = statusErrorResponseSchema;

export const loginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const loginSuccessResponseSchema = successMessageDataEnvelope(
  z.object({
    token: z.string(),
    user: loginUserDataSchema,
  }),
);
export const loginErrorResponseSchema = statusErrorResponseSchema;

export const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
});

export const forgotPasswordSuccessResponseSchema = z.object({
  status: successStatusSchema,
  message: z.string(),
});
export const forgotPasswordErrorResponseSchema = messageOnlyErrorSchema;

export const resetPasswordParamsSchema = z.object({
  token: z.string().min(1),
});

export const resetPasswordBodySchema = z.object({
  newPassword: z.string().min(1),
});

export const resetPasswordSuccessResponseSchema = z.object({
  status: successStatusSchema,
  message: z.string(),
});
export const resetPasswordErrorResponseSchema = messageOnlyErrorSchema;

export const getPendingAccountsSuccessResponseSchema =
  paginatedSuccessDataEnvelope(z.array(pendingAccountItemSchema));
export const getPendingAccountsErrorResponseSchema = statusErrorResponseSchema;

export const getActiveAccountsSuccessResponseSchema =
  paginatedSuccessDataEnvelope(z.array(activeAccountItemSchema));
export const getActiveAccountsErrorResponseSchema = statusErrorResponseSchema;

export const getAllSppgSuccessResponseSchema = paginatedSuccessDataEnvelope(
  z.array(adminSppgItemSchema),
);
export const getAllSppgErrorResponseSchema = statusErrorResponseSchema;

export const getAllSchoolSuccessResponseSchema = paginatedSuccessDataEnvelope(
  z.array(adminSchoolItemSchema),
);
export const getAllSchoolErrorResponseSchema = statusErrorResponseSchema;

export const updateAccountStatusParamsSchema = z.object({
  id_user: uuidSchema,
});

export const updateAccountStatusBodySchema = z.object({
  status: accountDecisionSchema,
});

export const updateAccountStatusSuccessResponseSchema =
  successMessageDataEnvelope(
    z.object({
      id_user: uuidSchema,
      account_status: accountStatusSchema,
    }),
  );
export const updateAccountStatusErrorResponseSchema = statusErrorResponseSchema;

export const updateAdminProfileBodySchema = z.object({
  name: z.string().optional(),
  username: z.string().min(5).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export const updateAdminProfileSuccessResponseSchema =
  successMessageDataEnvelope(
    z.object({
      id_user: uuidSchema,
      name: z.string().nullish(),
      username: z.string(),
      email: z.string().email(),
    }),
  );
export const updateAdminProfileErrorResponseSchema = statusErrorResponseSchema;

export const getAdminProfileSuccessResponseSchema = successDataEnvelope(
  adminProfileDataSchema,
);
export const getAdminProfileErrorResponseSchema = statusErrorResponseSchema;

export const getAdminDashboardSuccessResponseSchema = successDataEnvelope(
  adminDashboardDataSchema,
);
export const getAdminDashboardErrorResponseSchema = statusErrorResponseSchema;

export const updateReviewStatusParamsSchema = z.object({
  id_review: z.string().min(1),
});

export const updateReviewStatusBodySchema = z.object({
  status_review: reviewStatusSchema,
});

export const updateReviewStatusSuccessResponseSchema =
  successMessageDataEnvelope(reviewRecordSchema);
export const updateReviewStatusErrorResponseSchema = statusErrorResponseSchema;

export const getPublicSppgListSuccessResponseSchema = successDataEnvelope(
  z.array(sppgListItemSchema),
);
export const getPublicSppgListErrorResponseSchema = messageOnlyErrorSchema;

export const createPublicReviewBodySchema = z.object({
  id_sppg: uuidSchema,
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  rating_score: reviewRatingSchema,
});

export const createPublicReviewFilesSchema = attachmentsFilesSchema;

export const createPublicReviewSuccessResponseSchema = successDataEnvelope(
  createReviewRecordSchema,
);
export const createPublicReviewErrorResponseSchema = messageOnlyErrorSchema;

export const getPublicProfileSuccessResponseSchema = successDataEnvelope(
  publicProfileDataSchema,
);
export const getPublicProfileErrorResponseSchema = statusErrorResponseSchema;

export const getPublicDashboardReviewsSuccessResponseSchema =
  successDataMetaEnvelope(
    z.array(publicDashboardReviewItemSchema),
    schoolPaginationMetaSchema,
  );
export const getPublicDashboardReviewsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getPublicDashboardSppgReportsSuccessResponseSchema =
  successDataMetaEnvelope(
    z.array(dailyReportForDashboardSchema),
    schoolPaginationMetaSchema,
  );
export const getPublicDashboardSppgReportsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getDetailSppgReportParamsSchema = z.object({
  id_daily_report: uuidSchema,
});

export const getDetailSppgReportSuccessResponseSchema = successDataEnvelope(
  publicDailyReportDetailSchema,
);
export const getDetailSppgReportErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolDetailSppgReportParamsSchema = z.object({
  id_daily_report: uuidSchema,
});

export const getSchoolDetailSppgReportSuccessResponseSchema =
  successDataEnvelope(publicDailyReportDetailSchema);
export const getSchoolDetailSppgReportErrorResponseSchema =
  messageOnlyErrorSchema;

export const getSchoolProfileSuccessResponseSchema = successDataEnvelope(
  schoolProfileDataSchema,
);
export const getSchoolProfileErrorResponseSchema = messageOnlyErrorSchema;

export const updateSchoolProfileBodySchema = z.object({
  school_name: z.string().min(1),
  school_address: z.string().min(1),
});

export const updateSchoolProfileSuccessResponseSchema =
  successMessageDataEnvelope(schoolProfileDataSchema);
export const updateSchoolProfileErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolSppgListSuccessResponseSchema = successDataMetaEnvelope(
  z.array(sppgListItemSchema),
  schoolPaginationMetaSchema,
);
export const getSchoolSppgListErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolDailyReportsSuccessResponseSchema =
  successDataMetaEnvelope(
    z.array(dailyReportWithSppgSchema),
    schoolPaginationMetaSchema,
  );
export const getSchoolDailyReportsErrorResponseSchema = messageOnlyErrorSchema;

export const createSchoolReviewBodySchema = z.object({
  id_sppg: uuidSchema,
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  rating_score: reviewRatingSchema,
});

export const createSchoolReviewFilesSchema = attachmentsFilesSchema;

export const createSchoolReviewSuccessResponseSchema =
  successMessageDataEnvelope(createReviewRecordSchema);
export const createSchoolReviewErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolDashboardReviewsSuccessResponseSchema =
  successDataMetaEnvelope(
    z.array(schoolDashboardReviewItemSchema),
    schoolPaginationMetaSchema,
  );
export const getSchoolDashboardReviewsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getSchoolDashboardSppgReportsSuccessResponseSchema =
  successDataMetaEnvelope(
    z.array(dailyReportForDashboardSchema),
    schoolPaginationMetaSchema,
  );
export const getSchoolDashboardSppgReportsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getSppgReviewsSuccessResponseSchema = successDataMetaEnvelope(
  z.array(sppgReviewDetailSchema),
  schoolPaginationMetaSchema,
);
export const getSppgReviewsErrorResponseSchema = z.union([
  statusErrorResponseSchema,
  messageOnlyErrorSchema,
]);

export const getSppgReviewDetailParamsSchema = z.object({
  id_review: uuidSchema,
});

export const getSppgReviewDetailSuccessResponseSchema = successDataEnvelope(
  sppgReviewDetailSchema,
);
export const getSppgReviewDetailErrorResponseSchema = z.union([
  statusErrorResponseSchema,
  messageOnlyErrorSchema,
]);

export const getSppgProfileSuccessResponseSchema = successDataEnvelope(
  sppgProfileDataSchema,
);
export const getSppgProfileErrorResponseSchema = statusErrorResponseSchema;

export const updateSppgProfileBodySchema = z.object({
  sppg_name: z.string().optional(),
  sppg_address: z.string().optional(),
});

export const updateSppgProfileSuccessResponseSchema =
  successMessageDataEnvelope(sppgEntitySchema.extend(timestampFields));
export const updateSppgProfileErrorResponseSchema = statusErrorResponseSchema;

export const getSppgDashboardSuccessResponseSchema = successDataEnvelope(
  sppgDashboardDataSchema,
);
export const getSppgDashboardErrorResponseSchema = statusErrorResponseSchema;

export const getSppgDailyReportsSuccessResponseSchema = successDataEnvelope(
  z.object({
    pagination: reportPaginationSchema,
    reports: z.array(dailyReportWithBudgetAndAttachmentSchema),
  }),
);
export const getSppgDailyReportsErrorResponseSchema = statusErrorResponseSchema;

export const createSppgDailyReportBodySchema = z.object({
  date_report: dateOnlySchema,
  menu_name: z.string().min(1),
  meal_time: z.string().min(1),
  total_portion: requiredPositiveIntInputSchema,
  description: z.string().min(10),
  energy: requiredNumberInputSchema,
  protein: requiredNumberInputSchema,
  fat: requiredNumberInputSchema,
  carbohydrate: requiredNumberInputSchema,
  budgets: dailyReportBudgetsInputSchema,
});

export const createSppgDailyReportFilesSchema = attachmentsFilesSchema;

export const createSppgDailyReportSuccessResponseSchema =
  successMessageDataEnvelope(
    z.object({
      id_daily_report: uuidSchema,
      total_expense: z.number().int(),
    }),
  );
export const createSppgDailyReportErrorResponseSchema =
  statusErrorResponseSchema;

export const getSppgPeriodicReportsQuerySchema = z.object({
  start_date: dateOnlySchema,
  end_date: dateOnlySchema,
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export const getSppgPeriodicReportsSuccessResponseSchema = successDataEnvelope(
  periodicReportsDataSchema,
);
export const getSppgPeriodicReportsErrorResponseSchema =
  statusErrorResponseSchema;

export const getSppgDailyReportByIdParamsSchema = z.object({
  id_daily_report: uuidSchema,
});

export const getSppgDailyReportByIdSuccessResponseSchema = successDataEnvelope(
  dailyReportWithBudgetAndAttachmentSchema,
);
export const getSppgDailyReportByIdErrorResponseSchema =
  statusErrorResponseSchema;

export const updateSppgMonthlyBudgetBodySchema = z.object({
  monthly_budget: requiredNumberInputSchema,
});

export const updateSppgMonthlyBudgetSuccessResponseSchema =
  successMessageDataEnvelope(monthlyBudgetResponseDataSchema);
export const updateSppgMonthlyBudgetErrorResponseSchema = z.union([
  statusErrorResponseSchema,
  messageOnlyErrorSchema,
]);

export type RegisterPublicBody = z.infer<typeof registerPublicBodySchema>;
export type RegisterSchoolBody = z.infer<typeof registerSchoolBodySchema>;
export type RegisterSppgBody = z.infer<typeof registerSppgBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
export type ForgotPasswordBody = z.infer<typeof forgotPasswordBodySchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>;
export type UpdateAccountStatusBody = z.infer<
  typeof updateAccountStatusBodySchema
>;
export type UpdateAdminProfileBody = z.infer<
  typeof updateAdminProfileBodySchema
>;
export type UpdateReviewStatusBody = z.infer<
  typeof updateReviewStatusBodySchema
>;
export type CreatePublicReviewBody = z.infer<
  typeof createPublicReviewBodySchema
>;
export type UpdateSchoolProfileBody = z.infer<
  typeof updateSchoolProfileBodySchema
>;
export type CreateSchoolReviewBody = z.infer<
  typeof createSchoolReviewBodySchema
>;
export type UpdateSppgProfileBody = z.infer<typeof updateSppgProfileBodySchema>;
export type CreateSppgDailyReportBody = z.infer<
  typeof createSppgDailyReportBodySchema
>;
export type UpdateSppgMonthlyBudgetBody = z.infer<
  typeof updateSppgMonthlyBudgetBodySchema
>;
