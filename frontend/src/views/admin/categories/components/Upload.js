// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";

export default function Upload(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (

    <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
      <Dropzone
        w={{ base: "100%", "2xl": "268px" }}
        me='36px'
        maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
        minH={{ base: "60%", lg: "50%", "2xl": "100%" }}

        content={
          <Box >
            <Flex justify='center' mx='auto' mb='0px' >
              <Icon as={MdUpload} w='25px' h='20px' color={brandColor} />
              <Text fontSize='sm' fontWeight='700' color={brandColor}>
                Upload Files
              </Text>
            </Flex>
            <Text fontSize='sm' fontWeight='100' color='secondaryGray.500'>
              PNG, JPG and GIF files are allowed
            </Text>
          </Box>
        }
      />
    
    </Flex>

  );
}
