import React from "react";
import Layout from "../components/Layout/Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading";
import { Link, useParams } from "react-router-dom";
import api from "../util/api";
import { toast } from "react-toastify";

const TaskDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = React.useState("");
  const [taskStatus, setTaskStatus] = React.useState("");
  const queryClient = useQueryClient();
  const fetchTaskDetail = async () => {
    try {
      const res = await (await api()).get("/task/find/" + id);

      if (res.status !== 200) {
        throw new Error("Failed to fetch task detail");
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching task detail:", error);
      throw error;
    }
  };

  const postComment = async () => {
    try {
      if (!comment.trim()) {
        toast.error("Comment cannot be empty");
        return;
      }

      const res = await (
        await api()
      ).post("/comment/add", {
        taskId: id,
        userId: localStorage.getItem("id"),
        comment: comment,
      });

      console.log("API Response:", res);

      if (!res || !res.data) {
        throw new Error("Failed to post comment");
      }

      return res.data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  };

  const fetchCommentTaskDetail = async () => {
    try {
      const res = await (await api()).get("/task/find/" + id);
      if (res.status !== 200) {
        throw new Error("Failed to fetch task detail");
      }
      return res.data;
    } catch (error) {
      console.error("Error fetching task detail:", error);
      throw error;
    }
  };

  const { data: Comment, isLoading: CommentLoad } = useQuery({
    queryKey: ["taskDetailComment"],
    queryFn: fetchCommentTaskDetail,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onError: (error) => {
      console.error("Error fetching task detail:", error);
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["taskDetail"],
    queryFn: fetchTaskDetail,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error) => {
      console.error("Error fetching task detail:", error);
    },
  });

  const { mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setComment("");
      queryClient.invalidateQueries({
        queryKey: ["taskDetailComment"],
      });
    },
  });

  const updateTaskStatus = async () => {
    try {
      const res = await (
        await api()
      ).put(`/task/update/${id}`, {
        status: taskStatus,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update task status");
      }

      return res.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  };

  const { mutate: updateTask } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      toast.success("Task status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["taskDetail"],
      });
    },
    onError: (error) => {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    },
  });

  const handleCommentSubmit = (e) => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    e.preventDefault();
    mutate();
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setTaskStatus(newStatus);
    updateTask(newStatus);
  };
  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="min-h-screen w-screen p-10">
        <h1 className="text-2xl font-bold hover:underline">
          <Link to="/tasks">
            <span className="text-white hover:underline">
              Böyle bir data yok Geri Dön
            </span>
          </Link>
        </h1>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen w-screen p-10">
        <div className="text-2xl flex gap-2 items-center font-bold hover:underline">
          <h1>Task Detail</h1>
          <div className="bg-transparent shadow-lg rounded-lg p-5">
            <select
              className="w-full  p-2 rounded-lg  text-white "
              value={data.status}
              onChange={handleStatusChange}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="w-full h-full flex justify-between items-start gap-5 mt-5">
          <div className="w-1/2 flex flex-col gap-5">
            <div className="h-auto bg-transparent shadow-lg border border-[#272729] rounded-lg p-5">
              {data?.title && (
                <h2 className="text-xl font-bold text-white">{data.title}</h2>
              )}
            </div>
            <div className="h-auto bg-transparent shadow-lg border border-[#272729] rounded-lg p-5">
              {data?.description && (
                <span className="text-md font-bold text-white">
                  {data?.description}
                </span>
              )}
            </div>
          </div>

          <div className="w-1/2 h-auto bg-transparent shadow-lg border border-[#272729] rounded-lg p-5">
            <span className="text-lg font-bold text-white">Comments</span>
            <div className="flex flex-col gap-2 mt-2">
              {data?.comments.length > 0 ? (
                Comment.comments?.map((comment, index) => (
                  <div key={index} className="bg-[#272729] p-3 rounded-lg">
                    <span className="flex gap-2 text-white">
                      <span className="font-bold text-md">
                        {comment.name + ":"}
                      </span>
                      <span className="text-sm text-gray-400">
                        {comment.comment}
                      </span>
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-white">No comments yet</span>
              )}

              <div className="mt-12">
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="w-full p-2 rounded-lg bg-[#272729] text-white"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="mt-2 bg-[#272729] text-white px-4 py-2 m rounded-lg"
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetail;
