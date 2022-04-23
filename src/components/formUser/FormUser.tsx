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

  const onUserLoaded = async (user: any) => {
    setCurrentUser(user);
  };

  const btnRef = useRef<HTMLButtonElement>();
  if (edit) {
    btnRef.current?.removeAttribute("disabled");
    btnRef.current?.classList.add("btn_ready");
  }

  if (!currentUser) {
    return <h1>Loading</h1>;
  }

  const userPropsArray = Object.entries(currentUser);
  const userDataArray = Object.keys(currentUser);
  const renderItems = (arr: string[]) => {
    return arr.map((item) => {
      if (item === "id") return;
      if (typeof item === "object") {
        console.log("+");
      }
      return (
        <MyTextInput
          key={item + "Input"}
          label={item.slice(0, 1).toUpperCase() + item.slice(1)}
          name={item}
          type={item !== "email" ? "text" : "email"}
        />
      );
    });
  };

  const elements = renderItems(userDataArray);

  return (
    <Formik
      initialValues={userPropsArray.reduce((object, [property, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach((item) => {
            console.log(item);
            let propOfEntry = item[0];
            let valueOfEntry = item[1];
            if (!object.hasOwnProperty(propOfEntry)) {
              object[propOfEntry] = valueOfEntry;
            }
          });
          return object;
        } else {
          object[property] = value;
          return object;
        }
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
