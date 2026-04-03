import React, { useContext, useState } from "react";
import pen from "../assets/Pen.svg";
import { TaskContext } from "../context/TasksContext";
import UpdateModal from "./UpdateModal";
import SuccessModal from "./SuccessModal";
import CreateModal from "../components/CreateModal";

const Carousel = () => {
  const { tasks = [], getStatusLabel } = useContext(TaskContext);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
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
          <div className="flex flex-col py-6 px-6">
            <p className="mt-4 text-sm font-medium">No Task in Progress yet</p>

            <button
            onClick={() => setShowModal1(true)}
              type="button"
              className="mt-4 w-[7.5rem] inline-flex items-center gap-2 rounded-full bg-[#77C2FF] px-4 py-2 text-xs font-medium text-black shadow-md shadow-black border border-black"
            >
              Create new task
            </button>
          </div>
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
      {showModal1 && (
        <div className="fixed overflow-y-auto inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <CreateModal
            closeModal={() => setShowModal1(false)}
            openNextModal={() => setShowModal3(true)}
          />
        </div>
      )}
      {showModal3 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <SuccessModal closeModal={() => setShowModal3(false)} />
        </div>
      )}
    </div>
  );
};

export default Carousel;
