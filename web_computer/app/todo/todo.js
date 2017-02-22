;(function(){
	let storage = {
		save(key,value){
			localStorage.setItem("vue",JSON.stringify(value));
		},
		fetch(key){
			return JSON.parse(localStorage.getItem(key)) || [];
		}
	}
	var data = storage.fetch('vue');
	console.log(data);
	//头部组件
	Vue.component('todo_header',{
		template:`<header class="header">
				  	<h1>todos</h1>
				  	<input @keyup.enter="addFn" v-model="value" autocomplete="off" placeholder="What needs to be done?" class="new-todo">
				  </header>`,
		data(){
			return {
				value:""
			}
		},
		methods:{
			addFn(){
				if (this.value === "") {
					return;
				}
				this.$emit('addfn',this.value);
				this.value ="";
			}
		}
	})
	//列表组件
	Vue.component("todo_comtent",{
		template:`
				<section class="main" v-show="list.length">
					<input type="checkbox" class="toggle-all" v-model="checkAll">
					<ul class="todo-list">
						<li class="todo" :class='{completed:item.isSelected,editing:item.id == editorId}' :title='item.time' v-for='item,index in filterList'>
							<div class="view">
								<input type="checkbox" class="toggle"  v-model='item.isSelected'>
								<label @dblclick="editorFn(item,index)">{{item.title}}</label>
								<button class="destroy" @click="deleFn(item.id)"></button>
							</div> 
							<input type="text" class="edit"
								 v-model="item.title"
								 :ref = "'editorInput'+index"
								 @blur = "blurFn(item)"
								 @keyup.enter = "blurFn(item)"
								 @keyup.esc = "escFn(item)"
							/>
						</li>
					</ul>
				</section>
		`,
		props:["list","hash"],
		data(){
			return {
				editorId:"",
				beforeTitle:""
			}
		},
		computed:{
			checkAll:{
				get(){
					return this.list.filter( item => item.isSelected ).length === this.list.length;
				},
				set(value){
					this.$emit("checkall",value);
				}
			},
			filterList:function(){
				var list = [];
				if (this.hash === 'all') {
					list = this.list;
				} else if (this.hash === 'active') {
					list = this.list.filter( item => !item.isSelected );
				} else if(this.hash === 'completed'){
					list = this.list.filter( item => item.isSelected );
				} else{
					list = this.list;
				}
				return list;
			}
		},
		methods:{
			deleFn(id){//改变数据时候最好在父组件中改变数据
				this.$emit("delefn",id);
			},
			editorFn(item,index){
				this.editorId = item.id; // 添加class，输入框显示
				this.beforeTitle = item.title;
				this.$nextTick(function(){	//数据改变后，更新视图，DOM全部更新完成。 获取焦点
					this.$refs['editorInput'+index][0].focus();
				})
			},
			blurFn(item){
				if (item.title.trim() === "") {
					this.deleFn(item.id);
				}
				this.editorId = null;
			},
			escFn(item){//取消编辑
				item.title = this.beforeTitle;
				this.beforeTitle = "";
				this.editorId = null;
			}
		}
	})
	//脚部组件
	Vue.component("todo_footer",{
		template:`
				<footer class="footer" v-show="list.length">
					<span class="todo-count">
						<strong>{{unSelectedNum}}</strong> item left
					</span>
					<ul class="filters">
						<li><a href="#/all" :class="{selected:hash === 'all'}">All</a></li>
						<li><a href="#/active" :class="{selected:hash === 'active'}">Active</a></li> 
						<li><a href="#/completed" :class="{selected:hash === 'completed'}">Completed</a></li>  
					</ul> 
					<button class="clear-completed" v-show="selectedNum" @click="clearFn">
						Clear completed
					</button>
				</footer>
		`,
		props:["list","hash"],
		data:function(){
			return {
			}
		},
		computed:{
			unSelectedNum:function(){
				return this.list.filter(item => !item.isSelected).length;
			},
			selectedNum:function(){
				return this.list.filter(item => item.isSelected).length;
			}
		},
		methods:{
			clearFn(){
				this.$emit("clearfn")
				console.log(this.list);
			}
		}
	})
	//父组件
	var vm = new Vue({
		el:".todoapp",
		data:{
			list:data,
			hash:"all"
		},
		watch:{
			list:{
				handler:function(){
					storage.save('vue',this.list);
				},
				deep:true
			}
		},
		computed:{
			
		},
		methods:{
			addFn(val){
				this.list.push({
					title:val,
					id:Math.random(),
					isSelected:false,
					time:new Date()
				})
			},
			checkAllFn(val){
				this.list.forEach(item => {item.isSelected = val});
			},
			deleFn(id){
				this.list = this.list.filter( item => item.id != id )
			},
			clearFn(){
				this.list = this.list.filter( item => !item.isSelected );
			}
		}
	})
	//根据hash值切换数据
	window.onhashchange = function(){
		let hash = window.location.hash.slice(2);
		vm.hash = hash;
	}
	window.onhashchange();
})()
