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
import Card from "components/card/Card.js";
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
        //   <Card {...rest} mb='30px' align='center' p='20px'>
        <Flex h='50%' direction={{ base: "column", "2sm": "row" }}>
            <Dropzone
                w={{ base: "60%", "lg": "600px" }}
                me='0px'
                // maxH={{ base: "60%", lg: "100%", xl: "100%" }}
                // minH={{ base: "60%", lg: "50%", xl: "100%" }}
                content={
                    <Box>
                        <Icon as={MdUpload} w='20px' h='20px' color={brandColor} />
                            <Text fontSize='sm' fontWeight='50' color={brandColor}>
                                Upload Files
                            </Text>
                            
                        <Flex justify='center' mx='auto' mb='12px'>
                            <Text fontSize='sm' fontWeight='20' color='secondaryGray.500'>
                                PNG, JPG and GIF files are allowed
                            </Text>
                        </Flex>
                    </Box>
                }
            />

        </Flex>
        //   </Card>
    );
}
