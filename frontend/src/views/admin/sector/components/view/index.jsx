// Chakra imports
// import { Box, SimpleGrid, } from "@chakra-ui/react";
// import DevelopmentTable from "./sectors"
// import Swal from "sweetalert2";
// import React from "react";
// import { useEffect, useState } from "react";
// import { delSector, getSectorById, getSector } from "../../../../../services/sector";
// import SectorFormUpdate from "./Edit/SectorFormUpdate";

// export const columnsDataDevelopment = [
//   {
//     Header: "TITLE",
//     accessor: "title",
//   },
//   {
//     Header: "SLUG",
//     accessor: "slug",
//   },
//   ,
//   {
//     Header: "META TITLE",
//     accessor: "metaTitle",
//   },
//   {
//     Header: "META DESCRIPTION",
//     accessor: "metaDescription",
//   },
//   {
//     Header: "STATUS",
//     accessor: "status",
//   },
//   {
//     Header: "DATE",
//     accessor: "createdAt",
//   },
//   {
//     Header: "ACTION",
//     accessor: "_id",
//   }
// ];

// export default function Settings() {
//   useEffect(() => {
//     sectors();
//   }, []);
//   const [tableDataDevelopment, setSectorData] = useState([]);
//   const [datas, setDatas] = useState({});
//   const [edit, setEdit] = useState(false);
//   const [meta, setMeta] = useState({})
//   const [currentPage, setCurrentPage] = useState("");
//   const [totalRecords, setTotalRecords] = useState();
//   const [totalPages, setTotalPages] = useState();
//   const perPage = 8
//   let sortOrder = "order_by=createdAt&order=-1";
//   let page = currentPage;




// Show Sector Data
// const sectors = async (response) => {
//   const Mydata = await getSector(page, perPage, sortOrder);
//   console.log(Mydata)
//   setSectorData(Mydata?.data?.results);
//   setCurrentPage(Mydata?.data?.meta?.current_page);
//   setTotalRecords(Mydata?.data?.meta?.total_records);
//   setTotalPages(Mydata?.data?.meta?.total_pages);
// }



// async function nextPage() {
//   if (currentPage < totalPages) {
//     page = (currentPage + 1);
//     await sectors();
//   }
// }

// async function numberPage(p) {
//   if (currentPage != p) {
//     if (currentPage <= totalPages) {
//       page = p;
//       await sectors();
//     }
//   }
// }

// async function previousPage() {
//   if ((currentPage <= totalPages) && (currentPage > 1)) {
//     page = (currentPage - 1);
//     await sectors();
//   }
// }
// {
//   (totalRecords > perPage) &&
//     <div className="pagination d-flex justify-content-center user-select-none">
//       <nav aria-label="Page navigation example">
//         <ul className="pagination">
//           <li className="page-item"><a className="page-link" role="button" onClick={previousPage} href={undefined}>Previous</a></li>
//           {
//             Array.from(Array(totalPages), (e, index) => {
//               return <li key={index} className={`page-item ${(currentPage == (index + 1)) ? "active" : ""}`}><a className="page-link" role="button" onClick={() => { numberPage(index + 1) }} href={undefined}>{index + 1}</a></li>
//             })
//           }
//           <li className="page-item"><a className="page-link" role="button" onClick={nextPage} href={undefined}>Next</a></li>
//         </ul>
//       </nav>
//     </div>
// }




// Delete By Id 
//   const OnClickDelete = async (index) => {
//     try {
//       await delSector(index).then(async (response) => {
//         if (response.status === "success") {
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: `${response?.message}`
//           })
//           sectors()
//         }
//         else if (response.status !== "success") {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: `${response?.message}`
//           });
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }




//   // Edit The Sector Data By Id
//   const OnClickEdit = async (index) => {
//     const Data = await getSectorById(index)
//     setDatas(Data?.data.data)
//     setEdit(true);
//   }






//   return (
//     <>
//       {edit ?
//         <SectorFormUpdate data={datas} close={() => { setEdit(false) }} submit={() => { setEdit(false) }} />
//         :
//         <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="active" aria-current="page">
//           <SimpleGrid
//             mb='20px'
//             columns={{ sm: 1, md: 1 }}
//             spacing={{ base: "20px", xl: "20px" }}>
//             <DevelopmentTable
//               columnsData={columnsDataDevelopment}
//               tableData={tableDataDevelopment}
//               OnClickDelete={(val) => OnClickDelete(val)}
//               OnClickEdit={(val) => OnClickEdit(val)}
//             />
//           </SimpleGrid>
//         </Box>}
//     </>
//   );
// }
















// Chakra imports
import { Box, SimpleGrid, } from "@chakra-ui/react";
import DevelopmentTable from "./sectors"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import { delSector, getSectorById, getSector } from "../../../../../services/sector";
import SectorFormUpdate from "./Edit/SectorFormUpdate";
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
  const [meta, setMeta] = useState({})
  const [currentPage, setCurrentPage] = useState("");
  const [totalRecords, setTotalRecords] = useState();
  const [totalPages, setTotalPages] = useState();
  const perPage = 8
  let sortOrder = "order_by=createdAt&order=-1";
  let page = currentPage;


  // Show Sector Data
  const sectors = async (response) => {
    const Mydata = await getSector(page, perPage, sortOrder);
    setSectorData(Mydata?.data?.results);
    setCurrentPage(Mydata?.data?.meta?.current_page);
    setTotalRecords(Mydata?.data?.meta?.total_records);
    setTotalPages(Mydata?.data?.meta?.total_pages);
  }

  async function nextPage() {
    if (currentPage < totalPages) {
      page = (currentPage + 1);
      await sectors();
    }
  }

  async function numberPage(p) {
    if (currentPage != p) {
      if (currentPage <= totalPages) {
        page = p;
        await sectors();
      }
    }
  }

  async function previousPage() {
    if ((currentPage <= totalPages) && (currentPage > 1)) {
      page = (currentPage - 1);
      await sectors();
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
    try {
      await delSector(index).then(async (response) => {
        console.log("Response ", response)
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
        <SectorFormUpdate data={datas} close={() => { setEdit(false) }} submit={() => { setEdit(false) }} />
        : <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
        </Box>
      }
    </>
  );
}
