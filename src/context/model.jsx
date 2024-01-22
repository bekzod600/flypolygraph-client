import React, { useContext } from "react";

export const InfoContent = React.createContext(null);

export const useInfoContext = () => {
  const context = useContext(InfoContent);

  if (!context) {
    throw new Error(`InfoContext topilmadi! Component contextga o'ralganini tekshiring!`);
  }

  return context;
};
