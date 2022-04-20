import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import { Button } from "react-bootstrap";
import "./formUser.scss";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

interface MyTextInputProps {
  name: string;
  label: string;
  disabled?: boolean;
  id: string;
  type: string;
}
const MyTextInput: FC<MyTextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="form-label mt-3" htmlFor={props.name}>
        {label}
      </label>
      <input
        {...props}
        {...field}
        className={
          meta.touched && meta.error ? "form-control error" : "form-control"
        }
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

const FormUser: FC = () => {
  const currentUser = useContext(UserContext);
  const { name, username, email, street, city, zipcode, phone, website, id } =
    currentUser;
  const userPropsArray = [];
  for (let prop in currentUser) {
    userPropsArray.push(prop);
  }

  return (
    <Formik
      initialValues={{
        name: `${name}`,
        username: `${username}`,
        email: `${email}`,
        street: `${street}`,
        city: `${city}`,
        zipcode: `${zipcode}`,
        phone: `${phone}`,
        website: `${website}`,
      }}
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
          6,
          "Зипкод должен состоять минимум из 6 цифр"
        ),
        phone: Yup.string()
          .min(6, "Телефон должен состоять минимум из 6 цифр")
          .required("Обязательное поле"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <MyTextInput label="Имя" id="name" name="name" type="text" disabled />
        <MyTextInput
          label="User name"
          id="username"
          name="username"
          type="text"
          disabled
        />

        <MyTextInput
          label="E-mail"
          id="email"
          name="email"
          type="email"
          disabled
        />
        <MyTextInput
          label="Street"
          id="street"
          name="street"
          type="text"
          disabled
        />
        <MyTextInput label="City" id="city" name="city" type="city" disabled />
        <MyTextInput
          label="Zipcode"
          id="zipcode"
          name="zipcode"
          type="text"
          disabled
        />
        <MyTextInput
          label="Phone"
          id="phone"
          name="phone"
          type="text"
          disabled
        />
        <MyTextInput
          label="Website"
          id="website"
          name="website"
          type="text"
          disabled
        />
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
          <Button className="button-edit" variant="secondary">
            Отправить
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormUser;
