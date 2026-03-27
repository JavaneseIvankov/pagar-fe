export type DateInput = Date | number | string;

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  locale?: string;
}

function normalizeDateInput(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

function formatDate(
  input: DateInput,
  options: Intl.DateTimeFormatOptions,
  locale: string = "id-ID",
) {
  return new Intl.DateTimeFormat(locale, options).format(
    normalizeDateInput(input),
  );
}

export function formatShortDate(
  input: DateInput,
  options: FormatDateOptions = {},
) {
  const { locale = "id-ID", ...formatterOptions } = options;

  return formatDate(
    input,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...formatterOptions,
    },
    locale,
  );
}

export function formatLongDate(
  input: DateInput,
  options: FormatDateOptions = {},
) {
  const { locale = "id-ID", ...formatterOptions } = options;

  return formatDate(
    input,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...formatterOptions,
    },
    locale,
  );
}

export function formatDateTime(
  input: DateInput,
  options: FormatDateOptions = {},
) {
  const { locale = "id-ID", ...formatterOptions } = options;

  return formatDate(
    input,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      ...formatterOptions,
    },
    locale,
  );
}
