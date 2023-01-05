// Chakra imports
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Button,
  HStack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Box
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { setQuestion } from "../../../../services/question";
import { useState, useEffect } from "react";
import { getSector } from "../../../../services/sector";
import { getGrade } from "../../../../services/grade"
import { getCategory } from "../../../../services/category"
import { getSubject } from "../../../../services/subject"
import { getSection } from "../../../../services/section"
import '../../../../assets/css/CustomCssForDropDown.css'
import { useHistory } from "react-router-dom";



export default function QuestionForm(props) {
  const history = useHistory();
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  // Formik for form validation

  useEffect(() => {
    getIds();
  }, []);
  const [sectorId, setSectorId] = useState([])
  const [categoryId, setCategoryId] = useState([])
  const [gradeId, setGradeId] = useState([])
  const [subjectId, setSubjectId] = useState([])
  const [sectionId, setSectionId] = useState([])
  // console.log(JSON.stringify(sectorId))
  const getIds = async () => {
    try {
      const SectorData = await getSector()
      const CategoryData = await getCategory()
      const GradeData = await getGrade()
      const SectionData = await getSection()
      const SubjectData = await getSubject()

      setSectorId(SectorData?.data?.results)
      setCategoryId(CategoryData?.data?.data?.results)
      setGradeId(GradeData?.data?.data?.results)
      setSubjectId(SubjectData?.data?.data?.results)
      setSectionId(SectionData?.data?.data?.results)
    } catch (error) {

    }
  }


  const QuestionAttribute = async (values) => {
    try {
      await setQuestion(values)
        .then(async (response) => {
          let data = response.data.Data;
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Submitted Successfully"
            });  
            history.push('/admin/ViewQuestion')
          }
        })
        .catch((err) => {
          if (err?.response?.data?.result?.code === 401) {

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${err?.response?.data?.result?.message}`,
            });
          }
          console.log({ err });
        });
    } catch (error) {
      console.log("Error While Submitting: ", error);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit } =

    useFormik({
      initialValues: {
        title: "",
        explanation: "",
        year: "",
        titles: "",
        isCorrect: "",
        statusBtn: "",
        difficulty: "",
        sector_id: "",
        category_id: "",
        grade_id: "",
        subject_id: "",
        section_id: "",




      },
      // validationSchema: signInSchema,
      onSubmit: (values, action) => {
        QuestionAttribute(values);
      },
    });



  return (
    <>
      <FormControl>
        <SimpleGrid>
          <select className="dropDown" name="sector_id" onChange={handleChange} onBlur={handleBlur}>
            <option>Choose Sector Title</option>
            {sectorId.map((item, i) => (<>{item.status === "ACTIVE" ? <option value={item._id}>{item.title}</option> : ""}</>))
            }</select>

          <select className="dropDown" name="category_id" onChange={handleChange} onBlur={handleBlur}>
            <option>Choose Category Title</option>
            {categoryId.map((item, i) => (<>{item.status === "ACTIVE" ? <option value={item._id}>{item.title}</option> : ""}</>))
            }</select>

          <select className="dropDown" name="grade_id" onChange={handleChange} onBlur={handleBlur}>
            <option>Choose Grade Title</option>
            {gradeId.map((item, i) => (<>{item.status === "ACTIVE" ? <option value={item._id}>{item.name}</option> : ""}</>))
            }</select>

          <select className="dropDown" name="subject_id" onChange={handleChange} onBlur={handleBlur}>
            <option>Choose Subject Title</option>
            {subjectId.map((item, i) => (<>{item.status === "ACTIVE" ? <option value={item._id}>{item.title}</option> : ""}</>))
            }</select>

          <select className="dropDown" name="section_id" onChange={handleChange} onBlur={handleBlur}>
            <option>Choose Section Title</option>
            {sectionId.map((item, i) => (<>{item.status === "ACTIVE" ? <option value={item._id}>{item.title}</option> : ""}</>))
            }</select>

        </SimpleGrid>
        <Box bg="" height="80px">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Title<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="title"
            mb="24px"
            fontWeight="500"
            size="lg"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>

        <Box bg="" height="80px">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
            for="explanation"
          >
            Explanation<Text color={brandStars}>*</Text>
          </FormLabel>
          <textarea className="text-field-forms"
            type="text"
            rows="1" cols="137"
            name="explanation"
            placeholder="Write"
            value={values.explanation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          Year<Text color={brandStars}>*</Text>
        </FormLabel>
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: "0px", md: "0px" }}
          type="text"
          placeholder="Write"
          mb="24px"
          fontWeight="500"
          size="lg"
          name="year"
          value={values.year}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          Options<Text color={brandStars}>*</Text>

        </FormLabel>
        <Box style={{
          marginLeft: "45px"
        }}>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Title<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: "0px", md: "0px" }}
            type="text"
            placeholder="titles"
            mb="5px"
            fontWeight="500"
            size="lg"
            name="titles"
            value={values.titles}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
            mt="20px"        >
            Correct<Text color={brandStars}>*</Text></FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio
                name="isCorrect"
                value={"TRUE"}
                onChange={handleChange}
                onBlur={handleBlur}>True</Radio>
              <Radio
                name="isCorrect"
                value={"FALSE"}
                onChange={handleChange}
                onBlur={handleBlur}>False</Radio>
            </HStack>
          </RadioGroup>
        </Box>


        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
          mt="20px"        >
          Status<Text color={brandStars}>*</Text></FormLabel>
        <RadioGroup>
          <HStack spacing="24px">
            <Radio
              name="statusBtn"
              value={"ACTIVE"}
              onChange={handleChange}
              onBlur={handleBlur}>Active</Radio>
            <Radio
              name="statusBtn"
              value={"INACTIVE"}
              onChange={handleChange}
              onBlur={handleBlur}>Inactive</Radio>
          </HStack>
        </RadioGroup>
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          Difficulty<Text color={brandStars}>*</Text>
        </FormLabel>
        <RadioGroup>
          <HStack spacing="24px">
            <Radio
              name="difficulty"
              value={"Beginner"}
              onChange={handleChange}
              onBlur={handleBlur}>Beginner</Radio>
            <Radio
              name="difficulty"
              value={"Intermediate"}
              onChange={handleChange}
              onBlur={handleBlur}>Intermediate</Radio>
            <Radio
              name="difficulty"
              value={"Advanced"}
              onChange={handleChange}
              onBlur={handleBlur}>Advanced</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <Button
        mt={4}
        colorScheme="brand"
        isLoading={props.isSubmitting}
        type="submit"
        onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

