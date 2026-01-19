import { z } from "zod";

export const tripSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    destination: z.string().min(1, "Destination is required"),
    startDate: z.date({ message: "Start date is required" }),
    endDate: z.date({ message: "End date is required" }),
  })
  .refine(
    (data) => {
      const { startDate, endDate } = data;
      if (!startDate || !endDate) return true;
      return endDate >= startDate;
    },
    {
      message: "End date needs to be after Start Date",
      path: ["endDate"],
    },
  );

export type TripSchema = z.infer<typeof tripSchema>;
