import { useState } from "react";
import { Button, TextField } from "@material-ui/core";

export default function Home() {
  const [profileName, setProfileName] = useState("");
  const [transactions, setTransactions] = useState([
    { name: "GESTÃO DE OBRAS", actions: ["Restrito", "Visualizar", "Alterar", "Total"] },
    { name: "RELATÓRIO", actions: ["Restrito", "Visualizar", "Alterar", "Total"] },
    { name: "GUIA DE USUÁRIOS", actions: ["Restrito", "Visualizar", "Alterar", "Total"] },
  ]);

  function handleProfileNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProfileName(event.target.value);
  }

  function handleActionClick(transactionIndex: number, actionIndex: number) {
    const newTransactions = [...transactions];
    newTransactions[transactionIndex].actions = newTransactions[transactionIndex].actions.map(
      (action, index) => (index === actionIndex ? "Selecionado" : "Restrito")
    );
    setTransactions(newTransactions);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Perfil: ${profileName}`);
    console.log("Transações:");
    transactions.forEach((transaction) => {
      console.log(`- ${transaction.name}`);
      transaction.actions.forEach((action) => {
        console.log(`  - ${action}`);
      });
    });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        variant="outlined"
        label="Nome do Perfil"
        value={profileName}
        onChange={handleProfileNameChange}
      />
      {transactions.map((transaction, transactionIndex) => (
        <div key={transactionIndex}>
          <h2>{transaction.name}</h2>
          {transaction.actions.map((action, actionIndex) => (
            <Button
              key={actionIndex}
              variant="contained"
              color={action === "Selecionado" ? "primary" : "default"}
              onClick={() => handleActionClick(transactionIndex, actionIndex)}
              style={{ marginRight: "8px", marginBottom: "8px", borderRadius: "16px", padding: "8px 16px", fontWeight: "bold", textTransform: "none" }}
            >
              {action}
            </Button>
          ))}
        </div>
      ))}
      <Button variant="contained" color="secondary" type="submit">
        Enviar
      </Button>
    </form>
  );
}