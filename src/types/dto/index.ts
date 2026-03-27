import { z } from "zod/v3";

const dateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const positiveIntIdSchema = z.coerce.number().int().positive();
const uuidSchema = z.string().uuid();
const numericStringSchema = z.string().regex(/^-?\d+$/);
const moneyResponseSchema = z.union([z.number().int(), numericStringSchema]);
const successStatusSchema = z.literal("success");
const errorStatusSchema = z.literal("error");
const timestampFields = {
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
};

const successDataEnvelope = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    status: successStatusSchema,
    data,
  });

const successMessageDataEnvelope = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    status: successStatusSchema,
    message: z.string(),
    data,
  });

const errorStatusMessageSchema = z.object({
  status: errorStatusSchema,
  message: z.string(),
});

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
const registrationRoleSchema = roleSchema;
const accountDecisionSchema = z.enum(["APPROVED", "REJECTED"]);
const reviewRatingSchema = z.coerce.number().int().min(1).max(5);

const userEntitySchema = z.object({
  id_user: uuidSchema,
  role: roleSchema,
  username: z.string(),
  password: z.string(),
  registration_code: z.string().nullable(),
  bgn_code: z.string().nullable(),
  account_status: accountStatusSchema,
});

const schoolEntitySchema = z.object({
  id_school: z.number().int(),
  id_user: uuidSchema,
  school_name: z.string(),
  school_address: z.string().nullable(),
});

const sppgEntitySchema = z.object({
  id_sppg: z.number().int(),
  id_user: uuidSchema,
  sppg_name: z.string(),
  sppg_address: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  monthly_budget: z.number().int().nullable(),
});

const reviewEntitySchema = z.object({
  id_review: z.number().int(),
  id_sppg: z.number().int().nullable(),
  id_school: z.number().int().nullable(),
  id_user: uuidSchema,
  is_anonymous: z.boolean().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  rating_score: z.number().int().min(1).max(5).nullable(),
  status_review: reviewStatusSchema,
});

const dailyReportEntitySchema = z.object({
  id_daily_report: z.number().int(),
  id_sppg: z.number().int(),
  date_report: z.string(),
  menu_name: z.string(),
  meal_time: z.string().nullable(),
  total_portion: z.number().int().nullable(),
  menu_description: z.string().nullable(),
  energy: z.number().nullable(),
  protein: z.number().nullable(),
  fat: z.number().nullable(),
  carbohydrate: z.number().nullable(),
});

const budgetEntitySchema = z.object({
  id_budget: z.number().int(),
  id_daily_report: z.number().int(),
  item_name: z.string(),
  item_price: z.union([z.number().int(), numericStringSchema]),
  total_price: z.union([z.number().int(), numericStringSchema]).nullable(),
});

