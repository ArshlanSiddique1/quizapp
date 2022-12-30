/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
//import DevelopmentTable from "views/admin/sector/components/sectors";

// import {
//   columnsDataDevelopment,

// } from "views/admin/dataTables/variables/columnsData";
import React from "react";
import { useEffect, useState } from "react";
import { getSector } from "../../../services/sector";
import { delSector } from "../../../services/sector";
import { Button } from "@chakra-ui/react";

export const columnsDataDevelopment = [
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "SLUG",
    accessor: "slug",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "createdAt",
  },
  {
    Header: "ACTION",
    accessor: "_id",
  },
];


export default function Settings() {

  useEffect(() => {
    sectors();
  }, []);

  const [tableDataDevelopment, setSectorData] = useState([]);
  const sectors = async () => {
    const Mydata = await getSector();
    setSectorData(Mydata?.data?.data)
  }

  useEffect(() => {
  }, []);
  const OnClickDelete = async (index) => {
    console.log("IndexxxxxxxxxHellllllloxxx", index)
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
          OnClickDelete={(val) => OnClickDelete(val)}
        />
      </SimpleGrid>
    </Box>
  );
}
