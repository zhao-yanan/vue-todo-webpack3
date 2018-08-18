import Vue from 'vue';

const app = new Vue({
    template: '<div>{{text}}</div>',
    data: {
        text: 0
    }
});

app.$mount(root);

setInterval(() => {
    app.text += 1;
}, 1000);

const unWatch = app.$watch('text', (newVal, oldVal) => {
    console.log(`${newVal} : ${oldVal}`);
});

setTimeout(() => {
    unWatch();
}, 2000);