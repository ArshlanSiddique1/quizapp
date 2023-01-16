// Chakra imports
import {
  FormControl, FormLabel, Input, Text, Icon, useColorModeValue, Button, HStack, Radio, RadioGroup, SimpleGrid, Box
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { setGrade } from "../../../../services/grade";
import { useState } from "react";
import '../../../../assets/css/CustomCssForDropDown.css'
import { useHistory } from "react-router-dom";
import { multerFileUploader } from "function/multer";
import "../../../../assets/css/MyCustom.css"
import { MdUpload } from "react-icons/md";
import { gradeInSchema } from "validationSchema";

export default function GradeForm(props) {
  const history = useHistory();
  const [tempPicPath, setTempPicPath] = useState("");
  const [tempPicture, setTempPicture] = useState("");
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  const brandColor = useColorModeValue("brand.500", "white");

  const GradeAttribute = async (values, tempPicPath) => {
    try {
      await setGrade(values, tempPicPath)
        .then(async (response) => {
          let data = response.data.Data;
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Submitted Successfully"
            });
            history.push('/admin/ViewGrade')
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

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (file?.type == "image/jpeg" || file?.type == "image/png" || file?.type == "image/gif") {

      if (file) {
        setTempPicture(URL.createObjectURL(file));
        const filPath = await multerFileUploader(file)
        setTempPicPath(filPath);
      }

    }
    else {
      Swal.fire(
        'Not supported!',
        'Supported file type - JPEG, PNG and GIF.',
        'info'
      )
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =

    useFormik({
      initialValues: {
        title: "",
        statusBtn: "",
        featured: "",
      },
      validationSchema: gradeInSchema,
      onSubmit: (values, action) => {
        GradeAttribute(values, tempPicPath);
      },
    });
  return (
    <>
      <FormControl>
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
              Name<Text color={brandStars}>*</Text>
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
              name="gradeName"
              value={values.gradeName}
              onChange={handleChange}
              onBlur={handleBlur} className={errors.gradeName && touched.gradeName ? "input-error" : ""}
            />
            {errors.gradeName && touched.gradeName && (
              <p className="error-msg-text">{errors.gradeName}</p>
            )}
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
            <div className="UplaodImg">
              <Icon as={MdUpload} w='25px' h='30px' color={brandColor} />
              <input type="file" name="image" onChange={uploadImage} />
            </div>
          </Box>
        </SimpleGrid>
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
          mt="20px"        >
          Status<Text color={brandStars}>*</Text></FormLabel>
        <RadioGroup /*defaultValue="INACTIVE"*/>
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
          mt="20px"        >
          Featured<Text color={brandStars}>*</Text></FormLabel>
        <RadioGroup defaultValue="INACTIVE">
          <HStack spacing="24px">
            <Radio
              name="featured"
              value={"TRUE"}
              onChange={handleChange}
              onBlur={handleBlur}>True</Radio>
            <Radio
              name="featured"
              value={"FALSE"}
              onChange={handleChange}
              onBlur={handleBlur}>False</Radio>
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

