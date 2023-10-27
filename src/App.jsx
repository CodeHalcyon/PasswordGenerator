import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setnumAllow] = useState(false)
  const [charAllow, setcharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const [copyStatus, setcopyStatus] = useState("green")
  const [copyText, setcopyText] = useState("Copy")

  //ref hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) str += "0123456789"
    if (charAllow) str += "_[]@*"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
    setcopyStatus("green")
    setcopyText("Copy")


  }, [length, numAllow, charAllow, setPassword])


  useEffect(()=>{
    passwordGenerator()
  }, [numAllow,charAllow, length, passwordGenerator])




  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    setcopyStatus("red")
    setcopyText("Copied!")
    window.navigator.clipboard.writeText(password)
  }, [password, copyStatus, setcopyStatus, copyText, setcopyText])
  return (
    <>

      <div className='w-full flex justify-center items-center flex-col text-green-500 bg-gray-700 mx-auto rounded-lg p-6 shadow-md'>
        <h1 className='font-bold'>
          Password Generator
        </h1>
        <div className='flex flex-col bg- shadow rounded-lg overflow-hidden m-4 p-4'>
          <div className='flex shadow rounded-lg overflow-hidden
           m-4'>
            <input
              type="text"
              value={password}
              className='w-full outline-none p-2'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />

            <button
              className=' p-2 w-28 text-white transition duration-100'
              style={{backgroundColor: copyStatus}}
              onClick={copyPasswordToClipboard}
            >{copyText}</button>
          </div>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}

              />
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
              defaultChecked={numAllow}
              id='numberInput'
              onChange={() => {
                setnumAllow((prev)=>
                !prev)
              }}
              />
              <label>Numbers</label>

              <input type="checkbox"
              defaultChecked={charAllow}
              id='charInput'
              onChange={() => {
                setcharAllow((prev)=>
                !prev)
              }}
              />
              <label>Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
