import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header";
import Input from "./Input";
import List from "./List";
import Filter from "./FIlter";
function App() {
  const [input, setInput] = useState("");
  const [job, setJob] = useState(JSON.parse(localStorage.getItem("job")) ?? []);

  const [status, setStatus] = useState("Tất cả");
  const [update, setUpdate] = useState(null);
  useEffect(() => {
    document.title = "TodoApp";
  }, []);
  useEffect(() => {
    setLocal();
  }, [job]);
  const setLocal = () => {
    localStorage.setItem("job", JSON.stringify(job));
  };
  // Input function
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (update === null) {
      if (input != "") {
        setJob([
          ...job,
          {
            text: input,
            id: Math.floor(Math.random() * 100000),
            status: false,
          },
        ]);
      }
    } else {
      let result = job;
      result.forEach((item) => {
        if (item.id == update) {
          item.text = input;
        }
      });
      setUpdate(null);

      setJob(result);
    }
    setInput("");
  };
  //
  //Item function
  const handleDelete = (data) => {
    let result = job.filter((item) => {
      if (item.id != data.id) {
        return item;
      }
    });
    setJob(result);
  };
  const handleComplete = (data) => {
    setJob(
      job.map((item) => {
        if (item.id == data.id) {
          item = { ...item, status: !data.status };
        }
        return item;
      })
    );
  };
  const handleEdit = (data) => {
    setInput(data.text);
    setUpdate(data.id);
  };
  //

  const filter = job.filter((item) => {
    if (status == "Tất cả") {
      return item;
    } else if (status == "Hoàn thành") {
      return item.status;
    } else {
      return !item.status;
    }
  });

  //Filter function
  const handleFilter = (data) => {
    switch (data) {
      case "Tất cả":
        setStatus(data);
        break;
      case "Hoàn thành":
        setStatus(data);
        break;
      case "Chưa hoàn thành":
        setStatus(data);
        break;
      case "Xóa tất cả":
        setJob([]);
        localStorage.setItem("job", JSON.stringify([]));
        setStatus("Tất cả");
        break;
    }
  };

  //
  return (
    <div className="app">
      <Header />
      <Input
        input={input}
        onChange={handleChange}
        onAdd={handleAdd}
        update={update}
      />
      <List
        data={filter}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onComplete={handleComplete}
      />
      <Filter status={status} onFilter={handleFilter} />
    </div>
  );
}

export default App;
