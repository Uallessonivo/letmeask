import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { database } from "../services/firebase";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const [roomCode, setRoomCode] = useState("");
  const { user, signInWithGoogle } = useAuth();

  const history = useHistory();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert("Room does not exist");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <div id="page-auth">
        <aside>
          <img src={illustrationImg} alt="Imagem Logo" />
          <strong>Crie salas Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>
        <main>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <button className="create-room" onClick={handleCreateRoom}>
              <img src={googleIcon} alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={(event) => setRoomCode(event.target.value)}
                value={roomCode}
              ></input>
              <Button type="submit">Entrar na sala</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
