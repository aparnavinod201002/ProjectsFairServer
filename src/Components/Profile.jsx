import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap'; // Correct import for Collapse from react-bootstrap

function Profile() {
  const [open, setOpen] = useState(false); // State to toggle profile update fields

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <div className="card shadow p-5 mt-5 me-2">
          <div className="d-flex justify-content-between">
            <h1>Profile</h1>
            
            <button 
              onClick={() => setOpen(!open)} 
              className="btn btn-outline-info"
            >
              <i class="fa-solid fa-angle-down"></i>
            </button>
          </div>

         
          <Collapse in={open}>
            <div className="row justify-content-center p-5">
              <label>
                <input type="file" style={{ display: "none" }} />
                <img
                  width="70%"
                  height="200px"
                  src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                  alt="profile"
                />
              </label>
              <div className="mt-5">
                <input type="text" placeholder="GitHub link" className="form-control" />
                <br />
                <input type="text" placeholder="LinkedIn link" className="form-control" />
              
              <div className="d-grid mt-5">
                <button className="btn btn-warning">Update</button>
              </div>
            </div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Profile;
