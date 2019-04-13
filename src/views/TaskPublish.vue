<template>
    <dev-article>
        <div>
            <p>
                Name: {{ value }}
            </p>
            <p>
                <Button @click="handleRender(1)">Custom content</Button>
            </p>
        </div>
    </dev-article>
</template>
<script>
    export default {
        data () {
            return {
                value: ''
            }
        },
        methods: {
            handleRender (e) {
                console.log(e)
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    this.value = val;
                                }
                            }
                        })
                    }
                })
            }
        }
    }
</script>
