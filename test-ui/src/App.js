import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

function App() {
  const [allUser, setAllUser] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91");
  const [firstName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [userType, setUserType] = useState("");

  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("+91");
  const [firstName1, setFistName1] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [address1, setAddress1] = useState("");
  const [state1, setState1] = useState("");
  const [pin1, setPin1] = useState("");
  const [upadateUrl, setUpdateUrl] = useState("")
  const [userType1, setUserType1] = useState("");

  const [exists, setExists] = useState(false);
  const [disPhone, setDisPhone] = useState(false);
  const [disEmail, setDisEmail] = useState(false);

  const emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
  const pinRegex = /^([0-9]){6}$/
  
  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:8000/test/user/");
    setAllUser(res.data);
    console.log(res.data)
  };

  const setValues = (fieldname, value) => {
    switch (fieldname) {
      case "email":
        let val = value.toLowerCase();
        setEmail1(val);
        for (let obj of allUser) {
          if (obj.email === value) {
            setEmail(obj.email);
            setExists(true);
            setDisPhone(true);
            setFistName(obj.first_name);
            setLastName(obj.last_name);
            setPhone(obj.phone_number);
            setAddress(obj.address);
            setState(obj.state);
            setPin(obj.pincode);
            setUserType(obj.user_type);
            setUpdateUrl(obj.url)
            alert("User Already Exist. You can only update the Address");
            break;
          } else {
            setExists(false);
            setDisPhone(false);
          }
        }
        break;
      case "phone":
        setPhone1(value);
        for (let obj of allUser) {
          if (obj.phone_number === value) {
            setPhone(obj.phone_number);
            setExists(true);
            setDisEmail(true);
            setFistName(obj.first_name);
            setLastName(obj.last_name);
            setEmail(obj.email);
            setAddress(obj.address);
            setState(obj.state);
            setPin(obj.pincode);
            setUserType(obj.user_type);
            setUpdateUrl(obj.url)
            alert("User Already Exist. You can only update the Address");
            break;
          } else {
            setExists(false);
            setDisEmail(false);
          }
        }
        break;
      case "firstname":
        setFistName1(value);
        break;
      case "lastname":
        setLastName1(value);
        break;
      case "address":
        setAddress1(value);
        exists === true ? setAddress(value) : setAddress1(value)
        break;
      case "state":
        exists === true ?setState(value):setState1(value);
        break;
      case "pincode":
        exists === true ? setPin(value):setPin1(value);
        break;
      case "usertype":
        setUserType1(value);
        break;
      default:
    
    }
  };

  const saveUser = async () => {
    if(firstName1.trim().length === 0) {
      alert("First Name should be entered")
      return
    }
    if(lastName1.trim().length === 0) {
      alert("Last Name should be entered")
      return
    }
    if(email1.trim().length === 0) {
      alert("Email should be entered")
      return
    }
    if(!emailRegex.test(email1.trim())){
      alert("Email is incorrect")
      return
    }
    if(phone1.trim().length < 4) {
      alert("Phone Number should be entered")
      return
    }
    if(address1.trim().length === 0) {
      alert("Address should be entered")
      return
    }
    if(state1.trim().length === 0) {
      alert("State should be entered")
      return
    }
    if(pin1.trim().length === 0) {
      alert("Pincode should be entered")
      return
    }
    if(!pinRegex.test(pin1.trim())){
      alert("Pincode is incorrect")
      return
    }
    if(userType1.trim().length === 0) {
      alert("User Type should be Selected")
      return
    }

    let userData = {
      "first_name": firstName1.trim(),
      "last_name": lastName1.trim(),
      "email": email1.trim(),
      "phone_number": phone1.trim(),
      "address": address1.trim(),
      "state": state1.trim(),
      "pincode": pin1.trim(),
      "user_type": userType1.trim()
    }
    const res = await axios.post("http://localhost:8000/test/user/", userData);
    if(res.status === 201){
      alert("New User Created Succefull")
      window. location. reload()
      // setEmail("");
      // setExists(false);
      // setDisPhone(false);
      // setFistName("");
      // setLastName("");
      // setPhone("+91 India");
      // setAddress("");
      // setState("");
      // setPin("");
      // setUserType("");  
      // setEmail1("");
      // setFistName1("");
      // setLastName1("");
      // setPhone1("+91 India");
      // setAddress1("");
      // setState1("");
      // setPin1("");
      // setUserType1("");
    }else{
      alert("Server Error. Please try again later")
    }
  }


  const updateUser = async () => {
    if(address.trim().length === 0) {
      alert("Address should be entered")
      return
    }
    if(state.trim().length === 0) {
      alert("State should be entered")
      return
    }
    if(pin.trim().length === 0) {
      alert("Pincode should be entered")
      return
    }
    let userUpdateData = {
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "phone_number": phone,
      "address": address.trim(),
      "state": state.trim(),
      "pincode": pin.trim(),
      "user_type": userType
    }

    const res = await axios.put(upadateUrl, userUpdateData);
    if(res.status === 200){
      alert("User Address Updated")
      window. location. reload()
    }else{
      alert("Server Error. Please try again later")
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <img
        className="w-full h-[450px] absolute !m-[0] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0 object-cover"
        alt=""
        src="/background.png"
      />

      <div className="pt-6">
        <form class=" relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
          <h1 class="mb-6 text-xl font-semibold lg:text-2xl">
            {exists? "User Update" :"User Registration"}
          </h1>

          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class=""> First Name </label>
              <input
                onChange={(e) => setValues("firstname", e.target.value)}
                type="text"
                placeholder="Your Name"
                class={`mt-2 h-12 w-full rounded-md ${exists? "bg-red-50":"bg-green-50"} px-3`}
                disabled={exists}
                value={exists === true ? firstName : firstName1}
              />
            </div>
            <div>
              <label class=""> Last Name </label>
              <input
                onChange={(e) => setValues("lastname", e.target.value)}
                type="text"
                placeholder="Last  Name"
                class={`mt-2 h-12 w-full rounded-md ${exists? "bg-red-50":"bg-green-50"} px-3`}
                disabled={exists}
                value={exists === true ? lastName : lastName1}
              />
            </div>
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class=""> Email Address </label>
              <input
                onChange={(e) => setValues("email", e.target.value)}
                value={disEmail === true ? email : email1}
                type="email"
                placeholder="Your Email"
                class={`mt-2 h-12 w-full rounded-md ${disEmail? "bg-red-50":"bg-green-50"} px-3`}
                disabled={disEmail}
              />
            </div>
            <div>
              <label class=""> Phone Number </label>

              <div class="pt-2">
                <PhoneInput
                  value={disPhone === true ? phone : phone1}
                  onChange={(num) => setValues("phone", num)}
                  inputStyle={{
                    height: "48px",
                    width: "21rem",
                    backgroundColor: disPhone ? "#ffebee":"#F0FDF4",
                    borderColor: "#F5F5F5",
                  }}
                  disabled={disPhone}
                />
              </div>
            </div>
          </div>
          <div>
            <label class=""> Address </label>
            <input
              onChange={(e) => setValues("address", e.target.value)}
              type="text"
              placeholder="Address"
              class="mt-2 h-12 w-full rounded-md bg-green-50 px-3"
              value={exists === true ? address : address1}
            />
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class=""> State </label>
              <input
                onChange={(e) => setValues("state", e.target.value)}
                type="text"
                placeholder="Your State"
                class="mt-2 h-12 w-full rounded-md bg-green-50 px-3"
                value={exists === true ? state : state1}
              />
            </div>
            <div>
              <label class=""> Pin Code </label>
              <input
                onChange={(e) => setValues("pincode", e.target.value)}
                type="text"
                placeholder="Your Pincode"
                class="mt-2 h-12 w-full rounded-md bg-green-50 px-3"
                value={exists === true ? pin : pin1}
              />
            </div>
          </div>

          <div>
            <label class=""> User Type </label>
            <select
              onChange={(e) => setValues("usertype", e.target.value)}
              disabled={exists}
              placeholde
              name="cars"
              id="cars"
              class={`mt-2 h-12 w-full rounded-md ${exists ? "bg-red-50" : "bg-green-50"}  px-3 text-gray-800  `}
            >
              <option
                value="default"
                disabled
                selected={exists === false}
                hidden
                className=""
              >
                Choose a Role
              </option>
              <option
                selected={userType === "Super Admin"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="Super Admin"
              >
                Super Admin
              </option>
              <option
                selected={userType === "State Admin"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="State Admin"
              >
                State Admin
              </option>
              <option
                selected={userType === "District Admin"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="District Admin"
              >
                District Admin
              </option>
              <option
                selected={userType === "Center Incharge"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="Center Incharge"
              >
                Center Incharge
              </option>
              <option
                selected={userType === "Examiner"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="Examiner"
              >
                Examiner
              </option>
              <option
                selected={userType === "Trainer"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="Trainer"
              >
                Trainer
              </option>
              <option
                selected={userType === "Student"}
                class="text-lg text-gray-500 hover:bg-blue-500 hover:text-white"
                value="Student"
              >
                Student
              </option>
            </select>
          </div>

          <div>
            {exists === false ? (
              <button
                onClick={()=>saveUser()}
                type="button"
                class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white hover:bg-blue-500"
              >
                Save User
              </button>
            ) : (
              <button
                onClick={()=>updateUser()}
                type="button"
                class="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white hover:bg-blue-500"
              >
                Update Address
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
