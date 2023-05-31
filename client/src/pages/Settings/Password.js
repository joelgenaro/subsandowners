import React, { useState, useEffect } from "react";
import { Col, Row, CardBody } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { reset_password } from "../../redux/Extra/settingsSlice";
import LoadingButton from "../../components/LoadingButton";

const Password = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.settings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [isSuccess, isError]);

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(reset_password(data));
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("Current Password is required"),
    new_password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(Yup.string().required("New Password is required"))
      .min(6, "New Password must be at least 6 characters"),
    confirm_password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .when("new_password", (password, schema) => {
        if (password) {
          return schema.required("Confirm Password is required");
        }
      })
      .oneOf([Yup.ref("new_password")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <React.Fragment>
      <CardBody className="p-4">
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="current_password" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    {...register("current_password")}
                    className={`form-control ${
                      errors.current_password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.current_password?.message}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="new_password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    {...register("new_password")}
                    className={`form-control ${
                      errors.new_password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.new_password?.message}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3 justify-center">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    {...register("confirm_password")}
                    className={`form-control ${
                      errors.confirm_password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.confirm_password?.message}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4 text-start">
            <LoadingButton
              className={"btn btn-primary"}
              disabled={isLoading}
              isLoading={isLoading}
              title={"Save settings"}
            />
          </div>
        </form>
      </CardBody>
    </React.Fragment>
  );
};

export default Password;
