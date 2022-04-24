import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { FC, useRef } from "react";
import { Button } from "react-bootstrap";
import "./formUser.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useSearchParams, useLocation } from "react-router-dom";
import useUsersService from "../services/useUsersService";
import { object } from "yup/lib/locale";
interface MyTextInputProps {
  name: string;
  label: string;
  type: string;
  key: string;
}

const MyTextInput: FC<MyTextInputProps> = ({ label, ...props }) => {
  const edit = useContext(UserContext);
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

const FormUser: FC = () => {
  // сделать поиск отсюда

  const { getUser } = useUsersService();

  const [currentUser, setCurrentUser] = useState(null);
  const [placeholderData, setPlaceHolderData] = useState([]);
  const [inputsData, setInputsData] = useState([]);

  const edit = useContext(UserContext);
  const location = useLocation();
  const linkTo = +location.pathname.slice(-1);
  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getUser(linkTo)
      .then(onUserLoaded)
      .catch((error) => console.log(error));
  };

  // const createPlaceholderData = (arr) => {
  //   const result = [];
  //   arr.map((item) => {
  //     if (typeof item === "string") {
  //       placeholderData.push(item);
  //     } else {
  //       let value: string;
  //       for (let insertedValue in item) {
  //         value = item[insertedValue];

  //         result.push(value);
  //       }
  //     }
  //   });
  //   return result;
  // };

  const createInputsData = (arr) => {
    const result = [];

    arr.map((item) => {
      const key = item[0];
      const value = item[1];
      if (typeof value === "string") {
        result.push(item);
        return;
      }
      if (typeof value === "object") {
        for (let insertedValue in value) {
          result.push([insertedValue, value[insertedValue]]);
        }
      }
    });
    return result;
  };

  const onUserLoaded = async (user: any) => {
    transformToInputs(user);
  };

  const transformToInputs = (user) => {
    const userPropsArray = Object.entries(user);
    const inputs = createInputsData(userPropsArray);

    setInputsData(inputs);
  };

  const btnRef = useRef<HTMLButtonElement>();
  if (edit) {
    btnRef.current?.removeAttribute("disabled");
    btnRef.current?.classList.add("btn_ready");
  }

  if (inputsData.length === 0) return <h1>Loading</h1>;

  // нужно распаковать массив для получения массива плейсхолдеров и названий инпутов

  // const userDataArray = Object.keys(currentUser);

  const renderItems = (arr: any) => {
    return arr.map((item) => {
      const value = item[0];
      if (value === "id") return;

      return (
        <MyTextInput
          key={value + "Input"}
          label={value.slice(0, 1).toUpperCase() + value.slice(1)}
          name={value}
          type={value !== "email" ? "text" : "email"}
        />
      );
    });
  };

  const elements = renderItems(inputsData);

  console.log(inputsData);
  return (
    <Formik
      initialValues={inputsData.reduce((object, [property, value]) => {
        if (property === "id") return;
        object[property] = value;
        console.log(object);
        return object;
      }, {})}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Минимум 2 символа")
          .required("Обязательное поле"),
        username: Yup.string()
          .min(3, "Минимум 2 символа")
          .required("Обязательное поле"),
        email: Yup.string()
          .email("Неправильный email адрес")
          .required("Обязательное поле"),
        street: Yup.string()
          .required("Обязательное поле")
          .min(3, "Минимум 3 символа"),
        city: Yup.string()
          .required("Обязательное поле")
          .min(3, "Минимум 3 символа"),
        zipcode: Yup.string().min(
          5,
          "Зипкод должен состоять минимум из 5 цифр"
        ),
        phone: Yup.string()
          .min(6, "Телефон должен состоять минимум из 6 цифр")
          .required("Обязательное поле"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        {elements}
        <label htmlFor="text" className={"form-label mt-3"}>
          Ваше сообщение
        </label>
        <Field
          id="text"
          name="text"
          as="textarea"
          className="form-control textarea"
        />
        <div className="d-flex justify-content-end mt-4">
          <Button
            ref={btnRef}
            className="button-edit"
            type="submit"
            disabled
            variant="secondary"
          >
            Отправить
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormUser;
