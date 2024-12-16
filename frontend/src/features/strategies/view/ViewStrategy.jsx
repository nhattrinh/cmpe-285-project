import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Container
} from "@mui/material";
import { Link } from "react-router-dom";
import { Header } from "../../layout";
import { removeStrategy, getStrategies } from '../utils';
import News from "../../../Hooks/News";

const ViewStrategy = () => {
  const [strategies, setStrategies] = useState(getStrategies());
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);

  // Fetching the news
  useEffect(() => {
    News()
      .then((res) => {
        setNews(res.data);
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this strategy?");
    if (confirmDelete) {
      removeStrategy(id);
      setStrategies(getStrategies());
    }
  };

  const renderAddStrategyBtn = () => (
    <Link to="/strategy/add">
      <Button variant="outlined" color="primary">
        Add Strategy
      </Button>
    </Link>
  );

  const renderHeader = () => (
    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
      <Grid item>
        <Header title="Strategies" subtitle="Add/View strategies for your portfolio" />
      </Grid>
      <Grid item>
        {renderAddStrategyBtn()}
      </Grid>
    </Grid>
  );

  const renderStrategies = () => (
    <Box mt={2}>
      {strategies.map(strategy => (
        <Box
          key={strategy.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="subtitle1">{strategy.title} ({strategy.id})</Typography>
            <Typography variant="body2">{strategy.body}</Typography>
          </Box>
          <Button color="error" variant="contained" onClick={() => handleDelete(strategy.id)}>
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );

  const renderNoStrategies = () => (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <Typography variant="h4">No strategies found!</Typography>
    </Box>
  );

  const renderNews = () => (
    <Box mt={4}>
      {isLoading ? (
        <Typography variant="h6">Loading news...</Typography>
      ) : (
        news.length > 0 ? (
          <Grid container spacing={3}>
            {news.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box border="1px solid lightgray" borderRadius={1} overflow="hidden">
                  <img
                    src={item.image}
                    alt={item.headline}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Box padding={2}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.headline}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.source}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {item.summary}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={item.url}
                      target="_blank"
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2">No news available.</Typography>
        )
      )}
    </Box>
  );

  return (
    <Container>
      {renderHeader()}
      {strategies && strategies.length > 0 ? renderStrategies() : renderNoStrategies()}
      {renderNews()}
    </Container>
  );
};

export default ViewStrategy;
