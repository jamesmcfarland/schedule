import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

const PostDialog = ({isOpen, newPost}) => {
  const [error, seterror] = useState("");

  const validate = (values) => {
      let errors ={};

      if(!values.title){
          errors.title = "Required";
      }
      if(!values.body){
          errors.body = "Required";
      }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validateOnChange: false,
    validate,
    onSubmit: (values) => {
        newPost({
            ...values, 
            
        });
    },
  });

  return (
    <Dialog open={true}>
      <DialogContent sx={{ background: "#2f2f2f" }}>
        <Stack sx={{ minHeight: "35vh" }}>
          <form
            noValidate
            autoComplete="off"
            style={{ height: "100%" }}
            onSubmit={formik.handleSubmit}
          >
            <Stack
              spacing={2}
              justifyContent="space-between"
              style={{ height: "100%" }}
            >
              <Typography variant="h5">New post</Typography>

              {error && <Alert severity="error">{error}</Alert>}
              <Stack spacing={2}>
                <TextField
                  name="title"
                  id="title"
                  type="text"
                  label="post title"
                  placeholder="joe"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  error={formik.errors.title && formik.touched.title}
                  helperText={formik.touched.title ? formik.errors.title : ""}
                />
                <TextField
                  id="body"
                  multiline
                  minRows={3}
                  maxRows={10}
                  name="body"
                  type="text"
                  label="body"
                  placeholder="bloggs"
                  onChange={formik.handleChange}
                  value={formik.values.body}
                  onBlur={formik.handleBlur}
                  error={formik.errors.body && formik.touched.body}
                  helperText={formik.touched.body ? formik.errors.body : ""}
                />

                <Button
                  type="submit"
                  variant="contained"
                  style={{ textTransform: "none" }}
                >
                  Post
                </Button>
                <Button variant="text" style={{ textTransform: "none" }} onClick={()=>newPost(undefined)}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
