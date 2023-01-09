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
import Upload from "./Upload";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { setSector } from "../../../../../services/sector";
import { useHistory } from "react-router-dom";
import { sectorInSchema } from "validationSchema";
import { useState } from "react";
import { multerFileUploader } from "function/multer";


export default function SectorForm(props) {
  const history = useHistory();
  const [tempPicPath, setTempPicPath] = useState("");
  const [tempPicture, setTempPicture] = useState("");

  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");


  // Formik for form validation
  const SectorAttribute = async (values, tempPicPath) => {
    try {
      await setSector(values, tempPicPath)
        .then(async (response) => {
          let data = response.data.result.data;
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Submitted Successfully"
            });
            history.push('/admin/Sectors')
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
        shortDescription: "",
        description: "",
        metaTitle: "",
        metaDescription: "",
        statusBtn: "",
      },
      validationSchema: sectorInSchema,


      onSubmit: (values, action) => {

        SectorAttribute(values, tempPicPath);

        console.log(values, "dkd", { tempPicPath })
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
              className={errors.title && touched.title ? "input-error" : ""}
            />
            {errors.title && touched.title && (
              <p className="error-msg-text">{errors.title}</p>
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
          <input type="file" name="image" onChange={uploadImage} />
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

