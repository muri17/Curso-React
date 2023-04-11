import { useState } from 'react';
import PropTypes from 'prop-types';

// function handleAdd(event, newValue) {
//   console.log(event)
// }

export const CounterApp = ({value}) => {
  const [ counter, setCounter ] = useState(value);

  const handleAdd = (event) => {
    // console.log(event)
    setCounter(counter + 1)
    // setCounter( (c) => c + 1)
  }

  const handleSubstract = () => {
    setCounter(counter - 1)
  }

  const handleRest = () => {
    setCounter(value)
  }

  return (
    <>
        <h1>CounterApp</h1>
        <h2> { counter } </h2>

        <button onClick={ handleAdd }>
          +1
        </button>
        <button onClick={ handleSubstract }>
          -1
        </button>
        <button onClick={ handleRest }>
          Reset
        </button>
        
        {/* <button onClick={ event => handleAdd(event, 'hola') }>
          +2
        </button> */}
    </>
  )
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired
  }
