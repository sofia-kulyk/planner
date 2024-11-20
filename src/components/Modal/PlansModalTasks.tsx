import React from "react";
import { TTask } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: " rgb(175, 210, 120)",
  padding: "5px",
  borderRadius: "10px",
  color: "white",
  margin: "5px",
  maxWidth: "400px",
});
type Props = {
  selectedPlan: TTask[] | [];
  handleSelectTask: (taskId: string) => void;
  openEditModal: () => void;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
};

export const PlansModalTasks: React.FC<Props> = ({
  selectedPlan,
  handleSelectTask,
  openEditModal,
  setIsOpenDeleteModal,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  function handleClose() {
    setAnchorEl(null);
  }
  function handleEdit() {
    openEditModal();
    setAnchorEl(null);
  }
  function handleDelete() {
    setIsOpenDeleteModal(true);
    setAnchorEl(null);
  }
  function handleClick(
    taskId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    handleSelectTask(taskId);
    setAnchorEl(event.currentTarget);
  }

  return (
    <>
      {selectedPlan ? (
        selectedPlan.map((task, index) => (
          <StyledBox key={index}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ minWidth: "150px", color: "#5d5e5e" }}
                >
                  Title:
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "10px",
                  }}
                  variant="body1"
                >
                  {task.title}
                </Typography>
              </Box>
              <Box sx={{ marginLeft: "20px" }}>
                <Typography
                  variant="h6"
                  sx={{ maxWidth: "150px", color: "#5d5e5e" }}
                >
                  Description:
                </Typography>
                <Typography variant="body1">{task.description}</Typography>
              </Box>
            </Box>
            <Button
              size="small"
              onClick={(event) => handleClick(task.id, event)}
              sx={{
                marginTop: "5px",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <MoreHorizIcon color="secondary" />
            </Button>
          </StyledBox>
        ))
      ) : (
        <p>No task found</p>
      )}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
          <DeleteIcon color="secondary" sx={{ marginLeft: "5px" }} />
        </MenuItem>
        <MenuItem onClick={() => handleEdit()}>
          Edit
          <EditIcon color="secondary" sx={{ marginLeft: "22px" }} />
        </MenuItem>
      </Menu>
    </>
  );
};