const attachmentEntitySchema = z.object({
  id_attachment: z.number().int(),
  entity_type: z.string(),
  id_entity: z.number().int(),
  file_url: z.string(),
  file_type: z.string().nullable(),
  file_size: z.number().int().nullable(),
  file_category: z.string().nullable(),
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

const registerSuccessDataSchema = userPublicDataSchema.extend({
  account_status: accountStatusSchema,
});

const loginSuccessDataSchema = z.object({
  token: z.string(),
  user: userPublicDataSchema,
});

const pendingAccountItemSchema = z.object({
  id_user: uuidSchema,
  username: z.string(),
  role: z.enum(["SPPG", "SCHOOL"]),
  registration_code: z.string().nullable(),
  bgn_code: z.string().nullable(),
  createdAt: z.string(),
});

const activeAccountItemSchema = z.object({
  id_user: uuidSchema,
  username: z.string(),
  role: z.enum(["SPPG", "SCHOOL"]),
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
  sppg_address: z.string().nullable(),
});

const reviewerSchema = z.object({
  username: z.string(),
});

const attachmentUrlOnlySchema = z.object({
  file_url: z.string(),
});

const reviewRecordSchema = reviewEntitySchema.extend(timestampFields);
const budgetRecordSchema = budgetEntitySchema
  .extend({
    item_price: moneyResponseSchema,
    total_price: moneyResponseSchema.nullable(),
  })
  .extend(timestampFields);
const attachmentRecordSchema = attachmentEntitySchema.extend(timestampFields);
const dailyReportRecordSchema = dailyReportEntitySchema.extend(timestampFields);

const schoolProfileDataSchema = schoolEntitySchema.extend(timestampFields);

const sppgProfileDataSchema = sppgEntitySchema.extend(timestampFields).extend({
  user: z.object({
    username: z.string(),
    account_status: accountStatusSchema,
    bgn_code: z.string().nullable(),
  }),
});

const publicDashboardReviewItemSchema = reviewRecordSchema.extend({
  school: schoolNameOnlySchema.nullable().optional(),
  sppg: sppgNameOnlySchema.nullable().optional(),
  attachments: z.array(attachmentUrlOnlySchema).optional(),
  author_name: z.string(),
  display_author: z.string(),
  location_name: z.string(),
});

const schoolDashboardReviewItemSchema = reviewRecordSchema.extend({
  school: schoolNameOnlySchema.nullable().optional(),
  attachments: z.array(attachmentUrlOnlySchema).optional(),
  author_name: z.string(),
  display_author: z.string(),
  school_name: z.string(),
});

const dailyReportWithSppgSchema = dailyReportRecordSchema.extend({
  sppg: sppgNameAddressSchema,
});

const dailyReportWithBudgetAndAttachmentSchema = dailyReportRecordSchema.extend(
  {
    budgets: z.array(budgetRecordSchema).optional(),
    attachments: z.array(attachmentRecordSchema).optional(),
  },
);

const dailyReportForDashboardSchema = dailyReportRecordSchema.extend({
  sppg: sppgNameAddressSchema,
  attachments: z.array(attachmentUrlOnlySchema).optional(),
});

const budgetInputItemSchema = z.object({
  item_name: z.string().min(1),
  item_price: z.coerce.number().int(),
  qty: z.coerce.number().int().positive(),
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
}, z.array(budgetInputItemSchema));

const dashboardRecentReportSchema = z.object({
  id_daily_report: positiveIntIdSchema,
  menu_name: z.string(),
  date_report: dateOnlySchema,
});

const sppgDashboardDataSchema = z.object({
  sppg_name: z.string(),
  widgets: z.object({
    status_hari_ini: z.enum(["SELESAI", "BELUM"]),
    rata_rata_kalori: z.number(),
    sisa_anggaran: z.number().nullable(),
    total_laporan_masyarakat: z.number().int(),
  }),
  riwayat_laporan: z.array(dashboardRecentReportSchema),
  laporan_masyarakat: z.array(
    reviewRecordSchema.extend({
      school: schoolNameOnlySchema.nullable().optional(),
      attachments: z.array(attachmentUrlOnlySchema).optional(),
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
      reviewer: reviewerSchema.optional(),
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
  total_reports: z.number().int(),
  total_budget_spent: z.number(),
  reports: z.array(
    dailyReportRecordSchema.extend({
      budgets: z.array(budgetRecordSchema).optional(),
    }),
  ),
});

const monthlyBudgetResponseDataSchema = z.object({
  sppg_name: z.string(),
  monthly_budget: z.number().int().nullable(),
});

export const protectedHeadersSchema = authHeaderSchema;
export const jsonEndpointParamsSchema = emptyObjectSchema;
export const jsonEndpointQuerySchema = emptyObjectSchema;

export const registerBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  role: registrationRoleSchema,
  registration_code: z.string().optional(),
  bgn_code: z.string().optional(),
});

export const registerSuccessResponseSchema = successMessageDataEnvelope(
  registerSuccessDataSchema,
);
export const registerErrorResponseSchema = errorStatusMessageSchema;

export const loginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const loginSuccessResponseSchema = successMessageDataEnvelope(
  loginSuccessDataSchema,
);
export const loginErrorResponseSchema = errorStatusMessageSchema;

export const getPendingAccountsSuccessResponseSchema = successDataEnvelope(
  z.array(pendingAccountItemSchema),
);
export const getPendingAccountsErrorResponseSchema = errorStatusMessageSchema;

export const getActiveAccountsSuccessResponseSchema = successDataEnvelope(
  z.array(activeAccountItemSchema),
);
export const getActiveAccountsErrorResponseSchema = errorStatusMessageSchema;

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
export const updateAccountStatusErrorResponseSchema = errorStatusMessageSchema;

export const getAdminDashboardSuccessResponseSchema = successDataEnvelope(
  adminDashboardDataSchema,
);
export const getAdminDashboardErrorResponseSchema = errorStatusMessageSchema;

export const updateReviewStatusParamsSchema = z.object({
  id_review: positiveIntIdSchema,
});

export const updateReviewStatusBodySchema = z.object({
  status_review: reviewStatusSchema,
});

export const updateReviewStatusSuccessResponseSchema =
  successMessageDataEnvelope(reviewRecordSchema);
export const updateReviewStatusErrorResponseSchema = errorStatusMessageSchema;

export const getPublicSppgListSuccessResponseSchema = successDataEnvelope(
  z.array(sppgListItemSchema),
);
export const getPublicSppgListErrorResponseSchema = messageOnlyErrorSchema;

export const createPublicReviewBodySchema = z.object({
  id_sppg: positiveIntIdSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  rating_score: reviewRatingSchema.optional(),
});

export const createPublicReviewFilesSchema = attachmentsFilesSchema;

export const createPublicReviewSuccessResponseSchema =
  successMessageDataEnvelope(reviewRecordSchema);
export const createPublicReviewErrorResponseSchema = messageOnlyErrorSchema;

export const getPublicDashboardReviewsSuccessResponseSchema =
  successDataEnvelope(z.array(publicDashboardReviewItemSchema));
export const getPublicDashboardReviewsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getPublicDashboardSppgReportsSuccessResponseSchema =
  successDataEnvelope(z.array(dailyReportForDashboardSchema));
export const getPublicDashboardSppgReportsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getSchoolProfileSuccessResponseSchema = successDataEnvelope(
  schoolProfileDataSchema,
);
export const getSchoolProfileErrorResponseSchema = messageOnlyErrorSchema;

export const updateSchoolProfileBodySchema = z.object({
  school_name: z.string().optional(),
  school_address: z.string().optional(),
});

export const updateSchoolProfileSuccessResponseSchema =
  successMessageDataEnvelope(schoolProfileDataSchema);
export const updateSchoolProfileErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolSppgListSuccessResponseSchema = successDataEnvelope(
  z.array(sppgListItemSchema),
);
export const getSchoolSppgListErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolDailyReportsSuccessResponseSchema = successDataEnvelope(
  z.array(dailyReportWithSppgSchema),
);
export const getSchoolDailyReportsErrorResponseSchema = messageOnlyErrorSchema;

export const createSchoolReviewBodySchema = z.object({
  id_sppg: positiveIntIdSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  rating_score: reviewRatingSchema.optional(),
});

export const createSchoolReviewFilesSchema = attachmentsFilesSchema;

export const createSchoolReviewSuccessResponseSchema =
  successMessageDataEnvelope(reviewRecordSchema);
export const createSchoolReviewErrorResponseSchema = messageOnlyErrorSchema;

export const getSchoolDashboardReviewsSuccessResponseSchema =
  successDataEnvelope(z.array(schoolDashboardReviewItemSchema));
export const getSchoolDashboardReviewsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getSchoolDashboardSppgReportsSuccessResponseSchema =
  successDataEnvelope(z.array(dailyReportForDashboardSchema));
export const getSchoolDashboardSppgReportsErrorResponseSchema =
  messageOnlyErrorSchema;

export const getSppgProfileSuccessResponseSchema = successDataEnvelope(
  sppgProfileDataSchema,
);
export const getSppgProfileErrorResponseSchema = errorStatusMessageSchema;

export const updateSppgProfileBodySchema = z.object({
  sppg_name: z.string().optional(),
  sppg_address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export const updateSppgProfileSuccessResponseSchema =
  successMessageDataEnvelope(sppgEntitySchema.extend(timestampFields));
export const updateSppgProfileErrorResponseSchema = errorStatusMessageSchema;

export const getSppgDashboardSuccessResponseSchema = successMessageDataEnvelope(
  sppgDashboardDataSchema,
);
export const getSppgDashboardErrorResponseSchema = errorStatusMessageSchema;

export const getSppgDailyReportsSuccessResponseSchema = successDataEnvelope(
  z.array(dailyReportWithBudgetAndAttachmentSchema),
);
export const getSppgDailyReportsErrorResponseSchema = errorStatusMessageSchema;

export const createSppgDailyReportBodySchema = z.object({
  date_report: dateOnlySchema,
  menu_name: z.string().min(1),
  meal_time: z.string().optional(),
  total_portion: z.coerce.number().int().positive().optional(),
  energy: z.coerce.number().optional(),
  protein: z.coerce.number().optional(),
  fat: z.coerce.number().optional(),
  carbohydrate: z.coerce.number().optional(),
  budgets: dailyReportBudgetsInputSchema.optional(),
});

export const createSppgDailyReportFilesSchema = attachmentsFilesSchema;

export const createSppgDailyReportSuccessResponseSchema =
  successMessageDataEnvelope(
    z.object({
      id_daily_report: positiveIntIdSchema,
    }),
  );
export const createSppgDailyReportErrorResponseSchema =
  errorStatusMessageSchema;

export const getSppgPeriodicReportsQuerySchema = z.object({
  start_date: dateOnlySchema,
  end_date: dateOnlySchema,
});

export const getSppgPeriodicReportsSuccessResponseSchema = successDataEnvelope(
  periodicReportsDataSchema,
);
export const getSppgPeriodicReportsErrorResponseSchema =
  errorStatusMessageSchema;

export const getSppgDailyReportByIdParamsSchema = z.object({
  id_report: positiveIntIdSchema,
});

export const getSppgDailyReportByIdSuccessResponseSchema = successDataEnvelope(
  dailyReportWithBudgetAndAttachmentSchema,
);
export const getSppgDailyReportByIdErrorResponseSchema =
  errorStatusMessageSchema;

export const updateSppgMonthlyBudgetBodySchema = z.object({
  monthly_budget: z.coerce.number().int(),
});

export const updateSppgMonthlyBudgetSuccessResponseSchema =
  successMessageDataEnvelope(monthlyBudgetResponseDataSchema);
export const updateSppgMonthlyBudgetErrorResponseSchema = z.union([
  errorStatusMessageSchema,
  messageOnlyErrorSchema,
]);

export const frontendDtoSchemas = {
  protectedHeadersSchema,
  jsonEndpointParamsSchema,
  jsonEndpointQuerySchema,
  registerBodySchema,
  registerSuccessResponseSchema,
  registerErrorResponseSchema,
  loginBodySchema,
  loginSuccessResponseSchema,
  loginErrorResponseSchema,
  getPendingAccountsSuccessResponseSchema,
  getPendingAccountsErrorResponseSchema,
  getActiveAccountsSuccessResponseSchema,
  getActiveAccountsErrorResponseSchema,
  updateAccountStatusParamsSchema,
  updateAccountStatusBodySchema,
  updateAccountStatusSuccessResponseSchema,
  updateAccountStatusErrorResponseSchema,
  getAdminDashboardSuccessResponseSchema,
  getAdminDashboardErrorResponseSchema,
  updateReviewStatusParamsSchema,
  updateReviewStatusBodySchema,
  updateReviewStatusSuccessResponseSchema,
  updateReviewStatusErrorResponseSchema,
  getPublicSppgListSuccessResponseSchema,
  getPublicSppgListErrorResponseSchema,
  createPublicReviewBodySchema,
  createPublicReviewFilesSchema,
  createPublicReviewSuccessResponseSchema,
  createPublicReviewErrorResponseSchema,
  getPublicDashboardReviewsSuccessResponseSchema,
  getPublicDashboardReviewsErrorResponseSchema,
  getPublicDashboardSppgReportsSuccessResponseSchema,
  getPublicDashboardSppgReportsErrorResponseSchema,
  getSchoolProfileSuccessResponseSchema,
  getSchoolProfileErrorResponseSchema,
  updateSchoolProfileBodySchema,
  updateSchoolProfileSuccessResponseSchema,
  updateSchoolProfileErrorResponseSchema,
  getSchoolSppgListSuccessResponseSchema,
  getSchoolSppgListErrorResponseSchema,
  getSchoolDailyReportsSuccessResponseSchema,
  getSchoolDailyReportsErrorResponseSchema,
  createSchoolReviewBodySchema,
  createSchoolReviewFilesSchema,
  createSchoolReviewSuccessResponseSchema,
  createSchoolReviewErrorResponseSchema,
  getSchoolDashboardReviewsSuccessResponseSchema,
  getSchoolDashboardReviewsErrorResponseSchema,
  getSchoolDashboardSppgReportsSuccessResponseSchema,
  getSchoolDashboardSppgReportsErrorResponseSchema,
  getSppgProfileSuccessResponseSchema,
  getSppgProfileErrorResponseSchema,
  updateSppgProfileBodySchema,
  updateSppgProfileSuccessResponseSchema,
  updateSppgProfileErrorResponseSchema,
  getSppgDashboardSuccessResponseSchema,
  getSppgDashboardErrorResponseSchema,
  getSppgDailyReportsSuccessResponseSchema,
  getSppgDailyReportsErrorResponseSchema,
  createSppgDailyReportBodySchema,
  createSppgDailyReportFilesSchema,
  createSppgDailyReportSuccessResponseSchema,
  createSppgDailyReportErrorResponseSchema,
  getSppgPeriodicReportsQuerySchema,
  getSppgPeriodicReportsSuccessResponseSchema,
  getSppgPeriodicReportsErrorResponseSchema,
  getSppgDailyReportByIdParamsSchema,
  getSppgDailyReportByIdSuccessResponseSchema,
  getSppgDailyReportByIdErrorResponseSchema,
  updateSppgMonthlyBudgetBodySchema,
  updateSppgMonthlyBudgetSuccessResponseSchema,
  updateSppgMonthlyBudgetErrorResponseSchema,
} as const;

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
export type UpdateAccountStatusBody = z.infer<
  typeof updateAccountStatusBodySchema
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
