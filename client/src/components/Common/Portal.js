import { useMemo } from "react";
import { createPortal } from "react-dom";

// elementId: 해당 요소로 포탈을 열어줌.
function Portal({ children, elementId }) {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ]);

  return createPortal(children, rootElement);
}

export default Portal;
