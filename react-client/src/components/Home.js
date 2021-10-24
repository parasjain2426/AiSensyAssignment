import React, { useState } from "react";
import Intent from "./Intent";
import LoaderWrapper from "./LoaderWrapper";

function Home() {
  const [intentList, setIntentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getIntentListHandler = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_GET_INTENT_LIST)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.status === "SUCCESS") {
          let intentListData = res.data;
          if (intentListData) {
            setIntentList(intentListData);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div>
      <div className="intent-dialog-container">
        <div>
          <img src={process.env.REACT_APP_IMAGE_URL} alt="dialog-flow" />
        </div>
        <div className="intent-dialog">
          <div>Get the Dialogflow Intent List</div>
          <LoaderWrapper loading={loading} styles={{ marginTop: "25px" }}>
            <button onClick={getIntentListHandler}>Get</button>
          </LoaderWrapper>
        </div>
      </div>
      <div>
        {intentList &&
          intentList.map((intent, idx) => <Intent data={intent} key={idx} />)}
      </div>
    </div>
  );
}

export default Home;
