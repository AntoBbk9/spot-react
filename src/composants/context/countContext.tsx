import React from "react";

export interface CountContextType {
    count: number;
    increment: () => void;
    decrement: () => void;
  }
  export const CountContext = React.createContext<CountContextType | null>(null);
  