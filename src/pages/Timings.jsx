import React from "react";


const Timings = () => {
  return (
    <div className="timings-page">
      <h2 className="timings-title">Gym Timings</h2>

      {/* Desktop Table */}
      <div className="timings-card timings-desktop-only">
        <table className="timings-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Morning</th>
              <th>Evening</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>5:00 AM – 9:00 AM</td>
              <td>4:00 PM – 10:00 PM</td>
            </tr>
                        <tr>
              <td>Tuesday</td>
              <td>5:00 AM – 9:00 AM</td>
              <td>4:00 PM – 10:00 PM</td>
            </tr>
                        <tr>
              <td>Wednesday</td>
              <td>5:00 AM – 9:00 AM</td>
              <td>4:00 PM – 10:00 PM</td>
            </tr>
                        <tr>
              <td>Thursday</td>
              <td>5:00 AM – 9:00 AM</td>
              <td>4:00 PM – 10:00 PM</td>
            </tr>
                        <tr>
              <td>Friday</td>
              <td>5:00 AM – 9:00 AM</td>
              <td>4:00 PM – 10:00 PM</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>5:00 AM – 9:00 AM</td>
              <td>4:00 PM – 10:00 PM</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td colSpan="2">Holiday</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="timings-mobile-only timings-cards">
        <div className="timing-item">
          <h4>Monday</h4>
          <p><strong>Morning:</strong> 5:00 AM – 9:00 AM</p>
          <p><strong>Evening:</strong> 4:00 PM – 10:00 PM</p>
                    <h4>Tuesday</h4>
          <p><strong>Morning:</strong> 5:00 AM – 9:00 AM</p>
          <p><strong>Evening:</strong> 4:00 PM – 10:00 PM</p>
                    <h4>Wednesday</h4>
          <p><strong>Morning:</strong> 5:00 AM – 9:00 AM</p>
          <p><strong>Evening:</strong> 4:00 PM – 10:00 PM</p>
                    <h4>Thursday</h4>
          <p><strong>Morning:</strong> 5:00 AM – 9:00 AM</p>
          <p><strong>Evening:</strong> 4:00 PM – 10:00 PM</p>
                    <h4>Friday</h4>
          <p><strong>Morning:</strong> 5:00 AM – 9:00 AM</p>
          <p><strong>Evening:</strong> 4:00 PM – 10:00 PM</p>
        </div>

        <div className="timing-item">
          <h4>Saturday</h4>
          <p><strong>Morning:</strong> 5:00 AM – 9:00 AM</p>
          <p><strong>Evening:</strong> 4:00 PM – 10:00 PM</p>
        </div>

        <div className="timing-item">
          <h4>Sunday</h4>
          <p><strong>Timing:</strong> Holiday</p>
        </div>
      </div>
    </div>
  );
};

export default Timings;
