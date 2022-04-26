import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FC, ReactNode, useRef } from "react";
import { Button } from "react-bootstrap";
import "./formUser.scss";
import MyTextInput from "../myTextInput/MyTextInput";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useLocation } from "react-router-dom";
import useUsersService from "../services/useUsersService";
import { FullAddress, UserWithMessage } from "../../types/classes";
import { IUser } from "../../types/types";

const FormUser: FC = () => {
  const { getUser } = useUsersService();

  const [inputsData, setInputsData] = useState([]);

  const edit = useContext(UserContext);
  const location = useLocation();
  const id = +location.pathname.match(/\d/)[0];

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getUser(id)
      .then(onUserLoaded)
      .catch((error) => console.log(error));
  };

  const createInputsData = (arr: [string, any][]): [string][] => {
    const result = [];
    arr.map((item: [string, any]) => {
      const value = item[1];
      if (typeof value === "string") {
        result.push(item);
        return;
      } else {
        for (let insertedValue in value) {
          result.push([insertedValue, value[insertedValue]]);
        }
      }
    });
    return result;
  };

  const onUserLoaded = async (user: IUser) => {
    transformToInputs(user);
  };

  const transformToInputs = (user: IUser): void => {
    const userPropsArray = Object.entries(user);
    const inputs: [string][] = createInputsData(userPropsArray);

    setInputsData(inputs);
  };

  const btnRef = useRef<HTMLButtonElement>();
  if (edit) {
    btnRef.current?.removeAttribute("disabled");
    btnRef.current?.classList.add("btn_ready");
  }

  if (inputsData.length === 0) return <h1>Loading</h1>;

  const renderItems = (arr: [string][]) => {
    return arr.map((item: string[]) => {
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

  const elements: ReactNode = renderItems(inputsData);

  return (
    <Formik
      initialValues={inputsData.reduce((object, [property, value]) => {
        if (property === "id") return;
        object[property] = value;

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
      onSubmit={({
        name,
        username,
        email,
        street,
        city,
        zipcode,
        phone,
        website,
        text,
      }) => {
        const user = new UserWithMessage(
          id,
          name,
          username,
          email,
          new FullAddress(city, zipcode, street),
          phone,
          website,
          text
        );
        console.log(JSON.stringify(user, null, 2));
      }}
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
