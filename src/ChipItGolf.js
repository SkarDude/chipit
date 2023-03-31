import React, { useState } from "react";
import styles from "./ChipItGolf.module.css";

const ChipItGolf = () => {
  const [totalDistance, setTotalDistance] = useState(10);
  const [carryDistance, setCarryDistance] = useState(2);
  const [greenSpeedValue, setGreenSpeedValue] = useState(50);
  const [pinPositionValue, setPinPositionValue] = useState(50);

  const calculateClub = () => {
    let adjustedDistance = totalDistance;


    if (pinPosition === "uphill") {
      adjustedDistance += 1;
    } else if (pinPosition === "downhill") {
      adjustedDistance -= 2.5;
    }

    if (greenSpeed === "slow") {
      adjustedDistance += 1;
    } else if (greenSpeed === "fast") {
      adjustedDistance -= 3;
    }

    const ratio = Math.round(adjustedDistance / carryDistance);
    const clubSelection = 12 - ratio;

    const clubMap = {
      12: "Sand Wedge",
      11: "Gap Wedge",
      10: "Pitching Wedge",
      9: "9 Iron",
      8: "8 Iron",
      7: "7 Iron",
      6: "6 Iron",
      5: "5 Iron"
    };

    return totalDistance < carryDistance
      ? "Calm down hulk"
      : clubSelection < 5
        ? "Add more carry distance to the shot selection"
        : !(clubMap[clubSelection])
          ? "Putter"
          : clubMap[clubSelection];
  };

  const getGreenSpeedLabel = (value) => {
    if (value < 33) {
      return "slow";
    } else if (value > 66) {
      return "fast";
    } else {
      return "normal";
    }
  };

  const greenSpeed = getGreenSpeedLabel(greenSpeedValue);

  const getPinPositionLabel = (value) => {
    if (value < 45) {
      return "downhill";
    } else if (value > 55) {
      return "uphill";
    } else {
      return "level";
    }
  };

  const pinPosition = getPinPositionLabel(pinPositionValue);


  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>ChipIt.Golf</h1>
        <img
          src="./info.png"
          alt="Info Icon"
          className={styles.infoIcon}
        />
        <div className={styles.infoTooltip}>
          Created to help with bump n run calculations. Practice those low
          lofted carry shots as best as possible and use this calculator to
          give yourself more 6' putts.
        </div>
      </div>


      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          Total Distance: {totalDistance} yards
        </label>
        <input
          className={styles.rangeSlider}
          style={{ "--value": `${(totalDistance / 26) * 100}%` }}
          type="range"
          min="1"
          max="25"
          value={totalDistance}
          onChange={(e) => setTotalDistance(parseInt(e.target.value))}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          Carry Distance: {carryDistance} yards
        </label>
        <input
          className={styles.rangeSlider}
          style={{ "--value": `${((carryDistance / 20) * 100)-1}%` }}
          type="range"
          min="1"
          max="20"
          value={carryDistance}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (newValue <= totalDistance) {
              setCarryDistance(newValue);
            }
          }}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          Green Speed: {greenSpeed}
        </label>
        <input
          className={styles.rangeSlider}
          style={{ "--value": `${greenSpeedValue}%` }}
          type="range"
          min="0"
          max="100"
          value={greenSpeedValue}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            setGreenSpeedValue(newValue);
          }}
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          Pin Position: {pinPosition}
        </label>
        <input
          className={styles.rangeSlider}
          style={{ "--value": `${pinPositionValue}%` }}
          type="range"
          min="0"
          max="100"
          value={pinPositionValue}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            setPinPositionValue(newValue);
          }}
        />
      </div>

      <h2>Club Selection: {calculateClub()}</h2>
    </div>
  );
};

export default ChipItGolf;
