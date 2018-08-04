class userList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        updateUserList((err, users) => this.setState({ users }));
    }

    render() {
        return React.createElement(
            "ol",
            null,
            this.state.users.map(user => {
                return React.createElement(
                    "li",
                    {
                        key: user
                    },
                    user
                );
            })
        );
    }
}

ReactDOM.render(
    React.createElement(userList),
    document.getElementById("users")
);
