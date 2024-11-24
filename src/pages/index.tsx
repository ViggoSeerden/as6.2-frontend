import { useState } from "react"

export default function Index() {
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
      <p className="text-[26px] mb-5">Welcome to the Osso Online Frontend!</p>
    </div>
  )
}