
Vue.component('modal', {
    props: {
        header: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            default: () => { }
        }
    },
    template: '#modal-template'
});

const vm = new Vue({
    el: 'main',
    mounted() {
        this.getUsuarios();
    },
    data() {
        return {
            allUsuarios: [], //Todos los usuarios
            usuarios: [],    //Usuarios list
            showModal: false,
            selectedUser: null,
            header: null,
            buscador: ''
        }
    },
    methods: {
        getUsuarios() {
            axios.get(urlApi)
                .then((response) => {
                    this.usuarios = response.data.results;
                    this.allUsuarios=response.data.results;
                })
                .catch((error) => alert(error));
        },
        mostrardetalle(user) {
            //console.log(user);
            this.header = user.name.first + ' ' + user.name.last;
            this.showModal = true;
            this.selectedUser = user;
        },
        search(){
            return this.usuarios.filter(x=>x.user.name==this.buscador);
        }
    },
    computed: {
        totalUsuarios() {
            return this.usuarios.length;
        }
    },
    watch: {
        'buscador': function(val, oldval) {
            if (val.length==0){
                this.usuarios=this.allUsuarios;
                return;
            }
            this.usuarios= this.allUsuarios.filter(x=>x.name.first.includes(val));
        }
    }
})