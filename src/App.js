import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import srkimg from "./iamsrk.jpg";

function App() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const getMessages = async () => {
    console.log(`Sent Prompt:${value}`);
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Submit Button pressed");
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      setMessage(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      const prevChats = previousChats;
      setPreviousChats([
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = Object.values(previousChats)?.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  console.log(currentChat);

  const uniqueTitles = Array.from(
    new Set(previousChats?.map((previousChat) => previousChat.title))
  );
  console.log(currentChat);
  console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="side-bar">
        <SideBar src={srkimg} />
        <nav>
          <p>Made by Pratyay</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1> SRK AI</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            *This is a fan project. The bot is not offered by, associated or
            affiliated with the real Shah Ruck Khan in any way.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
