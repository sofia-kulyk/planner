import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { TTask } from "../../../types";
import { useAppDispatch } from "../../../hooks";
import { editUserTask } from "../../../store/tasksSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  minHeight: 200,
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  border: "none",
  padding: 4,
  color: "black",
};

type Props = {
  open: boolean;
  handleClose: () => void;
  setSelectedTask: (args: TTask | null) => void;
  selectedTask: TTask | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditModal: React.FC<Props> = ({
  open,
  handleClose,
  handleChange,
  selectedTask,
  setSelectedTask,
}) => {
  const dispatch = useAppDispatch();

  function handleClick(id: string) {
    // remove duplication logic Flag1(F_1)
    if (selectedTask) {
      dispatch(
        editUserTask({
          taskId: id,
          updatedTask: {
            title: selectedTask.title,
            description: selectedTask.description,
          },
        })
      );
    }
    handleClose();
    setSelectedTask(null);
  }

  return (
    <Modal open={open} onClose={handleClose}>
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
            Edit task
          </Typography>
          {/* {error && <StyledErrorBox>{error}</StyledErrorBox>} */}
          <TextField
            label="Title"
            margin="dense"
            size="small"
            name="title"
            value={selectedTask?.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            margin="dense"
            size="small"
            multiline
            rows="2"
            name="description"
            value={selectedTask?.description}
            onChange={handleChange}
          />
          <Button
            sx={{
              marginLeft: "120px",
              width: "30px",
              marginTop: "5px",
              "&:focus": {
                outline: "none",
              },
            }}
            variant="contained"
            onClick={() => {
              // F_1
              if (selectedTask) {
                handleClick(selectedTask.id);
              }
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
