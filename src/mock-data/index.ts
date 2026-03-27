import type {
  TAdmin,
  TAdminStatistics,
  TBudget,
  TNutritionalFacts,
  TPublic,
  TPublicReview,
  TPublicReviewHistory,
  TRole,
  TSchool,
  TSppg,
  TSppgPeriodicReport,
  TSppgReport,
  TSppgReportDetail,
  TSppgStatistics,
  TUser,
} from "@/types";

export const roles: TRole[] = ["ADMIN", "PUBLIC", "SCHOOL", "SPPG"];

export const admins: TAdmin[] = [
  {
    id: "user-admin-001",
    role: "ADMIN",
    username: "admin.pagar",
  },
];

export const publicUsers: TPublic[] = [
  {
    id: "user-public-001",
    role: "PUBLIC",
    username: "warga.malang",
  },
];

export const schoolUsers: TSchool[] = [
  {
    id: "user-school-001",
    schoolId: "SCH-MLG-001",
    schoolName: "SDN Kauman 1 Malang",
    role: "SCHOOL",
    username: "sdn-kauman-1",
    address: "Jl. Basuki Rahmat No. 7, Malang",
  },
];

export const sppgUsers: TSppg[] = [
  {
    id: "user-sppg-001",
    role: "SPPG",
    username: "sppg-berkah-nutrisi",
    address: "Jl. Soekarno Hatta No. 18, Malang",
    sppgId: "SPPG-MLG-001",
    sppgName: "SPPG Berkah Nutrisi",
  },
];

export const users: TUser[] = [
  ...admins,
  ...publicUsers,
  ...schoolUsers,
  ...sppgUsers,
];

export const sppgs: TSppg[] = [
  {
    id: "user-sppg-001",
    role: "SPPG",
    username: "sppg-berkah-nutrisi",
    sppgId: "SPPG-MLG-001",
    sppgName: "SPPG Berkah Nutrisi",
    address: "Jl. Soekarno Hatta No. 18, Malang",
  },
  {
    id: "user-sppg-002",
    role: "SPPG",
    username: "sppg-sehat-bersama",
    sppgId: "SPPG-MLG-002",
    sppgName: "SPPG Sehat Bersama",
    address: "Jl. Ijen No. 44, Malang",
  },
  {
    id: "user-sppg-003",
    role: "SPPG",
    username: "sppg-gizi-nusantara",
    sppgId: "SPPG-SBY-001",
    sppgName: "SPPG Gizi Nusantara",
    address: "Jl. Darmo Permai No. 12, Surabaya",
  },
];

export const schools: TSchool[] = [
  {
    id: "user-school-001",
    role: "SCHOOL",
    username: "sdn-kauman-1",
    schoolId: "SCH-MLG-001",
    schoolName: "SDN Kauman 1 Malang",
    address: "Jl. Basuki Rahmat No. 7, Malang",
  },
  {
    id: "user-school-002",
    role: "SCHOOL",
    username: "smpn-3-malang",
    schoolId: "SCH-MLG-002",
    schoolName: "SMPN 3 Malang",
    address: "Jl. Bandung No. 20, Malang",
  },
];

export const nutritionalFacts: TNutritionalFacts = {
  calories: {
    inKcal: 710,
    inDciPercent: 36,
  },
  proteinGrams: {
    inGrams: 35,
    inDciPercent: 58,
  },
  carbGrams: {
    inGrams: 65,
    inDciPercent: 22,
  },
  fatGrams: {
    inGrams: 24,
    inDciPercent: 31,
  },
};

