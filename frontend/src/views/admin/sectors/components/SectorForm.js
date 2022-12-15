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
} from "@chakra-ui/react";
import Upload from "./upload-img-form";

export default function SectorForm(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <>
      <FormControl>
        <SimpleGrid columns={2} spacing={10}>

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
            // style={{zIndex:"20",position:"absolute"}}
            >
              Image<Text color={brandStars}>*</Text>
            </FormLabel>
            <Upload className="upload-img-form"
              gridArea={{ 
                base: "3/1  / 4 / 2",
                lg: " 1 /3 / 2 / 4",
              }}
              minH={{ base: "auto", lg: "250px", "2xl": "365px" }}
              pe='2px'
              pb={{ base: "10px", lg: "20px" }}
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
              Short Description<Text color={brandStars}>*</Text>
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
              name="shortDescription"

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
        />
        <RadioGroup defaultValue="ACTIVE">
          <HStack spacing="24px">
            <Radio value="ACTIVE">Active</Radio>
            <Radio value="INACTIVE">Inactive</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <Button
        mt={4}
        colorScheme="brand"
        isLoading={props.isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </>
  );
}
