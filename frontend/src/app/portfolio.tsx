import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { PortfolioMarketCard } from "../components/PortfolioMarketCard";
import { useData } from "../context/DataContext";
import { Box, Grid, Typography } from "@mui/material";
import { MarketProps, QuestionsProps } from "@/types";

const Portfolio = () => {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<QuestionsProps[]>([]);
  const [openPositions, setOpenPositions] = useState<number>(0);

  const getMarkets = useCallback(async () => {
    var totalQuestions = await polymarket.methods
      .totalQuestions()
      .call({ from: account });
    for (var i = 0; i < totalQuestions; i++) {
      var questions = await polymarket.methods
        .questions(i)
        .call({ from: account });
      allQuestions.push({
        id: questions.id,
        title: questions.question,
        imageHash: questions.creatorImageHash,
        totalAmount: questions.totalAmount,
        totalYes: questions.totalYesAmount,
        totalNo: questions.totalNoAmount,
        hasResolved: questions.eventCompleted,
        endTimestamp: questions.endTimestamp,
      });
    }

    var dataArray: MarketProps[] = [];
    var totalPortValue = 0;
    for (var i = 0; i < totalQuestions; i++) {
      var data = await polymarket.methods
        .getGraphData(i)
        .call({ from: account });
      data["0"].forEach((item: any) => {
        if (item[0] == account) {
          dataArray.push({
            id: i.toString(),
            userYes: item[1].toString(),
            timestamp: item[2].toString(),
          });
          totalPortValue += parseInt(item[1]);
        }
      });
      data["1"].forEach((item: any) => {
        if (item[0] == account) {
          dataArray.push({
            id: i.toString(),
            userNo: item[1].toString(),
            timestamp: item[2].toString(),
          });
          totalPortValue += parseInt(item[1]);
        }
      });
    }
    setPortfolioValue(totalPortValue);
    for (var i = 0; i < dataArray.length; i++) {
      var question = allQuestions.find((item) => item.id == dataArray[i].id);
      dataArray[i].title = question!.title;
      dataArray[i].imageHash = question!.imageHash;
      dataArray[i].totalAmount = question!.totalAmount;
      dataArray[i].totalYes = question!.totalYes;
      dataArray[i].totalNo = question!.totalNo!;
      dataArray[i].hasResolved = question!.hasResolved;
      dataArray[i].endTimestamp = question!.endTimestamp;
    }
    setMarkets(dataArray);
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) {
        getMarkets();
      }
    });
  }, [loading]);

  return (
    <Box>
      <main>
        <Grid>
          <Box sx={{ paddingTop: 1, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                padding: 4,
                backgroundColor: "blue.700",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography color="white" sx={{ opacity: 0.5 }}>
                  Portfolio Value
                </Typography>
                <Typography
                  variant="h3"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  {Web3.utils.fromWei(portfolioValue.toString())} Para
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" sx={{ my: 3, fontWeight: "bold" }}>
              Your Market Positions
            </Typography>
            {markets.map((market) => (
              <PortfolioMarketCard
                id={market.id}
                title={market.title!}
                imageHash={market.imageHash!}
                totalAmount={market.totalAmount!}
                totalYes={market.totalYes!}
                totalNo={market.totalNo!}
                userYes={market.userYes!}
                userNo={market.userNo!}
                key={market.id!}
                hasResolved={market.hasResolved!}
                timestamp={market.timestamp!}
                endTimestamp={market.endTimestamp!}
              />
            ))}
          </Box>
        </Grid>
      </main>
    </Box>
  );
};

export default Portfolio;