export const sppgReports: TSppgReport[] = [
  {
    id: "report-001",
    title: "Menu Ikan Goreng dan Sayur Bening",
    author: sppgs[0],
    mealTime: "Makan Siang",
    imageUrl: "https://placehold.co/1200x800?text=SPPG+Report+1",
    postedAt: new Date("2026-03-20T11:30:00+07:00"),
    nutritionalFacts,
    content:
      "Menu hari ini terdiri dari nasi putih, ikan goreng, sayur bening bayam, tahu, dan buah pisang. Distribusi berjalan lancar dan mayoritas siswa menghabiskan porsi.",
    status: "SUBMITTED",
  },
  {
    id: "report-002",
    title: "Menu Ayam Bakar dan Tumis Buncis",
    author: sppgs[1],
    mealTime: "Makan Siang",
    imageUrl: "https://placehold.co/1200x800?text=SPPG+Report+2",
    postedAt: new Date("2026-03-19T11:45:00+07:00"),
    nutritionalFacts: {
      calories: {
        inKcal: 680,
        inDciPercent: 34,
      },
      proteinGrams: {
        inGrams: 32,
        inDciPercent: 53,
      },
      carbGrams: {
        inGrams: 61,
        inDciPercent: 20,
      },
      fatGrams: {
        inGrams: 22,
        inDciPercent: 28,
      },
    },
    content:
      "Ayam bakar disajikan bersama tumis buncis wortel, nasi, dan jeruk. Porsi protein disesuaikan dengan kelompok usia siswa.",
    status: "SUBMITTED",
  },
  {
    id: "report-003",
    title: "Menu Telur Balado dan Capcay",
    author: sppgs[2],
    mealTime: "Sarapan",
    imageUrl: "https://placehold.co/1200x800?text=SPPG+Report+3",
    postedAt: new Date("2026-03-18T08:00:00+07:00"),
    nutritionalFacts: {
      calories: {
        inKcal: 590,
        inDciPercent: 30,
      },
      proteinGrams: {
        inGrams: 27,
        inDciPercent: 45,
      },
      carbGrams: {
        inGrams: 54,
        inDciPercent: 18,
      },
      fatGrams: {
        inGrams: 18,
        inDciPercent: 23,
      },
    },
    content:
      "Menu sarapan ringan dengan fokus protein dan sayuran. Capcay dibuat dengan sedikit minyak untuk menjaga keseimbangan gizi.",
    status: "SUBMITTED",
  },
];

export const publicReviews: TPublicReview[] = [
  {
    id: "review-001",
    title: "Porsi cukup dan lauk segar",
    imageUrl: "https://placehold.co/1200x800?text=Public+Review+1",
    postedAt: new Date("2026-03-20T13:10:00+07:00"),
    ratingScore: 4.5,
    reporterName: "Anonim",
    forSppg: {
      id: sppgs[0].id,
      username: sppgs[0].username,
      sppgId: sppgs[0].sppgId,
      sppgName: sppgs[0].sppgName,
    },
    content:
      "Menu hari ini terlihat bersih dan anak saya bilang ikannya enak. Sayurnya bisa ditambah sedikit agar lebih seimbang.",
  },
  {
    id: "review-002",
    title: "Distribusi tepat waktu",
    imageUrl: "https://placehold.co/1200x800?text=Public+Review+2",
    postedAt: new Date("2026-03-19T14:25:00+07:00"),
    ratingScore: 4.8,
    reporterName: "Anonim",
    forSppg: {
      id: sppgs[1].id,
      username: sppgs[1].username,
      sppgId: sppgs[1].sppgId,
      sppgName: sppgs[1].sppgName,
    },
    content:
      "Makanan datang sesuai jadwal dan masih hangat. Anak-anak terlihat antusias saat makan siang.",
  },
  {
    id: "review-003",
    title: "Menu cukup baik",
    imageUrl: "https://placehold.co/1200x800?text=Public+Review+3",
    postedAt: new Date("2026-03-18T09:30:00+07:00"),
    ratingScore: 3.9,
    reporterName: "Anonim",
    forSppg: {
      id: sppgs[2].id,
      username: sppgs[2].username,
      sppgId: sppgs[2].sppgId,
      sppgName: sppgs[2].sppgName,
    },
    content:
      "Rasa makanan cukup baik, tetapi buah pendamping kadang tidak tersedia. Secara umum masih memuaskan.",
  },
];

