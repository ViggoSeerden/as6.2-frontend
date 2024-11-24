import { useState } from "react"

export default function EndpointTest() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [service, setService] = useState('user');
  const [enabledBody, setEnabledBody] = useState(false);
  const [bodyKey, setBodyKey] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  const [response, setResponse] = useState('');

  function sendRequest() {
    if (url.length < 1) {
      setResponse('ERROR: No URL Specified')
      return
    }

    if (enabledBody) {
      if (bodyKey.length < 1 || bodyValue.length < 1) {
        setResponse('ERROR: Invalid Body Key/Value')
        return
      }

      fetch(`${url}?${bodyKey}=${bodyValue}`, {
        headers: {
          "host": `${service}-service.local`
        },
        method: method
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          setResponse(data)
        })
    } else {
      fetch(url, {
        headers: {
          "host": `${service}-service.local`
        },
        method: method,
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          setResponse(data)
        })
        .catch((error) => {
          console.log(error)
          setResponse(error)
        })
    }
  }

  return (
    <div className="ml-5 mt-5">
      <p className="text-[26px] mb-5">Osso Service Endpoint Testing</p>
      <p className="text-[18px] mb-5">This page is for testing the endpoints in a kubernetes environment, which has all requests go through the gateway/ingress first.</p>
      <div>
        <p className="text-[22px] mb-1">Test Request:</p>
        <div className="flex flex-col w-min gap-5">
          <input className="bg-slate-700 rounded-lg h-10 w-[400px] px-2" placeholder="Url + Endpoint" onChange={(e) => setUrl(e.target.value)} />
          <select className="bg-slate-700 h-10 rounded-lg px-2" onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">Get</option>
            <option value="POST">Post</option>
            <option value="PUT">Put</option>
            <option value="DELETE">Delete</option>
          </select>
          <select className="bg-slate-700 h-10 rounded-lg px-2" onChange={(e) => setService(e.target.value)}>
            <option value="user">User Service</option>
            <option value="post">Post Service</option>
            <option value="chat">Chat Service</option>
          </select>
          <div className="flex flex-row gap-5">
            <input type="checkbox" checked={enabledBody} onChange={(e) => setEnabledBody(e.target.checked)} />
            <p>Enable Body</p>
          </div>
          <div className="flex flex-row w-min gap-5">
            <input disabled={!enabledBody} className="bg-slate-700 rounded-lg h-10 w-[400px] px-2 disabled:bg-slate-900" placeholder="Key" onChange={(e) => setBodyKey(e.target.value)} />
            <input disabled={!enabledBody} className="bg-slate-700 rounded-lg h-10 w-[400px] px-2 disabled:bg-slate-900" placeholder="Value" onChange={(e) => setBodyValue(e.target.value)} />
          </div>
        </div>
        <button className="my-5 bg-teal-700 p-3 rounded-xl" onClick={sendRequest}>Send Request</button>
        <div className="flex flex-col gap-5">
          <p>Response:</p>
          <p>{response}</p>
        </div>
      </div>
    </div>
  )
}