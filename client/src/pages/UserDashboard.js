import React, { useEffect, useState } from "react";
import "./Site.css";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  CssBaseline,
  Container,
  Card,
} from "@material-ui/core/Grid";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { numberToSign } from "../helpers/helpers.js";
import UserAppbar from "../components/UserAppbar.js";
import useStyles from "../assets/Style.js";

function UserDashboard(props) {
  const classes = useStyles();
  useEffect(() => {
    getInfo();
  }, []);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [sign, setSign] = useState(1);
  const [house, setHouse] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [horoscope, setHoroscope] = useState("");
  async function getInfo() {
    let response = await axios.get("/api/getUserInfo");
    if (!response.data) setRedirect(true);
    if (response.status === 200) {
      setName(response.data.name);
      setUsername(response.data.username);
      setSign(response.data.sign);
      setHouse(response.data.house);
      setHoroscope(response.data.horoscope);
    }
  }
  async function logout(e) {
    e.preventDefault();
    await axios.delete("/api/signout");
    setRedirect(true);
  }
  if (redirect) {
    return <Redirect to={{ pathname: "/Login" }} />;
  }
  return (
    <div>
      <UserAppbar
        position="sticky"
        name={name}
        showDashboardB={false}
        setRedirect={setRedirect}
      ></UserAppbar>
      <div className={classes.pageMain}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Card className={classes.paper}>
            <Avatar className={classes.avatar} />
            <Typography component="h1" variant="h5" align="center">
              Profile Information
            </Typography>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h3" align="center">
                  Name: {name}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" align="center">
                  Username: {username}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" align="center">
                  Sign: {numberToSign(sign)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h3" align="center">
                  House: {numberToSign(house)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Link
                  to={{
                    pathname: "UserHoroscope",
                    name: name,
                    horoscope: horoscope,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Horoscope
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </div>
    </div>
  );
}
export default UserDashboard;
