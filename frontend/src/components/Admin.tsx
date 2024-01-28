"use client";
import { useData } from "@/context/DataContext";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Container,
  Card,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

function Admin() {
  const projectId = process.env.NEXT_PUBLIC_THIRDWEB_ID;
  const projectSecretKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET;

  const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
  // console.log(authorization);

  const router = useRouter();
  const { polymarket, loadWeb3, account } = useData!();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const client = ipfsHttpClient({
  //   url: "https://ipfs.infura.io:5001/api/v0",
  //   headers: {
  //     authorization,
  //   },
  // });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageHash, setImageHash] = useState("");
  const [resolverUrl, setResolverUrl] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const { mutateAsync: upload } = useStorageUpload();

  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const added = await upload(file);
      setImageHash(added[0]);
      console.log(added[0]);
    } catch (uploadError) {
      setError("Failed to upload image.");
      console.log(uploadError);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        await loadWeb3();
      } catch (loadWeb3Error) {
        setError("Failed to load Web3.");
      }
    };

    if (!loading) {
      initWeb3();
    }
  }, [loading, loadWeb3]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await polymarket.methods
        .createQuestion(
          title,
          imageHash,
          description,
          resolverUrl,
          new Date(timestamp).getTime()
        )
        .send({ from: account });
      // setTitle("");
      // setDescription("");
      // setImageHash("");
      // setResolverUrl("");
      // setTimestamp(undefined);

      router.push("/");
    } catch (submitError) {
      setError("Failed to create market.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: any) => {
    setTimestamp(e.target.value);
  };
  // Upload files to IPFS

  // // Render files from IPFS
  // import { MediaRenderer } from "@thirdweb-dev/react";

  // function ThirdwebProvider() {
  // return (
  //     // Supported types: image, video, audio, 3d model, html
  //     <MediaRenderer src="ipfs://QmamvVM5kvsYjQJYs7x8LXKYGFkwtGvuRvqZsuzvpHmQq9/0" />
  // );
  // }

  return (
    <>
      <Head>
        <title>xParametric</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 5,
        }}
      >
        <Container maxWidth="lg">
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: 5, marginBottom: 5, width: "100%" }}
            onClick={() => router.push("/create/markets")}
          >
            See All Markets
          </Button>
          <Card>
            <Box
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                padding: 5,
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginTop: 4, fontWeight: "bold" }}
              >
                Add New Market
              </Typography>
              <TextField
                label="Market Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginTop: 3 }}
              />
              <TextField
                label="Market Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ marginTop: 3 }}
              />
              <FormControl fullWidth sx={{ marginTop: 3 }}>
                <InputLabel>Market Title Image</InputLabel>
                <input type="file" onChange={uploadImage} />
              </FormControl>
              <TextField
                label="Resolve URL"
                name="resolverUrl"
                value={resolverUrl}
                onChange={(e) => setResolverUrl(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginTop: 3 }}
              />
              {/* <DatePicker
                sx={{ marginTop: 3, width: "100%" }}
                value={timestamp}
                name="timestamp"
                onChange={handleDateChange}
              /> */}
              <TextField
                type="date"
                name="timestamp"
                value={timestamp}
                onChange={handleDateChange}
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: 3,
                }}
              />
              {loading ? (
                <Typography
                  textAlign="center"
                  variant="h6"
                  sx={{ paddingTop: 3, paddingBottom: 3, fontWeight: "bold" }}
                >
                  Loading...
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 5, width: "100%" }}
                  onClick={handleSubmit}
                >
                  Create Market
                </Button>
              )}
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default Admin;
