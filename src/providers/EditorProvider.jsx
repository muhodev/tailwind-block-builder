import { useState } from "react";
import { EditorContext } from "../contexts";

export function EditorProvider(props) {
  const [hoveredEl, setHoveredEl] = useState(null);
  const [selectedEl, setSelectedEl] = useState(null);

  return (
    <EditorContext.Provider
      value={{ hoveredEl, selectedEl, setHoveredEl, setSelectedEl }}
    >
      {props.children}
    </EditorContext.Provider>
  );
}
