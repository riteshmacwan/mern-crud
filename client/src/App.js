import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col">
        <Form />
        <List />
      </div>
    </div>
  );
}

export default App;
