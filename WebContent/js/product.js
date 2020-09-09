COLDIGO.produto = new Object();

$(document).ready(function() {
	COLDIGO.produto.carregaMarcas = function() {
		alert("Tentando buscar marcas")
		$.ajax({
			type: "GET",
			url: `${COLDIGO.PATH}marca/buscar`,
			success: function (marcas) {
				if(marcas) {
					$("#selMarca").html("")
					var option = document.createElement("option")
					option.setAttribute("value", "")
					option.innerHTML = ("Escolha")
					$("#selMarca").append(option)
					
					for(var i = 0; i < marcas.length; i++) {
						var option = document.createElement("option")
						option.setAttribute("value", marcas[i].id)
						option.innerHTML = (marcas[i].nome)
						$("#selMarca").append(option)
					}
				} else {
					$("#selMarca").html("")
					var option = document.createElement("option")
					option.setAttibute("value", "")
					option.innerHTML = ("Cadastre uma marca primeiro!")
					$("#selMarca").append(option)
					$("#selMarca").addClass("aviso")
				}
			},
			error: function (info) {
				COLDIGO.exibirAviso("Erro ao buscar as marcas: "+ info.status + " - " + info.statusText)
				$("#selMarca").html("")
				var option = document.createElement("option")
				option.setAttribute("value", "")
				option.innerHTML = ("Erro ao carregar marcas!")
				$("#selMarca").append(option)
				$("#selMarca").addClass("aviso")
			}
		})
	}
	
	COLDIGO.produto.carregaMarcas()
	
	COLDIGO.produto.cadastrar = function() {
		
		var produto = new Object()
		produto.categoria = document.frmAddProduto.categoria.value
		produto.marcaId = document.frmAddProduto.marcaId.value
		produto.modelo = document.frmAddProduto.modelo.value
		produto.capacidade = document.frmAddProduto.capacidade.value
		produto.valor = document.frmAddProduto.valor.value
		
		if(produto.categoria || produto.marcaId || produto.capacidade || produto.valor) {
			COLDIGO.exibirAviso("Preencha todos os campos!")
		} else {
			$.ajax({
				type: "POST",
				url: `${COLDIGO.PATH}produto/inserir`,
				data:JSON.stringify(produto),
				success: function (msg) {
					COLDIGO.eibirAviso(msg)
					$("#addProduto").trigger("reset")
				},
				error: function (info) {
					COLDIGO.exibirAviso(`Erro ao cadastrar um novo produto: ${info.status} - ${info.statusText}`)
				}
			})
		}
	}
})