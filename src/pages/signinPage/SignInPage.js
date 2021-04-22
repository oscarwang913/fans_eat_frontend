import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  setIsLoadingUser,
  setAlertMsg,
  selectAlertMsg,
} from "../../redux/reducers/authSlice.js";
import { SigninForm } from "../../components/molecules/Form";
import { validateData } from "../../utlis";
import Page from "../../components/organisms/SignFormContainer";
import { SignInUpLoading } from "../../components/atoms/Loading";

export default function SignInPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isClicked, setIsClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataError, setDataError] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const alertMsg = useSelector(selectAlertMsg);
  const isLoadingUser = useSelector((store) => store.auth.isLoadingUser);

  useEffect(() => {
    return () => dispatch(setAlertMsg(""));
  }, [dispatch]);

  const handleInputChange = (setValue) => (e) => {
    setValue(e.target.value);
    setButtonStatus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClicked(true);
    let errors = validateData({ email, password });
    let hasNoErrors = errors.every((error) => error === false);
    if (!hasNoErrors) {
      setDataError(errors);
      setIsClicked(false);
      return;
    }
    dispatch(login(email, password)).then((res) => {
      if (!res) {
        return;
      }
      dispatch(setIsLoadingUser(false));
      history.push("/");
    });
  };

  return (
    <Page>
      {isLoadingUser && isClicked && <SignInUpLoading />}
      <form onSubmit={handleSubmit}>
        <SigninForm
          value={{ email, password }}
          handleEmailChange={handleInputChange(setEmail)}
          handlePasswordChange={handleInputChange(setPassword)}
          alertMsg={alertMsg}
          disabled={buttonStatus}
          error={dataError}
        />
      </form>
    </Page>
  );
}
