import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else {
          toast.error(error?.data?.message || "something went wrong");
        }
      }
    });
  }, [errors]);
};

export const useAsyncMutation = (mutationHook) => {
  // console.log("remove member")
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating Data...");

    try {
      const res = await mutate(...args);
      if (res?.data) {
        // console.log("Request sent successfully");
        toast.success(res?.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Smething went wrong.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log("hook error")
      toast.error("something went wrong.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};

export const useSocketEvents = (socket, handler) => {
  useEffect(() => {
    Object.entries(handler).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handler).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handler]);
};
