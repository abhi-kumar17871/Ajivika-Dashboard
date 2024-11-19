import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import ModalSensor from '../components/ModalSensor';
import AddNodeModal from '../components/AddNodeModal';

const HomePage = () => {
  const [workers, setWorkers] = useState([]); // List of worker nodes
  const navigate = useNavigate();
  const [isModalSensorOpen, setIsModalSensorOpen] = useState(false);
  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState(false);
  const [thresholdTemperature, setThresholdTemperature] = useState(0);
  const [thresholdHumidity, setThresholdHumidity] = useState(0);
  const [LPGThreshold, setLPGThreshold] = useState(0);

  // Fetch worker nodes from Firebase
  useEffect(() => {
    const workersRef = ref(db, "/nodes/");
    onValue(workersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const workerIds = Object.keys(data); // Get all worker node IDs
        setWorkers(workerIds);
      }
    });
  }, []);

  // Navigate to the worker dashboard
  const handleWorkerClick = (workerId) => {
    navigate(`/dashboard/${workerId}`);
  };

  const handleSaveModalSensor = (newValues) => {
    setThresholdTemperature(parseFloat(newValues.temperature));
    setThresholdHumidity(parseInt(newValues.humidity, 10));
    setLPGThreshold(parseFloat(newValues.LPG));

    const thresholdRef = ref(db, "/global_thresholds/");
    set(thresholdRef, {
      temperatureThreshold: parseFloat(newValues.temperature),
      humidityThreshold: parseInt(newValues.humidity, 10),
      LPGThreshold: parseFloat(newValues.LPG),
    });
  };

  const handleSaveAddNode = (newNode) => {
    const nodeId = `worker_${newNode.nodeId}`;
    const nodeRef = ref(db, `/nodes/${nodeId}`);
    set(nodeRef, { nodeId: nodeId })
      .then(() => {
        console.log(`Node ${nodeId} created successfully in Firebase`);
      })
      .catch((error) => {
        console.error("Error creating node: ", error);
      });
  };

  const handleAddNodeModal = () => setIsAddNodeModalOpen(true);
  const handleCloseAddNodeModal = () => setIsAddNodeModalOpen(false);
  const handleModalSensor = () => setIsModalSensorOpen(true);
  const handleCloseModalSensor = () => setIsModalSensorOpen(false);

  return (
    <div className="mt-2 pt-10 bg-gray-200 min-h-screen ">
      <h1 className="text-4xl font-bold text-center mb-6">CONTROL AREA</h1>
      {/* Control Area Section */}
      <div className="flex justify-center">
        <div className="flex w-full max-w-6xl justify-center items-center mt-10 overflow-hidden">
          {/* Left Column: Buttons */}
          <div className="flex flex-col p-5 w-1/2 space-y-6 bg-gray-200">
            <button
              onClick={handleModalSensor}
              className="border border-black p-4 w-full text-white bg-black rounded-lg shadow-md hover:bg-gray-800 hover:shadow-xl transition-all"
            >
              Adjust Parameters
            </button>

            <button
              onClick={handleAddNodeModal}
              className="border border-black p-4 w-full text-white bg-black rounded-lg shadow-md hover:bg-gray-800 hover:shadow-xl transition-all"
            >
              Add New Node
            </button>
          </div>

          {/* Right Column: Worker Buttons */}
          <div className="flex flex-col p-5 w-2/3 space-y-6 overflow-y-auto">
            {workers.map((workerId) => (
              <button
                key={workerId}
                onClick={() => handleWorkerClick(workerId)}
                className="border border-gray-300 p-4 w-full text-black bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-xl transition-all"
              >
                {workerId}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Modal for Sensor Adjustment */}
      {isModalSensorOpen && (
        <ModalSensor
          isOpen={isModalSensorOpen}
          onClose={handleCloseModalSensor}
          onSave={handleSaveModalSensor}
          currentValues={{
            temperature: thresholdTemperature || 0,
            humidity: thresholdHumidity || 0,
            LPG: LPGThreshold || 0,
          }}
        />
      )}

      {/* Modal for Adding Node */}
      {isAddNodeModalOpen && (
        <AddNodeModal
          isOpen={isAddNodeModalOpen}
          onClose={handleCloseAddNodeModal}
          onSave={handleSaveAddNode}
        />
      )}
    </div>
  );
};

export default HomePage;
