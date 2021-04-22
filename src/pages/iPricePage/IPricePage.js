import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { IPriceForm } from "../../components/molecules/Form";
import { getCrop, selectCrop } from "../../redux/reducers/cropSlice";
import { PriceTable } from "../../components/molecules/Table";
import IPriceContainer from "../../components/organisms/IPriceFormContainer";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "95vh",
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
}));
export default function IPrice() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [marketName, setMarketName] = useState("");
  const [cropName, setCropName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const crop = useSelector(selectCrop);
  const handleMarketChange = (e) => {
    setMarketName(e.target.value);
  };

  const handleCropChange = (e) => {
    setCropName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    let date = e.target.value.split("-");
    let convertedYear = date[0] - 1911;
    date.splice(0, 1, convertedYear);
    let result = date.join(".");
    setStartDate(result);
  };

  const handleEndDateChange = (e) => {
    let date = e.target.value.split("-");
    let convertedYear = date[0] - 1911;
    date.splice(0, 1, convertedYear);
    let result = date.join(".");
    setEndDate(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCrop(startDate, endDate, cropName, marketName)).then(() => {
      console.log("get data");
    });
    setIsClicked(true);
  };
  return (
    <Container maxWidth="xl" className={classes.root}>
      <IPriceContainer>
        <form onSubmit={handleSubmit}>
          <IPriceForm
            handleMarketChange={handleMarketChange}
            handleCropChange={handleCropChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            marketName={marketName}
            cropName={cropName}
          />
        </form>
        {isclicked && <PriceTable crop={crop} />}
      </IPriceContainer>
    </Container>
  );
}
