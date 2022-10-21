function Button(props) {
    console.log(props);
    let buttonStyle = {backgroundColor: "red"};
    return <button className="btn" style={buttonStyle}>{ props.children }</button>
}

export default Button;