import { useContext } from "react";

export function useProvider<T>(context: React.Context<T | undefined>): T {
    const value = useContext(context);
    if (value === undefined) {
      throw new Error(`useProvider must be used within a ${context.displayName} provider`);
    }
    return value;
  }