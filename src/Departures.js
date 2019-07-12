import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import jsonp from "axios-jsonp";
import Table from "react-table";

import "react-table/react-table.css";

const StyledDepartures = styled.div`
  flex: 1;
`;

console.log(process.env);

const PARAMS = {
  URL: "https://www.rmv.de/hapi/departureBoard",
  ACCESS_ID: process.env.REACT_APP_RMV,
  STOP_ID: "3000526",
  MAX_JOURNEYS: 20,
  FILTER_EQUIV: 1,
  FORMAT: "json",
  JSONP: "callback"
};

function Departures() {
  const [departures, setDepartures] = useState([]);

  window.callback = ({ Departure }) => {
    setDepartures(Departure);
  };

  const getDepartures = useCallback(() => {
    axios({
      url: PARAMS.URL,
      adapter: jsonp,
      params: {
        accessId: PARAMS.ACCESS_ID,
        id: PARAMS.STOP_ID,
        maxJourneys: PARAMS.MAX_JOURNEYS,
        filterEquiv: PARAMS.FILTER_EQUIV,
        format: PARAMS.FORMAT,
        jsonpCallback: PARAMS.JSONP
      }
    }).then((err, res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    getDepartures();
    const timer = setInterval(async () => {
      getDepartures();
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const trimTime = ({ value }) => {
    if (value) {
      const format = `${value}`.substr(0, 5);
      return <div>{format}</div>;
    }

    return null;
  };

  const resolveData = data => {
    // if (data.length > 0) {
    //   // console.log(data);

    //   return data.filter(dep => {
    //     const name = `${dep.name}`.trim();
    //     return name === "U6";
    //   });
    // }

    return data;
  };

  return (
    <StyledDepartures>
      <Table
        data={departures}
        resolveData={resolveData}
        columns={[
          {
            Header: "Zeit",
            accessor: "time",
            width: 100,
            Cell: trimTime
          },
          {
            Header: "Aktuell",
            accessor: "rtTime",
            width: 100,
            Cell: trimTime
          },
          {
            Header: "Linie",
            id: "line",
            accessor: "name",
            width: 100
          },
          {
            Header: "Richtung",
            accessor: "direction"
          }
        ]}
        showPagination={false}
        defaultPageSize={10}
        className="-striped"
      />
    </StyledDepartures>
  );
}

export default Departures;
