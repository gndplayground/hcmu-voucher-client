import React from "react";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight, FiChevronsLeft } from "react-icons/fi";

export interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (pageNumber: number) => void;
  disabled?: boolean;
}

export function HasNextPagination({
  currentPage,
  hasNextPage,
  onPageChange,
  disabled,
}: PaginationProps) {
  function handlePageClick(pageNumber: number) {
    onPageChange(pageNumber);
  }

  return (
    <Box mt={4} display="flex" alignItems="center" justifyContent="flex-end">
      <IconButton
        colorScheme="brand"
        isDisabled={disabled}
        borderRadius="50%"
        variant="outline"
        hidden={currentPage === 1}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(1)}
        aria-label="Previous page"
        mr={2}
      >
        <FiChevronsLeft />
      </IconButton>
      <IconButton
        colorScheme="brand"
        isDisabled={disabled}
        borderRadius="50%"
        variant="outline"
        hidden={currentPage === 1}
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        aria-label="Previous page"
      >
        <FiArrowLeft />
      </IconButton>
      <Text
        mx={2}
        bg="gray.50"
        textAlign="center"
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        h={4}
        p={6}
      >
        Page: {currentPage}
      </Text>
      {hasNextPage && (
        <IconButton
          colorScheme="brand"
          isDisabled={disabled}
          borderRadius="50%"
          variant="outline"
          onClick={() => handlePageClick(currentPage + 1)}
          aria-label="Next page"
        >
          <FiArrowRight />
        </IconButton>
      )}
    </Box>
  );
}
