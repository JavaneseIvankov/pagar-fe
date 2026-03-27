export interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions = {},
) {
  const {
    currency = "IDR",
    locale = "id-ID",
    maximumFractionDigits = 0,
    minimumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(value);
}

export function formatCurrencyIdr(
  value: number,
  options: Omit<FormatCurrencyOptions, "currency"> = {},
) {
  return formatCurrency(value, {
    ...options,
    currency: "IDR",
  });
}
