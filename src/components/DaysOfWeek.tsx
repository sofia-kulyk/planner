import { Box, Typography } from "@mui/material";
import { daysOfWeek } from "../constants";

export default function DaysOfWeek() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 5px",
      }}
    >
      {daysOfWeek.map((item, index) => (
        <Typography key={index} sx={{ width: "14%", textAlign: "center" }}>
          {item}
        </Typography>
      ))}
    </Box>
  );
}
