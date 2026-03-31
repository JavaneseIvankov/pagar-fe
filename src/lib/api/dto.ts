import { z } from "zod/v3";

const dateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
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

const attachmentEntitySchema = z.object({
  id_attachment: uuidSchema,
  entity_type: z.string(),
  id_entity: uuidSchema,
  file_url: z.string(),
  file_type: z.string().nullable(),
  file_size: z.number().int().nullable(),
  file_category: z.string().nullable(),
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
  meal_time: z.string().nullable(),
  total_portion: z.number().int().nullable(),
  menu_description: z.string().nullable(),
  total_expense: z.number().int(),
  energy: z.number().nullable(),
  protein: z.number().nullable(),
  fat: z.number().nullable(),
  carbohydrate: z.number().nullable(),
});

const reviewEntitySchema = z.object({
  id_review: uuidSchema,
  id_sppg: uuidSchema,
  id_school: uuidSchema.nullable(),
  id_user: uuidSchema,
  is_anonymous: z.boolean().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  rating_score: z.number().int().min(1).max(5).nullable(),
  status_review: reviewStatusSchema,
});

const schoolEntitySchema = z.object({
  id_school: uuidSchema,
  id_user: uuidSchema,
  school_name: z.string(),
  school_address: z.string().nullable(),
});

const sppgEntitySchema = z.object({
  id_sppg: uuidSchema,
  id_user: uuidSchema,
  sppg_name: z.string(),
  sppg_address: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  monthly_budget: z.number().int(),
});

const userEntitySchema = z.object({
  id_user: uuidSchema,
  role: roleSchema,
  name: z.string().nullable(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  registration_code: z.string().nullable(),
  bgn_code: z.string().nullable(),
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
  registration_code: z.string().nullable(),
  bgn_code: z.string().nullable(),
  createdAt: z.string(),
});

const activeAccountItemSchema = z.object({
  id_user: uuidSchema,
  username: z.string(),
  email: z.string().email(),
  role: schoolOrSppgRoleSchema,
  registration_code: z.string().nullable(),
  bgn_code: z.string().nullable(),
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

const attachmentUrlOnlySchema = z.object({
  file_url: z.string(),
});

const reviewRecordSchema = reviewEntitySchema.extend(timestampFields);
const createReviewRecordSchema = reviewRecordSchema.extend({
  id_school: uuidSchema.nullable().optional(),
  is_anonymous: z.boolean().nullable().optional(),
  rating_score: z
    .union([z.number().int().min(1).max(5), numericStringSchema])
    .nullable(),
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

const sppgProfileDataSchema = sppgEntitySchema.extend(timestampFields).extend({
  user: z.object({
    username: z.string(),
    email: z.string().email(),
    account_status: accountStatusSchema,
    bgn_code: z.string().nullable(),
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
  id_daily_report: uuidSchema,
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
      user: z
        .object({
          username: z.string(),
        })
        .optional(),
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
  monthly_budget: z.number().int(),
});

export const protectedHeadersSchema = authHeaderSchema;
export const jsonEndpointParamsSchema = emptyObjectSchema;
export const jsonEndpointQuerySchema = emptyObjectSchema;
export const paginatedListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
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
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(1).optional(),
});

export const updateAdminProfileSuccessResponseSchema =
  successMessageDataEnvelope(
    z.object({
      id_user: uuidSchema,
      name: z.string().nullable(),
      username: z.string(),
      email: z.string().email(),
    }),
  );
export const updateAdminProfileErrorResponseSchema = statusErrorResponseSchema;

export const getAdminDashboardSuccessResponseSchema = successDataEnvelope(
  adminDashboardDataSchema,
);
export const getAdminDashboardErrorResponseSchema = statusErrorResponseSchema;

export const updateReviewStatusParamsSchema = z.object({
  id_review: uuidSchema,
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
  title: z.string().optional(),
  description: z.string().optional(),
  rating_score: reviewRatingSchema.optional(),
});

export const createPublicReviewFilesSchema = attachmentsFilesSchema;

export const createPublicReviewSuccessResponseSchema = successDataEnvelope(
  createReviewRecordSchema,
);
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
  id_sppg: uuidSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  rating_score: reviewRatingSchema.optional(),
});

export const createSchoolReviewFilesSchema = attachmentsFilesSchema;

export const createSchoolReviewSuccessResponseSchema =
  successMessageDataEnvelope(createReviewRecordSchema);
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
  z.array(dailyReportWithBudgetAndAttachmentSchema),
);
export const getSppgDailyReportsErrorResponseSchema = statusErrorResponseSchema;

export const createSppgDailyReportBodySchema = z.object({
  date_report: dateOnlySchema,
  menu_name: z.string().min(1),
  meal_time: z.string().optional(),
  total_portion: z.coerce.number().int().optional(),
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
      id_daily_report: uuidSchema,
      total_expense: z.number().int(),
    }),
  );
export const createSppgDailyReportErrorResponseSchema =
  statusErrorResponseSchema;

export const getSppgPeriodicReportsQuerySchema = z.object({
  start_date: dateOnlySchema,
  end_date: dateOnlySchema,
});

export const getSppgPeriodicReportsSuccessResponseSchema = successDataEnvelope(
  periodicReportsDataSchema,
);
export const getSppgPeriodicReportsErrorResponseSchema =
  statusErrorResponseSchema;

export const getSppgDailyReportByIdParamsSchema = z.object({
  id_report: uuidSchema,
});

export const getSppgDailyReportByIdSuccessResponseSchema = successDataEnvelope(
  dailyReportWithBudgetAndAttachmentSchema,
);
export const getSppgDailyReportByIdErrorResponseSchema =
  statusErrorResponseSchema;

export const updateSppgMonthlyBudgetBodySchema = z.object({
  monthly_budget: z.coerce.number().int(),
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
