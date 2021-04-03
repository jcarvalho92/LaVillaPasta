import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({  name, width, ...otherProps }) {
  var getByPath = function(obj, path, def) {
    path = path
        .replace(/\[/g, '.')
        .replace(/]/g, '')
        .split('.');
 
    path.forEach(function (level) {
        obj = obj[level];
    });
 
    if (obj === undefined) {
        return def;
    }
 
    return obj;
 
  };
  const { setFieldTouched, setFieldValue, errors, touched,values } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={getByPath(values, name, "")}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
