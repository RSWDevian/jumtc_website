//? Card component for displaying the members of mechatronics club
"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function CardComponent({ name, role, image }) {
  return (
    <Card
      sx={{
        width:250,
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: "16px",
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      {/* Member Image */}
      <CardMedia
        component="img"
        height="200"
        image={image} // Pass the image URL as a prop
        alt={`${name}'s image`}
      />

      {/* Member Details */}
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {name} {/* Member's name */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role} {/* Member's role */}
        </Typography>
      </CardContent>
    </Card>
  );
}