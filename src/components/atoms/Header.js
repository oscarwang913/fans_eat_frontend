import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily[1],
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Typography component="h2" variant="h5" className={classes.title}>
          FansEat
        </Typography>
      </AppBar>
    </div>
  );
}
