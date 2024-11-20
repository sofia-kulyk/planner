import {
  Box,
  Button,
  CardHeader,
  styled,
  ThemeProvider,
  Card,
  CardContent,
} from "@mui/material";
import "./App.css";
import PlannerCell from "./components/PlannerCell";
import React, { useEffect, useMemo, useState } from "react";
import PlansModal from "./components/Modal/PlansModal";
import theme from "./theme";
import { monthNames } from "./constants";
import { motion } from "framer-motion";
import DaysOfWeek from "./components/DaysOfWeek";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { TTask } from "./types";
import { getUserTasks, tasksSliceAction } from "./store/tasksSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { dateSliceAction } from "./store/dateSlice";

const StyledButton = styled(Button)({
  "&:focus": {
    outline: "none",
  },
});
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const emptyMonth: [null | number][] = Array(5).fill(Array(7).fill(null));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const currentMonth = useAppSelector((state) => state.date.month);
  const year = useAppSelector((state) => state.date.year);

  useEffect(() => {
    dispatch(getUserTasks({ month: currentMonth, year }));
  }, [currentMonth, year, dispatch]);

  const handleOpen = (day: number | null) => {
    setOpen(true);
    setSelectedDay(day);
  };
  const handleClose = () => {
    setOpen(false);
    setError("");
    dispatch(tasksSliceAction.clearAddTaskError());
  };
  const nextMonthDate = new Date(year, currentMonth + 1, 0);
  const daysInMonth = nextMonthDate.getDate();

  const date = new Date(year, currentMonth, 1);
  const firstDayOfMonth = date.getDay();

  const month = useMemo(() => {
    let counter = 1;
    return emptyMonth.map((week, weekIndex) => {
      return week.map((day, dayIndex) => {
        if (counter > daysInMonth) {
          return day;
        }
        if (dayIndex === firstDayOfMonth && weekIndex === 0) {
          return counter++;
        }
        if (dayIndex > firstDayOfMonth || weekIndex > 0) {
          return counter++;
        }

        return day;
      });
    });
  }, [daysInMonth, firstDayOfMonth]);

  function handleArrowClick(arrowId: string) {
    if (arrowId === "next") {
      dispatch(dateSliceAction.setDate("next"));
    } else {
      dispatch(dateSliceAction.setDate("prev"));
    }
  }

  const tasksObject = useMemo(
    () =>
      tasks.reduce((accum: Record<string, TTask[]>, currentTask) => {
        const currentId = `${currentTask.day}/${currentTask.month}/${currentTask.year}`;
        if (accum[currentId]) {
          accum[currentId] = [...accum[currentId], currentTask];
        } else {
          accum[currentId] = [currentTask];
        }
        return accum;
      }, {}),
    [tasks]
  );

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: "1200px",
          minHeight: "830px",
          padding: "0 60px",
          boxSizing: "border-box",
        }}
      >
        <CardHeader title={`Planner for ${monthNames[currentMonth]} ${year}`} />
        <CardContent
          sx={{
            display: "flex",
          }}
        >
          <StyledButton onClick={() => handleArrowClick("")}>
            <NavigateBefore />
          </StyledButton>

          <Box>
            <DaysOfWeek />

            {month.map((week, weekIndex) => (
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                key={weekIndex}
              >
                <Box sx={{ display: "flex", margin: "5px" }}>
                  {week.map((day, index) => {
                    return (
                      <PlannerCell
                        key={index}
                        value={
                          tasksObject[`${day}/${currentMonth}/${year}`] || []
                        }
                        counter={day}
                        handleClick={() => {
                          if (day) {
                            handleOpen(day);
                            setSelectedPlanId(`${day}/${currentMonth}/${year}`);
                          }
                        }}
                      />
                    );
                  })}
                </Box>
              </motion.div>
            ))}
          </Box>

          <StyledButton onClick={() => handleArrowClick("next")}>
            <NavigateNext />
          </StyledButton>
          <PlansModal
            selectedDay={selectedDay}
            error={error}
            setError={setError}
            open={open}
            handleClose={handleClose}
            selectedPlan={tasksObject[selectedPlanId]}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default App;
