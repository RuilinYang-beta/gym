import React, { useEffect, useState } from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import HorizontalScrollbar from "./HorizontalScrollbar";
import {
  exerciseOptions,
  fetchData,
  exerciseUrlBase,
} from "../utils/fetchData";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  // populate body part list  in the horizontal scroll bar
  // after init render
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        `${exerciseUrlBase}/exercises/bodyPartList`,
        exerciseOptions
      );

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  // handle user click search button
  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        `${exerciseUrlBase}/exercises`,
        exerciseOptions
      );

      const searchedExercises = exerciseData.filter(
        (exercise) =>
          exercise.bodyPart.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      {/* some words */}
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      {/* search input and button */}
      <Box position="relative" mb="72px">
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          height="76px"
          placeholder="Search"
          type="text"
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: {
              lg: "800px",
              xs: "100%",
            },
            backgroundColor: "#ffffff",
            borderRadius: "40px",
          }}
        ></TextField>
        <Button
          className="search-btn"
          onClick={handleSearch}
          sx={{
            bgcolor: "#ff2625",
            color: "#ffffff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: 0,
          }}
        >
          Search
        </Button>
      </Box>
      {/* body part list */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          p: "20px",
        }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts={true}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
