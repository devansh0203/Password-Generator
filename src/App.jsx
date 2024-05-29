import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+{}?";
    }
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-10 bg-gray-900 text-orange-400">
        <h1 className="text-center text-2xl font-semibold text-white mb-5">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-800 text-white"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition duration-200"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <span>Length: {length}</span>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => { setLength(e.target.value) }}
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => { setNumberAllowed((prev) => !prev) }}
                className="cursor-pointer"
              />
              <span>Include Numbers</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                id="characterInput"
                checked={charAllowed}
                onChange={() => { setcharAllowed((prev) => !prev) }}
                className="cursor-pointer"
              />
              <span>Include Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
