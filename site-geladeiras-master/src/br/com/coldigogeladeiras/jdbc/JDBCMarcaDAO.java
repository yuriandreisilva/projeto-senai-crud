	package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;
import br.com.coldigogeladeiras.modelo.Produto;

public class JDBCMarcaDAO implements MarcaDAO{

	private Connection conexao;

	public JDBCMarcaDAO (Connection conexao) {
		this.conexao=conexao;
	}


	public List<Marca> buscar(){

		//String da instrução SQL para buscar todas as marcas
		String comando = "SELECT * FROM marcas";

		//Criação de uma lista  para armazenar cada marca encontrada
		List<Marca> listMarcas = new ArrayList<Marca>();

		//Criação do objeto marca com o valor null (ou seja, sem instanciá-lo)
		Marca marca = null;

		try {

			//Uso da conexão do banco para prepeará-lo para uma instância SQL
			Statement stmt = conexao.createStatement();

			//Execução da instrução criada previamente
			//e armazenamento do resultado no objeto rs
			ResultSet rs = stmt.executeQuery(comando);

			//Enquanto houver uma próxima linha no resultado
			while(rs.next()) {

				//Criação da instância  da classe Marca
				marca = new Marca();

				//Recebimento dos dois dados retornados do BD para cada linha encontrada
				int id = rs.getInt("id");
				String nome = rs.getString("nome");

				//Setando no objeto marca os valores encontrados
				marca.setId(id);
				marca.setNome(nome);

				//Adição da instância contida no objeto Marca da lista de marcas
				listMarcas.add(marca);
			}

			//Caso alguma Exception seja gerada no try, recebe-a no objeto "ex"		
		}catch (Exception ex) {

			ex.printStackTrace();
		}

		//Retorna para quem chamou o método a lista criada
		return listMarcas;
	}
	public boolean inserir(Marca marca) {

		String comando = "INSERT INTO marcas "
				+"(id, nome) "
				+ "VALUES (?,?)";
		PreparedStatement p;

		try {
			//Prepara o comando para execução no BD em que nos conectamos
			p = this.conexao.prepareStatement(comando);

			//Substitui no comando os "?" pelos valores do produto
			p.setInt(1, marca.getId());
			p.setString(2, marca.getNome());

			//Executa o comando no BD
			p.execute();


		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Marca> buscarPorNome(String nome){

		//Inicia a criação do comando SQL de busca 
		String comando = "SELECT * FROM marcas ";
	
		//Se o nome não estiver vazio...
		if (!nome.equals("")) {
			//concatena no comando o WHERE buscando no nome do produto 
			//o texto da variável nome
			comando += "WHERE marcas.nome LIKE '%"+ nome + "%' "; 
		}
		//Finaliza o comando ordenando alfabeticamente por
		//categoria, marca e depois modelo
		comando += "ORDER BY nome ASC ";
		
		
			List<Marca> listaMarcas = new ArrayList<Marca>();
			Marca marca = null;

			try {

				Statement stmt = conexao.createStatement();
				ResultSet rs = stmt.executeQuery(comando);

				while(rs.next()) {

					int id = rs.getInt("id");
					String marcaNome = rs.getString("nome");
					int status = rs.getInt("status");

					marca = new Marca();
					marca.setId(id);
					marca.setNome(marcaNome);
					marca.setStatus(status);
					
					if (status==1) {
						marca.setStatusBoolean(true);
					}else {
						marca.setStatusBoolean(false);
					}
					
					listaMarcas.add(marca);
				}

			}catch (Exception e) {
				e.printStackTrace();
			}
			return listaMarcas;
		}
	public boolean deletar(int id) {
		String comando = "DELETE FROM marcas WHERE id = ?";
		PreparedStatement p;
		
		try {
			p=this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	public Marca buscarPorId(int id) {
		String comando = "SELECT * FROM marcas WHERE marcas.id = ?";
		Marca marca= new Marca();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				
				
				String nome = rs.getString("nome");
				int status = rs.getInt("status");
				
				marca.setId(id);
				marca.setNome(nome);
				marca.setStatus(status);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return marca;
	}
	
	public boolean alterar(Marca marca) {
		System.out.println(marca.getNome());
		String comando = "UPDATE marcas "
				+ "SET nome=?"
				+ " WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);			
			p.setString(1,marca.getNome());
			p.setInt(2,marca.getId() );
			
			p.executeUpdate();
			
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	// ************************************************
	// MARCA STATUS
	// ************************************************
	
	public Marca checkId(int id) {
		String comando = "SELECT * FROM marcas WHERE marcas.id = ?";
		Marca marca = new Marca();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				
				String nome = rs.getString("nome");
				int status = rs.getInt("status");
				
				marca.setId(id);
				marca.setNome(nome);
				marca.setStatus(status);
				
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return marca;
	}
	
	public boolean changeStatus(Marca marca) {
		String comando = "UPDATE marcas "
				+ "SET status=?"
				+ " WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1,marca.getStatus());
			p.setInt(2,marca.getId());
			
			p.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}

