import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import ThemeSwitcher from "../../context/ThemeSwitcher/ThemeSwitcher";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    // handleCardClick,
    newChat,
  } = useContext(Context);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input) {
      onSent();
      setInput("");
    }
  };

  const handleSend = () => {
    onSent();
    setInput("");
  };

  return (
    <div className="main">
      <div className="nav">
        <p onClick={() => newChat()}>Gaming Chat</p>
        {/* <img src={assets.user_icon} alt="" /> */}
        <ThemeSwitcher />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Olá, jogador.</span>
              </p>
              <p>Como eu posso te ajudar hoje?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                value=""
                onClick={() => setInput("Vale a pena jogar Mario Bros?")}
              >
                <p>Vale a pena jogar Mario Bros?</p>
                <div className="card-image">
                  <img src={assets.compass_icon} alt="" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  setInput("O que as pessoas dizem sobre The Witcher?")
                }
              >
                <p>O que as pessoas dizem sobre The Witcher?</p>
                <div className="card-image">
                  <img src={assets.bulb_icon} alt="" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  setInput("Contra é um jogo tão difícil como dizem?")
                }
              >
                <p>Contra é um jogo tão difícil como dizem?</p>
                <div className="card-image">
                  <img src={assets.message_icon} alt="" />
                </div>
              </div>
              <div
                className="card"
                onClick={() => setInput("Quem desenvolveu Hollow Knight?")}
              >
                <p>Quem desenvolveu Hollow Knight?</p>
                <div className="card-image">
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Digite uma pergunta ou comando"
              onKeyDown={handleKeyDown}
            />
            <div>
              {input ? (
                <img onClick={handleSend} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            O Gaming Chat pode exibir informações imprecisas, portanto,
            verifique novamente suas respostas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
