import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { TTask } from "../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  minHeight: 100,
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  border: "none",
  padding: 4,
  color: "black",
};
type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteTask: (id: string) => void;
  selectedTask: TTask | null;
  setIsOpen: (isOpen: boolean) => void;
};
export const DeleteModal: React.FC<Props> = ({
  isOpen,
  handleClose,
  handleDeleteTask,
  selectedTask,
  setIsOpen,
}) => {
  function handleDelete() {
    if (selectedTask) {
      handleDeleteTask(selectedTask.id);
    }
    setIsOpen(false);
  }
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{ textAlign: "center", marginBottom: "10px" }}
          >
            Do you want to delete this task?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "0 20px",
            }}
          >
            <Button
              sx={{
                width: "30px",
                marginTop: "5px",
                "&:focus": {
                  outline: "none",
                },
              }}
              variant="contained"
              onClick={() => handleDelete()}
            >
              Yes
            </Button>
            <Button
              sx={{
                marginLeft: "120px",
                width: "40px",
                marginTop: "5px",
                "&:focus": {
                  outline: "none",
                },
              }}
              variant="contained"
              color="secondary"
              onClick={handleClose}
            >
              No
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
