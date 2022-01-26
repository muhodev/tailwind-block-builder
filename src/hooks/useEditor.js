import { useContext } from "react";

import { EditorContext } from "../contexts";

export function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used in <EditorProvider />");
  }

  return context;
}
