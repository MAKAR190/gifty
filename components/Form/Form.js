import React from "react";
import { Formik } from "formik";
const Form = ({ children, initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          onSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default Form;
