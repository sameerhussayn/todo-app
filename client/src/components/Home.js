import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TasksList from "./TasksList";
import AddndEdit from "./AddndEdit";
const url = "https://task-manager-m75j.onrender.com";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [newTask, setNewTask] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [editTask, setEditTask] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  function handleEnterKey(e) {
    if (e.key === "Enter" && newTask) {
      handleAddTask();
      setNewTask("");
      setTrigger((c) => !c);
    }
    if (e.key === "Enter" && editTask) {
      handleEdit();
    }
  }

  function handleEditChange(task) {
    try {
      setEditTask(task);
      setNewTask(task.taskName);
      setNewTaskDesc(task.taskDescription);
      setIsUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const token = localStorage.getItem("token");
      const updatedTask = { taskName: newTask, taskDescription: newTaskDesc };
      console.log(updatedTask);
      const { data } = await axios.put(
        url + "/api/task/edit/" + editTask._id,
        updatedTask,
        { headers: { token: token } }
      );
      if (data.success) {
        setEditTask([]);
        setTrigger((c) => !c);
        setIsUpdate(false);
        setNewTask("");
      }
    } catch (error) {
      console.log(error);
      setEditTask([]);
      setNewTask("");
      if (error.response.data.error) {
        alert(error.response.data.error[0].msg);
      } else if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Error!, Please try again.");
      }
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(url + "/api/task/delete/" + id, {
        headers: { token },
      });
      if (data.success) {
        setTrigger((c) => !c);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        alert(error.response.data.error[0].msg);
      } else if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Error!, Please try again.");
      }
    }
  }
  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        url + "/api/task/add",
        { taskName: newTask, taskDescription: newTaskDesc },
        { headers: { token } }
      );
      if (res.data.success) {
        setNewTask("");
        setNewTaskDesc("");
        setTrigger((c) => !c);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        alert(error.response.data.error[0].msg);
      } else if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Error!, Please try again.");
      }
    }
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please Login Again!");
          navigate("/");
        }
        const { data } = await axios.get(url + "/api/task/fetchall", {
          headers: { token },
        });
        console.log(data.tasks);
        setTasks(data.tasks);
      } catch (error) {
        console.log(error);
        if (error.response.data.error) {
          alert(error.response.data.error[0].msg);
        } else if (error.response.data.msg === "token expired") {
          alert("Session Expired! Please Login again");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Error!, Please try again.");
        }
      }
    }
    fetchTasks();
  }, [trigger]);

  return (
    <div className="flex items-center justify-center w-screen h-screen font-medium">
      <div className="flex flex-col flex-grow items-center justify-center bg-gray-900 min-h-full w-full">
        <div className="p-4 text-yellow-400">
          <h1 className="font-bold font-sans text-3xl"> Task Schedular ✍️</h1>
        </div>
        <div className=" h-auto p-8 min-w-[30%] bg-gray-800 rounded-lg shadow-lg  text-gray-200  ">
          <div className="flex items-center  mb-6">
            <svg
              className="h-8 w-8 text-indigo-500 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#faca39"
            >
              <path
                stroke="#faca39"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h4 className="font-semibold ml-3 text-lg text-[#E4AE0C]">
              {location.state?.name
                ? `${location.state.name}'s Tasks`
                : "Tasks list"}
            </h4>
          </div>

          <TasksList
            tasks={tasks}
            onEdit={handleEditChange}
            onDelete={handleDelete}
            taskStatus={taskCompleted}
            setTaskStatus={setTaskCompleted}
            setTrigger={setTrigger}
          />

          <AddndEdit
            newTask={newTask}
            setNewTask={setNewTask}
            newTaskDesc={newTaskDesc}
            setNewTaskDesc={setNewTaskDesc}
            onEnterKey={handleEnterKey}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            onClkHandler={isUpdate ? handleEdit : handleAddTask}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
