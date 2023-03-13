import UserInputProvider from './contexts/UserInputContext';
import './App.css';
import UserInput from './components/UserInput/UserInput';
import Table from './components/Table/Table';
import AddNewRowBtn from './components/AddNewRowBtn/AddNewRowBtn';

function App() {
  return (
    <div className="App">
      <UserInputProvider>
        <UserInput />
        <Table />
        <AddNewRowBtn />
      </UserInputProvider>
    </div>
  );
}

export default App;
