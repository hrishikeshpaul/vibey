import React, { FunctionComponent } from "react";

import { Box, Text } from "@chakra-ui/react";

// import { Select } from "components";

export const Filters: FunctionComponent<any> = () => {
  return (
    <Box w="full" bg="dark" rounded="lg" overflow="hidden" p={4}>
      <Text fontWeight="600">Filters</Text>
      {/* <Select /> */}
    </Box>
  );
};
