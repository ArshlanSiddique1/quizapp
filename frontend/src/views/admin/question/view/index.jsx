// Chakra imports
import {
  Box, SimpleGrid
} from "@chakra-ui/react";
import DevelopmentTable from "./question"
import Swal from "sweetalert2";
import React from "react";
import { useEffect, useState } from "react";
import { cancel } from "./Edit/QuestionFormUpdate"
import { getQuestionById, delQuestion, getQuestion } from "../../../../services/question";
import QuestionFormUpdate from "./Edit/QuestionFormUpdate";
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
    Header: "EXPLANATION",
    accessor: "explanation",
  },
  {
    Header: "YEAR",
    accessor: "year",
  },
  {
    Header: "Option",
    accessor: "isCorrect",
  },
  {
    Header: "DIFFICULTY",
    accessor: "difficulty",
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
    Question();
  }, []);
  const [tableDataDevelopment, setQuestionData] = useState([]);
  const [datas, setDatas] = useState({});
  const [edit, setEdit] = useState(false);

  // Show Sector Data
  const Question = async (response) => {
    const Mydata = await getQuestion();
    setQuestionData(Mydata?.data?.questionsDetailsAll)
  }

  // Delete By Id 
  const OnClickDelete = async (index) => {
    // Alert("Are Sure want to delete this field");
    try {
      await delQuestion(index).then(async (response) => {
        if (response.status === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${response?.message}`
          })
          Question()
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
    const Data = await getQuestionById(index)
    setDatas(Data?.data.data)
    setEdit(true);
  }


  cancel();

  // Chakra Color Mode
  return (
    <>
      {edit ?
        <QuestionFormUpdate data={datas} />
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
