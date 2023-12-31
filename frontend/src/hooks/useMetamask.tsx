"use client";

import React, { useEffect, type PropsWithChildren } from "react";

type ConnectAction = { type: "connect"; wallet: string; balance: string };
type DisconnectAction = { type: "disconnect" };
type PageLoadedAction = {
  type: "pageLoaded";
  isMetamaskInstalled: boolean;
  wallet: string | null;
  balance: string | null;
};
type LoadingAction = { type: "loading" };
type IdleAction = { type: "idle" };
type HydrateAction = { type: "hydrate"; payload: State };

type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction
  | HydrateAction;

type Dispatch = (action: Action) => void;

type Status = "loading" | "idle" | "pageNotLoaded";

type State = {
  wallet: string | null;
  isMetamaskInstalled: boolean;
  status: Status;
  balance: string | null;
};

const initialState: State = {
  wallet: null,
  isMetamaskInstalled: false,
  status: "loading",
  balance: null,
} as const;

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect": {
      const { wallet, balance } = action;
      const newState = { ...state, wallet, balance, status: "idle" } as State;
      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);

      return newState;
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState");
      if (typeof window.ethereum !== undefined) {
        window.ethereum.removeAllListeners(["accountsChanged"]);
      }
      return { ...state, wallet: null, balance: null };
    }
    case "pageLoaded": {
      const { isMetamaskInstalled, balance, wallet } = action;
      return { ...state, isMetamaskInstalled, status: "idle", wallet, balance };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    case "idle": {
      return { ...state, status: "idle" };
    }
    case "hydrate": {
      return { ...state, ...action.payload };
    }

    default: {
      throw new Error("Unhandled action type");
    }
  }
}

const MetamaskContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function MetamaskProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);

  useEffect(() => {
    // This code runs after component mount and therefore only on the client
    const localState = localStorage.getItem("metamaskState");
    if (localState) {
      dispatch({ type: "hydrate", payload: JSON.parse(localState) });
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever the state changes
    localStorage.setItem("metamaskState", JSON.stringify(state));
  }, [state]);

  const value = { state, dispatch };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("metamaskState", JSON.stringify(state));
    }
  }, [state]);

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );
}

function useMetamask() {
  const context = React.useContext(MetamaskContext);
  if (context === undefined) {
    throw new Error("useMetamask must be used within a MetamaskProvider");
  }
  return context;
}

export { MetamaskProvider, useMetamask };
