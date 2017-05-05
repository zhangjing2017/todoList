let vm=new Vue({
    el:'#app',
    data:{
        todos:[
            {title:'今天学vue',isChecked:true},
            {title:'明天学angular',isChecked:false},
            {title:'后天学react',isChecked:true},
        ],
        editTodo:'', //和addTodo对应
        state:'' , //默认状态为空  complete  finish  unfinish
        currentTodo:''
    },
    directives:{  //指令 可以用来操作dom 自己定义的
        autoFocus(ele,bindings){  //ele代表input元素  bindings.value 代表的是currentTodo==todo的结果
            if(bindings.value){
                ele.focus();
            }
        }
    },
    methods:{
        reset(){
            //让当前点击的变为空
            this.currentTodo='';
        },
        changeTitle(todo){ //双击问题显示框可以修改
            this.currentTodo=todo;
        },
      remove(todo){  //删除
          this.todos=this.todos.filter(function(item){
             return todo!=item;
         })
      },
        addTodo(){//增加要办的事情
          this.todos.push({title:this.editTodo,isChecked:false});
          this.editTodo='';
        }
    },
    //vue提供的生命周期的方法，钩子函数（回调函数核心）
    mounted(){ //页面加载完成后会调用此函数,如果本地没有数据默认是空数组
      this.todos=JSON.parse(localStorage.getItem('todos'))|| [];  //增删改的数据保存到本地地址上
    },
    watch:{
        todos:{
            handler(){
                         //将todos存到本地localStorage  设置key和value，value会被自动toString
                localStorage.setItem('todos',JSON.stringify(this.todos));
            },
            deep:true  //深度监控  只要todos有变化，就会执行此监控
        }
        /*todos(){//watch方法只能监控一级，默认不监控数组中某个对象的属性的变化

        }*/
    },
    computed:{
        cloneTodo(){  //对应自己的状态
            if(this.state=='complete'){  //完成返回所有数据
                return this.todos;
            }
            if(this.state=='finish'){  //完成 返回checked为true的数据
                return this.todos.filter(function(item){
                    return item.isChecked;
                })
            }
            if(this.state=='unfinish'){//未完成 返回checked为false的数据
                return this.todos.filter(function(item){
                    return !item.isChecked;
                })
            }
        },
        total(){//默认是get
            return this.todos.filter(function(item){
                return !item.isChecked;//表示将当前项isChecked为true的都删除
            }).length;

        }
    }
});
//hash值可以在当前页面上 保证不跳转页面，并且更新url
//获取hash值
let listener=function(){
    vm.state=window.location.hash.slice(1)|| 'complete';
};
listener();
window.addEventListener('hashchange',listener,false);








