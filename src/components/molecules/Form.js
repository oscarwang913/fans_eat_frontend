import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { PhotoCard } from "../../components/molecules/Card";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const marketArray = [
  "台北二",
  "台北一",
  "板橋區",
  "三重區",
  "宜蘭市",
  "桃　農",
  "台中市 ",
  "豐原區",
  "永靖鄉 ",
  "溪湖鎮",
  "南投市 ",
  "西螺鎮",
  "高雄市",
  "鳳山區",
  "屏東市",
  "台東市",
  "花蓮市",
];

const selectionOption = (arr) => {
  return arr.map((item, index) => (
    <MenuItem key={index} value={`${item}`}>
      {item}
    </MenuItem>
  ));
};

const useStyles = makeStyles((theme) => ({
  update: {
    margin: theme.spacing(3, 0, 2),
  },
  updateBtn: {
    margin: theme.spacing(3, 0, 2),
  },
  deleteBtn: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#ff0000",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ff0000",
    },
  },
  input: {
    display: "none",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  toSignup: {
    textDecoration: "none",
    color: "#000000",
  },

  iprice: {
    display: "Flex",
    flexDirection: "column",
    marginRight: theme.spacing(1),
  },
}));

export function SignupForm({
  value,
  handleFullNameChange,
  handleUserNameChange,
  handleEmailChange,
  handlePasswordChange,
  alertMsg,
  disabled,
  error,
}) {
  const classes = useStyles();
  const { fullName, userName, email, password } = value;
  return (
    <>
      <Typography align="center" component="h1" variant="h6" children="註冊" />
      <Typography
        align="center"
        component="h1"
        variant="h6"
        color="error"
        children={alertMsg || ""}
      />
      <TextField
        size="medium"
        margin="normal"
        id="fullName"
        label="全名"
        name="fullName"
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        error={error[0]}
      />
      <TextField
        size="medium"
        margin="normal"
        id="userName"
        label="使用者名稱"
        name="userName"
        autoComplete="userName"
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        error={error[1]}
      />
      <TextField
        size="medium"
        margin="normal"
        id="email"
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        error={error[2]}
      />
      <TextField
        size="medium"
        margin="normal"
        id="password"
        label="密碼"
        name="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        error={error[3]}
      />
      <TextField
        size="medium"
        margin="normal"
        id="roleId"
        name="RoleId"
        type="hidden"
        value="4"
      />
      <Button
        disabled={disabled}
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        color="primary"
      >
        加入我們
      </Button>
    </>
  );
}

export function SigninForm({
  value,
  handleEmailChange,
  handlePasswordChange,
  alertMsg,
  disabled,
  error,
}) {
  const classes = useStyles();
  const { email, password } = value;
  return (
    <>
      <Typography align="center" component="h1" variant="h4" children="登入" />
      <Typography
        align="center"
        component="h1"
        variant="h6"
        color="error"
        children={alertMsg || ""}
      />
      <TextField
        size="medium"
        margin="normal"
        id="email"
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        error={error[2]}
      />
      <TextField
        size="medium"
        margin="normal"
        id="password"
        label="密碼"
        name="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        error={error[3]}
      />
      <Button
        disabled={disabled}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        登入
      </Button>
      <Typography
        component={Link}
        variant="subtitle2"
        children="還沒有帳戶嗎?"
        to="/signup"
        className={classes.toSignup}
      />
    </>
  );
}

export function AccountForm({
  value,
  fullNameError,
  userNameError,
  emailError,
  handleFullNameChange,
  handleUserNameChange,
  handleEmailChange,
}) {
  const classes = useStyles();
  const { fullName, userName, email } = value;

  return (
    <>
      <TextField
        size="medium"
        margin="normal"
        id="fullName"
        label="全名"
        name="fullName"
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        error={fullNameError}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        size="medium"
        margin="normal"
        id="userName"
        label="使用者名稱"
        name="userName"
        autoComplete="userName"
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        error={userNameError}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />
      <TextField
        size="medium"
        margin="normal"
        id="email"
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.updateBtn}
      >
        更新
      </Button>
    </>
  );
}

export function NewPostForm({
  content,
  handleContentChange,
  handleImageChange,
  image,
  userId,
}) {
  const classes = useStyles();
  return (
    <>
      <TextField
        variant="outlined"
        size="medium"
        margin="normal"
        id="content"
        label="Content"
        name="content"
        type="text"
        value={content}
        onChange={handleContentChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        multiline
        rows={6}
        placeholder="Share your dishes name (no more than 10 words)"
      />
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        name="image"
        onChange={handleImageChange}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <input id="userId" type="hidden" name="userId" value={userId} />
      {image.length > 0 && <PhotoCard imageUrl={image} />}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        提交
      </Button>
    </>
  );
}

export function IPriceForm({
  handleMarketChange,
  handleCropChange,
  handleStartDateChange,
  handleEndDateChange,
  marketName,
  cropName,
}) {
  const classes = useStyles();

  return (
    <div className={classes.iprice}>
      <div>
        <TextField
          id="date"
          fullWidth
          onChange={handleStartDateChange}
          label="開始日期"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          onChange={handleEndDateChange}
          fullWidth
          label="結束日期"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">市場</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={marketName}
            onChange={handleMarketChange}
          >
            {selectionOption(marketArray)}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          size="medium"
          id="cropname"
          label="菜名"
          name="cropname"
          type="text"
          value={cropName}
          onChange={handleCropChange}
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        提交
      </Button>
    </div>
  );
}

SignupForm.propTypes = {
  value: PropTypes.object.isRequired,
  handleFullNameChange: PropTypes.func.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  alertMsg: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.array,
};

SigninForm.propTypes = {
  value: PropTypes.object.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  alertMsg: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.array,
};

AccountForm.propTypes = {
  value: PropTypes.object.isRequired,
  fullNameError: PropTypes.bool,
  userNameError: PropTypes.bool,
  emailError: PropTypes.bool,
  handleFullNameChange: PropTypes.func,
  handleUserNameChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
};

NewPostForm.propTypes = {
  content: PropTypes.string.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  image: PropTypes.string,
  userId: PropTypes.number.isRequired,
};

IPriceForm.propTypes = {
  handleMarketChange: PropTypes.func.isRequired,
  handleCropChange: PropTypes.func.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  marketName: PropTypes.string,
  cropName: PropTypes.string,
};
