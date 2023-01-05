// Chakra imports
import { Box } from "@chakra-ui/react";

// Custom components

// import CardComponent from "/views/admin/sectors/components/Card";
import CardComponent from "./Card"
// Assets
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}

      <CardComponent
        used={25.6}
        total={50}
        gridArea={{
          base: "3 / 1 / 4 / 2",
          lg: "2 / 1 / 3 / 3",
          "2xl": "1 / 3 / 2 / 4",
        }}
      />
    </Box>
  );
}
