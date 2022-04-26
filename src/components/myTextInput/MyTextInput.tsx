import { FC, useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { useField } from "formik";
interface MyTextInputProps {
  name: string;
  label: string;
  type: string;
  key: string;
}

const MyTextInput: FC<MyTextInputProps> = ({ label, ...props }) => {
  const edit: boolean = useContext(UserContext);
  const [field, meta] = useField(props);
  const inputRef = useRef<HTMLInputElement>();

  if (edit) {
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.classList.add("input-form");
  }
  const inputClassName =
    meta.touched && meta.error ? "form-control error" : "form-control";

  return (
    <>
      <label className="form-label mt-3" htmlFor={props.name}>
        {label}
      </label>
      <input
        ref={inputRef}
        disabled
        {...props}
        {...field}
        className={inputClassName}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};
export default MyTextInput;
