// Chakra imports
import {
  Flex,
  Text,
  useColorModeValue,

} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import Menu from "components/menu/MainMenu";
import SectionForm from "./SectionForm";

export default function Notifications(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <Card mb='20px' {...rest}>
      <Flex align='center' w='100%' justify='space-between' mb='30px'>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mb='4px'>
          Section
        </Text>
      </Flex>
      <SectionForm />
    </Card >
  );
}
