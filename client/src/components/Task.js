import axios from "axios";
const url = "https://task-manager-m75j.onrender.com";

const Task = ({
  id,
  status,
  name,
  onEdit,
  onDelete,
  task,
  description,
  setTrigger,
}) => {
  async function onStatusChangeHandler() {
    try {
      const token = localStorage.getItem("token");
      const updatedTask = {
        taskName: name,
        taskDescription: description,
        isCompleted: !status,
      };
      console.log(updatedTask);
      await axios.put(url + "/api/task/edit/" + id, updatedTask, {
        headers: { token: token },
      });
      setTrigger((c) => !c);
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
  return (
    <div className="flex items-center" key={id}>
      <input className="hidden" type="checkbox" id={id} checked={status} />
      <label
        className="flex items-center h-10 px-2 w-full rounded cursor-pointer hover:bg-gray-900"
        htmlFor={name}
        onClick={onStatusChangeHandler}
      >
        <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <div className="flex flex-col">
          <span className="ml-4 text-sm ">{name}</span>
          <span className="ml-6 text-xs text-gray-400 max-w-[300px]">
            {description}
          </span>
        </div>
      </label>

      <button className=" h-6 px-2 " onClick={() => onEdit(task)}>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:scale-110"
        >
          <path
            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
            stroke="#faca39"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
            stroke="#faca39"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button className=" h-6 px-2 " onClick={() => onDelete(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
            fill="rgba(250,202,57,1)"
          ></path>
        </svg>
      </button>
    </div>
  );
};
export default Task;
