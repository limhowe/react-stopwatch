import React, { Component } from 'react';
import Button from '../components/Button';
import { formatElapsedTime } from '../helpers/formatElapsedTime';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      elapsed: 0, 
      laps: [],
      counter: null
    };
    this.counter = null;
    this.lap = 0;

    this.handleResume = this.handleResume.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleLap = this.handleLap.bind(this);
  }  
    
  handleResume() {
    this.counter = setInterval( () =>
      this.setState({
        elapsed: this.state.elapsed + 1
      })
    , 10);
  }
  
  handleStop() {
    clearInterval(this.counter);
    this.setState({
      counter: this.counter
    });
  }
  
  handleReset() {
    clearInterval(this.counter);
    this.setState({
      elapsed: 0,
      laps: [],
      counter: null
    });
    this.lap = 0;
  }
  
  handleLap() {
    this.setState({
      laps: [{
        tick: formatElapsedTime(this.state.elapsed),
        duration: formatElapsedTime(this.state.elapsed - this.lap),
      }, ...this.state.laps]
    })
    this.lap = this.state.elapsed;
  }
  
  render() {
    const {elapsed, laps, counter} = this.state;
    return (
      <div>
        <h1>{formatElapsedTime(elapsed)}</h1>

        { laps.length > 0 && 
          <table border="1" align="center">
            <tbody>
            {laps.map((lap, i) =>
                <tr key={i.toString() + lap.tick}>
                  <td><strong>{i + 1}</strong></td>
                  <td><strong>{lap.duration}</strong></td>
                  <td><strong>{lap.tick}</strong></td>
                </tr>
              )
            }
            </tbody>
          </table>
        }

        {!counter && elapsed === 0 &&
          <Button onClick={this.handleResume}>start</Button>
        }

        {counter && 
          (this.counter === counter && elapsed !== 0) &&
          <Button onClick={this.handleResume}>resume</Button>
        }
        
        {elapsed !== 0 &&
          this.counter !== counter && 
          <div>
            <Button onClick={this.handleStop}>stop</Button>
            <Button onClick={this.handleLap}>lap</Button> 
          </div>
        }

        {elapsed !== 0 &&
          this.counter === counter &&
          <Button onClick={this.handleReset}>reset</Button>
        }

      </div>
    );
  }
}

export default StopWatch;