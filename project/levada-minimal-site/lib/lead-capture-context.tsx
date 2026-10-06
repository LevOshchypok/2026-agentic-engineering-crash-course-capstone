"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import type { CalculatorConfig, PriceResult } from "./pricing";

interface LeadCaptureState {
  isOpen: boolean;
  calculatorConfig: CalculatorConfig | null;
  price: PriceResult | null;
  // Bumped on every open so <LeadCaptureModal> remounts with fresh form state
  // instead of resetting it in an effect.
  sessionId: number;
}

interface LeadCaptureContextValue {
  openLeadCapture: (calculatorConfig?: CalculatorConfig, price?: PriceResult) => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LeadCaptureState>({
    isOpen: false,
    calculatorConfig: null,
    price: null,
    sessionId: 0,
  });

  const openLeadCapture = useCallback((calculatorConfig?: CalculatorConfig, price?: PriceResult) => {
    setState((s) => ({
      isOpen: true,
      calculatorConfig: calculatorConfig ?? null,
      price: price ?? null,
      sessionId: s.sessionId + 1,
    }));
  }, []);

  const closeLeadCapture = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const value = useMemo(() => ({ openLeadCapture }), [openLeadCapture]);

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
      <LeadCaptureModal
        key={state.sessionId}
        isOpen={state.isOpen}
        calculatorConfig={state.calculatorConfig}
        price={state.price}
        onClose={closeLeadCapture}
      />
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCapture(): LeadCaptureContextValue {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture must be used within a LeadCaptureProvider");
  }
  return ctx;
}
