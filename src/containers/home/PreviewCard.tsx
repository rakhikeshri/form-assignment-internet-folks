import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import React from "react";
import { useData } from "./DataProvider";
import { urgencyOptions } from "./constants";

const DataCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Box mt="1rem" bg="white" width="100%" p="16px 24px" borderRadius="10px">
      <Text fontSize="1rem" as="h6" fontWeight="600" mb="12px">
        {title}
      </Text>
      <Grid gap="16px" templateColumns="1fr 1fr">
        {children}
      </Grid>
    </Box>
  );
};

const KeyValue: React.FC<{
  title: string;
  value?: string;
}> = ({ title, value }) => {
  return (
    <Box w="100%">
      <Text fontSize=".875rem" color="gray" mb="8px">
        {title}
      </Text>
      <Text fontSize=".875rem" mb="8px">
        {value || "-"}
      </Text>
    </Box>
  );
};

const PreviewCard: React.FC = () => {

  const { state } = useData();

  const { requisitionTitle, noOfOpenings, urgency, gender } = state.requisitionDetails
  const { jobDetails, jobLocation, jobTitle } = state.jobDetails
  const { interviewDuration, interviewMode, interviewLanguage } = state.interviewSettings

  return (
    <Box p="1rem">
      <Box borderRadius="10px" bgColor="gray.100" height="fit-content">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontStyle="italic" m="0.4rem 2rem">
            Draft
          </Text>
          <Box
            bgColor="#EE5353"
            color="white"
            p="0.4rem 2rem"
            borderTopRightRadius="10px"
          >
            <Text fontStyle="italic">Preview</Text>
          </Box>
        </Flex>
        <Box w="100%" p="16px 24px">
          <Box
            width="100%"
            bgColor="#432B7D"
            color="white"
            p="1rem"
            borderRadius="10px"
          >
            <Flex
              fontFamily="Poppins"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="0.9rem" fontWeight="500">{requisitionTitle}</Text>
              <Flex justifyContent="space-around" alignItems="center">
                <Text fontSize="0.8rem" mr="0.4rem" fontWeight="200" as="p">
                  OPENINGS
                </Text>
                <Text fontSize="1rem" fontWeight="bold" as="span">{noOfOpenings}</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
          <DataCard title="Requisition Details">
            <KeyValue title="Urgency" value={urgencyOptions[Number(urgency)].label} />
            <KeyValue title="Gender" value={gender === 'm' ? "Male" :
              gender === 'f' ? "Female" :
                gender === 'nb' ? "Non Binary" :
                  ""} />
          </DataCard>
          <DataCard title="Job Detail">
            <KeyValue title="Job Title" value={jobTitle} />
            <KeyValue title="Job Details" value={jobDetails} />
            <KeyValue title="Job Location" value={jobLocation} />
          </DataCard>
          <DataCard title="Interview Settings">
            <KeyValue title="Interview Duration" value={interviewDuration.charAt(0).toUpperCase() + interviewDuration.slice(1)} />
            <KeyValue title="Interview Language" value={interviewLanguage === "hi" ? "Hindi" : interviewLanguage === "en" ? "English" : ""} />
            <KeyValue title="Interview Mode" value={interviewMode.charAt(0).toUpperCase() + interviewMode.slice(1)} />
          </DataCard>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewCard;
