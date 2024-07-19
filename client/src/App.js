import './App.css';
import MainView from './components/mainView/MainView';
function App() {
  const data = [
    {
    title: "Hellow",
    content: "Lorem ipsum lorem upsum",
    importance: 1
  },
  {
    title: "Hellow",
    content: "Lorem ipsum lorem upsum",
    importance: 1
  },
  ]
  return (
    <div className="App">
      <MainView data={data}/>
    </div>
  );
}

export default App;
