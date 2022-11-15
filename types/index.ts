export type {
  LaundryInfo,
  LaundryStatus,
  LaundryType,
  LaundryOccupancy,
  LaundrySummary,
} from "@/server/tools/laundry-api";

export type { BusLine } from "@/server/tools/bus-api";
export type { BikeInfo } from "@/server/tools/bike-api";

export { Dict };

type Dict<T> = { [key: string]: T };
