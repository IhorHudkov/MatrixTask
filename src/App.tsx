import UserInputProvider from './contexts/UserInputContext';
import MessageProvider from './contexts/MessageContext';
import UserInput from './components/UserInput/UserInput';
import Table from './components/Table/Table';
import AddNewRowBtn from './components/AddNewRowBtn/AddNewRowBtn';
import './App.css';
import MessageContainer from './components/MessageContainer/MessageContainer';

function App() {
  return (
    <div className="App">
      <UserInputProvider>
        <MessageProvider>
          <UserInput />
          <MessageContainer />
          <Table />
          <AddNewRowBtn />
        </MessageProvider>
      </UserInputProvider>
    </div>
  );
}

export default App;
