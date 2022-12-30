// Chakra imports
import { Box, SimpleGrid,} from "@chakra-ui/react";
import DevelopmentTable from "./sectors"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import { delSector, getSectorById, getSector } from "../../../../../services/sector";
import SectorFormUpdate from "./Edit/SectorFormUpdate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const columnsDataDevelopment = [
  {
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "SLUG",
    accessor: "slug",
  },
  ,
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
    Header: "DATE",
    accessor: "createdAt",
  },
  {
    Header: "ACTION",
    accessor: "_id",
  }
];

export default function Settings() {
  useEffect(() => {
    sectors();
  }, []);
  const [tableDataDevelopment, setSectorData] = useState([]);
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);

  // Show Sector Data
  const sectors = async (response) => {
    const Mydata = await getSector();
    setSectorData(Mydata?.data?.data);
  }

  // Delete By Id 
  const OnClickDelete = async (index) => {
    toast("Wow so easy!");
    try {
      await delSector(index).then(async (response) => {
        if (response.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${response?.message}`
          })
          sectors()
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
    const Data = await getSectorById(index)
    setDatas(Data?.data.data)
    setEdit(true);
  }

  // Chakra Color Mode
  return (
    <>
      {edit ?
        <SectorFormUpdate data={datas} />    
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
