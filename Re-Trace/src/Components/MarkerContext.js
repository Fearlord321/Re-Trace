import React, { useState } from "react";

const MarkerContext = React.createContext();

export const MarkerProvider = ({ children }) => {
  const [markers, setMarkers] = useState([]);
  const [nightMode, setNightMode] = useState(false);

  return (
    <MarkerContext.Provider
      value={{ markers, setMarkers, nightMode, setNightMode }}
    >
      {children}
    </MarkerContext.Provider>
  );
};

export const MarkerConsumer = MarkerContext.Consumer;

export default MarkerContext;
