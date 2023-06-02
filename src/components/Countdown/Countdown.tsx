import { Box, HStack } from "@chakra-ui/react";
import { useCountDown } from "@hooks/useCountdown";
import React from "react";
export interface CountdownProps {
  targetDate?: string;
  onEnd?: () => void;
  variant?: "default" | "inline";
  pause?: boolean;
}

export const Countdown = ({
  targetDate,
  onEnd,
  variant,
  pause,
}: CountdownProps) => {
  const run = useCountDown({
    targetDate: pause ? undefined : targetDate,
  });

  function format(d: number) {
    if (d < 10) {
      return `0${d}`;
    }
    return d;
  }

  React.useEffect(() => {
    if (run && run.total <= 0) {
      onEnd && onEnd();
    }
  });

  const timer =
    pause || !run
      ? {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      : run;

  const isInline = variant === "inline";

  return (
    <HStack
      display="flex"
      spacing={3}
      w="100%"
      justifyContent="center"
      fontSize="0.875rem"
    >
      <Box
        fontWeight="bold"
        textAlign="center"
        display={isInline ? "flex" : "initial"}
      >
        <Box>{format(timer.days)}</Box>
        <Box ml={1}>{isInline ? "D" : "Days"}</Box>
      </Box>
      <Box
        fontWeight="bold"
        textAlign="center"
        display={isInline ? "flex" : "initial"}
      >
        <Box>{format(timer.hours)}</Box>
        <Box ml={1}>{isInline ? "H" : "Hours"}</Box>
      </Box>
      <Box
        fontWeight="bold"
        textAlign="center"
        display={isInline ? "flex" : "initial"}
      >
        <Box>{format(timer.minutes)}</Box>
        <Box ml={1}>{isInline ? "M" : "Minutes"}</Box>
      </Box>
      <Box
        fontWeight="bold"
        textAlign="center"
        display={isInline ? "flex" : "initial"}
      >
        <Box>{format(timer.seconds)}</Box>
        <Box ml={1}>{isInline ? "S" : "Seconds"}</Box>
      </Box>
    </HStack>
  );
};
