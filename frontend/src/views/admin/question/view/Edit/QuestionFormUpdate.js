// Chakra imports
import { FormControl, FormLabel, Input, Text, useColorModeValue, Button, HStack, Radio, RadioGroup, SimpleGrid, Box } from "@chakra-ui/react";
import Upload from "./Upload";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { editQuestion } from "../../../../../services/question";



export default function QuestionFormUpdate(props) {
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");

  // Formik for form validation   
  const QuestionAttribute = (values) => {
    try {
      editQuestion(values)
        .then(async (response) => {
          let data = await response;
          if (data) {
            Swal.fire({
              icon: 'success',
              title: 'Updated',
              text: `${response?.message}`
            })
            props?.submit();
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
        });
    } catch (error) {
      console.log("Error While Submitting: ", error);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      id: `${props?.data._id}`,
      title: `${props?.data.title}`,
      explanation:`${props?.data.explanation}`,
      statusBtn: `${props?.data.status}`,
      year: `${props?.data.year}`,
      titles: `${props?.data?.options[0]?.title}`,
      isCorrect:`${props?.data?.options[0]?.isCorrect}`,
      difficulty:`${props?.data.difficulty}`      
    },
    // validationSchema: signInSchema,
    onSubmit: (values, action) => {
      QuestionAttribute(values);

    },
  });

  const cancel = () => {
    props?.close()
  }




  return (
    <>
      <FormControl mt={90}
        backgroundColor="white" padding={3} borderRadius={10}>
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
        <RadioGroup defaultValue={`${props?.data?.options[0]?.isCorrect}`}>
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
            <RadioGroup defaultValue={`${props?.data.status}`}>
              <HStack spacing="24px">
                <Radio
                  name="statusBtn"
                  value={"ACTIVE"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >Active</Radio>
                <Radio
                  name="statusBtn"
                  value={"INACTIVE"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >Inactive</Radio>
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
        <RadioGroup defaultValue={`${props?.data.difficulty}`}>
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
        <Button
          mt={4}
          colorScheme="brand"
          isLoading={props.isSubmitting}
          type="submit"
          onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          mt={4}
          mx={5}
          colorScheme="brand"
          isLoading={props.isSubmitting}
          type="cancel"
          onClick={cancel}>
          Cancel
        </Button>
      </FormControl>

    </>
  );
}

export const cancel = () => {
  let edit = 'False';
  return (

    { edit }

  )

}

