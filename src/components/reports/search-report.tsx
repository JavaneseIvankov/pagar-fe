"use client";

import { debounce, parseAsInteger, useQueryState } from "nuqs";
import { Suspense, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SearchInput } from "../search-input";

type KecamatanFilterEntry = {
  value: number;
  label: string;
};

// FIXME: temporary data
const KECAMATAN_LIST: KecamatanFilterEntry[] = [
  { value: 1, label: "Kecamatan 1" },
  { value: 2, label: "Kecamatan 2" },
  { value: 3, label: "Kecamatan 3" },
];

export interface SearchReportProps {
  className?: string;
}

export function SearchReport({ className }: SearchReportProps) {
  return (
    <Suspense fallback={<SearchReportFallback className={className} />}>
      <SearchReportContainer className={className} />
    </Suspense>
  );
}

function SearchReportFallback({ className }: { className?: string }) {
  return (
    <SearchReportLayout
      className={className}
      searchValue=""
      isReadOnly={true}
      selectedKecamatan={null}
      items={[]}
    />
  );
}

function SearchReportContainer({ className }: { className?: string }) {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    limitUrlUpdates: debounce(500),
  });

  const [kecamatanId, setKecamatanId] = useQueryState<number>(
    "kecamatanId",
    parseAsInteger.withOptions({
      shallow: false,
    }),
  );

  const selectedKecamatan = useMemo(() => {
    return KECAMATAN_LIST.find((k) => k.value === kecamatanId) ?? null;
  }, [kecamatanId]);

  return (
    <SearchReportLayout
      className={className}
      searchValue={search}
      onSearchChange={(value) => setSearch(value)}
      selectedKecamatan={selectedKecamatan}
      onKecamatanChange={(value) => setKecamatanId(value.value)}
      items={KECAMATAN_LIST}
    />
  );
}

interface SearchReportLayoutProps {
  className?: string;
  items: KecamatanFilterEntry[];
  searchValue: string;
  isReadOnly?: boolean;
  onSearchChange?: (value: string) => void;
  selectedKecamatan: KecamatanFilterEntry | null;
  onKecamatanChange?: (value: KecamatanFilterEntry) => void;
}

function SearchReportLayout({
  _className,
  _items,
  _searchValue,
  isReadOnly = false,
  onSearchChange,
  _selectedKecamatan,
  _onKecamatanChange,
}: SearchReportLayoutProps) {
  // FIXME: this has bad tab-navigation
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center",
        className,
      )}
    >
      <SearchInput
        className="w-full sm:flex-1"
        inputClassName="h-10"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        readOnly={isReadOnly}
        placeholder="Cari laporan atau menu…"
        aria-label="Cari laporan atau menu"
      />
      {/* 
          FIXME: temprary
      <Combobox
        items={items}
        itemToStringValue={(k: KecamatanFilterEntry) => k.label}
        value={selectedKecamatan}
        onValueChange={(value) => {
          if (value && onKecamatanChange) {
            onKecamatanChange(value);
          }
        }}
      >
        <ComboboxInput
          className="w-full sm:w-[160px]"
          placeholder="Pilih kecamatan"
          disabled={isReadOnly}
          aria-label="Pilih kecamatan"
        />
        <ComboboxContent>
          <ComboboxEmpty>Tidak ada kecamatan yang cocok</ComboboxEmpty>
          <ComboboxList>
            {(kec: KecamatanFilterEntry) =>
              items.length > 0 ? (
                <ComboboxItem key={kec.value} value={kec}>
                  {kec.label}
                </ComboboxItem>
              ) : null
            }
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      */}
    </div>
  );
}
