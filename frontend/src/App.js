import { useState } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import "./styles.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "👋 Hi! I'm your health assistant. Tell me your symptoms.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { text: input, sender: "user" };
    setMessages([...messages, newMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/symptom-check", { symptoms: input });
      const botMsg = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "⚠ Error reaching AI server. Please try again.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="chat-container">
      
      <div className="chat-motivation">
        "Your health is your greatest wealth. Stay informed, stay safe!"
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <ChatBubble key={i} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
