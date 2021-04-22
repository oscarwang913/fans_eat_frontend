import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/reducers/authSlice";
import { AccountForm } from "../../components/molecules/Form";
import AllPostGrid from "../../components/molecules/GridList";
import { useHistory, useParams } from "react-router-dom";
import AccountContainer from "../../components/organisms/AccountContainer";
import {
  updateUserInfo,
  selectIsLoadingUpdate,
} from "../../redux/reducers/userSlice";

import {
  getAllOwnPosts,
  selectallOwnPosts,
} from "../../redux/reducers/postSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "85vh",
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    display: "flex",
  },
}));

export default function AccountPage() {
  const { id } = useParams();
  const classes = useStyles();
  const auth = useSelector(selectUser);
  const isLoadingUpdate = useSelector(selectIsLoadingUpdate);
  const allOwnPosts = useSelector(selectallOwnPosts);
  const [fullName, setFullName] = useState(auth.user.fullName);
  const [userName, setUserName] = useState(auth.user.userName);
  const [email, setEmail] = useState(auth.user.email);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (setValue) => (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllOwnPosts(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(fullName, userName, email, id)).then((res) => {
      if (res && res.user) {
        history.push(`/account/${id}`);
      }
    });
  };

  return (
    <div className={classes.root}>
      <AccountContainer>
        {auth && (
          <>
            {isLoadingUpdate && <div>Loading...</div>}
            <form onSubmit={handleSubmit}>
              <AccountForm
                value={{ fullName, userName, email }}
                handleFullNameChange={handleChange(setFullName)}
                handleUserNameChange={handleChange(setUserName)}
                handleEmailChange={handleChange(setEmail)}
              />
            </form>
          </>
        )}
        {auth && allOwnPosts && <AllPostGrid posts={allOwnPosts} />}
      </AccountContainer>
    </div>
  );
}
