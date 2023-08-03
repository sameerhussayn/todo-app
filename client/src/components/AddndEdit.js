const AddndEdit = ({
  newTask,
  setNewTask,
  handleEnterKey,
  onClkHandler,
  isUpdate,
  newTaskDesc,
  setNewTaskDesc,
}) => {
  return (
    <>
      <div className="flex items-center w-full h-8 px-2  mt-2 text-sm font-medium rounded">
        <svg
          className="w-5 h-5 text-gray-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>

        <div className="flex flex-col gap-2 mt-6">
          <input
            className="flex-grow  ml-4 bg-transparent focus:outline-none font-medium"
            type="text"
            value={newTask}
            placeholder="add a new task"
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            onKeyDown={handleEnterKey}
          />
          {newTask && (
            <input
              className="flex-grow  ml-4 bg-transparent focus:outline-none text-xs text-gray-400"
              type="text"
              value={newTaskDesc}
              placeholder="add task description..."
              onChange={(e) => {
                setNewTaskDesc(e.target.value);
              }}
              onKeyDown={handleEnterKey}
            />
          )}
        </div>

        {newTask && (
          <button
            onClick={onClkHandler}
            class="flex-no-shrink p-1 border-2  rounded text-yellow-500 text-xs border-yellow-500  hover:text-black  hover:bg-yellow-500  hover:scale-110 "
          >
            {isUpdate ? "Update" : "Add Task"}
          </button>
        )}
      </div>
    </>
  );
};
export default AddndEdit;
