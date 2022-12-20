// /* eslint-disable */
// import { useEffect } from "react";
// import { NavLink, useHistory } from "react-router-dom";
// import {
//   Flex,
//   Progress,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/card/Card";
// // import getSector  from "../../../../";
// // import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";

// import Menu from "components/menu/MainMenu";
// import React, { useMemo } from "react";
// import {
//   useGlobalFilter,
//   usePagination,
//   useSortBy,
//   useTable,
// } from "react-table";
// import { getSector } from "../../../../services/sector.js";

// // const model=require("../../../../../../backend/models/sectors")






// const history = useHistory();
// useEffect(() => {
//   Sectors();
// }, []);

// async function Sectors() {

//   const data = await getSector();
//   console.log("Get sector data", data)

// }

// export default function DevelopmentTable(props) {
//   const { columnsData, tableData } = props;

//   const columns = useMemo(() => columnsData, [columnsData]);
//   const data = useMemo(() => tableData, [tableData]);

//   const tableInstance = useTable(
//     {
//       columns,
//       data,
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     initialState,
//   } = tableInstance;
//   initialState.pageSize = 11;

//   const textColor = useColorModeValue("secondaryGray.900", "white");
//   const iconColor = useColorModeValue("secondaryGray.500", "white");
//   const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");



//   return (
//     <Card
//       direction='column'
//       w='75vw'
//       px='0px'
//       overflowX={{ sm: "scroll", lg: "hidden" }}>
//       <Flex px='25px' justify='space-between' mb='20px' align='center'>
//         <Text
//           color={textColor}
//           fontSize='22px'
//           fontWeight='700'
//           lineHeight='100%'>
//           Development Table
//         </Text>
//         <Menu />
//       </Flex>

//       <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
//         <Thead>
//           {headerGroups.map((headerGroup, index) => (
//             <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
//               {headerGroup.headers.map((column, index) => (
//                 <Th
//                   {...column.getHeaderProps(column.getSortByToggleProps())}
//                   pe='10px'
//                   key={index}
//                   borderColor={borderColor}>
//                   <Flex
//                     justify='space-between'
//                     align='center'
//                     fontSize={{ sm: "10px", lg: "12px" }}
//                     color='gray.400'>
//                     {column.render("Header")}
//                   </Flex>
//                 </Th>
//               ))}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody {...getTableBodyProps()}>
//           {page.map((row, index) => {
//             prepareRow(row);
//             return (
//               <Tr key={index}>
//                 {row.cells.map((cell, index) => {
//                   let data = "";

//                   return (
//                     <Td
//                       {...cell.getCellProps()}
//                       key={index}
//                       fontSize={{ sm: "14px" }}
//                       minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                       borderColor='transparent'>
//                       {data}
//                     </Td>
//                   );
//                 })}
//               </Tr>
//             );
//           })}
//         </Tbody>
//       </Table>

//     </Card>
//   );
// }










/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import { getSector } from "../../../../services/sector.js";

import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [sectorData, setSectorData] = React.useState([])



  useEffect(() => {
    Sectors();
  }, []);

  async function Sectors() {

    const data = await getSector();
    console.log("Get sector data", data)
    setSectorData(data?.data?.data)

  }
  console.log("data", data);
  console.log("sectorData", sectorData)

  const tableInstance = useTable(
    {
      columns,
      sectorData
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  page.map((row, i) => {
    console.log("row", row)
  })
  return (
    <Card
      direction='column'
      w='75vw'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Development Table
        </Text>
        <Menu />
      </Flex>
      {/* <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let sectorData = "";
                  return (
                    <Td>
                      {sectorData}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table> */}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>



    </Card>
  );
}
// {...cell.getCellProps()}
//                       key={index}
//                       fontSize={{ sm: "14px" }}
//                       minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                       borderColor='transparent'