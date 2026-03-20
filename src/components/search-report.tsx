"use client";

import { debounce, parseAsInteger, useQueryState } from "nuqs";
import { useCallback } from "react";
import { SearchInput } from "./search-input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";

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

export function SearchReport() {
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
    <>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <Combobox
        items={kecamatanList}
        itemToStringValue={(k: KecamatanFilterEntry) => k.label}
        value={getEntryFromKecamatanId(kecamatanId)}
        onValueChange={(k) => {
          if (k) {
            setKecamatanId(k?.value);
          }
        }}
      >
        <ComboboxInput
          className={"bg-background"}
          placeholder="Pilih kecamatan"
        />
        <ComboboxContent>
          <ComboboxEmpty>Tidak ada kecamatan yang cocok</ComboboxEmpty>
          <ComboboxList>
            {(kec: KecamatanFilterEntry) => (
              <ComboboxItem key={kec.value} value={kec}>
                {kec.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
