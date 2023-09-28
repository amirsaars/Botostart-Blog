import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BLOGS_INFO } from "../../graphql/queries";
import { Grid } from "@mui/material";
import CardEl from "../shared/CardEl";
import Loader from "../shared/Loader";

function Blogs() {
  const { loading, data, error } = useQuery(GET_BLOGS_INFO);

  if (loading) return <Loader />;
  if (error) return <h4>{error.message}</h4>;

  return (
    <Grid container spacing={2}>
      {data.posts.map((post) => {
        return (
          <Grid key={post.id} item xs={12} sm={6} md={4}>
            <CardEl {...post} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Blogs;
