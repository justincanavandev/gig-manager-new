import type { RouterOutputs } from "~/trpc/react";
import type { Location } from "@prisma/client";

export type GetAllVenues = RouterOutputs["venue"]["getAll"];

export type VenueType = {
  id: string;
  name: string;
  location: Location | null
}

