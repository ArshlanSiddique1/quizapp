// Chakra imports
import { Box, SimpleGrid
 } from "@chakra-ui/react";
import DevelopmentTable from "./section"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import {cancel} from "./Edit/SectionFormUpdate"
import { getSectionById,delSection,getSection } from "../../../../services/section";
import SectionFormUpdate from "./Edit/SectionFormUpdate";
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
    Header: "ACTION",
    accessor: "_id",
  }
];

export default function Settings() {
  useEffect(() => {
    Section();
  }, []);
  const [tableDataDevelopment, setSectionData] = useState([]);
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);

  // Show Sector Data
  const Section = async (response) => {
    const Mydata = await getSection();
    setSectionData(Mydata?.data?.sectionsDetailsAll);
  }

  // Delete By Id 
  const OnClickDelete = async (index) => {
    try {
      await delSection(index).then(async (response) => {
        console.log("Response ", response)
        if (response.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${response?.message}`
          })
          Section()
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
    const Data = await getSectionById(index)
    setDatas(Data?.data.data)
    setEdit(true);
  }

  
  cancel();

  // Chakra Color Mode
  return (
    <>
      {edit ?
        <SectionFormUpdate data={datas} />    
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
