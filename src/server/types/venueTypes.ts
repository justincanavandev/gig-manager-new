import type { RouterOutput } from "~/trpc/react";
import type { Location } from "@prisma/client";

export type GetAllVenuesOutput = RouterOutput["venue"]["getAll"];

export type VenueType = {
  id: string;
  name: string;
  location: Location | null
}
