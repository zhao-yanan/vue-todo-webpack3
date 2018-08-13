<template>
    <div class="app">
        <div class="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './layout/Header.vue';
    import Footer from './layout/Footer.jsx';
    import Todo from './views/todo/Todo.vue';

    export default {
        name: "app",
        components: {
            Header,
            Footer,
            Todo
        }
    }
</script>

<style scoped lang="less">
    .app {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #999;
        opacity: .9;
        z-index: -1;
    }
</style>