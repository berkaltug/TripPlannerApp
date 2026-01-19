import { z } from "zod";

export const tripNoteSchema = z.object({
  content: z.string().min(1, "Content is required"),
  noteDate: z.date({ message: "Note date is required" }),
});

export type TripNoteSchema = z.infer<typeof tripNoteSchema>;
