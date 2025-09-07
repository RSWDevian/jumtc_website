//? admin page for jumtc core access
"use client";
//?importing important packages
import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Button, Grid, CircularProgress } from "@mui/material";
//? importing admin control pages
import Members from "./members/page";
// import Events from "./events/page";
// import Blogs from "./blogs/page";
// import Projects from "./projects/page";
// import Gallery from "./gallery/page";
// import Sponsors from "./sponsors/page";
// import Collaborations from "./collaborations/page";
// import Newsletters from "./newsletters/page";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  const buttons = [
    { label: "Manage Members", link: "/jumtc-core-access/members" },
    { label: "Manage Events" },
    { label: "Manage Blogs" },
    { label: "Manage Projects" },
    { label: "Manage Gallery" },
    { label: "Manage Sponsors" },
    { label: "Manage Collaborations" },
    { label: "Manage Newsletters" },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      p={4}
    >
      <Grid container spacing={2} justifyContent="center">
        {buttons.map((button, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button variant="contained" sx={{ padding: "20px" }} onClick={() => {
              if (button.link) {
                router.push(button.link);
              } else {
                alert("This feature is not implemented yet.");
              }
            }
            }>    
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" color="secondary" sx={{ mt: 4 }} onClick={() => signOut()}>
        Sign Out
      </Button>
    </Box>
  );
}
