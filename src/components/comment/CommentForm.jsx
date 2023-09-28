import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SEND_COMMENT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import errorHandler from "../../helpers/errorHandler";

function CommentForm({ slug }) {
  const initialFocus = {
    name: false,
    email: false,
    text: false,
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({ ...initialFocus });
  const [pressed, setPressed] = useState(false);
  const [unfocused, setUnFocused] = useState({ ...initialFocus });

  const [createPost, { loading, data }] = useMutation(SEND_COMMENT, {
    variables: { name, email, text, slug },
  });

  if (data && pressed) {
    toast.success("کامنت شما ارسال شد و منتظر تایید میباشد", {
      position: "top-center",
    });
    setPressed(false);
  }

  const FocusHandler = (e) => {
    setFocus((prev) => ({ ...prev, [e.target.name]: true }));
    setUnFocused((prev) => ({ ...prev, [e.target.name]: false }));
  };

  useEffect(() => {
    setErrors(errorHandler({ name, email, text }));
  }, [name, email, text]);

  const sendComment = () => {
    if (name && email && text) {
      createPost();
      setEmail("");
      setName("");
      setText("");
      setFocus({ ...initialFocus });
      setUnFocused({ ...initialFocus });
      setPressed(true);
    } else {
      toast.warn("لطفا تمام فیلد ها رو پر کنید", { position: "top-center" });
    }
  };

  const blurHandler = (e) => {
    if (!unfocused[e.target.name]) {
      setUnFocused((prev) => ({ ...prev, [e.target.name]: true }));
    }
  };

  return (
    <Grid
      xs={12}
      item
      boxShadow="rgba(0,0,0,0.1) 0px 4px 12px"
      mt={6}
      padding={2}
      borderRadius={3}
    >
      <Typography component="p" variant="h6" color="primary" fontWeight={700}>
        فرم ارسال کامنت
      </Typography>
      <Grid item xs={12} mt={2}>
        <Grid item xs={12} m={2}>
          <CustomTextField
            error={errors.name && focus.name && unfocused.name ? true : false}
            helperText={
              errors.name && focus.name && unfocused.name ? errors.name : ""
            }
            onFocus={FocusHandler}
            onBlur={blurHandler}
            name="name"
            sx={{ width: "100%" }}
            variant="outlined"
            label="نام کاربری"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} m={2}>
          <CustomTextField
            error={
              errors.email && focus.email && unfocused.email ? true : false
            }
            helperText={
              errors.email && focus.email && unfocused.email ? errors.email : ""
            }
            onFocus={FocusHandler}
            onBlur={blurHandler}
            name="email"
            sx={{ width: "100%" }}
            variant="outlined"
            label="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} m={2}>
          <CustomTextField
            error={errors.text && focus.text && unfocused.text ? true : false}
            helperText={
              errors.text && focus.text && unfocused.text ? errors.text : ""
            }
            onFocus={FocusHandler}
            onBlur={blurHandler}
            name="text"
            sx={{ width: "100%" }}
            variant="outlined"
            label="متن کامنت"
            value={text}
            multiline
            minRows={4}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
      </Grid>
      {pressed ? (
        <Button
          sx={{ marginTop: 4, marginX: 2, marginBottom: 1 }}
          variant="contained"
          disabled
        >
          در حال ارسال...
        </Button>
      ) : (
        <Button
          sx={{ marginTop: 4, marginX: 2, marginBottom: 1 }}
          variant="contained"
          onClick={sendComment}
        >
          ارسال
        </Button>
      )}
    </Grid>
  );
}

const CustomTextField = styled(TextField)`
  label {
    right: 1.75rem;
    transform-origin: right !important;
    left: inherit !important;
    color: #807d7b;
    font-weight: 400;
    overflow: unset;
    background-color: #fff;
    padding-left: 10px;
    padding-right: 10px;
  }
  fieldset {
    text-align: right !important;
  }
`;

export default CommentForm;
