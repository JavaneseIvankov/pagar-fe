import {
  ArrowRight01Icon,
  ChartBarLineIcon, // let's use something like this
  DashboardSquare01Icon,
  Delete01Icon,
  Download01Icon,
  FavouriteIcon,
  File02Icon,
  Tick01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <h2 className="text-[28px] font-bold tracking-tight text-foreground">
          Selamat Datang! CV. Berkah Nutrisi!
        </h2>
        <p className="text-muted-foreground mt-1">
          Berikut adalah ringkasan pengelolaan makanan hari ini, 14 Maret 2026
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 font-semibold px-3 py-1 rounded-full text-xs"
              >
                SELESAI
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Status Hari Ini
              </p>
              <p className="text-lg font-bold">Laporan Terkirim</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-500 hover:bg-blue-50 font-semibold px-3 py-1 rounded-full text-xs"
              >
                +50%
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Rata-rata Kalori (Minggu ini)
              </p>
              <p className="text-lg font-bold">2,150 kkal</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <HugeiconsIcon
                  icon={Wallet01Icon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="bg-orange-50 text-orange-500 hover:bg-orange-50 font-semibold px-3 py-1 rounded-full text-xs"
              >
                AMAN
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Sisa Anggaran Bulanan
              </p>
              <p className="text-lg font-bold">Rp 4.500.000</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <HugeiconsIcon
                  icon={File02Icon}
                  size={20}
                  className="stroke-2"
                />
              </div>
              <Badge
                variant="secondary"
                className="bg-purple-50 text-purple-600 hover:bg-purple-50 font-semibold px-3 py-1 rounded-full text-xs"
              >
                MASUK
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Laporan Masyarakat
              </p>
              <p className="text-lg font-bold">10 Laporan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Riwayat Laporan */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden">
        <div className="px-6 py-5 flex items-center gap-2 border-b border-muted/50">
          <HugeiconsIcon
            icon={DashboardSquare01Icon}
            size={20}
            className="text-emerald-600 stroke-2"
          />
          <h3 className="font-bold text-lg">Riwayat Laporan</h3>
        </div>
        <div className="p-2">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-medium text-muted-foreground h-12">
                  Nama Laporan
                </TableHead>
                <TableHead className="font-medium text-muted-foreground h-12">
                  Tanggal
                </TableHead>
                <TableHead className="font-medium text-muted-foreground h-12">
                  Status
                </TableHead>
                <TableHead className="font-medium text-muted-foreground h-12 w-24 text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-muted/50">
                <TableCell className="font-semibold py-4">
                  Nasi Ayam Bakar Spesial
                </TableCell>
                <TableCell className="font-medium py-4">
                  14 Maret 2026
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 rounded-full px-3 py-1 font-semibold text-xs"
                  >
                    Terkirim
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
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
                <TableCell className="font-semibold py-4">
                  Nasi Ayam Goreng Spesial
                </TableCell>
                <TableCell className="font-medium py-4">
                  12 Maret 2026
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 rounded-full px-3 py-1 font-semibold text-xs"
                  >
                    Terkirim
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
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
                <TableCell className="font-semibold py-4">
                  Nasi Ikan Bakar
                </TableCell>
                <TableCell className="font-medium py-4">
                  10 Maret 2026
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 rounded-full px-3 py-1 font-semibold text-xs"
                  >
                    Terkirim
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
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
      <Card className="border-none shadow-sm rounded-xl">
        <div className="px-6 py-5 flex items-center justify-between">
          <h3 className="font-bold text-lg">Laporan Masyarakat</h3>
          <Button
            variant="ghost"
            className="text-emerald-600 hover:text-emerald-700 hover:bg-transparent p-0 font-semibold gap-2 h-auto"
          >
            Lihat Semua <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Button>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            <div className="col-span-3">PELAPOR</div>
            <div className="col-span-7">LAPORAN & VENDOR</div>
            <div className="col-span-2 text-right">BUKTI FOTO</div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-start">
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
              <p className="text-sm font-medium leading-relaxed">
                Sayurnya agak sedikit layu, tapi ayamnya dan bumbunya meresap.
                Porsi nasi mungkin bisa ditambah sedikit lagi untuk anak kelas
                6.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                CV. Berkah Nutrisi
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <div className="w-24 h-16 bg-muted rounded-md overflow-hidden relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-slate-200"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-start">
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
              <p className="text-sm font-medium leading-relaxed">
                Dagingnya agak sedikit keras, tapi bumbunya meresap. Sambalnya
                terlalu kental, mungkin bisa lebih cair identik seperti sambal
                pada umumnya.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                CV. Berkah Nutrisi
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <div className="w-24 h-16 bg-muted rounded-md overflow-hidden relative">
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
