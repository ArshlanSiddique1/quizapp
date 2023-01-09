// Chakra imports
import {FormControl,FormLabel,Input,Text,useColorModeValue,Button,HStack,Radio,RadioGroup,SimpleGrid,Box
} from "@chakra-ui/react";
import Upload from "./Upload";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { setCategory } from "../../../../services/category";
import { useState,useEffect } from "react";
import { getSector } from "../../../../services/sector";
import '../../../../assets/css/CustomCssForDropDown.css'
import { useHistory } from "react-router-dom";
import { categoryInSchema } from "validationSchema";


export default function CategoryForm(props) {
  const history = useHistory();
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  // Formik for form validation

  useEffect(() => {
    getIds();
  }, []);
  const [sectorId, setSectorId] = useState([])
  // console.log(JSON.stringify(sectorId))
  const getIds = async () => {
    try {
      const SectorData = await getSector()
      setSectorId(SectorData?.data?.results)
    } catch (error) {

    }
  }


  const CategoryAttribute = async (values) => {
    try {
      await setCategory(values)
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

  const { values, handleBlur, handleChange, handleSubmit , touched ,errors} =

    useFormik({
      initialValues: {
        sector_id:"",
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
        CategoryAttribute(values);
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
              onBlur={handleBlur}className={errors.title && touched.title ? "input-error" : ""}
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

