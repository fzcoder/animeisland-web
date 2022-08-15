import { createApp } from 'vue'
import router from './routers'
import App from './App.vue'
// import Ant Design of Vue
import {
  Button,
  Col,
  Descriptions,
  List,
  Pagination,
  Image,
  Input,
  Form,
  Radio,
  Row,
  Select,
  SelectOption,
  Space,
  Tabs,
  Tag,
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.dark.css'
// import global style
import './assets/style/global.less'
import './assets/style/icon.css'

// create Vue Instance
const app = createApp(App)
// use Vue Router
app.use(router)
// use Ant Design of Vue
app.use(Button)
app.use(Col)
app.use(Descriptions)
app.use(List)
app.use(Pagination)
app.use(Image)
app.use(Input)
app.use(Form)
app.use(Radio)
app.use(Row)
app.use(Select)
app.use(SelectOption)
app.use(Space)
app.use(Tabs)
app.use(Tag)
// mount DOM
app.mount('#app')
