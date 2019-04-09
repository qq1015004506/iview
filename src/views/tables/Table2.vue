<template>
    <div style="padding: 32px 64px;">
        <h1>服务器分页自定义序号</h1>
        <Table
                :columns="columns"
                :data="data"
                :loading="loading"
                border
                size="small"
                @on-sort-change="handleSortChange"

                @on-filter-change="handleFilterChange"
        ></Table>
        <div style="text-align: center; margin: 16px 0">
            <Page :total="total"
                  :current.sync="current"
                  @on-change="getData"
            ></Page>
        </div>
    </div>
</template>

<script>
    import $ from '../../libs/utils';

    export default {
        name: "Push",
        data() {
            return {
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        indexMethod: (row) => {
                            return (row._index + 1) + (this.size * this.current) - this.size;
                        }
                    },
                    {
                        title: '号码',
                        key: 'number',
                        sortable: 'custom',
                    },
                    {
                        title: '等级',
                        key: 'status',
                        render: (h,{ row }) => {
                            if(row.status === 1) {
                                return h('Tag', {
                                    props: {
                                        color: 'green'
                                    }
                                }, '等级1');
                            }else if(row.status === 2) {
                                return h('Tag', {
                                    props: {
                                        color: 'red'
                                    }
                                }, '等级2');
                            }
                        },
                        filters: [
                            {
                                label: '级别一',
                                value: 1
                            },
                            {
                                label: '级别二',
                                value: 2
                            },
                        ],
                        filterMultiple: false,
                        filterRemote (value) {
                            console.log(value)
                            this.filterType = value[0]
                        }
                    }
                ],
                data: [],
                loading: false,
                current: 1,
                sortType: 'normal', // normal | asc | desc
                filterType: undefined, // undefined, 1, 2
                size:10,
                total:0,
            }
        },
        methods:{
            getData () {
                if(this.loading) return;
                this.loading = true;
                $.ajax({
                    methods: 'get',
                    url: `/data/list/${this.current}/${this.sortType}/${this.filterType}`
                }).then(res =>{
                    this.data = res.data.data.list;
                    this.total = res.data.data.total;
                    this.loading = false;
                })
            },
            handleSortChange ({columns, key, order}) {
                this.sortType = order;
                this.current = 1;
                this.getData();
            },
            handleFilterChange () {
                this.current = 1;
                this.getData();
            },

        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>