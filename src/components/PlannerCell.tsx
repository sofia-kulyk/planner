import { Card, Box, Typography, Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { TTask } from "../types";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};
const StyledCard = styled(Card)({
  width: "120px",
  height: "120px",
  backgroundColor: "#fff699",
  position: "relative",
  margin: "5px",
});
const StyledBox = styled(Box)({
  width: "30px",
  borderRadius: "5px",
  backgroundColor: "#f5ce40",
  position: "absolute",
  left: "75%",
  color: "white",
});
const StyledTypography = styled(Typography)({
  lineHeight: "15px",
  marginBottom: "5px",
  textOverflow: "ellipsis",
  whiteSpace: "wrap",
  overflow: "hidden",
  color: "#5d5e5e",
});

type Props = {
  counter: number | null;
  handleClick: () => void;
  value: TTask[] | [];
};

const PlannerCell: React.FC<Props> = ({ handleClick, counter, value }) => {
  return (
    <motion.div variants={item}>
      <StyledCard onClick={handleClick}>
        <StyledBox>{counter}</StyledBox>
        <Box
          sx={{
            maxHeight: "300px",
            overflow: "hidden",
            margin: "25px 10px 0px 10px ",
          }}
        >
          {value.map((item, index) => {
            return (
              <StyledTypography variant="body2" key={index}>
                {item.title}
              </StyledTypography>
            );
          })}
        </Box>
        {value.length > 0 && (
          <Button
            size="small"
            sx={{
              "&:focus": {
                outline: "none",
              },
            }}
          >
            Show more...
          </Button>
        )}
      </StyledCard>
    </motion.div>
  );
};
export default PlannerCell;