export const budgets: TBudget[] = [
  {
    id: "budget-001",
    items: [
      {
        id: "budget-item-001",
        name: "Ikan nila segar",
        price: 1250000,
      },
      {
        id: "budget-item-002",
        name: "Bayam dan wortel",
        price: 320000,
      },
      {
        id: "budget-item-003",
        name: "Beras premium",
        price: 890000,
      },
    ],
    totalPrice: 2460000,
    attachments: [
      {
        id: "attachment-001",
        label: "Invoice bahan baku",
        url: "https://example.com/invoices/budget-001.pdf",
        mimeType: "application/pdf",
      },
      {
        id: "attachment-002",
        label: "Dokumentasi distribusi",
        url: "https://example.com/photos/distribution-001.jpg",
        mimeType: "image/jpeg",
      },
    ],
  },
];

export const sppgReportDetails: TSppgReportDetail[] = [
  {
    ...sppgReports[0],
    relatedReports: [sppgReports[1], sppgReports[2]],
    budget: budgets[0],
  },
];

export const sppgStatistics: TSppgStatistics = {
  isDailyReportSubmitted: true,
  weeklyCalories: {
    average: 672,
    percentFromLastWeek: 8.4,
  },
  budget: {
    monthly: {
      remaining: 12450000,
      status: "SAFE",
    },
  },
  publicReviews: {
    total: 186,
  },
};

export const sppgPeriodicReports: TSppgPeriodicReport[] = [
  {
    id: "periodic-001",
    url: "https://example.com/reports/2024-01.pdf",
    periode: "Januari 2024",
    monthIndex: 0,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-002",
    url: "https://example.com/reports/2024-02.pdf",
    periode: "Februari 2024",
    monthIndex: 1,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-003",
    url: "https://example.com/reports/2024-03.pdf",
    periode: "Maret 2024",
    monthIndex: 2,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-004",
    url: "https://example.com/reports/2024-04.pdf",
    periode: "April 2024",
    monthIndex: 3,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-005",
    url: "https://example.com/reports/2024-05.pdf",
    periode: "Mei 2024",
    monthIndex: 4,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-006",
    url: "https://example.com/reports/2024-06.pdf",
    periode: "Juni 2024",
    monthIndex: 5,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-007",
    url: "https://example.com/reports/2024-07.pdf",
    periode: "Juli 2024",
    monthIndex: 6,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-008",
    url: "https://example.com/reports/2024-08.pdf",
    periode: "Agustus 2024",
    monthIndex: 7,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
  {
    id: "periodic-009",
    url: "https://example.com/reports/2024-09.pdf",
    periode: "September 2024",
    monthIndex: 8,
    status: "VERIFIED",
    totalMeal: 1500,
    totalBudget: 75000000,
  },
];

export const adminStatistics: TAdminStatistics = {
  reports: {
    total: 342,
  },
  sppg: {
    total: 27,
  },
  school: {
    total: 112,
  },
  public: {
    total: 1840,
  },
  reviews: {
    school: 91,
    public: 286,
    total: 377,
  },
  sppgWarnings: {
    total: 2,
    sppgs: [
      {
        id: sppgs[2].sppgId,
        name: sppgs[2].sppgName,
        rating: 1.8,
        reportsCount: 12,
      },
    ],
  },
};

export const publicReviewHistory: TPublicReviewHistory = {
  reviews: publicReviews,
};

export const mockData = {
  roles,
  users,
  sppgs,
  schools,
  nutritionalFacts,
  sppgReports,
  publicReviews,
  budgets,
  sppgReportDetails,
  sppgStatistics,
  sppgPeriodicReports,
  adminStatistics,
  publicReviewHistory,
};

export const sppgReportData = {
  author: sppgReports[0].author.sppgName,
  timeSincePosted: "2 jam lalu",
  origin: schools[0].schoolName,
  title: sppgReports[0].title,
  content: sppgReports[0].content,
  likes: 124,
  comments: 18,
  image: sppgReports[0].imageUrl,
  rawNutritionalFacts: {
    caloriesKcal: sppgReports[0].nutritionalFacts.calories.inKcal,
    proteinGrams: sppgReports[0].nutritionalFacts.proteinGrams.inGrams,
    carbGrams: sppgReports[0].nutritionalFacts.carbGrams.inGrams,
    fatGrams: sppgReports[0].nutritionalFacts.fatGrams.inGrams,
  },
};
