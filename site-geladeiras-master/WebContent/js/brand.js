COLDIGO.marca = new Object();

$(document).ready (function(){

//	Cadastra no BD a marca informado 
	COLDIGO.marca.cadastrar = function(){		
		
		var marca = new Object();	
		marca.nome = document.frmAddMarca.nome.value;
		
			if(marca.nome==""){
				COLDIGO.exibirAviso("Preencha o campo Marca!")
			}else{
			// CRUD 
			// Create = Post 
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH + "marca/inserir",
				data:JSON.stringify(marca),
				success:function(msg) {
					COLDIGO.exibirAviso(msg);
					$("#addMarca").trigger("reset");				
					COLDIGO.marca.buscarPorNome();
				},
				error:function(info){
					COLDIGO.exibirAviso("Erro ao cadastrar uma nova marca: "+ info.status + " - "+ info.statusText);
				}
			});
		}
	};
	//Busca no BD e exibe na página as marcas que atendam à solicitação do usuário
	COLDIGO.marca.buscarPorNome = function(){
		//tem que ser buscar por nome
		var valorBusca = $("#campoBuscaMarca").val();
		$.ajax({
			// CRUD
			// Read = Get 
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorNome",
			data: "valorBusca="+valorBusca,
			success: function(listaDeMarcas){					
				$("#listaMarcas").html(COLDIGO.marca.exibir(listaDeMarcas));
				
				var selStatus = document.getElementsByClassName('check');
				for(var i=0; i<listaDeMarcas.length; i++){
					selStatus[i].checked = listaDeMarcas[i].statusBoolean;
					
				}
				
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar : "+info.status+" - "+info.statusText);
			}
		});
	COLDIGO.marca.exibir = function(listaDeMarcas){

		var tabela = "<table>"+
		"<tr>"+
		
		"<th>Marca</th>"+
		"<th class='acoes'>Ações</th>"+
		"<th class='status'>Status</th>"+
		"</tr>";

		if(listaDeMarcas != undefined && listaDeMarcas.length >0){


			for(var i=0; i<listaDeMarcas.length; i++){
				
				tabela+= "<tr>"+
				"<td>"+listaDeMarcas[i].nome+"</td>"+
				"<td>" +
				"<a onclick=\"COLDIGO.marca.exibirEdicao('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
				"<a onclick=\"COLDIGO.marca.checkId('"+listaDeMarcas[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>"+"</td>" +
				"<td>" +
					"<a onclick=\"COLDIGO.marca.checkIdStatus('"+listaDeMarcas[i].id+"')\">"+
					"<label class='switch'>" +
						"<input type='checkbox' class='check'>" +
						"<span class='slider round'></span>" +
					"</label></a>" +
					
				"</td>"+
				"</tr>"
				
			}


		}else if (listaDeMarcas == ""){
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela +="</tabela>";

		return tabela;
	};
	};
	COLDIGO.marca.buscarPorNome();
	
		
	COLDIGO.marca.excluir = function(marca){
		if(marca.id!=0){
		$.ajax({
			// CRUD
			// Delete = Drop 
			type:"DELETE",
			url: COLDIGO.PATH +"marca/excluir/"+marca.id,
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscarPorNome();
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao excluir marca: " + info.status + " - " + info.statusText);
			}
		});
		}else{
			COLDIGO.exibirAviso("Erro ao excluir marca. Atualize o navegador.");
		}
	};

	COLDIGO.marca.exibirEdicao = function(id){
		
		
		
		$.ajax({
			type:"GET",
			url: COLDIGO.PATH +"marca/buscarPorId",
			data: "id="+id,
			success: function(marca){
				if (marca.status==0){

					COLDIGO.exibirAviso("Erro ao editar marca. Por favor ative o status ");

				}else{
				
				document.frmEditaMarca.idMarca.value = marca.id;
				document.frmEditaMarca.nome.value = marca.nome;
			
				COLDIGO.marca.buscarPorNome();
				
					var modalEditaMarca = {
						title: "Editar Marca",
						height: 300,
						width: 600,
						modal: true,
						buttons:{						
							"Salvar":function(){
								COLDIGO.marca.checkNameEdit();
								
							},
							"Cancelar": function(){
								$(this).dialog("close");
							}
						},
						close:function(){
							//caso o usuário simplesmente feche a caixa de edição
							//não deve acontecer nada
						}
				
					};
					$("#modalEditaMarca").dialog(modalEditaMarca);
				}
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar marca para edição: "+info.status+" - "+info.statusText);
			}
		});
	}
	
	
	
	COLDIGO.marca.editar = function(){		
		var marca = new Object();
		marca.id = 	document.frmEditaMarca.idMarca.value;
		marca.nome = document.frmEditaMarca.nome.value;		
		
			
		$.ajax({
			// CRUD 
			// Update = Put 
		
			type:"PUT",
			url: COLDIGO.PATH + "marca/alterar",
			data:JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				
				COLDIGO.marca.buscarPorNome();
				
				
				$("#modalEditaMarca").dialog("close");
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marca: "+ info.status+" - "+info.statusText);
			}
		});
	};
	
	COLDIGO.marca.checkNameEdit = function(){
				
		var valorBusca = $("#campoBuscaMarca").val();
		var brandName = document.frmEditaMarca.nome.value;
		var checkNameEdit = false; 
		
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorNome",
			data: "valorBusca="+valorBusca, 
			success: function(dados){
				
				for (var i=0; i<dados.length; i++){
					
					if(brandName==dados[i].nome){
						checkNameEdit = true;
					}		
					
				};
				if (checkNameEdit == true){
					COLDIGO.exibirAviso("Este nome já existe na lista de marcas!!!");
					COLDIGO.marca.buscarPorNome();
				}else{
					COLDIGO.marca.editar();
				}
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar. "+info.status+" - "+info.statusText);
			}
		});
	};
	// ******************************************************************************************************
	// STATUS MARCAS ++ 
	// ******************************************************************************************************
	
	// Verifica ID da marca para ver se ela existe mesmo, ou se está ativa, com este código de ID
	// sabemos exatamente qual a marca e o seu status
	COLDIGO.marca.checkId = function(id,status){
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/checkId",
			data: "id="+id,
			success: function(marca){
				
				//console.log(marca.id);
				//console.log(marca.status);
				if((marca.status==1) || (marca.id==0)){
					if (marca.status==1){
						COLDIGO.exibirAviso("Erro ao excluir a marca. Por favor desative o status da marca para excluir.")
					}else{
						COLDIGO.exibirAviso("Erro ao excluir a marca, esta marca não existe no banco. Por favor atualize o navegador.")
					}
				}else{
					COLDIGO.marca.excluir(marca);
				}
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar. Tente novamente: "+info.status+" - "+info.statusText);
			}
		})
	};
	
	COLDIGO.marca.checkName = function(){
		
		var valorBusca = $("#campoBuscaMarca").val();
		var brandName = document.frmAddMarca.nome.value;
		var checkName = false; 
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarPorNome",
			data: "valorBusca="+valorBusca, 
			success: function(dados){
				for (var i=0; i<dados.length; i++){
					if(brandName==dados[i].nome){
						checkName = true;
					}					
				};
				if (checkName == true){
					COLDIGO.exibirAviso("A marca já está cadastrada");
					COLDIGO.marca.buscarPorNome();
				}else{
					COLDIGO.marca.cadastrar();
				}
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar. "+info.status+" - "+info.statusText);
			}
		});
	};
	
	COLDIGO.marca.statusId = function(){
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/checkId",
			data: "id="+id,
			sucess: function(marca){
				if(marca.id==0){
					COLDIGO.exibirAviso("Erro ao excluir a marca. Por favor atualize seu navegador!");
				}
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar. Tente novamente: "+info.status+" - "+info.statusText);
			}
		});
	};
	
	COLDIGO.marca.checkIdStatus = function(id){
		$.ajax({
			type: "GET",
			url: COLDIGO.PATH + "marca/checkId",
			data: "id="+id,
			success: function(marca){
				//console.log("checkIdStatus entrando - Status: " + marca.status);
				//console.log("checkIdStatus entrando - Id: " + marca.id);
				if(marca.id==0){
					COLDIGO.exibirAviso("Erro ao excluir a marca. Por favor atualize o navegador.");
				}else{
					COLDIGO.marca.changeStatus(marca);
				}
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar! Tente novamente. "+info.status+" - "+info.statusText);
			}
		});
	};
	
	COLDIGO.marca.changeStatus = function(marca){
		
		if(marca.status==0){
			marca.status=1;
		}else{
			marca.status=0;
		}
		//console.log("changeSatus2: "+ marca.status)
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "marca/changeStatus",
			data: JSON.stringify(marca),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.marca.buscarPorNome();
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar marca: "+ info.status+" - "+info.statusText);
			}
		});
	}	
});