import { useFormikContext } from "formik";

function FormikStep() {
  const formikContext = useFormikContext();
  return formikContext;
}

export default FormikStep;
