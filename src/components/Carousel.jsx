import React, { useContext, useState } from "react";
import pen from "../assets/Pen.svg";
import { TaskContext } from "../context/TasksContext";
import UpdateModal from "./UpdateModal";
import SuccessModal from "./SuccessModal";

const Carousel = () => {
  const { tasks = [], getStatusLabel } = useContext(TaskContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="Carousel font-[Caveat] w-full">
      <h3 className="text-[30px] leading-[100px] font-bold">
        Tasks In Progress
      </h3>

      <div className=" carousel flex w-full overflow-x-auto scrollbar-hidden scroll-smooth gap-[33px]">
        {tasks && tasks.length > 0 ? (
          tasks
            .filter((task) => task && task.status >= 0 && task.status < 100)
            .map((task, index) => (
              <div
                key={task._id || index}
                className="flex flex-col w-[391px] gap-[17px] shadow-[0_4px_0_0_black] rounded-[22px] border-[1px] border-b-[4px]"
              >
                <div className="object-cover">
                  <img
                    src={task.image || "/default-image.png"}
                    alt=""
                    className="w-[391px] h-[159px] object-cover rounded-[22px]"
                  />
                </div>

                <div className="px-[22px] flex flex-col gap-[17px] py-[17px]">
                  <div className="flex justify-between">
                    <p className="leading-[20px] border-[1px] border-[#FF0000] rounded-[20px] text-[#FF0000] px-[10px] py-[4px]">
                      {task.priority}
                    </p>

                    {/* ✅ UPDATE CLICK */}
                    <img
                      src={pen}
                      alt=""
                      className="w-[24px] h-[24px] cursor-pointer"
                      onClick={() => {
                        setSelectedTask(task);
                        setShowUpdateModal(true);
                      }}
                    />
                  </div>

                  <p className="text-[22.5px] w-full font-semibold font-[Montserrat] tracking-[-3%] leading-[20px]">
                    {task.title}
                  </p>

                  <div className="flex gap-[4px] w-[347px] h-[28px]">
                    <div className="w-[304px] h-[26px] border-[1px] rounded-[170px]">
                      <div
                        className="bg-[#77C2FF] h-[26px] rounded-[170px]"
                        style={{ width: `${task.status || 0}%` }}
                      ></div>
                    </div>
                    <p className="font-md text-[20px] leading-[20px]">
                      {task.status || 0}% ({getStatusLabel(task.status)})
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>No tasks in progress</p>
        )}
      </div>

      {/* ✅ UPDATE MODAL */}
      {showUpdateModal && (
        <div className="fixed top-[100px] left-0 right-0 mx-auto z-50">
          <UpdateModal
            task={selectedTask}
            closeModal={() => setShowUpdateModal(false)}
            openNextModal={() => setShowSuccessModal(true)}
          />
        </div>
      )}

      {/* ✅ SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed top-[100px] left-0 right-0 mx-auto z-50">
          <SuccessModal closeModal={() => setShowSuccessModal(false)} />
        </div>
      )}
    </div>
  );
};

export default Carousel;
