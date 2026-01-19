import { QueryClient } from "@tanstack/react-query";

export const invalidateTripsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["trip"] });
};
