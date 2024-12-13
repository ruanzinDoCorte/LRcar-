const apiUrl = "https://lrcar-gtfsdhe4ekbfc0hg.brazilsouth-01.azurewebsites.net/LRcar";

// Função para buscar todos os carros e atualizar a tabela
async function buscarCarros() {
  try {
    const resposta = await fetch(apiUrl);
    if (resposta.ok) {
      const carros = await resposta.json();
      atualizarTabela(carros);
    } else {
      alert("Falha ao buscar carros.");
    }
  } catch (erro) {
    console.error("Erro ao buscar carros:", erro);
  }
}

// Função para atualizar a tabela com os dados dos carros
function atualizarTabela(carros) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Limpa as linhas existentes da tabela
  carros.forEach(carro => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${carro.id}</td>
      <td>${carro.modelo}</td>
      <td>${carro.anodelançamento}</td>
      <td>${carro.cor}</td>
      <td><button onclick="deletarCarro('${carro.id}')">Deletar</button></td>
      <td><button onclick="abrirFormularioAtualizar('${carro.id}', '${carro.modelo}', '${carro.anodelançamento}', '${carro.cor}')">Atualizar</button></td>
    `;
    tbody.appendChild(linha);
  });
}

// Criar um novo carro
document.querySelector(".register-button").addEventListener("click", async () => {
  const modelo = prompt("Digite o modelo do carro:");
  const anodelançamento = prompt("Digite o Ano de Lançamento do carro:");
  const cor = prompt("Digite a cor do carro:");

  const novoCarro = { modelo, anodelançamento, cor };

  try {
    const resposta = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoCarro),
    });

    if (resposta.ok) {
      alert("Carro adicionado com sucesso!");
      buscarCarros(); // Atualiza a tabela
    } else {
      alert("Falha ao adicionar carro.");
    }
  } catch (erro) {
    console.error("Erro ao adicionar carro:", erro);
  }
});

// Deletar um carro
async function deletarCarro(id) {
  try {
    const resposta = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      alert("Carro deletado com sucesso!");
      buscarCarros(); // Atualiza a tabela
    } else {
      alert("Falha ao deletar carro.");
    }
  } catch (erro) {
    console.error("Erro ao deletar carro:", erro);
  }
}

// Abrir o formulário para atualização e atualizar o carro
function abrirFormularioAtualizar(id, nome, email, cpf, telefone) {
  const novoNome = prompt("Digite o novo modelo do carro:", modelo);
  const novoEmail = prompt("Digite o ano de lançamento do novo carro:", anodelançamento);
  const novoCpf = prompt("Digite o nova cor do carro:", cor);

  const carroAtualizado = { modelo: novoModelo, anodelançamento: novoAnodeLançamento, cor: novoCor };

  atualizarCarro(id, carroAtualizado);
}

// Atualizar um carro
async function atualizarCarro(id, carroAtualizado) {
  try {
    const resposta = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carroAtualizado),
    });

    if (resposta.ok) {
      alert("Carro atualizado com sucesso!");
      buscarCarros(); // Atualiza a tabela
    } else {
      alert("Falha ao atualizar carro.");
    }
  } catch (erro) {
    console.error("Erro ao atualizar carro:", erro);
  }
}

// Buscar todos os carros assim que a página for carregada
window.onload = buscarCarros;
