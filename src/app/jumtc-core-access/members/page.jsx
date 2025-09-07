//? Page to add, delete, promote, update and members of JUMTC
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//? importing the components
import MemberList from "./memberList";

//? Members form component
function MembersForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  //* State variable to store the details of the member
  const [formData, setFormData] = useState({
    year: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    department_roll: "",
    position: "",
    excom: "",
    linkedin: "",
    access: "",
    photo: "",
  });

  if (status === "loading") {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#181818",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session) return null;

  //* Function to handle chanfes in the controlled form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //* Function to handle the form submit of the membeers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("Form Data Submitted:", formData);
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Member details saved successfully!");
        setFormData({
          year: "",
          name: "",
          email: "",
          phone: "",
          department: "",
          department_roll: "",
          position: "",
          excom: "",
          linkedin: "",
          access: "",
          photo: "",
        });
      } else {
        alert("Failed to save member details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving member details.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#181818",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          margin: "auto",
          padding: "32px",
          bgcolor: "#23272f",
          borderRadius: "12px",
          boxShadow: 6,
          mt: 12,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
          Members Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                {field === "position" ? (
                  <TextField
                    select
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ style: { color: "#bbb" } }}
                    InputProps={{
                      style: { color: "#fff", background: "#23272f" },
                    }}
                  >
                    <MenuItem value="Hardware" sx={{ color: "#000" }}>
                      Hardware
                    </MenuItem>
                    <MenuItem value="Electronics" sx={{ color: "#000" }}>
                      Electronics
                    </MenuItem>
                    <MenuItem value="Software" sx={{ color: "#000" }}>
                      Software
                    </MenuItem>
                    <MenuItem value="Temporary" sx={{ color: "#000" }}>
                      Temporary
                    </MenuItem>
                  </TextField>
                ) : field === "access" ? (
                  <TextField
                    select
                    label="Access"
                    name="access"
                    value={formData.access}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ style: { color: "#bbb" } }}
                    InputProps={{
                      style: { color: "#fff", background: "#23272f" },
                    }}
                  >
                    <MenuItem value="admin" sx={{ color: "#000" }}>
                      Admin
                    </MenuItem>
                    <MenuItem value="not admin" sx={{ color: "#000" }}>
                      Not Admin
                    </MenuItem>
                  </TextField>
                ) : field === "excom" ? (
                  <TextField
                    select
                    label="Excom"
                    name="excom"
                    value={formData.excom}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ style: { color: "#bbb" } }}
                    InputProps={{
                      style: { color: "#fff", background: "#23272f" },
                    }}
                  >
                    <MenuItem value="Yes" sx={{ color: "#000" }}>
                      Yes
                    </MenuItem>
                    <MenuItem value="No" sx={{ color: "#000" }}>
                      No
                    </MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    fullWidth
                    required={field !== "linkedin"}
                    InputLabelProps={{ style: { color: "#bbb" } }}
                    InputProps={{
                      style: { color: "#fff", background: "#23272f" },
                    }}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  bgcolor: "#1e88e5",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  mt: 2,
                  "&:hover": {
                    bgcolor: "#1565c0",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <MemberList />
    </Box>
  );
}

export default MembersForm;
