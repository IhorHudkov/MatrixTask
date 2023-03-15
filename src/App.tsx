import { UserInputProvider, MessageProvider } from '@/contexts';
import { Table, UserInput, AddNewRowBtn, MessageContainer } from '@/components';
import './App.css';

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
