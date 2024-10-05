import { createContext } from "react";
import { TarotCard } from "@prisma/client";

export const TarotContext = createContext<TarotCard[] | null>(null);
