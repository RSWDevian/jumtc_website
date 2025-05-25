//? front side code for the members page
"use client"
import CardComponent from "./cardComponent";
import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function MembersPage() {

  const theme = useTheme();

  const members = [
    {
      name: "Saptarshi Maity",
      role: "Secretary",
      image: "/demopics/profileDemo.jpeg",
    }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
        padding: "100px 10px",
      }}
    >
      {members.map((member, index) => (
        <CardComponent
          key={index}
          name={member.name}
          role={member.role}
          image={member.image}
        />
      ))}
    </Box>
  );
}