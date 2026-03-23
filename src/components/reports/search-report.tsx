"use client";

import { debounce, parseAsInteger, useQueryState } from "nuqs";
import { Suspense, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SearchInput } from "../search-input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

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
    limitUrlUpdates: debounce(500),
  });

  const [kecamatanId, setKecamatanId] = useQueryState<number>(
    "kecamatanId",
    parseAsInteger,
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
  className,
  items,
  searchValue,
  isReadOnly = false,
  onSearchChange,
  selectedKecamatan,
  onKecamatanChange,
}: SearchReportLayoutProps) {
  // FIXME: this has bad tab-navigation
  return (
    <div
      className={cn("flex w-full items-center justify-center gap-2", className)}
    >
      <SearchInput
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        readOnly={isReadOnly}
      />
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
        <ComboboxInput placeholder="Pilih kecamatan" disabled={isReadOnly} />
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
    </div>
  );
}
