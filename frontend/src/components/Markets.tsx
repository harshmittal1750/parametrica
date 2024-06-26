"use client";

import { useCallback, useEffect, useState } from "react";
import { MarketCard } from "../components/MarketCard";

import { useData } from "../context/DataContext";

import { MarketProps } from "../types/index";

import { Filter } from "./Filter";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Markets() {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getMarkets = useCallback(async () => {
    try {
      const totalQuestions = await polymarket.methods
        .totalQuestions()
        .call({ from: account });
      const dataArray: MarketProps[] = [];
      for (let i = 0; i < totalQuestions; i++) {
        const data = await polymarket.methods
          .questions(i)
          .call({ from: account });
        dataArray.push({
          id: data.id,
          title: data.question,
          imageHash: data.creatorImageHash,
          totalAmount: data.totalAmount,
          totalYes: data.totalYesAmount,
          totalNo: data.totalNoAmount,
        });
      }
      setMarkets(dataArray);
      console.log(dataArray, "dataArray");
    } catch (error) {
      console.error("Error fetching markets:", error);
      toast.error("Failed to fetch market data. Please try again later.");
    }
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarkets();
    });
  }, [loading]);

  const pathname = usePathname();

  const filteredMarkets = markets.filter((market) =>
    market.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="mb-8 flex items-center gap-8">
        {/* <SearchIcon className="text-gray-400" /> */}
        <input
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#5155a6] focus:outline-none transition duration-300 ease-in-out"
          type="search"
          name="q"
          placeholder="Search markets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between mb-12">
        {/* Replace <Filter /> with your component or implementation */}
        <Filter
          list={["All", "Climate", "Catastrophe"]}
          activeItem="All"
          category="Category"
          onChange={() => {}}
        />
        <Filter
          list={["Volume", "Newest", "Expiring"]}
          activeItem="Volume"
          category="Sort By"
          onChange={() => {}}
        />
      </div>

      {/* Uncomment for heading
    <h2 className="mb-4 text-2xl font-semibold">
      Markets
    </h2>
    */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {filteredMarkets.length === 0 ? (
          <div className="flex justify-center items-center col-span-2 w-full h-[50vh]">
            <svg
              aria-hidden="true"
              className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-[#5155a6]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          filteredMarkets.map((market) => (
            <div key={market.id} className="col-span-1 ">
              <MarketCard
                id={market.id}
                key={market.id}
                title={market?.title}
                totalAmount={market?.totalAmount}
                totalYes={market?.totalYes}
                totalNo={market?.totalNo}
                imageHash={market?.imageHash}
                userNo="0"
                userYes="0"
                timestamp="0"
                endTimestamp="0"
              />
            </div>
          ))
        )}
      </div>

      <div
        className={` ${
          filteredMarkets.length < 10 || pathname === "markets"
            ? "hidden"
            : "flex justify-center w-full"
        }`}
      >
        <Link href={"/markets"}>
          <Button>View All</Button>
        </Link>
      </div>
    </div>
  );
}

export default Markets;
