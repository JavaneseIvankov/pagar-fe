import {
  ArrowRight01Icon,
  DashboardSquare01Icon,
  Delete01Icon,
  Download01Icon,
  FavouriteIcon,
  File02Icon,
  Tick01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SppgDashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h2 className="font-bold text-[28px] text-foreground tracking-tight">
          Selamat Datang! CV. Berkah Nutrisi!
        </h2>
        <p className="mt-1 text-muted-foreground">
          Berikut adalah ringkasan pengelolaan makanan hari ini, 14 Maret 2026
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Card 1 */}
        <Card className="rounded-xl border-none shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-50"
              >
                SELESAI
              </Badge>
            </div>
            <div>
              <p className="mb-1 font-medium text-muted-foreground text-xs">
                Status Hari Ini
              </p>
              <p className="font-bold text-lg">Laporan Terkirim</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="rounded-xl border-none shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-500 text-xs hover:bg-blue-50"
              >
                +50%
              </Badge>
            </div>
            <div>
              <p className="mb-1 font-medium text-muted-foreground text-xs">
                Rata-rata Kalori (Minggu ini)
              </p>
              <p className="font-bold text-lg">2,150 kkal</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="rounded-xl border-none shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                <HugeiconsIcon
                  icon={Wallet01Icon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-500 text-xs hover:bg-orange-50"
              >
                AMAN
              </Badge>
            </div>
            <div>
              <p className="mb-1 font-medium text-muted-foreground text-xs">
                Sisa Anggaran Bulanan
              </p>
              <p className="font-bold text-lg">Rp 4.500.000</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="rounded-xl border-none shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <HugeiconsIcon
                  icon={File02Icon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="rounded-full bg-purple-50 px-3 py-1 font-semibold text-purple-600 text-xs hover:bg-purple-50"
              >
                MASUK
              </Badge>
            </div>
            <div>
              <p className="mb-1 font-medium text-muted-foreground text-xs">
                Laporan Masyarakat
              </p>
              <p className="font-bold text-lg">10 Laporan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Riwayat Laporan */}
      <Card className="overflow-hidden rounded-xl border-none shadow-sm">
        <div className="flex items-center gap-2 border-muted/50 border-b px-6 py-5">
          <HugeiconsIcon
            icon={DashboardSquare01Icon}
            size={20}
            className="stroke-2 text-emerald-600"
          />
          <h3 className="font-bold text-lg">Riwayat Laporan</h3>
        </div>
        <div className="p-2">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="h-12 font-medium text-muted-foreground">
                  Nama Laporan
                </TableHead>
                <TableHead className="h-12 font-medium text-muted-foreground">
                  Tanggal
                </TableHead>
                <TableHead className="h-12 font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="h-12 w-24 text-right font-medium text-muted-foreground">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-muted/50">
                <TableCell className="py-4 font-semibold">
                  Nasi Ayam Bakar Spesial
                </TableCell>
                <TableCell className="py-4 font-medium">
                  14 Maret 2026
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-50"
                  >
                    Terkirim
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Download01Icon} size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="border-muted/50">
                <TableCell className="py-4 font-semibold">
                  Nasi Ayam Goreng Spesial
                </TableCell>
                <TableCell className="py-4 font-medium">
                  12 Maret 2026
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-50"
                  >
                    Terkirim
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Download01Icon} size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="py-4 font-semibold">
                  Nasi Ikan Bakar
                </TableCell>
                <TableCell className="py-4 font-medium">
                  10 Maret 2026
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-600 text-xs hover:bg-emerald-50"
                  >
                    Terkirim
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Download01Icon} size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Laporan Masyarakat */}
      <Card className="rounded-xl border-none shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="font-bold text-lg">Laporan Masyarakat</h3>
          <Button
            variant="ghost"
            className="h-auto gap-2 p-0 font-semibold text-emerald-600 hover:bg-transparent hover:text-emerald-700"
          >
            Lihat Semua <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Button>
        </div>
        <div className="flex flex-col gap-6 px-6 pb-6">
          <div className="mb-2 grid grid-cols-12 gap-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            <div className="col-span-3">PELAPOR</div>
            <div className="col-span-7">LAPORAN & VENDOR</div>
            <div className="col-span-2 text-right">BUKTI FOTO</div>
          </div>

          <div className="grid grid-cols-12 items-start gap-4">
            <div className="col-span-3 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted">
                  <HugeiconsIcon
                    icon={DashboardSquare01Icon}
                    size={20}
                    className="text-muted-foreground"
                  />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">SDN 01 Malang</span>
            </div>
            <div className="col-span-7">
              <p className="font-medium text-sm leading-relaxed">
                Sayurnya agak sedikit layu, tapi ayamnya dan bumbunya meresap.
                Porsi nasi mungkin bisa ditambah sedikit lagi untuk anak kelas
                6.
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                CV. Berkah Nutrisi
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <div className="relative h-16 w-24 overflow-hidden rounded-md bg-muted">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-slate-200"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 items-start gap-4">
            <div className="col-span-3 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted">
                  <HugeiconsIcon
                    icon={DashboardSquare01Icon}
                    size={20}
                    className="text-muted-foreground"
                  />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">Anonim</span>
            </div>
            <div className="col-span-7">
              <p className="font-medium text-sm leading-relaxed">
                Dagingnya agak sedikit keras, tapi bumbunya meresap. Sambalnya
                terlalu kental, mungkin bisa lebih cair identik seperti sambal
                pada umumnya.
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                CV. Berkah Nutrisi
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <div className="relative h-16 w-24 overflow-hidden rounded-md bg-muted">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
