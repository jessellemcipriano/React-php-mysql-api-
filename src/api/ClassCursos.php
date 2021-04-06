<?php 

include ("classConexao.php");

class ClassCursos extends ClassConexao {


    #exibiçao de cursos em um json
    public function exibeCursos(){
        header("Access-Control-Allow-Origin: * ");
        header("Content-type: application/json");
        
        $BFetch=$this->conectaDB()->prepare("select * from cursos");

        $BFetch->execute();

        $J=[];
        $I=0;

        While($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
            $J[$I]=[
                "id" => $Fetch['id'],
                "nome" => $Fetch['Nome'],
                "descricao" => $Fetch['Descrição'],
                "valor" => $Fetch['Valor'],
            ];
            $I++;
        }

        header("Access-Control-Allow-Origin: * ");
        header("Content-type: application/json");
        
        echo json_encode($J);
    }



}