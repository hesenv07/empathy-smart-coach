import React, { createContext, useContext, useState, ReactNode } from "react";

export type AssetType = "gold" | "bonds" | "etf";

export interface MonthlyPlan {
  amount: number;
  dayOfMonth: number;
  autoInvest: boolean;
}

export interface Recommendation {
  asset: AssetType;
  expectedReturn: number;
  riskLevel: string;
  reason: string;
  isTop?: boolean;
}

export interface Investment {
  id: string;
  asset: AssetType;
  amount: number;
  date: Date;
  expectedReturn: number;
  riskLevel: string;
}

export interface Portfolio {
  totalBalance: number;
  investments: Investment[];
}

interface AppContextType {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
  cardLinked: boolean;
  setCardLinked: (value: boolean) => void;
  monthlyPlan: MonthlyPlan | null;
  setMonthlyPlan: (plan: MonthlyPlan) => void;
  recommendations: Recommendation[];
  generateRecommendations: () => void;
  investments: Investment[];
  addInvestment: (investment: Investment) => void;
  portfolio: Portfolio;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [cardLinked, setCardLinked] = useState(false);
  const [monthlyPlan, setMonthlyPlan] = useState<MonthlyPlan | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);

  const generateRecommendations = () => {
    // Generate AI-based recommendations (mock data for now)
    const newRecommendations: Recommendation[] = [
      {
        asset: "gold",
        expectedReturn: 0.08,
        riskLevel: "Low",
        reason:
          "Gold is stable during economic uncertainty and provides a hedge against inflation.",
        isTop: true,
      },
      {
        asset: "bonds",
        expectedReturn: 0.05,
        riskLevel: "Very Low",
        reason: "Government bonds offer predictable returns with minimal risk.",
      },
      {
        asset: "etf",
        expectedReturn: 0.07,
        riskLevel: "Low",
        reason:
          "Conservative ETFs provide diversification with controlled risk exposure.",
      },
    ];
    setRecommendations(newRecommendations);
  };

  const addInvestment = (investment: Investment) => {
    setInvestments((prev) => [...prev, investment]);
  };

  const portfolio: Portfolio = {
    totalBalance: investments.reduce((sum, inv) => sum + inv.amount, 0),
    investments,
  };

  return (
    <AppContext.Provider
      value={{
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        cardLinked,
        setCardLinked,
        monthlyPlan,
        setMonthlyPlan,
        recommendations,
        generateRecommendations,
        investments,
        addInvestment,
        portfolio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
