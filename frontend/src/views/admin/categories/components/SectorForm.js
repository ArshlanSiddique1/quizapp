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
  TextField
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import Menu from "components/menu/MainMenu";

export default function SectorForm(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
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
              value=""
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
              value=""
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
          value=""
        />
        {/* <FormLabel
          display="flex"
          ms="4px"
          fontSize="sm"
          fontWeight="500"
          color={textColor}
          mb="8px"
        >
          Meta Description<Text color={brandStars}>*</Text>
        </FormLabel> */}
        <TextField
          id="about"
          label="About Me"
          placeholder="Tell something about yourself in 150 characters!"
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
