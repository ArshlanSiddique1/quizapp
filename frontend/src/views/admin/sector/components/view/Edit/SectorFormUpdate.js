// Chakra imports
import {FormControl,FormLabel,Input,Text,useColorModeValue,Button,HStack,Radio,RadioGroup,SimpleGrid,Box} from "@chakra-ui/react";
import Upload from "./Upload";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { EditSector } from "../../../../../../services/sector";


export default function SectorFormUpdate(props) {
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");

  // Formik for form validation   
  const SectorAttribute = (values) => {
    try {
      EditSector(values)
        .then(async (response) => {
          let data = await response;
          console.log(data)
          if (data) {
            Swal.fire({
              icon: 'success',
              title: 'Updated',
              text: `${response?.message}`
            })
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
      shortDescription: `${props?.data.shortDescription}`,
      description: `${props?.data.description}`,
      metaTitle: `${props?.data.metaTitle}`,
      metaDescription: `${props?.data.metaDescription}`
      
    },
    // validationSchema: signInSchema,
    onSubmit: (values, action) => {
      SectorAttribute(values);
    },
  });



  const cancel = () => {
    console.log("cancel")
  }


  return (
    <> 
    <FormControl  mt={90}
      backgroundColor="white" padding={3} borderRadius={10}>
        <SimpleGrid columns={2} spacing={8}>
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
            >
              Image<Text color={brandStars}>*</Text>
            </FormLabel>
            <Upload
              gridArea={{
                base: "3 / 1 / 4 / 2",
                lg: "1 / 3 / 2 / 4",
              }}
              minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
              pe='20px'
              pb={{ base: "100px", lg: "20px" }}
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
              for="Short-Description"
            >
              Short-Description<Text color={brandStars}>*</Text>
            </FormLabel>
            <textarea className="text-field-forms"
              type="text"
              rows="1" cols="137"
              name="shortDescription"
              placeholder="Tell Something about youself in 150 Character!"
              value={values.shortDescription}
              onChange={handleChange}
              onBlur={handleBlur}

            />
          </Box>

         
        </SimpleGrid>

        <Box bg="" height="80px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
              for="Short-Description"
            >
              Description<Text color={brandStars}>*</Text>
            </FormLabel>
            <textarea className="text-field-forms"
              type="text"
              rows="1" cols="137"
              name="description"
              placeholder="Tell Something about youself in 150 Character!"
              value={values.description}
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
          Meta Title<Text color={brandStars}>*</Text>
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
          name="metaTitle"
          value={values.metaTitle}
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
          Meta Description<Text color={brandStars}>*</Text>
        </FormLabel>
        <textarea className="text-field-forms"
          type="text"
          rows="4" cols="137"
          name="metaDescription"
          placeholder="Tell Something about youself in 150 Character!"
          value={values.metaDescription}
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
          Status<Text color={brandStars}>*</Text></FormLabel>
            <RadioGroup defaultValue={`${props.data.status}`}>
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
         

      </FormControl>
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
        mx={8}
        colorScheme="brand"
        isLoading={props.isSubmitting}
        type="submit"
        onClick={cancel}>
        Cancel
      </Button>
    </>
  );
}

