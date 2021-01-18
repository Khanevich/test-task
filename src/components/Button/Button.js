import React from "react";
import { Button as ActionButton } from "react-bootstrap";

export function Button({ title = "Title", onClick, variant = "primary" }) {
  return (
    <div>
      <ActionButton onClick={onClick} variant={variant}>
        {title}
      </ActionButton>
    </div>
  );
}
