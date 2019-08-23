const vm = new Vue({
    el: "#app",
    data: {
        produtos: {},
        produto: {},
        carrinho: [],
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
            });
        },
        fecharModal({target, currentTarget}) {
            if(target === currentTarget){
            this.produto = false;
            }
        },
        abrirModal(id){
            this.fetchProduto(id);
            window.scrollTo({
               top: 0,
               behavior: "smooth",
            });
        },
        adicionarItem(){
            this.produto.estoque--;
            const {id, nome, preco} = this.produto;
            this.carrinho.push({id, nome, preco});
        },
        removerItem(index){
            this.produto.estoque++;
            this.carrinho.splice(index, 1);
        }
    },
    computed: {
        carrinhoTotal(){
            let total = 0;
            if(this.carrinho.length){
                this.carrinho.forEach(item =>{
                    total += item.preco;
                });
            }

            return total;
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
