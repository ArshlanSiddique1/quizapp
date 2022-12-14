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
  Button, Icon
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import React, { useMemo } from "react";
import { Link } from '@chakra-ui/react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { NavLink } from "react-router-dom";
export default function DevelopmentTable(props) {
  const { columnsData, tableData, OnClickDelete, OnClickEdit, nextPage, previousPage, currentPage, totalPages } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableInstance = useTable(
    {
      columns,
      data,
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

  return (
    <>
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Section Table
        </Text>
        <NavLink to="/admin/Sections"><Button>ADD NEW SECTION</Button></NavLink>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
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
                  let data = "";
                  if (cell.column.Header === "TITLE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "SLUG") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DESCRIPTION") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "SHORT DESCRIPTION") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "META TITLE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "META DESCRIPTION") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    );
                  }
                  else if (cell.column.Header === "ACTION") {
                    data = (
                      <>
                        <Button
                          variant='no-hover'
                          bg='transparent'
                          p='0px'
                          minW='unset'
                          minH='unset'
                          h='18px'
                          w='max-content'
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => OnClickDelete(cell.value)}>
                          <i className="fa fa-trash"></i>
                          Delete
                        </Button>
                        <span> || </span>
                        <Button
                          variant='no-hover'
                          bg='transparent'
                          p='0px'
                          minW='unset'
                          minH='unset'
                          h='18px'
                          w='max-content'
                          _focus={{ boxShadow: 'none' }}
                          onClick={() => OnClickEdit(cell.value)}>
                          Edit
                        </Button>
                      </>

                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
    <div className="pagination-btn">
    <Button
      className="page-btn"
      variant='no-hover'
      bg='transparent'
      p='0px'
      minW='unset'
      minH='unset'
      h='18px'
      w='max-content'
      _focus={{ boxShadow: 'none' }}
      onClick={() => previousPage()}>
      PREV
    </Button>
    {
      currentPage 
    }
    of
    {
      totalPages
    }
    <Button
      variant='no-hover'
      bg='transparent'
      p='0px'
      minW='unset'
      minH='unset'
      h='18px'
      w='max-content'
      _focus={{ boxShadow: 'none' }}
      className="page-btn"
      onClick={() => nextPage()}>
      NEXT
    </Button>
  </div>

  </>
  );
}