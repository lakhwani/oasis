"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

type PartnerAccordionProps = {
  countries: string; // Type for the countries prop
};

const PartnerAccordion: React.FC<PartnerAccordionProps> = ({ countries }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Countries Supported
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {countries} {/* Render the countries string here */}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default PartnerAccordion;
