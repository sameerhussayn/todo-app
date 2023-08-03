import Task from "./Task";

const TasksList = ({
  tasks,
  onEdit,
  onDelete,
  isUpdated,
  setIsUpdated,
  setTrigger,
}) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          id={task._id}
          task={task}
          status={task.isCompleted}
          description={task.taskDescription}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          name={task.taskName}
          onEdit={onEdit}
          setTrigger={setTrigger}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
export default TasksList;
