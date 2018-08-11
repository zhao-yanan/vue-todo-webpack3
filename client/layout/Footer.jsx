import '../assets/css/footer.less';

export default {
    data() {
        return {
            auther: 'Jokcy'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Written by {this.auther}</span>
            </div>
        )
    }
}