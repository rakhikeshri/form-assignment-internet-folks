import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { setNestedObjectValues, useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

interface RequisitionDetailsFormProps {
  nextTab: () => void;
}

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = (props) => {

  // state
  const { state, setState } = useData();
  const { requisitionTitle, noOfOpenings, urgency, gender } = state.requisitionDetails

  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle,
      noOfOpenings,
      urgency,
      gender,
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      props.nextTab()
    },
  });

  // handleChange function for inputs
  const handleFieldChange = (
    name: string,
    value: string | number | undefined
  ) => {
    setFieldValue(name, value);

    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [name]: value,
      },
    }));
  };

  // handleChange function for options 
  const handleFormSelectChange = (
    name: string,
    value: string,
    index: number
  ) => {
    setFieldValue(name, value);

    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [name]: index,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
          onBlur={handleBlur}
          value={noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect 
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(value: any, index: number) =>
            handleFormSelectChange("gender", value, index)
          }
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(value: any, index: number) =>
            handleFormSelectChange("urgency", value, index)
          }
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit" >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
