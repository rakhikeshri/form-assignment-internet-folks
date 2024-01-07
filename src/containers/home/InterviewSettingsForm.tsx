import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

interface RequisitionDetailsFormProps {
  prevTab: () => void;
}

const InterviewDetailsForm: React.FC<RequisitionDetailsFormProps> = (props) => {
  const { state, setState } = useData();

  const { interviewDuration, interviewLanguage, interviewMode } = state.interviewSettings

  const {
    errors,
    touched,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode,
      interviewDuration,
      interviewLanguage
    },
    validationSchema: Yup.object().shape({
      interviewDuration: Yup.string().required("Duration is required"),
      interviewLanguage: Yup.string().required("Language is required"),
      interviewMode: Yup.string().required("Interview Mode is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleFormSelectChange = (
    name: string,
    value: string,
    index: number
  ) => {
    setFieldValue(name, value);

    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [name]: index,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onBlur={setFieldTouched}
          value={interviewMode}
          onChange={(value: any, index: number) =>
            handleFormSelectChange("interviewMode", value, index)
          }
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onBlur={setFieldTouched}
          value={interviewDuration}
          onChange={(value: any, index: number) =>
            handleFormSelectChange("interviewDuration", value, index)
          }
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          value={interviewLanguage}
          onChange={(value: any, index: number) =>
            handleFormSelectChange("interviewLanguage", value, index)
          }
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={props.prevTab}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
