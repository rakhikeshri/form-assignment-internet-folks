import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

interface RequisitionDetailsFormProps {
  prevTab: () => void;
  nextTab: () => void;
}

const JobDetailsForm: React.FC<RequisitionDetailsFormProps> = (props) => {
  const { state, setState } = useData();

  const { jobTitle, jobDetails, jobLocation } = state.jobDetails

  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = useFormik<IJobDetails>({
    initialValues: {
      jobTitle,
      jobDetails,
      jobLocation,
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
      jobPosition: Yup.string().required("Job position is required"),
    }),
    onSubmit: (values) => {
      // Go to next step
      next()
    },
  });

  function next() {
    if (jobTitle != '' && jobDetails != '' && jobLocation != '') props.nextTab()
    else handleSubmit()
  }

  const handleFieldChange = (
    name: string,
    value: string | number | undefined
  ) => {
    setFieldValue(name, value);

    setState((prevState) => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        [name]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={jobLocation}
          error={errors.jobLocation}
          touched={touched.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={props.prevTab}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" onClick={next}>
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
