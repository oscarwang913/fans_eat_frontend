import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  register,
  setAlertMsg,
  setIsLoadingUser,
} from "../../redux/reducers/authSlice.js";
import { SignupForm } from "../../components/molecules/Form";
import { validateData } from "../../utlis";
import Page from "../../components/organisms/SignFormContainer";
import { SignInUpLoading } from "../../components/atoms/Loading";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataError, setDataError] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const alertMsg = useSelector((store) => store.auth.alertMsg);
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
    let RoleId = parseInt(e.target.RoleId.value);
    let errors = validateData({ fullName, userName, email, password });
    let hasNoErrors = errors.every((error) => error === false);
    if (!hasNoErrors) {
      setDataError(errors);
      setIsClicked(false);
      return;
    } else {
      dispatch(register(fullName, userName, email, password, RoleId)).then(
        (res) => {
          if (!res) {
            return;
          }
          dispatch(setIsLoadingUser(false));
          history.push("/");
        }
      );
    }
  };

  return (
    <Page>
      {isClicked && isLoadingUser && <SignInUpLoading />}
      <form onSubmit={handleSubmit}>
        <SignupForm
          value={{ fullName, userName, email, password }}
          handleFullNameChange={handleInputChange(setFullName)}
          handleUserNameChange={handleInputChange(setUserName)}
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
