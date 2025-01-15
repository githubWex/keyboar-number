
import { Numeric } from './components/Numeric';

import "./styles/keyboardStyle.css"



export const NumericKeyboard =() => {

  const handleAnswer = () => {
    console.log("Answer call...");
  }

  const handleHangup = () => {
    console.log("Hanging up...");
  }
  
  return (
    <>
      <h1>Phone Dialer</h1>
      <Numeric 
        onAnswer={handleAnswer}
        onHangup={handleHangup}
      />
    </>
  )
}


