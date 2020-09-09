function validaFaleConosco() {
    var nome = document.frmfaleconosco.txtnome.value;
    var expRegNome = new RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$");
    
    if(!expRegNome.test(nome)) {
        alert("Preencha o campo Nome corretamente.");
        document.frmfaleconosco.txtnome.focus();
        return false;
    }

    var fone = document.frmfaleconosco.txtfone.value;
    var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");
    
    if(!expRegFone.test(fone)) {
        alert("Preencha o campo Fone corretamente.");
        document.frmfaleconosco.txtfone.focus();
        return false;
    }

    if(document.frmfaleconosco.txtemail.value == ""){
        alert("Preencha o campo e-mail.");
        document.frmfaleconosco.txtemail.focus();
        return false;
    }

    if(document.frmfaleconosco.selmotivo.value == ""){
        alert("Preencha o campo motivo.");
        document.frmfaleconosco.selmotivo.focus();
        return false;
    }
    
    if(document.frmfaleconosco.selmotivo.value == "PR"){
        if(document.frmfaleconosco.selproduto.value == ""){
            alert("Preencha o campo produto.");
            document.frmfaleconosco.selproduto.focus();
            return false;
        }
    }

    if(document.frmfaleconosco.txtcomentario.value == ""){
        alert("Preencha o campo comentário.");
        document.frmfaleconosco.txtcomentario.focus();
        return false;
    }


    return true;
}

function verificaMotivo(motivo) {
    var elemento = document.getElementById("opcaoProduto");
    
    if(motivo == "PR"){
        var select = document.createElement("select");
        select.setAttribute("name", "selproduto");
        
        var option = document.createElement("option");
        option.setAttribute("value", "");
        
        var texto = document.createTextNode("Escolha");
        option.appendChild(texto);

        var option2 = document.createElement("option");
        option2.setAttribute("value", "1");
        
        var texto = document.createTextNode("Freezer");
        option2.appendChild(texto);
        
        select.appendChild(option);
        select.appendChild(option2);
        elemento.appendChild(select);
    } else {
        if(elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

$(document).ready(function() {
	$("header").load("/ProjetoTrilhaWeb/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoTrilhaWeb/pages/site/general/menu.html");
	$("footer").load("/ProjetoTrilhaWeb/pages/site/general/rodape.html");
})