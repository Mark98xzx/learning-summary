### elemet table 列表多个时间列 前端排序

```vue
    <template>
        <el-table
            border
            highlight-current-row
            :height="resizeViewHeight + 'px'"
            :data="tableData"
            :cell-class-name="cellClassName"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="50"></el-table-column>
            <template v-for="(column, index) in columnData">
            <template v-if="column.show">
                <el-table-column
                show-overflow-tooltip
                :key="index"
                :prop="column.name"
                :label="column.title"
                :min-width="column.width"
                :sortable="column.sortable"
                :sort-method="
                    (a, b) => {
                    return sortMethod(a, b, column.name);
                    }
                "
                :formatter="
                    column.dataformat &&
                    !Object.is(column.dataformat, '') &&
                    !Object.is(formatDataObj[column.dataformat], undefined)
                    ? formatDataObj[column.dataformat]
                    : undefined
                "
                >
                <template slot-scope="scope">
                    <a
                    class="viewPhoneLink"
                    v-if="
                        (column.name == 'DriverPhone' ||
                        column.name == 'CaptaindPhone') &&
                        dealOperateShow('客服') &&
                        scope.row['DriverPhone'] &&
                        !scope.row['DriverPhone'].includes('_')
                    "
                    @click="
                        viewPhoneDetails(
                        scope.row,
                        column.name == 'DriverPhone'
                            ? 2
                            : column.name == 'CaptaindPhone'
                            ? 3
                            : '',
                        column.name,
                        column.name == 'DriverPhone'
                            ? 'DriverId'
                            : column.name == 'CaptaindPhone'
                            ? 'CaptaindDriverId'
                            : '',
                        1
                        )
                    "
                    >{{ scope.row[column.name] }}</a
                    >
                    <span
                    v-else-if="
                        column.dataformat &&
                        !Object.is(column.dataformat, '') &&
                        !Object.is(formatDataObj[column.dataformat], undefined)
                    "
                    >
                    {{ formatDataObj[column.dataformat](scope.row, column) }}
                    </span>
                    <span v-else>{{ scope.row[column.name] }}</span>
                </template>
                </el-table-column>
            </template>
            </template>
            <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="180"
            >
            <template slot-scope="scope">
                <e6-td-operate
                :data="getOperateList(scope.row)"
                @command="handleOperate($event, scope.row)"
                ></e6-td-operate>
            </template>
            </el-table-column>
        </el-table>
    </template>
```
- 将时间转为时间戳
```js
    sortMethod(a, b, name) {
      console.log(a, b, name);
      let val1 = moment(a[name]).valueOf();
      let val2 = moment(b[name]).valueOf();
      console.log(val1, val2);
      return val1 - val2;
    },
```