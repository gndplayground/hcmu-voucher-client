import { useState } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";

export interface ClickToCopyProps {
  text: string;
}

export function ClickToCopy({ text }: ClickToCopyProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  const handleTooltipClose = () => {
    setIsCopied(false);
  };

  return (
    <Tooltip
      label={isCopied ? "Copied!" : "Click to copy"}
      onClose={handleTooltipClose}
    >
      <IconButton onClick={handleClick} aria-label="Copy to clipboard">
        <FiCopy />
      </IconButton>
    </Tooltip>
  );
}
