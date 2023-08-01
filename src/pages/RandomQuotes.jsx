import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/randomroutes.css";
import BaseLink from "../components/BaseLink";
// ------------------------------------
// This all import are from mui
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import Alert from "@mui/material/Alert";
// ---------------------------
function RandomQuotes() {
  let [quote, setQuote] = useState();
  let [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  let [alret, setAlret] = useState(false);
  let [theresEmail, setTheresEmail] = useState(false);
  let [loding, setLoading] = useState(false);
  let [newQuoteLoading, setNewQuoteLoading] = useState(false);
  async function getQuote() {
    let { data } = await axios.get(`${BaseLink}api/quotes`);
    setNewQuoteLoading(false);
    setQuote(data[0]);
  }
  let newQuote = (e) => getQuote();

  let handelEmail = (e) => {
    setEmail(e.target.value);
  };
  let handelEmailSubmite = async (e) => {
    setLoading(true);
    let { data } = await axios.post(`${BaseLink}api/user`, {
      email,
    });
    if (data === "email id already exists") {
      setTheresEmail(true);
      setLoading(false);
      setAlret(true);
      setTimeout(() => {
        setTheresEmail(false);
        setAlret(false);
      }, 4000);
      return;
    }
    if (data.status === "ok") {
      setLoading(false);
      setAlret(true);
      setTimeout(() => {
        setAlret(false);
      }, 5000);
    }
  };
  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <div className="quotes">
        <div className="websiteName">
          <h1>QuoteQuest</h1>
        </div>
        <div className={`${alret ? "" : "displaynone"} alret`}>
          <Alert
            onClose={() => {
              setAlret(false);
            }}
            severity={theresEmail ? "warning" : "success"}
          >
            {theresEmail
              ? "Apologies, but it seems that your email ID is already in our records."
              : "Thank you for subscribing! Get ready for your daily dose of inspiration with our uplifting quotes sent straight to your inbox."}
          </Alert>
        </div>

        <div className="childQuotes">
          <h1>Quote of the day</h1>
          <hr />
          {/* <h3>"{quote?.q}"</h3> */}
          <h3>
            "
            {quote
              ? quote.q
              : "Fear is your worst enemy. Risk is your best friend."}
            "
          </h3>
          <p>
            <span>-</span>
            {quote ? quote.a : "Gurbaksh Chahal"}
          </p>
          <div className="buttons">
            <LoadingButton
              variant="contained"
              color="primary"
              // className="newQ"
              loading={newQuoteLoading}
              size="sm"
              onClick={() => {
                setNewQuoteLoading(true);
                newQuote();
              }}
            >
              New Quote
            </LoadingButton>
            <Button variant="outlined" size="sm">
              <a
                href={`https://twitter.com/intent/tweet?text=${quote?.q}${quote?.a}`}
                target="_blank"
                rel="noreferrer"
              >
                Tweet
              </a>
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              startDecorator={<Add />}
              onClick={() => setOpen(true)}
              size="sm"
              loading={loding}
            >
              subscribe
            </LoadingButton>

            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ maxWidth: 500 }}
              >
                <Typography id="basic-modal-dialog-title" component="h2">
                  Enter Your Email
                </Typography>
                <Typography
                  id="basic-modal-dialog-description"
                  textColor="text.tertiary"
                >
                  So we can send you daily quotes
                </Typography>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    handelEmailSubmite();
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        autoFocus
                        required
                        onChange={handelEmail}
                      />
                    </FormControl>

                    <Button variant="contained" type="submit">
                      subscribe
                    </Button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default RandomQuotes;
