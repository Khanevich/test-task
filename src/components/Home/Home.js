import React, { useEffect, useState, useCallback } from "react";
import "./Home.css";
import { Body } from "../Body/Body";
import { Footer } from "../Footer/Footer";

const initialData = [];

export function Home() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([...initialData]);

  const [actions, setActions] = useState([]);
  const [actionIndex, setActionIndex] = useState(-1);

  const [saveData, setSaveData] = useState([]);

  const header = [
    { id: "index", value: "Index", editable: false },
    { id: "name", value: "Name", editable: true },
    { id: "count", value: "Count", editable: true },
    { id: "remove", value: "", editable: false },
  ];

  const addAction = (id, value) => {
    const action = { id, value };
    if (actions.length - 1 !== actionIndex) {
      setActions([...actions.slice(0, actionIndex), action]);
    } else {
      setActions([...actions, action]);
    }

    setActionIndex(actionIndex + 1);
  };

  const addItem = (updateHistory = true, nextCounter = counter + 1) => {
    setData([...data, { index: nextCounter, name: "", count: 0 }]);
    setCounter(nextCounter);

    if (updateHistory) {
      addAction("add", nextCounter);
    }
  };

  const removeItem = (itemIndex, updateHistory = true) => {
    const index = data.findIndex((el) => el.index === itemIndex);
    const item = data[index];
    const filteredData = data.filter((_, i) => i !== index);
    setData(filteredData);

    if (updateHistory) {
      addAction("remove", { index, item });
    }
  };

  const changeValue = (itemIndex, field, value, updateHistory = true) => {
    const index = data.findIndex((el) => el.index === itemIndex);
    const item = { ...data[index] };
    const prevValue = item[field];
    const nextItem = {
      ...item,
      [field]: value,
    };

    setData(Object.assign([], data, { [index]: nextItem }));

    if (updateHistory) {
      addAction("changeValue", { itemIndex, field, value, prevValue });
    }
  };

  const handleUndo = () => {
    if (actionIndex < 0) return;

    const currentAction = actions[actionIndex];
    if (currentAction === undefined) return;
    switch (currentAction.id) {
      case "remove":
        const _data = [...data];
        const { index, item } = currentAction.value;
        _data.splice(index, 0, item);
        setData([..._data]);
        break;
      case "add":
        setData([...data.slice(0, data.length - 1)]);
        break;
      case "changeValue":
        const { itemIndex, field, prevValue } = currentAction.value;
        changeValue(itemIndex, field, prevValue, false);
        break;
      case "reset":
      case "cancel":
        setData([...currentAction.value]);
        break;
    }

    setActionIndex(Math.max(-1, actionIndex - 1));
  };

  const handleRedo = () => {
    if (actions.length - 1 === actionIndex) return;

    const currentAction = actions[actionIndex + 1];
    switch (currentAction.id) {
      case "remove":
        removeItem(currentAction.value.item.index, false);
        break;
      case "add":
        addItem(false, currentAction.value);
        break;
      case "changeValue":
        const { itemIndex, field, value } = currentAction.value;
        changeValue(itemIndex, field, value, false);
        break;
      case "reset":
        handleReset(false);
        break;
      case "cancel":
        handleCancel(false);
        break;
    }

    setActionIndex(Math.min(actions.length, actionIndex + 1));
  };

  const handleReset = (updateHistory = true) => {
    if (updateHistory) {
      addAction("reset", [...data]);
    }

    setData([]);
  };

  const handleCancel = (updateHistory = true) => {
    if (updateHistory) {
      addAction("cancel", [...data]);
    }

    setData([...saveData]);
  };

  const handleSave = () => {
    setSaveData([...data]);
  };

  const handleUserKeyPress = useCallback(
    (e) => {
      let pressedUndo = false,
        pressedRedo = false;

      const { keyCode } = e;
      const keys = {
        z: 90,
        y: 98,
      };

      if (e.metaKey) {
        if (keyCode === keys.z) {
          if (e.shiftKey) {
            pressedRedo = true;
          } else {
            pressedUndo = true;
          }
        }
      }

      if (e.ctrlKey) {
        if (keyCode === keys.y) {
          pressedRedo = true;
        } else if (keyCode === keys.z) {
          pressedUndo = true;
        }
      }

      if (pressedUndo) {
        handleUndo();
        e.preventDefault();
        return false;
      } else if (pressedRedo) {
        handleRedo();
        e.preventDefault();
        return false;
      }
    },
    [actions, actionIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className="page">
      <Body
        data={data}
        addItem={addItem}
        header={header}
        removeItem={removeItem}
        changeValue={changeValue}
      />
      <Footer
        onReset={() => handleReset()}
        onCancel={() => handleCancel()}
        onSave={handleSave}
      ></Footer>
    </div>
  );
}
