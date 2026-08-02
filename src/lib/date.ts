type DateInput = Date | string;

interface FormatDateOptions {
  /** Include the day in output, e.g. "August 15, 2024" instead of "August 2024". */
  day?: boolean;
  month?: "long" | "short";
}

function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

export function formatDate(
  input: DateInput,
  options: FormatDateOptions = {}
): string {
  const { day = false, month = "long" } = options;
  const date = toDate(input);

  return date.toLocaleDateString("en-US", {
    month,
    year: "numeric",
    ...(day ? { day: "numeric" } : {}),
  });
}

interface DateRange {
  start: DateInput;
  end?: DateInput;
}

export function formatDateRange(
  range: DateRange,
  options: FormatDateOptions = {}
): string {
  const { month = "short" } = options;
  const start = formatDate(range.start, { month });
  const end = range.end ? formatDate(range.end, { month }) : "Present";

  return `${start} - ${end}`;
}

export function formatYearRange(range: DateRange): string {
  const startYear = toDate(range.start).getFullYear();
  const endYear = range.end ? toDate(range.end).getFullYear() : "Current";

  return `${startYear} — ${endYear}`;
}
