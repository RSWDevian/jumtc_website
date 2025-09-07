import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        console.log(res);
        if (res.ok) {
          const data = await res.json();
          setMembers(data);
        }
      } catch (err) {
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!members.length) {
    return (
      <Typography sx={{ color: "#fff", mt: 2, textAlign: "center" }}>
        No members found.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>
        Members List
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#23272f" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
              <TableCell sx={{ color: "#fff" }}>Department</TableCell>
              <TableCell sx={{ color: "#fff" }}>Position</TableCell>
              <TableCell sx={{ color: "#fff" }}>Excom</TableCell>
              <TableCell sx={{ color: "#fff" }}>Access</TableCell>
              <TableCell sx={{ color: "#fff" }}>LinkedIn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell sx={{ color: "#fff" }}>{member.id}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{member.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{member.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{member.phone}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {member.department}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{member.position}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{member.excom? "YES" : "NO"}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{member.access}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#90caf9" }}
                    >
                      Link
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MemberList;
