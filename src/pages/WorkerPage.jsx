import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import LineGraph from "../components/LineGraph";
import Speedometer from "../components/Speedometer";
import GasConcentrationBar from "../components/GasConcentrationBar";
import { useParams } from "react-router-dom";

const SensorData = () => {
  const { workerId } = useParams(); // Get the worker ID from the route
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [pastTemperatures, setPastTemperatures] = useState([]);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  const [pastHumidity, setPastHumidity] = useState([]);
  const [currentLPG, setCurrentLPG] = useState(null);
  const [pastLPG, setPastLPG] = useState([]);
  const [currentCO, setCurrentCO] = useState(null);
  const [pastCO, setPastCO] = useState([]);
  const [currentAir, setCurrentAir] = useState(null);
  const [pastAir, setPastAir] = useState([]);
  const [dateLabel, setDateLabel] = useState("");
  const [concentration, setConcentration] = useState();

  // Fetch worker-specific data
  useEffect(() => {
    if (workerId) {
      const sensorRef = ref(db, `/nodes/${workerId}/sensor_data`);
      onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tempArray = Object.values(data).slice(-5);
          const latestRecord = tempArray[tempArray.length - 1];
          setCurrentTemperature(latestRecord.temperature);
          setPastTemperatures(tempArray);
          setCurrentHumidity(latestRecord.humidity);
          setPastHumidity(tempArray);
          setCurrentLPG(latestRecord.LPG);
          setPastLPG(tempArray);
          setCurrentCO(latestRecord.CO);
          setPastCO(tempArray);
          setCurrentAir(latestRecord.air);
          setPastAir(tempArray);
          const latestTimestamp = latestRecord.timestamp;
          const [date] = latestTimestamp.split(" ");
          setDateLabel(date);
          setConcentration(latestRecord.concentration);
        }
      });
    }
  }, [workerId]);

  const handleAlertClick = () => {
    const buttonRef = ref(db, `/nodes/${workerId}/button_state`);
    set(buttonRef, true)
      .then(() => {
        console.log("Alert triggered, button state set to true");
      })
      .catch((error) => {
        console.error("Error setting button state: ", error);
      });
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 pt-10 grid-cols-1 font-semibold text-2xl">
        <div className="p-14">
          <div className="flex justify-center p-5 font-bold text-3xl border border-black">
            Worker Detail of: {workerId}
          </div>
          <div className="flex justify-center p-5 font-bold text-3xl border border-black">
            Current Concentration
          </div>
          <h2 className="p-2 border border-black">
            Temperature: {currentTemperature}°C
          </h2>
          <h2 className="p-2 border border-black">
            Humidity: {currentHumidity} %
          </h2>
          <h2 className="p-2 border border-black">
            Gas Concentration (relative to clean air)
          </h2>
          <h2 className="pl-10 p-2 border border-black">
            {" "}
            LPG: {currentLPG < 800 ? currentLPG : 800}
          </h2>
          <h2 className="pl-10 p-2 border border-black">
            Air Quality: {currentAir < 800 ? currentAir : 800}
          </h2>
          <h2 className="pl-10 p-2 border border-black">
            CO: {currentCO < 500 ? currentCO : 500}
          </h2>
          <div className="pt-10">
            <GasConcentrationBar concentration={concentration} />
          </div>
          <div className="pt-10">
            <div className="my-2">
              <button
                onClick={handleAlertClick}
                className="border border-black p-2 w-full text-white bg-black rounded-md"
              >
                ALERT THE WORKER
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1">
          <Speedometer
            label="Temperature (°C)"
            value={currentTemperature}
            maxValue={50}
          />
          <Speedometer label="Air Quality " value={currentAir} maxValue={500} />
          <Speedometer label="LPG Conc. " value={currentLPG} maxValue={500} />
          <Speedometer
            label="Carbon Monoxide Conc. "
            value={currentCO}
            maxValue={200}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 px-20 pb-10">
        <div className="p-2">
          <LineGraph
            pastValues={pastTemperatures}
            dateLabel={dateLabel}
            label="Temperature (°C)"
            type="temperature"
          />
        </div>
        <div className="p-2">
          <LineGraph
            pastValues={pastAir}
            dateLabel={dateLabel}
            label="Air Quality "
            type="air"
          />
        </div>
        <div className="p-2">
          <LineGraph
            pastValues={pastLPG}
            dateLabel={dateLabel}
            label="LPG Concentration "
            type="LPG"
          />
        </div>
        <div className="p-2">
          <LineGraph
            pastValues={pastCO}
            dateLabel={dateLabel}
            label="Carbon Monoxide Concentration "
            type="CO"
          />
        </div>
      </div>
    </div>
  );
};

export default SensorData;
