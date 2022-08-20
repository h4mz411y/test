import React, { useEffect, useReducer, useState } from 'react';
import History from './components/history/index';
import "./app.css";
import Header from './components/header/index';
import Footer from './components/footer/index';
import Form from './components/form/index';
import Results from './components/results/index';

import DataReducer, { addData, removeUrl, emptyAction } from "./reducer";

const initState = {
  url: [],
  data: [],
  count: 0
}
function App() {
  const [apiData, dispatch] = useReducer(DataReducer, initState)

  const [user, setUser] = useState({
    data: null,
    requestParams: {},
  });


  async function callApi(requestParams) {
    if (requestParams.method === "GET") {
      const response = await fetch(requestParams.url);
      var data = await response.json();

      data.url = requestParams.url
      dispatch(addData(data))

      if (requestParams) {
        setUser({ user, data: data, requestParams: requestParams });
      }
    }

  }
  console.log(apiData.url);
  return (
    <React.Fragment>
      <Header />
      <div data-testid="request">
        Request Method:{user.requestParams.method}
      </div>

      <div data-testid="url">URL: {user.requestParams.url}</div>

      <ul>
        {
          apiData.url.map((url, idx) => {
            return (
              <>

                <li key={idx} onClick={() => dispatch(removeUrl(idx))} >{url} <span id="delete">delete</span> </li>
              </>

            )
          })
        }
      </ul>
      <button id="clear" onClick={() => dispatch(emptyAction())}>Clear All</button>
      <Form handleApiCall={callApi} />
      <Results data={user.data} />

      <Footer />
    </React.Fragment>
  );
}

export default App;