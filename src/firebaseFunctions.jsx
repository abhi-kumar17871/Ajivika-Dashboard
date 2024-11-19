// Fetch all workers dynamically from the Firebase database
import { ref, onValue, push, update } from "firebase/database";
import database from "./firebase";

export const fetchWorkers = (setWorkers) => {
  const workersRef = ref(database, "nodes");
  onValue(workersRef, (snapshot) => {
    const workersData = snapshot.val();
    setWorkers(workersData || {});
  });
};

export const addWorkerNode = () => {
  const newWorkerKey = `worker_${Date.now()}`; // Use timestamp for unique IDs
  const workerRef = ref(database, `nodes/${newWorkerKey}`);
  update(workerRef, {
    button_state: false,
    sensor_data: {},
  });
};