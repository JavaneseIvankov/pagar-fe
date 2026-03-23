"use client";

import { debounce, parseAsInteger, useQueryState } from "nuqs";
import type { ComponentProps } from "react";
import { Suspense, useCallback } from "react";
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
const kecamatanList: KecamatanFilterEntry[] = [
  { value: 1, label: "Kecamatan 1" },
  { value: 2, label: "Kecamatan 2" },
  { value: 3, label: "Kecamatan 3" },
];

interface SearchReportControlsProps {
  items: KecamatanFilterEntry[];
  searchInputProps?: ComponentProps<typeof SearchInput>;
  selectedKecamatan?: KecamatanFilterEntry | null;
  onSelectedKecamatanChange?: (value: KecamatanFilterEntry) => void;
}

export function SearchReport() {
  return (
    <Suspense fallback={<SearchReportFallback />}>
      {<InnerSearchReport />}
    </Suspense>
  );
}

function SearchReportFallback() {
  return (
    <SearchReportControls
      items={[]}
      searchInputProps={{ value: "", readOnly: true }}
    />
  );
}

function InnerSearchReport() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    limitUrlUpdates: debounce(500),
  });

  const [kecamatanId, setKecamatanId] = useQueryState<number>(
    "kecamatanId",
    parseAsInteger,
  );

  const getEntryFromKecamatanId = useCallback((id: number | null) => {
    if (id === null) return null;
    return kecamatanList.find((k) => k.value === id);
  }, []);

  // FIXME: this has bad tab-navigation
  return (
    <SearchReportControls
      items={kecamatanList}
      searchInputProps={{
        value: search,
        onChange: (e) => setSearch(e.target.value),
      }}
      selectedKecamatan={getEntryFromKecamatanId(kecamatanId)}
      onSelectedKecamatanChange={(value) => setKecamatanId(value.value)}
    />
  );
}

function SearchReportControls({
  items,
  searchInputProps,
  selectedKecamatan = null,
  onSelectedKecamatanChange,
}: SearchReportControlsProps) {
  return (
    <>
      <SearchInput {...searchInputProps} />
      <Combobox
        items={items}
        itemToStringValue={(k: KecamatanFilterEntry) => k.label}
        value={selectedKecamatan}
        onValueChange={(value) => {
          if (value) {
            onSelectedKecamatanChange?.(value);
          }
        }}
      >
        <ComboboxInput placeholder="Pilih kecamatan" />
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
    </>
  );
}
