import { createContext } from "react";

export const EditorContext = createContext({
  seledtedEl: null,
  hoveredEl: null,
  setSelectedEl: () => {},
  setHoveredEl: () => {},
});
