import React, {useRef, useEffect} from 'react';
import {evaluate, isOperator} from './calculator.js';

let logo = "https://raw.githubusercontent.com/BP-Portfolio/BP-Portfolio.github.io/main/Images/Logo/PersonalLogo_Circle.png";

function setCursorPos(ctrl, pos) {
  if(ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  } else if(ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

const Button = ({value, onClick, customClass}) => {
  return (
    <button className = {`calc-button ${customClass}`} onClick={onClick}>{value}</button>
  );
}

export default function App() {
  const ref = useRef(null);

  const onClearAll = () => {
    ref.current.value = "";
  };

  /*const onDel = () => {
    ref.current.value = ref.current.value.slice(0, -1).trim();
  }*/

  useEffect(() => {
    const keyDown = e => {
      if(e.key === 'Enter') {
        e.preventDefault();
        solve();
      }
    }

    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, []);

  const update = (value) => {
    ref.current.focus();

    if(value === '()') {
      let input = document.getElementById("input-id");
      setCursorPos(input, input.value.length - 1);
    }

    if(isOperator(value)) {
      ref.current.value += (' ' + value + ' ');
    } else {
      ref.current.value += value;
    }
  };

  const format = () => {
    const copy = ref.current.value.slice();
    let value = "";
    
    for(let i = 0; i < copy.length; i++) {
      if(copy[i] === '+' || copy[i] === '-' || copy[i] === '*' || copy[i] === '/' || copy[i] === '^') {        
        value += (" " + copy[i] + " ");
      } else {
        value += copy[i];
      }
    }

    ref.current.value = value.trim().replace(/\s+/g, " ");
  }

  const solve = () => {
    ref.current.value = evaluate(ref.current.value);
  };
  
  return (
    <div className='body'>
      <div className='header'>
        <h1>Just A Very Simple Calculator</h1>
        <h2>Creator: Brian Pham</h2>
          <a href = "https://bp-portfolio.github.io/" target='_blank' rel="noopener noreferrer">
            <button className = "home-button">HOME PAGE</button>
          </a>
      </div>

      <div className='calculator'>
        <input ref = {ref} className = 'calc-display' type = 'text' onChange = {format} autoFocus id = "input-id" />
        <div className='calculator-keys'>
          <Button customClass = 'btn-clear' value = {'AC'} onClick={onClearAll}/>
          <Button customClass = 'btn-operator' value = {'('} onClick = {e => update('(')}/>
          <Button customClass = 'btn-operator' value = {')'} onClick = {e => update(')')}/>
          <Button customClass = 'btn-operator' value = {'^'} onClick = {e => update('^')}/>
        
          
          <Button customClass = 'btn-number' value = {'7'} onClick = {e => update(7)}/>
          <Button customClass = 'btn-number' value = {'8'} onClick = {e => update(8)}/>
          <Button customClass = 'btn-number' value = {'9'} onClick = {e => update(9)}/>
          <Button customClass = 'btn-operator' value = {'÷'} onClick = {e => update('/')}/>

          <Button customClass = 'btn-number' value = {'4'} onClick = {e => update(4)}/>
          <Button customClass = 'btn-number' value = {'5'} onClick = {e => update(5)}/>
          <Button customClass = 'btn-number' value = {'6'} onClick = {e => update(6)}/>
          <Button customClass = 'btn-operator' value = {'×'} onClick = {e => update('*')}/>

          <Button customClass = 'btn-number' value = {'1'} onClick = {e => update(1)}/>
          <Button customClass = 'btn-number' value = {'2'} onClick = {e => update(2)}/>
          <Button customClass = 'btn-number' value = {'3'} onClick = {e => update(3)}/>
          <Button customClass = 'btn-operator' value = {'-'} onClick = {e => update('-')}/>

          <Button customClass = 'btn-number' value = {'0'} onClick = {e => update(0)}/>
          <Button customClass = 'btn-number' value = {'.'} onClick = {e => update('.')}/>
          <Button customClass = 'btn-equals' value = {'='} onClick = {e => solve()}/>
          <Button customClass = 'btn-operator' value = {'+'} onClick = {e => update('+')}/>
        </div>
      </div>
      <div className='logo'>
        <img 
          src = {logo} 
          alt = "Logo" 
          style = {{
            width: "25px", 
            height: "25px"
          }}
        />
      </div>
    </div>
  );

  /*return (
    <div className='body'>
      <div className='header'>
        <h1>Just A Very Simple Calculator</h1>
        <h2>Creator: Brian Pham</h2>
        
          <a href = "https://bp-portfolio.github.io/" target='_blank' rel="noopener noreferrer">
            <button className = "home-button">HOME PAGE</button>
          </a>
        
      </div>

      <div className='calc-container'>
        <input ref = {ref} className = 'calc-display' type = 'text' onChange = {format} autoFocus id = "input-id" />
        <div className='buttons'>
            <Button customClass = 'btn-clear' value = {'CLEAR'} onClick={onClearAll}/>
            <Button customClass = 'btn-operator' value = {'('} onClick = {e => update('(')}/>
            <Button customClass = 'btn-operator' value = {')'} onClick = {e => update(')')}/>
            <Button customClass = 'btn-operator' value = {'^'} onClick = {e => update('^')}/>

            <Button customClass = 'btn-number' value = {'7'} onClick = {e => update(7)}/>
            <Button customClass = 'btn-number' value = {'8'} onClick = {e => update(8)}/>
            <Button customClass = 'btn-number' value = {'9'} onClick = {e => update(9)}/>
            <Button customClass = 'btn-operator' value = {'÷'} onClick = {e => update('/')}/>

            <Button customClass = 'btn-number' value = {'4'} onClick = {e => update(4)}/>
            <Button customClass = 'btn-number' value = {'5'} onClick = {e => update(5)}/>
            <Button customClass = 'btn-number' value = {'6'} onClick = {e => update(6)}/>
            <Button customClass = 'btn-operator' value = {'×'} onClick = {e => update('*')}/>

            <Button customClass = 'btn-number' value = {'1'} onClick = {e => update(1)}/>
            <Button customClass = 'btn-number' value = {'2'} onClick = {e => update(2)}/>
            <Button customClass = 'btn-number' value = {'3'} onClick = {e => update(3)}/>
            <Button customClass = 'btn-operator' value = {'-'} onClick = {e => update('-')}/>

            <Button customClass = 'btn-number' value = {'0'} onClick = {e => update(0)}/>
            <Button customClass = 'btn-number' value = {'.'} onClick = {e => update('.')}/>
            <Button customClass = 'btn-equals' value = {'='} onClick = {e => solve()}/>
            <Button customClass = 'btn-operator' value = {'+'} onClick = {e => update('+')}/>
        </div>
      </div>
      <div className='logo'>
        <img 
          src = {logo} 
          alt = "Logo" 
          style = {{
            width: "25px", 
            height: "25px"
          }}
        />
      </div>
    </div>
  );*/
}

