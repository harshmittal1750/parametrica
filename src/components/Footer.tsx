"use client";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "next/link";
import { Grid, Box, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color=" gray" align="center">
      {"Copyright © "}
      <Link style={{ textDecoration: "none", color: "gray" }} href={"/"}>
        Parametrica
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <Box
        sx={{ bgcolor: "primary.main", p: 6, color: "#ffffff", mt: 50 }}
        component="footer"
      >
        <Grid container>
          <Grid item md={3} xs={12}>
            <Link
              href={"/"}
              style={{
                textDecoration: "none",
                color: "primary.light",
              }}
            >
              <Typography
                variant="h2"
                component={"h1"}
                sx={{
                  textDecoration: "none",
                  color: "primary.light",
                  ":hover": {
                    color: "background.paper",
                  },
                }}
              >
                Parametrica
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3}>
            <Box>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "#222629" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Home
                </Typography>
              </Link>
            </Box>

            <Box>
              <Link
                href="https://docs.parametrica.dev/"
                style={{ textDecoration: "none", color: "#222629" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Documentation
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3}>
            <Box>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "#222629" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  About
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link
                href="mailhref:info@parametrica.dev"
                style={{ textDecoration: "none", color: "#222629" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    // textTransform: "unset",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Contact us
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} xl={3} sm={3} md={3}>
            <Box>
              <Box>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "#222629" }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.light",
                      ":hover": {
                        color: "background.paper",
                      },
                    }}
                  >
                    Follow us
                  </Typography>
                </Link>
              </Box>
              <Box display={"flex"}>
                <Box>
                  <Link
                    href="https://github.com/parametrica-desci/parametrica"
                    target={"_blank"}
                    style={{ textDecoration: "none", color: "#222629" }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "primary.light",
                        ":hover": {
                          color: "background.paper",
                        },
                      }}
                    >
                      {/* <GitHubIcon /> */}
                    </Typography>
                  </Link>
                </Box>
                <Box mx={1}>
                  <Link
                    href="/"
                    style={{ textDecoration: "none", color: "#222629" }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "primary.light",
                        ":hover": {
                          color: "background.paper",
                        },
                      }}
                    >
                      {/* <TwitterIcon /> */}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3}></Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Box mt={6}>
            <Copyright />
          </Box>
        </Grid>
      </Box>

      {/* End footer */}
    </div>
  );
};

export default Footer;
