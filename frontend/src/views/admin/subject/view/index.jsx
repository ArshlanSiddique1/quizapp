// Chakra imports
import {
  Box, SimpleGrid
} from "@chakra-ui/react";
import DevelopmentTable from "./subject"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import { cancel } from "./Edit/SubjectFormUpdate"
import { getSubject, getSubjectById, delSubject } from "../../../../services/subject";
import SubjectFormUpdate from "./Edit/SubjectFormUpdate";
import { } from "services/subject";
export const columnsDataDevelopment = [
  {
    Header: "TITLE",
    accessor: "title",
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
    Header: "ACTION",
    accessor: "_id",
  }
];

export default function Settings() {
  useEffect(() => {
    subject();
  }, []);
  const [tableDataDevelopment, setSubjectData] = useState([]);
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);

  // Show Sector Data
  const subject = async (response) => {
    const Mydata = await getSubject();
    setSubjectData(Mydata?.data?.subjectsDetailsAll);
  }

  // Delete By Id 
  const OnClickDelete = async (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    try {
      await delSubject(index).then(async (response) => {
        console.log("Response ", response)
        if (response.status === "success") {
          Swal.fire({
            showCancelButton: true,
            icon: 'success',
            title: 'Deleted!',
            text: `${response?.message}`
          })
          subject()
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
    const Data = await getSubjectById(index)
    console.log("featured", Data?.data.data)
    setDatas(Data?.data.data)
    setEdit(true);
  }


  cancel();

  // Chakra Color Mode
  return (
    <>
      {edit ?
        <SubjectFormUpdate data={datas} />
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
