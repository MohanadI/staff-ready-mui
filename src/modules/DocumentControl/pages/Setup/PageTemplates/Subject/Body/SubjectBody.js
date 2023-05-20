import React, { useEffect, useState, Fragment } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  TextField
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ConfirmNotification from "../../../../../../../@core/components/confirm-dialog";
import withAPI from "../../../../../../../api/core";
import HeaderIcons from "../HeaderIcons";

function SubjectBody({ api, node }) {
  const [data, setData] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(data);
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    setIsLoading(true);
    api.get("StaffReady/v10/api/subject/" + node.value, (results) => {
      setIsLoading(false);
      setData(results);
    });
  }, [node]);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <HeaderIcons />
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: 15 }}>
              <CircularProgress size={25} />
            </div>
          ) : (
            <>
              <CardContent sx={{ padding: "8px" }}>
                {!isEditing && (
                  <Box>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Subject Name
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {data?.id}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Subject Parent
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {data?.parent?.name || "[top level]"}
                    </Typography>
                  </Box>
                )}
                {isEditing && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Subject Name
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        name="id"
                        defaultValue={data?.id}
                        {...register("id", { required: true })}
                        sx={{ mb: 2 }}
                      />
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Subject Parent
                      </Typography>
                      <Button
                        onClick={() => setEditing(true)}
                        variant="outlined"
                        color="info"
                      >
                        {data?.parent?.name || "[top level]"}
                      </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="outlined"
                        color="inherit"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditing(false)}
                        variant="outlined"
                        color="warning"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setConfirmDelete(true)}
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </form>
                )}
              </CardContent>
              <CardActions>
                {!isEditing && (
                  <>
                    <Button
                      onClick={() => setEditing(true)}
                      variant="outlined"
                      color="info"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href =
                          "https://cobalt301.openstack.local/StaffReady/v10/api/subject/zip";
                      }}
                      variant="outlined"
                      startIcon={<CloudDownloadIcon />}
                      color="secondary"
                      size="small"
                    >
                      Download all Published Files as ZIP
                    </Button>
                  </>
                )}
              </CardActions>
            </>
          )}
        </Grid>
      </Grid>
      <ConfirmNotification
        open={confirmDelete}
        setCallback={(value) => {
          console.log(value);
          setConfirmDelete(false);
        }}
      />
    </Fragment>
  );
}

export default withAPI(SubjectBody);
