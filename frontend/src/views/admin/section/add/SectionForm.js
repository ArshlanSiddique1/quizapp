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
  Box,
  Icon
} from "@chakra-ui/react";
import Upload from "./Upload";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { setSection } from "../../../../services/section";
import { getSector } from "../../../../services/sector";
import { getGrade } from "../../../../services/grade"
import { getCategory } from "../../../../services/category"
import { getSubject } from "../../../../services/subject"
import '../../../../assets/css/CustomCssForDropDown.css'
import { useHistory } from "react-router-dom";
import { sectionInSchema } from "validationSchema";
import { multerFileUploader } from "function/multer";
import "../../../../assets/css/MyCustom.css"
import { MdUpload } from "react-icons/md";




export default function SectionForm(props) {
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
  const [categoryId, setCategoryId] = useState([])
  const [gradeId, setGradeId] = useState([])
  const [subjectId, setSubjectId] = useState([])
  // console.log(JSON.stringify(sectorId))
  const getIds = async () => {
    try {
      const SectorData = await getSector()
      const CategoryData = await getCategory()
      const GradeData = await getGrade()
      const SubjectData = await getSubject()

      setSectorId(SectorData?.data?.results)
      setCategoryId(CategoryData?.data?.data?.results)
      setGradeId(GradeData?.data?.data?.results)
      setSubjectId(SubjectData?.data?.data?.results)
    } catch (error) {

    }
  }



  const SectionAttribute = async (values,tempPicPath) => {
    try {
      await setSection(values,tempPicPath)
        .then(async (response) => {
          let data = response.data.Data;
          if (data) {
            Swal.fire({
              icon: "success",
              title: "Submitted Successfully"
            });  
            history.push('/admin/ViewSection')
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



  const { values, handleBlur, handleChange, handleSubmit , touched ,errors} =

    useFormik({
      initialValues: {
        title: "",
        image: "",
        description: "",
        shortDescription: "",
        metaTitle: "",
        metaDescription: "",
        statusBtn: "",
        sector_id: "",
        category_id: "",
        grade_id: "",
        subject_id: ""
      },
      validationSchema: sectionInSchema,
      onSubmit: (values, action) => {
        SectionAttribute(values,tempPicPath);
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
          placeholder="Tell Something about youself in 150 Character!"
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
  )
}

