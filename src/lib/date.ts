type DateInput = Date | string;

interface FormatDateOptions {
  month?: "long" | "short";
}

function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

export function formatDate(
  input: DateInput,
  options: FormatDateOptions = {}
): string {
  const { month = "long" } = options;
  const date = toDate(input);

  return date.toLocaleDateString("en-US", {
    month,
    year: "numeric",
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
