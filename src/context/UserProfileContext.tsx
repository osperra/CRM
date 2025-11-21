"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type AvatarVariant = "default" | "alt" | "logo";

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  timezone: string;
  avatarVariant: AvatarVariant;
};

const defaultProfile: UserProfile = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@osperra.com",
  company: "Osperra Inc.",
  timezone: "Pacific Time (PST)",
  avatarVariant: "default",
};

type UserProfileContextValue = {
  profile: UserProfile;
  updateProfile: (patch: Partial<UserProfile>) => void;
};

const STORAGE_KEY = "osperra-user-profile";

const UserProfileContext = createContext<UserProfileContextValue | undefined>(
  undefined
);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  // lazy init from localStorage so we don't call setState in an effect
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window === "undefined") return defaultProfile;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultProfile;

      const parsed = JSON.parse(stored) as Partial<UserProfile>;
      return { ...defaultProfile, ...parsed };
    } catch {
      return defaultProfile;
    }
  });

  // persist any change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile]);

  const updateProfile = (patch: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...patch }));
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile(): UserProfileContextValue {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return ctx;
}
 