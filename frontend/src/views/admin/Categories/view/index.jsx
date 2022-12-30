// Chakra imports
import { Box, SimpleGrid
 } from "@chakra-ui/react";
import DevelopmentTable from "./category"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import {cancel} from "./Edit/CategoryFormUpdate"
import { getCategoryById,delCategory,getCategory } from "../../../../services/category";
import CategoryFormUpdate from "./Edit/CategoryFormUpdate";
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
    Header: "DESCRIPTION",
    accessor: "description",
  },
  {
    Header: "SHORT DESCRIPTION",
    accessor: "shortDescription",
  },
  {
    Header: "META TITLE",
    accessor: "metaTitle",
  },
  {
    Header: "META DESCRIPTION",
    accessor: "metaDescription",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "FEATURED",
    accessor: "featured",
  },
  {
    Header: "SUBSCRIPTION",
    accessor: "subscription",
  },
  {
    Header: "ACTION",
    accessor: "_id",
  }
];

export default function Settings() {
  useEffect(() => {
    category();
  }, []);
  const [tableDataDevelopment, setCategoryData] = useState([]);
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);

  // Show Sector Data
  const category = async (response) => {
    const Mydata = await getCategory();
    setCategoryData(Mydata?.data?.CategoryDetailsAll);
  }

  // Delete By Id 
  const OnClickDelete = async (index) => {
    console.log("Index_Id", index)
    try {
      await delCategory(index).then(async (response) => {
        console.log("Response ", response)
        if (response.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${response?.message}`
          })
          category()
        }
        else if (response.status !== "success") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response?.message}`
          });
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Edit The Sector Data By Id
  const OnClickEdit = async (index) => {
    const Data = await getCategoryById(index)
    setDatas(Data?.data.data)
    setEdit(true);
  }

  
  cancel();

  // Chakra Color Mode
  return (
    <>
      {edit ?
        <CategoryFormUpdate data={datas} />    
         :
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            mb='20px'
            columns={{ sm: 1, md: 1 }}
            spacing={{ base: "20px", xl: "20px" }}>
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={tableDataDevelopment}
              OnClickDelete={(val) => OnClickDelete(val)}
              OnClickEdit={(val) => OnClickEdit(val)}
            />
          </SimpleGrid>
        </Box>}
    </>
  );
}
