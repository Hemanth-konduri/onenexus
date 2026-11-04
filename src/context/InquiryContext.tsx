import React, { createContext, useContext, useState, useEffect } from "react";

interface InquiryContextType {
  selectedServices: string[];
  addService: (name: string) => void;
  removeService: (name: string) => void;
  toggleService: (name: string) => void;
  clearServices: () => void;
  isServiceSelected: (name: string) => boolean;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

const STORAGE_KEY = "onenexus_inquiry_services";

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Load initial selections from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedServices(parsed);
        }
      }
    } catch {
      // ignore JSON errors
    }
  }, []);

  // Save to sessionStorage on updates
  const updateServices = (newServices: string[]) => {
    setSelectedServices(newServices);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newServices));
    } catch {
      // ignore storage errors
    }
  };

  const addService = (name: string) => {
    if (!name || selectedServices.includes(name)) return;
    updateServices([...selectedServices, name]);
  };

  const removeService = (name: string) => {
    updateServices(selectedServices.filter((s) => s !== name));
  };

  const toggleService = (name: string) => {
    if (!name) return;
    if (selectedServices.includes(name)) {
      removeService(name);
    } else {
      addService(name);
    }
  };

  const clearServices = () => {
    updateServices([]);
  };

  const isServiceSelected = (name: string) => {
    return selectedServices.includes(name);
  };

  return (
    <InquiryContext.Provider
      value={{
        selectedServices,
        addService,
        removeService,
        toggleService,
        clearServices,
        isServiceSelected,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
};
