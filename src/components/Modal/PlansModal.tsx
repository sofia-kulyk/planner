import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { TTask } from "../../types";
import { PlansModalTasks } from "./PlansModalTasks";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addUserTasks,
  deleteUserTask,
  tasksSliceAction,
} from "../../store/tasksSlice";
import { EditModal } from "./Menu/EditModal";
import { DeleteModal } from "./DeleteModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 350,
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 24,
  border: "none",
  padding: 4,
  color: "black",
};

type DefaultState = {
  title: string;
  description: string;
};
const defaultState = {
  title: "",
  description: "",
};

type Props = {
  open: boolean;
  handleClose: () => void;
  selectedPlan: TTask[] | [];
  setError: (param: string) => void;
  error: string;
  selectedDay: number | null;
};

const PlansModal: React.FC<Props> = ({
  handleClose,
  open,
  selectedPlan,
  selectedDay,
}) => {
  const dispatch = useAppDispatch();
  const { month, year } = useAppSelector((state) => state.date);
  const { error } = useAppSelector((state) => state.tasks);

  const [newTask, setNewTask] = useState<DefaultState>(defaultState);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const changeEditModalState = () => {
    if (openEditModal) {
      setOpenEditModal(false);
    } else {
      setOpenEditModal(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleChangeNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleChangeSelectedTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedTask((prev) => {
      if (prev) {
        return {
          ...prev,
          [event.target.name]: event.target.value,
        };
      }
      return prev;
    });
  };

  const handleSelectTask = (taskId: string) => {
    const foundTask = selectedPlan.find((task) => task.id === taskId);
    if (foundTask) {
      setSelectedTask(foundTask);
    }
  };
  function handleAdd() {
    dispatch(
      addUserTasks({
        title: newTask.title,
        description: newTask.description,
        month,
        year,
        day: selectedDay,
      })
    );
    setNewTask({ title: "", description: "" });
    if (error) {
      dispatch(tasksSliceAction.clearAddTaskError());
    }
  }
  function handleDelete(id: string) {
    dispatch(deleteUserTask(id));
  }
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setNewTask({ title: "", description: "" });
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              paddingBottom: "40px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              Your Tasks:
            </Typography>
            <Box sx={{ overflow: "auto", maxHeight: "300px" }}>
              <PlansModalTasks
                setIsOpenDeleteModal={setIsOpenDeleteModal}
                handleSelectTask={handleSelectTask}
                selectedPlan={selectedPlan}
                openEditModal={changeEditModalState}
              />
            </Box>
          </Box>
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
              Add task for a day
            </Typography>
            {error && (
              <Box
                sx={{
                  backgroundColor: "pink",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {error}
              </Box>
            )}

            <TextField
              label="Title"
              margin="dense"
              size="small"
              name="title"
              value={newTask.title}
              onChange={handleChangeNewTask}
            />
            <TextField
              label="Description"
              margin="dense"
              size="small"
              multiline
              rows="2"
              name="description"
              value={newTask.description}
              onChange={handleChangeNewTask}
            />
            <Button
              sx={{
                marginLeft: "320px",
                marginTop: "5px",
                "&:focus": {
                  outline: "none",
                },
              }}
              variant="contained"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <EditModal
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
        open={openEditModal}
        handleClose={changeEditModalState}
        handleChange={handleChangeSelectedTask}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDeleteTask={handleDelete}
        selectedTask={selectedTask}
        setIsOpen={setIsOpenDeleteModal}
      />
    </>
  );
};
export default PlansModal;
