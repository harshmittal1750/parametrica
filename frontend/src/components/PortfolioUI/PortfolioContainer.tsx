import { Container, Grid, Box, Typography, Button } from "@mui/material";
import React from "react";

import TotalEarnings from "./TotalEarnings";
import OpenPositions from "./OpenPostions";
import LiquidityEarnings from "./LiquidityEarnings";
import LiquidityProvided from "./LiquidityProvided";

const PortfolioContainer = () => {
  return (
    <Box>
      <Grid container justifyContent={"space-around"}>
        <Grid item>
          {" "}
          <TotalEarnings />
        </Grid>
        <Grid item>
          {" "}
          <OpenPositions />
        </Grid>
        <Grid item>
          {" "}
          <LiquidityProvided />
        </Grid>
        <Grid item>
          {" "}
          <LiquidityEarnings />
        </Grid>
        {/* <Box
          boxShadow={1}
          borderRadius={3}
          width={"100%"}
          height={100}
          padding={2}
          my={2}
          sx={{
            backgroundImage:
              " linear-gradient(to right top, #1752f0, #5351ec, #7151e8, #8851e4, #9b51df)",
          }}
        >
          <Grid container>
            <Grid xl={3}>
              <Typography>Portfolio Value</Typography>
            </Grid>
            <Grid xl={5}>
              <Typography>USD Value</Typography>
            </Grid>
            <Grid xl={3}>
              <Box display={"flex"}>
                <Button variant="contained">Deposit</Button>
                <Button variant="outlined">Withdraw</Button>
              </Box>
            </Grid>
          </Grid>
        </Box> */}
      </Grid>
    </Box>
  );
};

export default PortfolioContainer;
