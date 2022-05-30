import React from "react";
import { useNavigate } from "react-router";

import useCalendar from "./useCalendar";
import "./Calendar.css";

//mui
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, IconButton, Tooltip } from "@mui/material";

//react
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//util
import { dateParser } from "../../Utils/DateParser";

const Calendar = () => {
  const history = useNavigate();
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  const dateClickHandler = (date) => {
    // history("/calendar/" + date);
    return <Tooltip title="sss">val</Tooltip>;
  };
  const dateClickHandlerN = (date) => {
    return <Tooltip title="sss">val</Tooltip>;
  };

  //user data
  const { token, role, URL } = useSelector((state) => state.loging);

  //state
  const [submissions, setSubmissions] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [dates, setDates] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  //use effct call
  useEffect(() => {
    axios
      .get(`${URL}submissions`, {
        headers: { Authorization: "Agriuservalidation " + token },
      })
      .then((res) => {
        setLoaded(true);
        if (res.data) {
          setSubmissions(res.data.data);
          let array = [];
          res.data.data.filter((row) => {
            array.push({
              date: dateParser(row.due_date),
              info: row.title,
              id: row._id,
            });
          });
          setDates(array);
        }
      })
      .catch((er) => {
        setLoaded(true);
      });
  }, []);

  //find info
  const findInfo = (date) => {
    const val = dates.filter((row) => row.date == date);

    if (val.length > 0) {
      return `${val[0].info} Assignment`;
    } else {
      return "Today";
    }
  };
  //navigate
  const redirect = (date) => {
    const val = dates.filter((row) => row.date == date);

    if (val.length > 0) {
      return `/submit/add/${val[0].id}`;
    } else {
      return null;
    }
  };

  return (
    <Box>
      <Box
        className="bottom"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <IconButton
          sx={{ color: "#fff" }}
          size="small"
          onClick={() => {
            getPrevMonth();
            if (month === 0) {
              setYear((pre) => pre - 1);
            }
            setMonth((pre) => (pre === 0 ? 11 : pre - 1));
          }}
        >
          <ArrowLeftIcon size="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          {monthNames[month] + " - " + year}
        </Box>
        <IconButton
          sx={{ color: "#fff" }}
          size="small"
          onClick={() => {
            getNextMonth();
            if (month === 11) {
              setYear((pre) => pre + 1);
            }
            setMonth((pre) => (pre === 11 ? 0 : pre + 1));
          }}
        >
          <ArrowRightIcon size="small" />
        </IconButton>
      </Box>
      <>
        <table className="table">
          <thead>
            <tr>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].date}>
                  {cols.map((col) =>
                    col.date === todayFormatted ||
                    dates.some((row) => row.date == col.date) ? (
                      <td
                        key={col.date}
                        className={`${col.classes} today`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        <Box
                          onClick={() => {
                            console.log("ss");
                            const val = redirect(col.date);
                            if (val !== null) {
                              history(val);
                            }
                          }}
                        >
                          <Tooltip title={findInfo(col.date)}>
                            <Box>{col.value}</Box>
                          </Tooltip>
                        </Box>
                      </td>
                    ) : (
                      <td
                        key={col.date}
                        className={col.classes}
                        onClick={() => dateClickHandlerN(col.date)}
                      >
                        {col.value}
                      </td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </Box>
  );
};

export default Calendar;
