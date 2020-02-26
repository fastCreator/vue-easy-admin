<template>
  <div class="page-container page-one">
    <elpand-table ref="table" v-bind="table" />
    <elpand-form ref="form" v-bind="form" />
  </div>
</template>
<script>
import CONST from './const'
export default {
  data () {
    return {}
  },
  beforeCreate () {},
  created () {},
  methods: {},
  computed: {
    CONST () {
      const { $lang, $globLang } = this
      return CONST({ $lang, $globLang })
    },
    table () {
      const { $lang, $globLang } = this
      let that = this
      return {
        text: {
          // search: this.$lang.glob.search,
          // reset: this.$lang.glob.reset,
          // export: this.$lang.glob.export,
        },
        tableSort (evt, data, cb) {
          console.log(evt, data)
          //接口调用成功后执行cb()
          cb()
        },
        tableExport: {
          filter (row, prop) {
            if (prop === 'sex') {
              return row.sex ? $globLang.man : $globLang.woman
            }
            return row[prop]
          },
          filename: 'excel-list',
          autoWidth: true,
          bookTypes: ['xlsx', 'xlsm', 'csv', 'txt']
        },
        tableFilter: true,
        filters: [
          {
            label: this.$lang.name,
            prop: 'input',
            tag: 'el-input'
          },
          {
            label: this.$lang.sex,
            prop: 'select',
            tag: 'elpand-select',
            default: '',
            bind: {
              options: this.CONST.sex
            }
          }
        ],
        table: {
          data: 'list',
          bind: {
            height: 'calc(100% - 140px)',
            rowKey: 'id',
            border: true
          },
          on: {
            'row-dblclick' (row, column, event) {
              console.log(row, column, event)
            }
          },
          columns: [
            { type: 'selection', bind: { width: '35' } },
            {
              type: 'time',
              format: 'yyyy-MM-dd hh:mm:ss',
              label: $lang.birthday,
              prop: 'birth'
            },
            { type: 'image', label: $lang.head, prop: 'header' },
            {
              component: { tag: 'el-input', bind: {}, on: {} },
              label: $lang.input,
              prop: 'input'
            },
            {
              component: {
                tag: 'elpand-select',
                bind: {
                  options: that.getOptions,
                  optionsProps: {
                    label: 'label',
                    value: 'value'
                  }
                },
                on: {}
              },
              label: $lang.select,
              prop: 'select'
            },
            { label: $lang.name, prop: 'name' },
            { label: $lang.age, prop: 'age' },
            {
              type: 'color',
              label: $lang.color,
              prop: 'color',
              bind: { width: '80' }
            },
            {
              type: 'audio',
              label: $lang.likeMusic,
              prop: 'audio',
              bind: { width: '320' }
            },
            {
              type: 'map',
              label: $lang.sex,
              prop: 'sex',
              list: this.CONST.sex
            },
            {
              label: $lang.family,
              child: [
                { prop: 'mother', label: $lang.mother },
                { prop: 'father', label: $lang.father }
              ]
            },
            {
              label: $globLang.operation,
              bind: { width: '200' },
              type: 'btns',
              btns (props) {
                let btns = [
                  {
                    label: $globLang.delete,
                    type: 'danger',
                    confirm: '你确认删除吗？',
                    call (props, handlerSearch) {
                      console.log(props)
                      handlerSearch()
                    }
                  },
                  {
                    label: $globLang.unable,
                    bind: {
                      disabled: true
                    }
                  },
                  {
                    label: $globLang.edit,
                    type: 'primary',
                    call (props, handlerSearch) {
                      that.$refs.form.open($globLang.edit, props.row)
                    }
                  }
                ]
                return btns
              }
            }
          ]
        },
        operations: [
          {
            label: $globLang.delete,
            confirm: '你确定删除吗？',
            call (selection, search) {
              console.log(selection)
              search()
            },
            bind: {
              type: 'danger',
              icon: 'el-icon-delete'
            }
          },
          {
            label: $globLang.add,
            call (selection, search) {
              that.$refs.form.open($globLang.add)
            },
            bind: {
              type: 'primary'
            }
          },
          {
            label: '获取table数据',
            call: () => {
              let tableFef = that.$refs.table
              // 获取表单数据
              console.log(tableFef.getData())
            }
          },
          {
            label: '主动触发search',
            call: () => {
              let tableFef = that.$refs.table
              tableFef.handlerSearch()
            }
          }
        ],
        pagination: {
          total: 'pages.allSize',
          currentPage: 1,
          pageSize: 10,
          bind: {
            layout: 'sizes,total, prev, pager, next',
            pageSizes: [10, 20, 30, 40]
          }
        },
        search (filters, pagination) {
          console.log(filters, pagination)
          return that.$api.getTableData({ ...filters, ...pagination })
        }
      }
    },
    form () {
      let that = this
      return {
        dialogBind: {
          width: '800px',
          confirm: true
        },
        list (data, title) {
          return [
            {
              label: '姓名',
              prop: 'name',
              tag: 'el-input',
              bind: {
                placeholder: '输入姓名方可出现性别'
              }
            },
            {
              label: '性别',
              prop: 'sex',
              tag: 'elpand-select',
              hide: !data.name,
              bind: {
                options: that.CONST.sex
              }
            }
          ]
        },
        async submit (o) {
          console.log(o)
          that.$refs.table.handlerSearch()
        }
      }
    }
  }
}
</script>
<style lang="less">
.page-one {
  .elpand-table {
    height: 100%;
  }
}
</style>
