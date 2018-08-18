import Vue from 'vue';

const app = new Vue({
    el: '#root',
    template: '<div>{{text}}</div>',
    data: {
        text: 0
    },
    beforeCreate() {
        console.log(this, 'beforeCreate', this.text, this.$el);
    },
    created() {
        console.log(this, 'created', this.text, this.$el);
    },
    beforeMount() {
        console.log(this, 'beforeMount', this.text, this.$el);
    },
    mounted() {
        console.log(this, 'mounted', this.text, this.$el);
    },
    beforeUpdate() {
        console.log(this, 'beforeUpdate');
    },
    updated() {
        console.log(this, 'updated');
    },
    beforeDestroy() {
        console.log(this, 'beforeDestroy');
    },
    destroyed() {
        console.log(this, 'destroyed');
    }
});

setTimeout(() => {
    app.text += 1;
}, 1000);