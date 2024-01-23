<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import {LoadFurnListRequest,
  SaveFurnRequest,
  updateFurnListRequest,
  searchByIdFurnListRequest,
  deleteById,
  listByPage
} from "@/api";
import Msg from "@/components/baseUi/Message"
import type { FormInstance, FormRules } from 'element-plus'

onMounted(()=> {
  // loadTableData()
  listByPage({pageNum,pageSize}).then((res:any)=> {
    tableData.value = res.data.records
    total.value = res.data.total
  })
})


const tableData= ref<any[]>([])
const search: any = ""

const handleClick = (row: any) => {
  dialogVisible.value = true
  isUpdate.value = true
  searchByIdFurnListRequest({id:row.id}).then((res:any) => {
    form.id = res.data.id
    form.name = res.data.name
    form.maker = res.data.maker
    form.sales = res.data.sales
    form.price = res.data.price
    form.stock = res.data.stock
  })

}

const handleEdit = (row: any) => {
  deleteById(row.id).then((res:any) => {
    console.log(res)
    if (res.code === 200) {
      Msg.success("删除成功")
      loadTableData()
    } else {
      Msg.warning("删除失败")
    }
  })
}

const handleSearch = () => {
  console.log("search")
}

const dialogVisible = ref(false)
const form = reactive({
  name:"",
  maker:"",
  price:"",
  sales:"",
  stock:""
})
const isUpdate = ref(false)
interface formInterface {
  name: string
  maker: string
  price: string
  sales:string
  stock: string
}
const formRef = ref<FormInstance>();
const rules = reactive<FormRules<formInterface>>({
  name: [
    { required: true, message: '请输入家具名', trigger: 'blur' },

  ],
  maker:[
    { required: true, message: '请输入制造商', trigger: 'blur' },

  ],
  price:[
    { required: true, message: '请输入价格', trigger: 'blur' },
  ],
  sales:[
    { required: true, message: '请输入销售量', trigger: 'blur' },
  ],
  stock:[
    { required: true, message: '请输入库存', trigger: 'blur' },
  ]

})

const handleAdd = () => {
  dialogVisible.value = !dialogVisible.value
}

const handleClose = () => {

}
const handleConfirm = (type:string) => {
 formRef.value?.validate((valid) => {
   if (valid) {
     if(type === "update") {
       updateFurnListRequest(form).then(res => {
         if (res.code === 200) {
           Msg.success("修改成功")
           loadTableData()
           isUpdate.value = false
           formRef.value?.resetFields()
           dialogVisible.value = false

         }
       }).catch(err => {
         Msg.success("修改失败")
       })
     } else {
       SaveFurnRequest(form).then(res =>{
         if (res.code === 200){
           dialogVisible.value = false;
           loadTableData()
           Msg.success("添加成功")
           formRef.value?.resetFields()
           dialogVisible.value = false
         }else {
           Msg.warning("添加失败")
         }
       })
     }
   } else {
     Msg.warning("请填写表单")
   }
 })

}


const loadTableData = () => {
  LoadFurnListRequest({}).then((res:any) => {
    tableData.value= res.data
  })
}
const pageNum = ref(1)

const pageSize = ref(10)
const total = ref(0);
const handleSizeChange = (val: number) => {
  pageSize.value = val
  listByPage({pageNum,pageSize}).then((res:any)=> {
    tableData.value = res.data.records
    total.value = res.data.total
  })
}
const handleCurrentChange = (val: number) => {
 pageNum.value = val
  listByPage({pageNum,pageSize}).then((res:any)=> {
    tableData.value = res.data.records
    total.value = res.data.total
  })
}






</script>

<template>
  <el-button type="primary" @click="handleAdd">新增</el-button>
  <div class="search">
    <el-input placeholder="请输入" v-model="search"></el-input>
    <el-button @click="handleSearch">查找</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column  prop="name" label="家具名" width="180"/>
    <el-table-column prop="maker" label="制造商" width="180"/>
    <el-table-column prop="price" label="价格"/>
    <el-table-column prop="sales" label="销量"/>
    <el-table-column prop="stock" label="库存"/>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleClick(scope.row)"
        >修改
        </el-button
        >
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >

    <el-form :model="form" label-width="120px"  :rules="rules" ref="formRef">
      <el-form-item label="家具名" prop="name">
        <el-input v-model="form.name" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="厂商" prop="maker">
        <el-input v-model="form.maker" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="销量" prop="sales">
        <el-input v-model="form.sales" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input v-model="form.stock" style="width: 80%;"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm(isUpdate ? 'update' : '')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.search {
  display: flex;
}

</style>