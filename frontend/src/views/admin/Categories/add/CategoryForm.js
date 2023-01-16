// Chakra imports
import {
  FormControl, FormLabel, Input, Text, Icon, useColorModeValue, Button, HStack, Radio, RadioGroup, SimpleGrid, Box
} from "@chakra-ui/react";
import Upload from "./Upload";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { setCategory } from "../../../../services/category";
import { useState, useEffect } from "react";
import { getSector } from "../../../../services/sector";
import '../../../../assets/css/CustomCssForDropDown.css'
import { useHistory } from "react-router-dom";
import { categoryInSchema } from "validationSchema";
import { multerFileUploader } from "function/multer";
import "../../../../assets/css/MyCustom.css"
import { MdUpload } from "react-icons/md";


export default function CategoryForm(props) {
  const history = useHistory();
  const [tempPicPath, setTempPicPath] = useState("");
  const [tempPicture, setTempPicture] = useState("");
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  const brandColor = useColorModeValue("brand.500", "white");



  useEffect(() => {
    getIds();
  }, []);
  const [sectorId, setSectorId] = useState([])
  const getIds = async () => {
    try {
      const SectorData = await getSector()
      setSectorId(SectorData?.data?.results)
    } catch (error) {

    }
  }


  const CategoryAttribute = async (values, tempPicPath) => {
    try {
      await setCategory(values,tempPicPath)
        .then(async (response) => {
          let data = response.data.Data;
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Submitted Successfully"
            });
            history.push('/admin/ViewCategory')
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
        sector_id: "",
        title: "",
        description: "",
        shortDescription: "",
        metaTitle: "",
        metaDescription: "",
        statusBtn: "",
        featured: "",
        subscription: ""

      },
      validationSchema: categoryInSchema,
      onSubmit: (values, action) => {
        CategoryAttribute(values,tempPicPath);
      },
    });
  return (
    <>
      <FormControl>
        <SimpleGrid>
          <select className="dropDown" name="sector_id" onChange={handleChange} onBlur={handleBlur}>
            <option selected disabled>Choose Sector Title</option>
            {sectorId.map((item, i) => (<>{item.status === "ACTIVE" ? <option value={item._id}>{item.title}</option> : ""}</>))}
          </select>
        </SimpleGrid>

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
              onBlur={handleBlur} className={errors.title && touched.title ? "input-error" : ""}
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
            <div className="UplaodImg">
              <Icon as={MdUpload} w='25px' h='30px' color={brandColor} />
              <input type="file" name="image" onChange={uploadImage} />
            </div>
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
              Short Description<Text color={brandStars}>*</Text>
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
          Description<Text color={brandStars}>*</Text>
        </FormLabel>
        <textarea className="text-field-forms"
          type="text"
          rows="4" cols="137"
          name="description"
          placeholder="Write "
          value={values.description}
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
          placeholder="Write "
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
        <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
          mt="20px"        >
          Subscription<Text color={brandStars}>*</Text></FormLabel>
        <RadioGroup /*defaultValue="INACTIVE"*/>
          <HStack spacing="24px">
            <Radio
              name="subscription"
              value={"PREMIUM"}
              onChange={handleChange}
              onBlur={handleBlur}>Premium</Radio>
            <Radio
              name="subscription"
              value={"FREE"}
              onChange={handleChange}
              onBlur={handleBlur}>Free</Radio>
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

