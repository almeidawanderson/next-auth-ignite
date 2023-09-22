import { FormEvent, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    
    <form 
    style={{display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    maxWidth: '20rem',
    margin: '0 auto'}}

    onSubmit={handleSubmit}>
      <TextField
      style={{width: '100%', display: "flex"}}
        variant="outlined"
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        style={{width: '100%'}}
        variant="outlined"
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="secondary" type="submit">
        Entrar
      </Button>
    </form>
    
  );
}