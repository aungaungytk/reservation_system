/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../../redux/features/Hook";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface InputValue {
  team_id: number;
  start_time: string;
  end_time: string;
  room_id: number;
  title: string;
  description: string;
  date: string;
  user_id: number;
}
export interface RoomData {
  id: string;
  name: string;
}
const RoomReservationForm: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const authUser = authRedux.user.id;
  const [minDate] = useState(() => new Date().toISOString().split("T")[0]); // Set the current date as the minimum selectable date
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");

  const initialInputValue: InputValue = {
    title: "",
    description: "",
    date: "",
    team_id: 1,
    start_time: "",
    end_time: "",
    room_id: 1,
    user_id: 1,
  };

  const [inputValue, setInputValue] = useState(initialInputValue);

  useEffect(() => {
    getRoomData().then((response: any) => {
      setRoomData(response.data);
    });
  }, []);

  const getRoomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/rooms", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    inputValue["user_id"] = authUser;
    sendDataToBackend({ inputValue });
    setTitleError("");
    setTimeError("");
    setDateError("");
    setMessage("");
  };

  const sendDataToBackend = (data: { inputValue: InputValue }) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/room_reservation",
        JSON.stringify(data.inputValue),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then(() => {
        const successMessage = "Reservation created successfully.";
        navigate(
          `/${
            authRedux.role
          }-dashboard/room-reservation?success=${encodeURIComponent(
            successMessage
          )}`
        );
      })
      .catch((error) => {
        if (error.response.data.message.endTimeError) {
          setMessage(error.response.data.message.endTimeError);
        }
        if (error.response.data.message.overlap) {
          setMessage(error.response.data.message.overlap);
        }
        if (error.response.data.message.errorDate) {
          setMessage(error.response.data.message.errorDate);
        }
        if (error.response.data.message.title) {
          setTitleError(error.response.data.message.title[0]);
        }
        if (error.response.data.message.date) {
          setDateError(error.response.data.message.date[0]);
        }
        if (error.response.data.message.start_time) {
          setTimeError(error.response.data.message.start_time[0]);
        }
        if (error.response.data.message.end_time) {
          setTimeError(error.response.data.message.end_time[0]);
        }
        if (
          error.response.data.message.start_time &&
          error.response.data.message.end_time
        ) {
          setTimeError("Start time and end time field is required.");
        }
      });
  };
  const handleCancel = () => {
    navigate(`/${authRedux.role}-dashboard/room-reservation`);
  };
  return (
    <div className="room-reservation">
      <h1 style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}>
        Room Reservation
      </h1>

      <div className="reserve_section">
        <div className="form">
          {message && <div className="errorMessage">{message}</div>}

          <form onSubmit={handleFormSubmit}>
            <div>
              <div className="elem-group">
                <label htmlFor="room">
                  Room <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="room_id"
                  value={inputValue.room_id}
                  onChange={handleSelectChange}
                >
                  {roomData.map((roomData) => (
                    <option key={roomData.id} value={roomData.id}>
                      {roomData.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="elem-group">
                <label htmlFor="title">
                  Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={inputValue.title}
                  onChange={handleInputChange}
                  placeholder="Weekly Meeting"
                />
              </div>
              {titleError && <div className="errorMessage">{titleError}</div>}
              <div className="elem-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={inputValue.description}
                  onChange={handleInputChange}
                  placeholder="Agenda"
                />
              </div>
              <div className="elem-group">
                <label htmlFor="date">
                  Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  min={minDate}
                  value={inputValue.date}
                  onChange={handleInputChange}
                />
              </div>
              {dateError && <div className="errorMessage">{dateError}</div>}
              <div className="elem-group inlined">
                <label htmlFor="time">
                  Time <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="start_time"
                  value={inputValue.start_time}
                  onChange={handleSelectChange}
                >
                  <option>---start time---</option>
                  <option value="09:00:00">09:00am</option>
                  <option value="10:00:00">10:00am</option>
                  <option value="11:00:00">11:00am</option>
                  <option value="12:00:00">12:00pm</option>
                  <option value="13:00:00">01:00pm</option>
                  <option value="14:00:00">02:00pm</option>
                  <option value="15:00:00">03:00pm</option>
                  <option value="16:00:00">04:00pm</option>
                </select>
              </div>
              <div className="elem-group inlined">
                <select
                  name="end_time"
                  value={inputValue.end_time}
                  onChange={handleSelectChange}
                >
                  <option>---end time---</option>
                  <option value="10:00:00">10:00am</option>
                  <option value="11:00:00">11:00am</option>
                  <option value="12:00:00">12:00pm</option>
                  <option value="13:00:00">01:00pm</option>
                  <option value="14:00:00">02:00pm</option>
                  <option value="15:00:00">03:00pm</option>
                  <option value="16:00:00">04:00pm</option>
                  <option value="17:00:00">05:00pm</option>
                </select>
              </div>
              {timeError && (
                <div style={{ marginTop: "20px" }} className="errorMessage">
                  {timeError}
                </div>
              )}

              <div className="button-group">
                <button type="submit">Book Now</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RoomReservationForm;
