import React from "react";
import { ReactComponent as Logo } from "../../Image/loading.svg";
import { ReactComponent as Heart } from "../../Image/Heart-1s-200px.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  lodinglogo: {
    width: "82%",
    height: "96%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-40%, -50%)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  likeLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  signinupLoding: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100vw",
    height: "100vh",
  },
}));

export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.lodinglogo}>
      <Logo />
    </div>
  );
};

export const Like = () => {
  const classes = useStyles();
  return (
    <div className={classes.likeLoading}>
      <Heart />
    </div>
  );
};

export const SignInUpLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.signinupLoding}>
      <Logo />
    </div>
  );
};
