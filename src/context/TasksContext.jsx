import { createContext, useState, useCallback } from "react";
import API from "../api/axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("");

  // ================= FETCH TASKS =================
  const fetchTasks = useCallback(async (pageNumber = 1, priority = "", status = null) => {
    try {
      setLoading(true);

      let url = `/api/tasks?page=${pageNumber}`;
      if (priority) url += `&priority=${priority}`;
      if (status !== null) url += `&status=${status}`; // numeric status

      const res = await API.get(url);

      setTasks(res.data.data || []);
      setTotalTasks(res.data.totalTasks || 0);
      setCompletedCount(res.data.completedCount || 0);
      setOngoingCount(res.data.ongoingCount || 0);

      setPage(res.data.page || 1);
      setTotalPages(res.data.pages || 1);
      setHasNextPage(res.data.hasNextPage || false);
      setHasPrevPage(res.data.hasPrevPage || false);

    } catch (error) {
      console.error("Fetch tasks error:", error.response?.data || error.message || error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= CREATE TASK =================
  const createTask = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("priority", data.priority);
      formData.append("status", data.status || 0);
      if (data.image) formData.append("image", data.image);

      await API.post("/api/tasks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchTasks(1, priorityFilter);
    } catch (error) {
      console.error("Create task error:", error.response?.data || error.message || error);
      throw error;
    }
  };

  // ================= UPDATE TASK =================
  const updateTask = async (id, data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("priority", data.priority);
      formData.append("status", data.status);
      if (data.image) formData.append("image", data.image);

      await API.put(`/api/tasks/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchTasks(page, priorityFilter);
    } catch (error) {
      console.error("Update task error:", error.response?.data || error.message || error);
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      await fetchTasks(page, priorityFilter);
    } catch (error) {
      console.error("Delete task error:", error.response?.data || error.message || error);
    }
  };

  // ================= STATUS HELPER =================
  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Not Started";
      case 25:
        return "Started";
      case 50:
        return "Halfway";
      case 75:
        return "Almost Done";
      case 100:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        totalTasks,
        completedCount,
        ongoingCount,
        page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        loading,
        priorityFilter,
        setPriorityFilter,
        setPage,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        getStatusLabel,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
