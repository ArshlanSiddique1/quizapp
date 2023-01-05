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
  const [currentPage, setCurrentPage] = useState("");
  const [totalRecords, setTotalRecords] = useState();
  const [totalPages, setTotalPages] = useState();
  const perPage = 8;
  let sortOrder = "order_by=createdAt&order=-1";
  let page = currentPage;

  // Show Sector Data
  const subject = async (response) => {
    const Mydata = await getSubject(page,perPage,sortOrder);
    setSubjectData(Mydata?.data?.data?.results); 
    setCurrentPage(Mydata?.data?.data?.meta?.current_page);
    setTotalRecords(Mydata?.data?.data?.meta?.total_records);
    setTotalPages(Mydata?.data?.data?.meta?.total_pages);
  }
  


  async function nextPage() {
    if (currentPage < totalPages) {
      page = (currentPage + 1);
      await subject();
    }
  }

  async function numberPage(p) {
    if (currentPage != p) {
      if (currentPage <= totalPages) {
        page = p;
        await subject();
      }
    }
  }

  async function previousPage() {
    if ((currentPage <= totalPages) && (currentPage > 1)) {
      page = (currentPage - 1);
      await subject();
    }
  }

  {
    (totalRecords > perPage) &&
      <div className="pagination d-flex justify-content-center user-select-none">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" role="button" onClick={previousPage} href={undefined}>Previous</a></li>
            {
              Array.from(Array(totalPages), (e, index) => {
                return <li key={index} className={`page-item ${(currentPage == (index + 1)) ? "active" : ""}`}><a className="page-link" role="button" onClick={() => { numberPage(index + 1) }} href={undefined}>{index + 1}</a></li>
              })
            }
            <li className="page-item"><a className="page-link" role="button" onClick={nextPage} href={undefined}>Next</a></li>
          </ul>
        </nav>
      </div>
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
        <SubjectFormUpdate data={datas} close={() => { setEdit(false) }} submit={()=>{setEdit(false)}}/>
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
              nextPage={nextPage}
              previousPage={previousPage}     
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </SimpleGrid>
        </Box>}
    </>
  );
}
