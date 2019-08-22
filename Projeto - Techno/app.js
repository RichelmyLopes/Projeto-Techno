const vm = new Vue({
    el: "#app",
    data: {
        produtos: {},
        produto: {},
        mostrar: false,
    },
    methods: {
        fetchProdutos(){
            fetch("./api/produtos.json")
            .then(r => r.json())
            .then((body) =>{
                this.produtos = body;
            });
        },
        fetchProduto(id){
            fetch(`./api/produtos/${id}/dados.json`)
            .then(r => r.json())
            .then(r =>{
                this.produto = r;
                this.mostrar =! this.mostrar;
            });
        }
    },

    filters: {
        numeroPreco(valor){
            return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        },
        maiusculo(valor){
           return valor.toUpperCase();
        }
    },

    created(){
        this.fetchProdutos();
    }

});
