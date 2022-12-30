// Chakra imports
import { Box, SimpleGrid
 } from "@chakra-ui/react";
import DevelopmentTable from "./grade"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import {cancel} from "./Edit/GradeFormUpdate"
import { delGrade, getGrade,getGradeById } from "../../../../services/grade";
import CategoryFormUpdate from "./Edit/GradeFormUpdate";
export const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
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
    Header: "FEATURED",
    accessor: "featured",
  },
  {
    Header: "ACTION",
    accessor: "_id",
  }
];

export default function Settings() {
  useEffect(() => {
    grade();
  }, []);
  const [tableDataDevelopment, setGradeData] = useState([]);
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);

  // Show Sector Data
  const grade = async (response) => {
    const Mydata = await getGrade();
    console.log("Mydatatatatat",Mydata?.data?.gradeDetailsAll)
    setGradeData(Mydata?.data?.gradeDetailsAll);
  }

  // Delete By Id 
  const OnClickDelete = async (index) => {
    console.log("Index_Id", index)
    try {
      await delGrade(index).then(async (response) => {
        console.log("Response ", response)
        if (response.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${response?.message}`
          })
          grade()
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
    const Data = await getGradeById(index)
    setDatas(Data?.data.data)
    console.log("DataGrade",Data)
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
