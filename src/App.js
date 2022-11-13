import logo from './logo.svg';
import './App.css';
import {ConnectWallet} from "./component/ConnectWallet";
import {Typography} from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h2" gutterBottom>
              欢迎来到HIT DAO Workshop
          </Typography>
          <ConnectWallet/>
      </header>
    </div>
  );
}

export default App;
