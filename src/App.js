import React, { Component } from 'react';
import Instructions from './Instructions';
import Timer from './Timer';
import TimeInput from './TimeInput';
import Button from './Button';
import Reset from './Reset';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: "Set the timer below and press start to begin.",
      min: "",
      sec: "",
      minInputValue: 0,
      secInputValue: 0,
      disableTimeInput: false,
      playerTime: "",
      buttonText: "start",
      mountTimer: false,
      isRunning: false,
      mountReset: false,
    };
  }

  handleMinInput = (event) => {
    this.setState({
      minInputValue: event.target.value
    });
  }

  handleSecInput = (event) => {
    this.setState({
      secInputValue: event.target.value
    });
  }

  handleButton = (event) => {
    if (!this.state.isRunning && (this.state.buttonText === "start")) {
      const playerTime = (+this.state.minInputValue * 60) + (+this.state.secInputValue);
      this.setState({
        instructions: "Pause or reset the timer at any time.",
        disableTimeInput: true,
        playerTime: playerTime,
        buttonText: "pause",
        mountTimer: true,
        isRunning: true,
        mountReset: true,
      });

      if (this.state.minInputValue < 10) {
        this.setState({
          min: "0" + this.state.minInputValue
        });
      } else {
        this.setState({
          min: this.state.minInputValue
        });
      }

      if (this.state.secInputValue < 10) {
        this.setState({
          sec: "0" + this.state.secInputValue
        });
      } else {
        this.setState({
          sec: this.state.secInputValue
        });
      }

      this.runTimer();
    } else if (this.state.isRunning && (this.state.buttonText === "pause")) {
      this.stopTimer();
      this.setState({
        instructions: "Timer paused, press resume to continue.",
        isRunning: false,
        buttonText: "resume"
      });
    } else if (!this.state.isRunning && (this.state.buttonText === "resume")) {
      this.runTimer();
      this.setState({
        instructions: "Pause or reset the timer at any time.",
        isRunning: true,
        buttonText: "pause"
      });
    } else if (this.state.isRunning && (this.state.buttonText === "new timer")) {
      this.handleReset();
    }
  }

  handleReset = () => {
    window.clearInterval(this.interval);
    this.setState({
      instructions: "Set the timer below and press start to begin.",
      min: "",
      sec: "",
      minInputValue: 0,
      secInputValue: 0,
      disableTimeInput: false,
      playerTime: "",
      buttonText: "start",
      mountTimer: false,
      isRunning: false,
      mountReset: false,
    });
  }

  runTimer = () => {
    this.interval = setInterval(() => {
      this.setState({
        playerTime: this.state.playerTime -= 1
      });
      let startTime = this.state.playerTime / 60;
      let m = Math.floor(startTime);
      let min;
      if (m < 10) {
        min = "0" + m;
      } else {
        min = m;
      }
      let s = Math.round((startTime - m) * 60);
      let sec;
      if (s < 10) {
        sec = "0" + s;
      } else {
        sec = s;
      }
      if (this.state.playerTime < 1) {
        window.clearInterval(this.interval);
        this.setState({
          instructions: "Time's up! You did good!",
          buttonText: "new timer",
          mountReset: false
        });
      }
      this.setState({
        min: min,
        sec: sec,
        isRunning: true
      });
    }, 1000);
  }

  stopTimer = () => {
    window.clearInterval(this.interval);
  }

  render() {
    let timer;
    if (this.state.mountTimer) {
      timer = <Timer min={this.state.min} sec={this.state.sec} />;
    } else {
      timer = "";
    }

    let timerInput;
    if (!this.state.disableTimeInput) {
      timerInput = <TimeInput valueMin={this.state.minInputValue} handleChangeMin={this.handleMinInput} valueSec={this.state.secInputValue} handleChangeSec={this.handleSecInput} />;
    } else {
      timerInput = "";
    }

    let disableButton;
    if (this.state.minInputValue > 0 || this.state.secInputValue > 0) {
      disableButton = false;
    } else {
      disableButton = true;
    }

    let reset;
    if (this.state.mountReset) {
      reset = <Reset handleReset={this.handleReset} />;
    } else {
      reset = "";
    }

    return (
      <div id="timerBody">
        <h1>Timer App</h1>
        <Instructions instructions={this.state.instructions} />
        <div id="timer">
          {timer}
          {timerInput}
        </div>
        <div id="buttonContainer">
          <Button buttonText={this.state.buttonText} handleButton={this.handleButton} enable={disableButton} />
          {reset}
        </div>
      </div>
    );

  }
}

export default App;
